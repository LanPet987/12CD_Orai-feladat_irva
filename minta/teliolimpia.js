const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");


app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection(
    {
        user:"root",
        host:"localhost",
        port:3306,
        password:"",
        database:"teliolimpia"
    }
);

app.get("/", (req, res) => {
    res.send("Működik a szerver.");
});


app.get("/hely", (req,res) => {
    const sql = "SELECT helyszin FROM sportagak";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/erem", (req,res) => {
    const sql = "SELECT * FROM rpgyorskorcsolyaeredmenyek ORDER BY helyezes ASC";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/magyar", (req,res) => {
    const sql = "SELECT * FROM magyarermesek";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});


app.listen(3000, () => {

    console.log("A téliolimpia szervere a 3000-es porton fut.");

}); 
