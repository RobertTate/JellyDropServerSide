import mysql from 'mysql';
import { config } from '../config';


let pool = mysql.createPool({
    connectionLimit: 3,
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DATABASE
});

async function executeQuery(sql, args = []) {
    let connection = await getConnection();
    return sendQueryToDB(connection, sql, args);
}

function callProcedure(procedureName, args = []) {
    let placeholders = generatePlaceholders(args);
    let callString = `CALL ${procedureName}(${placeholders});`;
    return executeQuery(callString, args);
}

async function rows(procedureName, args = []) {
    let resultsets = await callProcedure(procedureName, args);
    return resultsets[0];
}

async function row(procedureName, args = []) {
    let resultsets = await callProcedure(procedureName, args);
    return resultsets[0][0];
}

async function empty(procedureName, args = []) {
    await callProcedure(procedureName, args);
}

function generatePlaceholders(args = []) {
    let placeholders = '';
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (i === args.length - 1) { 
                placeholders += '?';
            } else {
                placeholders += '?,';
            }
        }
    }
    return placeholders;
}

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

function sendQueryToDB(connection, sql, args = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err, result) => {
            connection.release();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export { row, rows, empty, executeQuery, generatePlaceholders };