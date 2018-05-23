import { executeQuery, generatePlaceholders } from './config/db';

class Table {
    constructor(tableName) {
        if (!tableName) {
            throw new TypeError('You must pass a MySQL table name into the Table object constructor.');
        }
        this.tableName = tableName;
    }

    async getOne(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ${id};`;
        let results = await executeQuery(sql, [id]);
        return results[0];
    }

    async getPlayergame(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE player_id = ${id};`;
        let results = await executeQuery(sql, [id]);
        return results[0];
    }

    getAll() {
        let sql = `SELECT * FROM ${this.tableName}`;
        return executeQuery(sql);
    }

    getLeaderBoard() {
        let sql = `SELECT total_points, game_id, player_id FROM ${this.tableName}`;
        return executeQuery(sql);
    }

    find(query) {
        let columns = Object.keys(query);
        let values = Object.values(query);
        let conditions = columns.map((columnName) => {
            return `${columnName} LIKE ?`;
        });
        let sql = `SELECT * FROM ${this.tableName} WHERE ${conditions.join(' AND ')};`;
        return executeQuery(sql, values);
    }

    async insert(row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let placeholderString = generatePlaceholders(values);
        let sql = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES (${placeholderString});`;
        let results = await executeQuery(sql, values);
        return { id: results.insertId };
    }

    update(id, row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let updates = columns.map((columnName) => {
            return `${columnName} = ?`;
        });
        let sql = `UPDATE ${this.tableName} SET ${updates.join(',')} WHERE id = ${id};`;
        return executeQuery(sql, values);
    }

    /*
    when updateAdd is called 
    get current total in db 
    add current total to value passed
    update the total in db 
    */

    updateAdd(id, row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let updates = columns.map((columnName) => {
            return columnName;
        });

        let sql = `UPDATE ${this.tableName} SET ${updates.join(',')} = ${updates} + ${values} WHERE id = ${id};`;
        return executeQuery(sql, values);
    }


    delete(id) {
        let sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        return executeQuery(sql);
    }
}

export default Table;