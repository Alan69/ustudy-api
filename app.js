const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite = require('sqlite3').verbose();
const url = require('url');
let sql;
const db = new sqlite.Database('./sqlite3.db', sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
});

app.use(bodyParser.json());

app.post('/urequest', (req, res) => {
  try{
    const {fio, region, iin, report_date, report_time, email, oferta, tests, payment_check, number, udostoverenie, sex, country, created_date} = req.body;
    sql = 'insert into urequest(fio, region, iin, report_date, report_time, email, oferta, tests, payment_check, number, udostoverenie, sex, country, created_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    db.run(sql, [fio, region, iin, report_date, report_time, email, oferta, tests, payment_check, number, udostoverenie, sex, country, created_date], (err) => {
      if (err) return res.json({ status: 300, success: false, error: err });

      console.log('succesfill input')
    });
    return res.json({
      status: 200,
      success: true,
    });
  }catch (error){
    return res.json({
      status: 400,
      success: false,
    });
  }
});


app.get('/urequest', (req, res) => {
  sql = 'select * from urequest';
  try {
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false, error: err });

      if (rows.length < 1)
        return res.json({ status: 300, success: true, error: "No match" });
      
      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
}); 

app.get('/urequest/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM urequest WHERE id = ?`;
  const params = [id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      user: row,
    });
  });
});


app.put('/urequest/:id', (req, res) => {
  const id = req.params.id;
  const fio = req.body.fio;
  const region = req.body.region;
  const iin = req.body.iin;
  const report_date = req.body.report_date;
  const report_time = req.body.report_time;
  const email = req.body.email;
  const oferta = req.body.oferta;
  const tests = req.body.tests;
  const payment_check = req.body.payment_check;
  const number = req.body.number;
  const udostoverenie = req.body.udostoverenie;
  const sex = req.body.sex;
  const country = req.body.country;
  const created_date = req.body.created_date;

  const sql = `UPDATE urequest SET fio = ?, region = ?, iin = ?, report_date = ?, report_time = ?, email = ?, oferta = ?, tests = ?, payment_check = ?, number = ?, udostoverenie = ?, sex = ?, country = ?, created_date = ? WHERE id = ?`;
  const params = [fio, region, iin, report_date, report_time, email, oferta, tests, payment_check, number, udostoverenie, sex, country, created_date, id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      user: { id, fio, region, iin, report_date, report_time, email, oferta, tests, payment_check, number, udostoverenie, sex, country, created_date },
      message: 'success',
    });
  });
});

app.delete('/urequest/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM urequest WHERE id = ?`;
  const params = [id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'successfully deleted',
    });
  });
});


const port = process.env.PORT || 3333;
app.listen(port, () => console.log("Server is running on port 3333"));