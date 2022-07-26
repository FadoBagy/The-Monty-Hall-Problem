import { pricePicker } from './pricePicker.js';

const startBtnElement = document.getElementById('startMayhem');
const resetBtnElement = document.getElementById('resetMayhem');
const backBtnElement = document.getElementById('backMayhem');
const istructionsElement = document.getElementById('istructionsMayhem');

const doorsFormEl = document.querySelector('#montyMayhem form');
const doorsSectionEl = document.getElementById('mayhemDoors');

const mayhemGameEl = document.getElementById('mayhemGame');
const gameNnavEl = document.getElementById('gameNnav');
const contentEl = document.getElementById('content');

let firstDoorPicked;

export function mayhemGame() {
    startBtnElement.addEventListener('click', (e) => {
        const doorElements = Array.from(document.querySelectorAll('#mayhemDoors div'));

        startBtnElement.disabled = true;
        resetBtnElement.disabled = false;
        istructionsElement.textContent = 'Pick A Door';

        pricePicker();

        for (const door of doorElements) {
            door.addEventListener('click', firstPickHandler);
        }
    });

    resetBtnElement.addEventListener('click', (e) => {
        const doorElements = Array.from(document.querySelectorAll('#mayhemDoors div'));

        startBtnElement.disabled = false;
        resetBtnElement.disabled = true;
        istructionsElement.textContent = 'Pres Start To Begin';

        for (const door of doorElements) {
            door.textContent = '';
            door.removeEventListener('click', firstPickHandler);
            door.removeEventListener('click', secoundPickHandler);
        };
    });

    backBtnElement.addEventListener('click', e => {
        let child = doorsSectionEl.lastElementChild;
        while (child) {
            doorsSectionEl.removeChild(child);
            child = doorsSectionEl.lastElementChild;
        }

        mayhemGameEl.style.display = 'none';
        gameNnavEl.style.display = 'block';
        contentEl.style.display = 'block';

        if (resetBtnElement.disabled == false) {
            resetBtnElement.disabled = true;
            startBtnElement.disabled = false;
        }
    });
}

function firstPickHandler(e) {
    const doorElements = Array.from(document.querySelectorAll('#mayhemDoors div'));

    let index = 0;
    firstDoorPicked = e.currentTarget;

    if (firstDoorPicked.textContent == 1) {
        for (const door of doorElements) {
            door.addEventListener('click', secoundPickHandler);

            if (door != firstDoorPicked && index < doorElements.length - 1) {
                door.querySelector('p').classList.remove('closed');
                door.removeEventListener('click', secoundPickHandler);
            }
            index++;
        }
    } else {
        for (const door of doorElements) {
            door.addEventListener('click', secoundPickHandler);

            if (door != e.currentTarget) {
                if (door.textContent == 0) {
                    door.querySelector('p').classList.remove('closed');
                    door.removeEventListener('click', secoundPickHandler);
                }
            }
        }
    }

    for (const door of doorElements) {
        door.removeEventListener('click', firstPickHandler);
    };
    istructionsElement.textContent = 'Switch Or Stay With Your Door';
};

function secoundPickHandler(e) {
    const doorElements = Array.from(document.querySelectorAll('#mayhemDoors div'));

    if (e.currentTarget.textContent == 1) {
        istructionsElement.textContent = 'Win';

    } else {
        istructionsElement.textContent = 'Lose';
    }

    for (const door of doorElements) {
        door.querySelector('p').classList.remove('closed');
        door.removeEventListener('click', secoundPickHandler);
    }
}

doorsFormEl.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(doorsFormEl);

    if (formData.get('count') >= 10 && formData.get('count') <= 50) {
        mayhemGameEl.style.display = 'block';
        gameNnavEl.style.display = 'none';
        contentEl.style.display = 'none';
        for (let i = 0; i < formData.get('count'); i++) {
            let newDoor = document.createElement('div');
            newDoor.classList.add('door');
            doorsSectionEl.appendChild(newDoor);
        }
        doorsFormEl.reset();
    }
});