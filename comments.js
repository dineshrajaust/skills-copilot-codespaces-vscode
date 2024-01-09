// create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// GET request for all comments
app.get('/comments', db.getComments);

// GET request for a single comment
app.get('/comments/:id', db.getCommentById);

// POST request to create a new comment
app.post('/comments', db.createComment);

// PUT request to update a comment
app.put('/comments/:id', db.updateComment);

// DELETE request to delete a comment
app.delete('/comments/:id', db.deleteComment);

// start server
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
