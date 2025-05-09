let currentQuestionId = 0;

async function loadQuestion(id) {
    try {
        const response = await fetch(`/api/question/${id}`);
        const data = await response.json();
        
        document.getElementById('question').innerHTML = data.question;
        
        // If we've reached the end of the conversation
        if (data.yes === null && data.no === null) {
            document.getElementById('yesBtn').style.display = 'none';
            document.getElementById('noBtn').style.display = 'none';
        } else {
            document.getElementById('yesBtn').style.display = 'block';
            document.getElementById('noBtn').style.display = 'block';
        }
        
        currentQuestionId = id;
    } catch (error) {
        console.error('Error loading question:', error);
        document.getElementById('question').innerHTML = 'Sorry, something went wrong. Please try again.';
    }
}

document.getElementById('yesBtn').addEventListener('click', async () => {
    const response = await fetch(`/api/question/${currentQuestionId}`);
    const data = await response.json();
    if (data.yes !== null) {
        loadQuestion(data.yes);
    }
});

document.getElementById('noBtn').addEventListener('click', async () => {
    const response = await fetch(`/api/question/${currentQuestionId}`);
    const data = await response.json();
    if (data.no !== null) {
        loadQuestion(data.no);
    }
});

// Load the first question when the page loads
loadQuestion(0); 