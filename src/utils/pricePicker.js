const doorElements = Array.from(document.querySelectorAll('#doors_section div'));

const doorMayhemElements = Array.from(document.querySelectorAll('#mayhemDoors div'));


function randomNumberPicker() {
    let randomNum = Math.random();

    if (Math.round(randomNum * 100) <= 33) {
        return 1
    } else if (Math.round(randomNum * 100) > 33 && Math.round(randomNum * 100) <= 66) {
        return 2
    } else if (Math.round(randomNum * 100) > 66) {
        return 3
    }
}

function mayhemRandomNumberPicker() {
    let doorCount = Array.from(document.querySelectorAll('#mayhemDoors div')).length;

    return Math.floor(Math.random() * (doorCount - 1) + 1)
}

export function pricePicker() {
    const priceDoorNumber = randomNumberPicker();
    console.log(priceDoorNumber);
    for (const door of doorElements) {
        if (doorElements.indexOf(door) + 1 == priceDoorNumber) {
            let behindDoor = document.createElement('p');
            behindDoor.classList.add('closed');
            behindDoor.style.backgroundColor = '#91C483';
            behindDoor.textContent = 1;
            door.appendChild(behindDoor);
        } else {
            let behindDoor = document.createElement('p');
            behindDoor.classList.add('closed');
            behindDoor.style.backgroundColor = '#B20600';
            behindDoor.textContent = 0;
            door.appendChild(behindDoor);
        }
    }


    const priceDoorMayhemNumber = mayhemRandomNumberPicker();
    console.log(priceDoorMayhemNumber + ' Mayhem');
    for (const door of Array.from(document.querySelectorAll('#mayhemDoors div'))) {
        if (Array.from(document.querySelectorAll('#mayhemDoors div')).indexOf(door) + 1 == priceDoorMayhemNumber) {
            let behindDoor = document.createElement('p');
            behindDoor.classList.add('closed');
            behindDoor.style.backgroundColor = '#91C483';
            behindDoor.textContent = 1;
            door.appendChild(behindDoor);
        } else {
            let behindDoor = document.createElement('p');
            behindDoor.classList.add('closed');
            behindDoor.style.backgroundColor = '#B20600';
            behindDoor.textContent = 0;
            door.appendChild(behindDoor);
        }
    }

}

export default pricePicker;