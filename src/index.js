const url = 'http://localhost:3000/pups';
const dogNav = document.getElementById('dog-bar');
const dogInfoDiv = document.getElementById('dog-info');
let dogImg = document.createElement('img');
let dogH2 = document.createElement('h2');
let dogButton = document.createElement('button');
const filterButton = document.getElementById('good-dog-filter');
let allDogs;

function renderDogNav(dog) {
    let dogDiv = document.createElement('span');
    dogDiv.textContent = dog.name;
    dogDiv.style.border = '1px solid blue';
    dogDiv.style.borderRadius = '20px';
    dogNav.appendChild(dogDiv);
    
    dogDiv.addEventListener('click', () => {
        currDog = dog
        dogImg.src = dog.image;
        dogH2.textContent = dog.name;
        dogButton.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";

        dogInfoDiv.appendChild(dogImg);
        dogInfoDiv.appendChild(dogH2);
        dogInfoDiv.appendChild(dogButton);

    })
}

dogButton.addEventListener('click', () => {
    if (dogButton.textContent === 'Good Dog!') {
        patchGoodBad(false, currDog.id);
    } else if (dogButton.textContent === 'Bad Dog!') {
        patchGoodBad(true, currDog.id);
    }

})

function patchGoodBad(bool, id) {
    let obj = {
        isGoodDog: bool
    }
    fetch(`${url}/${id}`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    })
}

// function clearNav() {
//     dogNav.innerHTML = '';
// }

// filterButton.addEventListener('click', () => {

//     if (filterButton.textContent === 'Filter good dogs: OFF') {
//         filterButton.textContent = 'Filter good dogs: ON';
//         let filteredGoodDogs = allDogs.filter(dog => dog.isGoodDog === true);
//         clearNav();
//         renderDogNav(filteredGoodDogs);
        
//     } else if (filterButton.textContent === 'Filter good dogs: ON') {
//         filterButton.textContent = 'Filter good dogs: OFF';
//         clearNav();
//         renderDogNav(allDogs);
//     }
// })



fetch(url)
.then(resp => resp.json())
.then(data => {

    


    data.forEach(dog => {
        renderDogNav(dog);
    });
    console.log(data)
    let currDog; 
    allDogs = data;
})