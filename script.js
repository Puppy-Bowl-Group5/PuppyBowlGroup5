//import {PuppyFreeAgents} from './scriptES6'
//const PuppyFreeAgents = require("./scriptES6.js")

const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const cohortName = '2302-ACC-PT-WEB-PT-D';
// Use the APIURL variable for fetch requests
const APIURL = 'https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-D/players';

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();
        const players = data.data.players;
        console.log(players)
        return players;
    } catch (error) {
        console.error('Uh oh, trouble fetching players!', error);
        throw error;
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/${playerId}`);
        const data = await response.json();
        const player = data.data.player
        return player;
    } catch (error) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, error);
    }
};

const addNewPlayer = async (playerObj) => {
    try {

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/${playerId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("player removed")
        } else {
            console.error("Player invincible")
        }
    } catch (error) {
        console.error(`Whoops, trouble removing player #${playerId} from the roster!`, error);
    }
};
const RenderPlayerById = async (id) => {
   console.log(`render single party: ${id}`);
   try {
        const player = await fetchSinglePlayer(id);
       console.log('player Details: ', player);
        if (!id || id.length === 0) {
            playerContainer.innerHTML = "<h3> No players found!</h3>";
            return;
        }
        const playerDetailsElement = document.createElement('div');
        playerDetailsElement.classList.add('player-details');
        playerDetailsElement.innerHTML = `
        <h2>${player.name}</h2>
        <p>${player.breed}</p>
        <p>${player.status}</p>
        <img${player.imageURL} alt="player image"/>
        <button class = "close-button">Close</button>
        `;
        playerContainer.appendChild(playerDetailsElement);

        const closeButton = playerDetailsElement.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            playerDetailsElement.remove();
        });
   }   catch (error) {
    console.error(error);
   }
};
/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (players) => {
    try {
        playerContainer.innerHTML = '';
        players.forEach((player) => {
            const playerElement = document.createElement('div');
            playerElement.classList.add('player');
            playerElement.innerHTML = `
            <h2>${player.name}</h2>
            <p>${player.breed}</p>
            <p>${player.status}</p>
            <p>${player.teamId}</p>
            <img${player.imageURL}" alt ="player image"/>
            <button class="details-button" data-id="${player.id}">See Details</button>
            <button class="Add-button" data-id="${player.id}">Add Player</button>
            <button class="Remove-button" data-id="${player.id}">Remove From Roster</button>
            `;
            playerContainer.appendChild(playerElement);

            // details button
            const detailsButton = playerElement.querySelector('.details-button');
            detailsButton.addEventListener('click', async (event) =>{
                let playerId = event.currentTarget.dataset.id;
                await RenderPlayerById(playerId)
            });
            //remove button 
            const RemoveButton = playerElement.querySelector('.Remove-button');
            RemoveButton.addEventListener('click', async (event) => {
            const playerId = event.target.dataset.id
            await removePlayer(playerId);
            const players = await fetchAllPlayers();
            await renderAllPlayers(players);
            });
        });
    } catch (error) {
        console.error('Uh oh, trouble rendering players!', error);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (error) {
        console.error('Uh oh, trouble rendering the new player form!', error);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
   // renderNewPlayerForm();
}

init();

//trouble pushing