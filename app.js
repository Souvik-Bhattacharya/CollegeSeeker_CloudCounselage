const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./dataBase/dataBase.js");

const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());

app.engine('handlebars', exphbs.engine({ handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, "./static/")));

app.get("/", (req, res) => {
    let sql = "SELECT * FROM institutions LIMIT 10";
    db.query(sql, function (err, result) {
        if (err) console.log(err);
        else res.render("home", { data: result });
    });
})

app.get("/about", (req, res)=>{
    res.render("about");
})

app.post("/search", (req, res) => {
    const {college, state, stream} = req.body;
    let sql = `SELECT * FROM institutions WHERE College_Name LIKE "%${college}%" AND State="${state}" AND Stream="${stream}"`;
    db.query(sql, function (err, result) {
        if (err) console.log(err);
        else res.render("search", {
            data: result,
            count: result.length,
        });
    })
})

app.get("/:stream", (req, res) => {
    const stream = req.params.stream;
    let sql = `SELECT * FROM institutions WHERE Stream="${stream}"`;
    db.query(sql, function (err, result) {
        if (err) console.log(err);
        else res.render("colleges", {
            data: result,
            count: result.length,
            stream: stream
        });
    })
})

app.listen(port, () => {
    console.log(`Listenning on port ${port}...`);
});