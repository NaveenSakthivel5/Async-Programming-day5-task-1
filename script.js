// Function to fetch data from an API using promises
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to create and append elements for Game of Thrones characters
function displayGameOfThronesCharacters(characters) {
    const charactersList = document.getElementById('charactersList');

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'col-lg-4 character-card';

        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Display name
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = `Name: ${character.name}`;

        // Display house (slug and name)
        const house = document.createElement('p');
        house.className = 'card-text';
        house.textContent = `House: ${character.house ? character.house.slug + ', ' + character.house.name : 'Unknown House'}`;

        // Display quotes
        const quotes = document.createElement('p');
        quotes.className = 'card-text';
        quotes.textContent = `Quotes: ${character.quotes.join(', ') || 'No quotes available'}`;

        cardBody.appendChild(title);
        cardBody.appendChild(house);
        cardBody.appendChild(quotes);

        card.appendChild(cardBody);

        characterCard.appendChild(card);
        charactersList.appendChild(characterCard);
    });
}

// Execute function to display Game of Thrones characters on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchData('https://api.gameofthronesquotes.xyz/v1/characters')
        .then(characters => displayGameOfThronesCharacters(characters))
        .catch(error => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Error fetching Game of Thrones characters: ${error}`;
            document.body.appendChild(errorMessage);
        });
});
