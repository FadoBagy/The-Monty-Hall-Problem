import { pricePicker } from './pricePicker.js';

const startBtnElement = document.getElementById('startBtn');
const resetBtnElement = document.getElementById('resetBtn');
const doorElements = Array.from(document.querySelectorAll('#doors_section div'));
const istructionsElement = document.getElementById('istructions');
const resetStatsBtnEl = document.getElementById('resetStats');

let games = 0;
let switchedGames = 0;
let stayedGames = 0;
let wins = 0;
let loses = 0;
let winsSwitch = 0;
let winsStayed = 0;
let losesSwitch = 0;
let switchWR = 0;
let stayWR = 0;

let firstDoorPicked;
let didSwitch;

startBtnElement.addEventListener('click', (e) => {
    startBtnElement.disabled = true;
    resetBtnElement.disabled = false;
    istructionsElement.textContent = 'Pick A Door';

    pricePicker();

    for (const door of doorElements) {
        door.addEventListener('click', firstPickHandler);
    }
});

resetBtnElement.addEventListener('click', (e) => {
    startBtnElement.disabled = false;
    resetBtnElement.disabled = true;
    istructionsElement.textContent = 'Pres Start To Begin';

    for (const door of doorElements) {
        door.textContent = '';
        door.removeEventListener('click', firstPickHandler);
        door.removeEventListener('click', secoundPickHandler);
    };
});

function firstPickHandler(e) {
    let opened = false;
    firstDoorPicked = e.currentTarget;
    for (const door of doorElements) {
        door.addEventListener('click', secoundPickHandler);
        if (door != e.currentTarget) {
            if (door.textContent == 0 && opened == false) {
                door.querySelector('p').classList.remove('closed');
                door.removeEventListener('click', secoundPickHandler);
                opened = true;
            }
        }
    }
    for (const door of doorElements) {
        door.removeEventListener('click', firstPickHandler);
    };
    istructionsElement.textContent = 'Switch Or Stay With Your Door';
};

function secoundPickHandler(e) {
    if (e.currentTarget == firstDoorPicked) {
        didSwitch = false;
        stayedGames++;
    } else {
        didSwitch = true;
        switchedGames++;
    }

    games++;
    document.getElementById('games').innerHTML = `<i class="fa-solid fa-door-open"></i>Total Games: ${games}`;
    if (e.currentTarget.textContent == 1) {
        istructionsElement.textContent = 'Win';

        if (didSwitch) {
            winsSwitch++;
            document.getElementById('winsSwitch').innerHTML = `<i class="fa-solid fa-repeat"></i>Wins With Switch: ${winsSwitch}`;
        } else {
            winsStayed++;
        }
        wins++;
        document.getElementById('wins').innerHTML = `<i class="fa-solid fa-check"></i>Overall Wins: ${wins}`;

    } else {
        istructionsElement.textContent = 'Lose';

        if (didSwitch) {
            losesSwitch++;
            document.getElementById('losesSwitch').innerHTML = `<i class="fa-solid fa-repeat"></i>Loses With Switch: ${losesSwitch}`;
        }
        loses++;
        document.getElementById('loses').innerHTML = `<i class="fa-solid fa-x"></i>Overall Loses: ${loses}`;
    }

    if (didSwitch) {
        switchWR = winsSwitch / switchedGames;

        document.getElementById('switchWR').innerHTML = `<i class="fa-solid fa-person-walking-arrow-loop-left"></i>Switch Win Rate: ${(switchWR * 100).toFixed(2)}%`;
    } else {
        stayWR = winsStayed / stayedGames;

        document.getElementById('stayWR').innerHTML = `<i class="fa-solid fa-chair"></i>Stay Win Rate: ${(stayWR * 100).toFixed(2)}%`;
    }

    for (const door of doorElements) {
        door.querySelector('p').classList.remove('closed');
        door.removeEventListener('click', secoundPickHandler);
    }

    if (games > 0) {
        resetStatsBtnEl.disabled = false;
    }
}

resetStatsBtnEl.addEventListener('click', e => {
    games = 0;
    switchedGames = 0;
    stayedGames = 0;
    wins = 0;
    loses = 0;
    winsSwitch = 0;
    winsStayed = 0;
    losesSwitch = 0;
    switchWR = 0;
    stayWR = 0;

    document.getElementById('games').innerHTML = `<i class="fa-solid fa-door-open"></i>Total Games`;
    document.getElementById('wins').innerHTML = `<i class="fa-solid fa-check"></i>Overall Wins`;
    document.getElementById('loses').innerHTML = `<i class="fa-solid fa-x"></i>Overall Loses`;
    document.getElementById('winsSwitch').innerHTML = `<i class="fa-solid fa-repeat"></i>Wins With Switch`;
    document.getElementById('losesSwitch').innerHTML = `<i class="fa-solid fa-repeat"></i>Loses With Switch`;
    document.getElementById('switchWR').innerHTML = `<i class="fa-solid fa-person-walking-arrow-loop-left"></i>Switch Win Rate`;
    document.getElementById('stayWR').innerHTML = `<i class="fa-solid fa-chair"></i>Stay Win Rate`;

    resetStatsBtnEl.disabled = true;
});