// Create web server
// http://localhost:3000/comments

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('data/comments.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.get('/comments/:id', (req, res) => {
    fs.readFile('data/comments.json', 'utf8', (err, data) => {
        if (err) throw err;
        const comments = JSON.parse(data);
        const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
        if (!comment) res.status(404).send('The comment with the given ID was not found.');
        res.json(comment);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('data/comments.json', 'utf8', (err, data) => {
        if (err) throw err;
        const comments = JSON.parse(data);
        const comment = {
            id: comments.length + 1,
            name: req.body.name,
            email: req.body.email,
            body: req.body.body
        };
        comments.push(comment);
        fs.writeFile('data/comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.json(comments);
        });
    });
});

app.put('/comments/:id', (req, res) => {
    fs.readFile('data/comments.json', 'utf8', (err, data) => {
        if (err) throw err;
        const comments = JSON.parse(data);
        const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
        if (!comment) res.status(404).send('The comment with the given ID was not found.');
        comment.name = req.body.name;
        comment.email = req.body.email;
        comment.body = req.body.body;
        fs.writeFile('data/comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.json(comments);
        });
    });
});

app.delete('/comments/:id', (req, res) => {
    fs.readFile('data/comments.json', 'utf8', (