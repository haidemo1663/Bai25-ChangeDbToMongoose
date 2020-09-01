const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter);
db.defaults({ books: [] ,users:[],transactions:[],sessions:[]}).write();
module.exports= db;