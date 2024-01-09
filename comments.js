// create web server for comments
// Authors:  Jonathan Riso, Tony Faller, Josh Seaman
// Last Modified:  11/25/2014
// Description:  This file creates a web server for comments.  It handles
//               requests for comments and returns the comments for the
//               specified post id.  It also handles adding new comments
//               to the database.
// Dependencies:  express, mysql, body-parser, path, fs, http, https

// import modules
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');

// create database connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'blog'
});

// connect to database
db.connect(function(err) {
    if (err) {
        console.log('Error connecting to database');
        return;
    }
    console.log('Connection established');
});

// create express app
var app = express();

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// set port
app.set('port', 3000);

// get comments for post
app.get('/comments/:id', function(req, res) {
    var id = req.params.id;
    var sql = 'SELECT * FROM comments WHERE post_id = ' + id;
    db.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('Error getting comments');
            return;
        }
        res.json(rows);
    });
});

// add comment to database
app.post('/comments', function(req, res) {
    var comment = req.body;
    var sql = 'INSERT INTO comments (post_id, name, comment) VALUES (' + comment.post_id + ', "' + comment.name + '", "' + comment.comment + '")';
    db.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('Error adding comment');
            return;
        }
        res.json(rows);
    });
});

// create http server
http.createServer(app).listen(app.get('port'), function() {
    console.log('