// create web server
// create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { json } = require('express');

app.use(express.json());

app.post('/comment', (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
        res.status(400).send('Name and comment are required');
        return;
    }

    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
            return;
        }

        const comments = JSON.parse(data);
        comments.push({ name, comment });

        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing comments');
                return;
            }

            res.status(201).send('Comment added');
        });
    });
});

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
            return;
        }

        const comments = JSON.parse(data);
        res.json(comments);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});