"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const PostgreSQL_1 = require("./PostgreSQL");
const SQLite_1 = require("./SQLite");
const LocalFilesystem_1 = require("./LocalFilesystem");
class Database {
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            if (process.env.POSTGRES_HOST !== undefined) {
                console.log('Connecting to Postgres database.');
                Database.instance = new PostgreSQL_1.PostgreSQL();
            }
            else if (process.env.LOCAL_FS_DB !== undefined) {
                console.log('Connecting to local filesystem database.');
                Database.instance = new LocalFilesystem_1.LocalFilesystem();
            }
            else {
                console.log('Connecting to SQLite database.');
                Database.instance = new SQLite_1.SQLite();
            }
        }
        return Database.instance;
    }
}
exports.Database = Database;
