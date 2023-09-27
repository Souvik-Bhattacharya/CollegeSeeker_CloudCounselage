const mysql = require('mysql');
const path = require('path');
const csvToJson = require('csvtojson');

const db = mysql.createConnection({
  host: process.env.LOCALHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: "3306"
});

db.connect(async function (error) {
  if (error) console.log(error);
  else {
    console.log("Database Connected...");
    const data = await csvToJson().fromFile(path.join(__dirname, "data.csv"));
    const sqlTable = `CREATE TABLE institutions (College_Name VARCHAR(255), State VARCHAR(255), Stream VARCHAR(255), UG_fee VARCHAR(255), PG_fee VARCHAR(255), Rating VARCHAR(255), Academic VARCHAR(255), Accommodation VARCHAR(255), Faculty VARCHAR(255), Infrastructure VARCHAR(255), Placement VARCHAR(255), Social_Life VARCHAR(255))`;
    db.query(sqlTable, function (err) {
      if (err) console.log("Table already exists...");
      else {
        console.log("Table created...");
        for (i = 0; i < data.length; i++) {
          const sqlData = `INSERT INTO institutions (College_Name, State, Stream, UG_fee, PG_fee, Rating, Academic, Accommodation, Faculty, Infrastructure, Placement, Social_Life) VALUES ("${data[i].College_Name}", "${data[i].State}", "${data[i].Stream}", "${data[i].UG_fee}", "${data[i].PG_fee}", "${data[i].Rating}", "${data[i].Academic}", "${data[i].Accommodation}", "${data[i].Faculty}", "${data[i].Infrastructure}", "${data[i].Placement}", "${data[i].Social_Life}")`;
          db.query(sqlData, function (err) {
            if (err) console.log("Can't load data...");
          });
        }
      }
    });
  }
});

module.exports = db;