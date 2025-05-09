const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Conversation data
const conversation = [
    {
        question: "Are you bored?",
        yes: 1,
        no: 1
    },
    {
        question: "Have you tried not being bored?",
        yes: 2,
        no: 2
    },
    {
        question: "Would you like some suggestions for fun activities?",
        yes: 3,
        no: 4
    },
    {
        question: "Great! Here are some ideas:<br><br>1. Take a walk<br>2. Read a book<br>3. Learn something new<br>4. Call a friend<br><br>Did any of these help?",
        yes: 5,
        no: 4
    },
    {
        question: "Well, at least you're honest.<br><br>Would you like to try again?",
        yes: 0,
        no: 5
    },
    {
        question: "Thanks for playing!<br><br>Hope you find something interesting to do!",
        yes: null,
        no: null
    }
];

// API endpoint to get the next question
app.get('/api/question/:id', (req, res) => {
    const questionId = parseInt(req.params.id);
    if (questionId >= 0 && questionId < conversation.length) {
        res.json(conversation[questionId]);
    } else {
        res.status(404).json({ error: 'Question not found' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 