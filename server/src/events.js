import schedule from 'node-schedule';
import moment from 'moment';
import { executeQuery, generatePlaceholders } from './config/db';

class EventTable {

    dailyEvent() {
        var j = schedule.scheduleJob('30 58 4 * * *', () => {
            let sql = `SELECT * FROM game ORDER BY id;`;
            executeQuery(sql)
                .then((allgames) => {
                    let currentGame = allgames[allgames.length - 1].id;
                    let sql = `SELECT * FROM playergame where game_id = ${currentGame}`;
                    return executeQuery(sql);
                }).then((playerGames) => { 
                    let currentPlayerGames = playerGames;
                        currentPlayerGames.forEach((playergame) => {
                            if (playergame.number_dropped >= 20) {
                                let id = playergame.id;
                                let row = { total_points: 100 };
                                this.gameBonus(id, row)
                                .then((res) => {
                                    let sql = `UPDATE playergame SET number_pins = 20, number_dropped = 0 WHERE id =${id}`;
                                    return executeQuery(sql);
                                })
                            } else { 
                                let sql = `UPDATE playergame SET number_pins = 20, number_dropped = 0 WHERE id =${playergame.id}`;
                                return executeQuery(sql);
                            }
                        });
                }).catch((err) => {
                    console.log(err);
                });
        });
    }
    
    weeklyBonusEvent() {
        var j = schedule.scheduleJob('59 4 * * *', () => {                             
            let sql = `SELECT * FROM game ORDER BY id;`;
            executeQuery(sql)                                                           
                .then((allgames) => {                                                   
                    let currentGame = allgames[allgames.length - 1].id;
                    let sql = `SELECT * FROM playergame where game_id = ${currentGame}`;
                    return executeQuery(sql);                                          
                }).then((playerGames) => {
                    let currentPlayerGames = playerGames;                               
                    currentPlayerGames.forEach((playergame) => {
                        let id = playergame.id;
                        let pickedUp = playergame.number_pickedup;
                        let sql = `SELECT * FROM pins WHERE ${id} = playergame_ok_id AND isPickedUp = 1`;
                        return executeQuery(sql)                                       
                        .then((pins) => {
                            if ( pins.length >= 140) {                               
                                let id = playergame.id;
                                let bonus = 12 * playergame.number_pickedup;
                                let row = { total_points: bonus };
                                this.gameBonus(id, row)                            
                                .then((res) => {console.log(res)})
                                .catch((err) => {console.log(err)})
                            } else if ( pins.length >= 105) {                        
                                let id = playergame.id;
                                let bonus = 6 * playergame.number_pickedup;
                                let row = { total_points: bonus };
                                this.gameBonus(id, row)
                                .then((res) => {console.log(res)})
                                .catch((err) => {console.log(err)})
                            }
                        }).catch((err) => {console.log(err)})
                    })
                }).catch((err) => {console.log(err)})
            })
        }
        



        weeklyGameEvent() {
            var j = schedule.scheduleJob('30 59 4 * * 1', () => {     
                let sql = `UPDATE playergame SET number_pickedup = 0`;      
                executeQuery(sql)
                .then((res) => {
                    let sql = `DELETE FROM pins where isPickedUp = 1`;          
                    return executeQuery(sql)
                }).then((res) => {
                    let sql = `SELECT * FROM game ORDER BY id;`;               
                    executeQuery(sql)
                    .then((allgames) => {
                        let currentGame = allgames[allgames.length - 1].id;
                        let weekChange = allgames[allgames.length -1].change_week + 1;
                            let sql = `UPDATE game SET change_week = ${weekChange} where id = ${currentGame}`;  
                            return executeQuery(sql)                           
                            .then((res) => {
                                    if ( weekChange === 4 ) {                       
                                        let sql = `INSERT INTO game() VALUES()`;    
                                        return executeQuery(sql)                   
                                        .then((res) => {
                                            let sql = 'TRUNCATE TABLE pins';
                                            return executeQuery(sql)            
                                            .then((res) => {
                                                let sql = `SELECT * FROM game`;         
                                                return executeQuery(sql)                
                                                .then((games) => {
                                                    let currentGame = games[games.length - 1].id;
                                                    this.issuePlayergameIds(currentGame)   
                                                    .then((res) => {console.log('Players assigned new playerGame Ids')})
                                                    .catch((err) => {console.log(err)})
                                                }).catch((err) => {console.log(err)})
                                            }).catch((err) => {console.log(err)})
                                        }).catch((err) => {console.log(err)})
                                    }
                            }).catch((err) => {console.log(err)})
                    }).catch((err) => {console.log(err)})
                }).catch((err) => {console.log(err)})
            })    
        }




    issuePlayergameIds(id) {
        let sql = `SELECT * FROM players`;
        return executeQuery(sql)
        .then((players) => {
            players.forEach((player) => {
                let sql = `INSERT INTO playergame (player_id, game_id) VALUES (${player.id}, ${id})`
                return executeQuery(sql)
                .then((res) => {console.log(res)})
                .catch((err) => {console.log(err)})
            })
        })
    }


    gameBonus(id, row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let updates = columns.map((columnName) => {
            return columnName;
        });

        let sql = `UPDATE playergame SET ${updates.join(',')} = ${updates} + ${values} WHERE id = ${id};`;
        return executeQuery(sql, values);
    }

}


export default EventTable;
