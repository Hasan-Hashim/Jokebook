const randomJokeElement = document.getElementById('random-joke');
const categoriesElement = document.getElementById('categories');
const jokesElement = document.getElementById('jokes');
const form = document.getElementById('joke-form');

// Fetch and display a random joke
fetch('/jokebook/joke/funnyJoke?limit=1')
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 0) {
            randomJokeElement.textContent = `${data[0].setup} - ${data[0].delivery}`;
        }
    });

// Fetch categories
document.getElementById('fetch-categories').addEventListener('click', () => {
    fetch('/jokebook/categories')
        .then((res) => res.json())
        .then((data) => {
            categoriesElement.innerHTML = '';
            data.forEach((category) => {
                const li = document.createElement('li');
                li.textContent = category.name;
                li.addEventListener('click', () => fetchJokes(category.name));
                categoriesElement.appendChild(li);
            });
        });
});

// Fetch jokes for a category
function fetchJokes(category) {
    fetch(`/jokebook/joke/${category}`)
        .then((res) => res.json())
        .then((data) => {
            jokesElement.innerHTML = `<h3>Jokes in ${category}</h3>`;
            data.forEach((joke) => {
                const p = document.createElement('p');
                p.textContent = `${joke.setup} - ${joke.delivery}`;
                jokesElement.appendChild(p);
            });
        });
}

// Add a new joke
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const setup = document.getElementById('setup').value;
    const delivery = document.getElementById('delivery').value;

    fetch('/jokebook/joke/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, setup, delivery }),
    })
        .then((res) => res.json())
        .then(() => {
            alert('Joke added successfully!');
            fetchJokes(category);
        });
});
