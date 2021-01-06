const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('../database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({dest: '../public/upload'});
const dotenv = require('dotenv');
const session = require('express-session');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

connection.connect();

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
})

const multer=require('multer');
const upload = multer({dest: './upload/'});

// CREATE
app.post('/api/project', upload.single('body_images'), (req, res) => {
    var title = req.body.title;
    var team = req.body.team;
    var period = req.body.period;
    var framework = req.body.framework;
    var body_text = req.body.body_text;
    var body_images = '/upload/' + req.file.filename;
    var summary = req.body.summary;
    var git_url = req.body.git_url;
    var isDeleted=0;
    // var impression=req.body.impression;

    var sql={title, team, period, framework, body_text, body_images, summary, git_url, isDeleted};
    var query=connection.query('INSERT INTO project SET ?', sql, (err,rows, fields) => {
        res.send(rows);
    })
});

// READ
app.get('/api/project', (req,res) => {
    var query=connection.query('SELECT * FROM project WHERE isDeleted=0', (err, rows, fields) => {
        res.send(rows);
    })
})

// READ id
app.get('/api/project/:id', (req,res) => {
    var id=req.params.id;
    var query=connection.query('SELECT * FROM project WHERE id =?', [id], (err, rows, fields) => {
        res.send(rows);
    })
})

// DELETE
app.delete('/api/project/:id', (req, res) => {
    var id = req.params.id;
    var query=connection.query('UPDATE project SET isDeleted = 1 WHERE id =?', [id], (err, rows, fields) => {
        res.send(rows);
    })
})

// UPDATE
app.post('/api/update', (req,res) => {
    var id=req.body.id;
    var title=req.body.title;
    var team=req.body.team;
    var period=req.body.period;
    var framework=req.body.framework;
    var body_text=req.body.body_text;
    var body_images=req.body.body_images;
    var summary=req.body.summary;
    var git_url=req.body.git_url;
    var isDeleted=0;
    // var impression=req.body.impression;

    var sql=[title, team, period, framework, body_text, body_images, summary, git_url, isDeleted, id];
    var query=connection.query('UPDATE project SET title =?, team =?, period =?, framework =?, body_text =?, body_images =?, summary =?, git_url =?, isDeleted =? WHERE id =?', sql, (err,rows, fields) => {
        res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
