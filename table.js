const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./sqlite3.db', sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
});

const sql = `create table urequest(id integer primary key, fio, region, iin, report_date, report_time, email, oferta, tests, payment_check, number, udostoverenie, sex, country, created_date)`;
db.run(sql);