const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const addQuestionButton = document.getElementById('add-question');
const previewFormButton = document.getElementById('preview-form');
const formPreview = document.getElementById('form-preview');

const questions = [];

addQuestionButton.addEventListener('click', () => {
    const question = questionText.value;
    questions.push(question);

    // Display the question in the form builder
    const questionElement = document.createElement('div');
    questionElement.innerText = question;
    formPreview.appendChild(questionElement);

    questionText.value = ''; // Clear the input field
});

previewFormButton.addEventListener('click', () => {
    formPreview.innerHTML = ''; // Clear the form preview

    // Create and display the previewed form
    const form = document.createElement('form');
    questions.forEach((question, index) => {
        const label = document.createElement('label');
        label.innerText = question;
        const input = document.createElement('input');
        input.setAttribute('name', `question-${index}`);
        form.appendChild(label);
        form.appendChild(input);
    });

    formPreview.appendChild(form);
});


const saveFormButton = document.getElementById('save-form');

saveFormButton.addEventListener('click', () => {
    // Create a JSON object representing the form data
    const formData = {
        title: 'Sample Form',
        questions: questions,
    };

    // Send the form data to the server
    fetch('http://localhost:3000/forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form saved:', data);
        // You can handle the response here, e.g., show a success message
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message
    });
});
