"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let pokeData = [];
let mainContainer = document.getElementById('main-container');
let loadBtn = document.getElementById('loadBtn');
let typeSelector = document.getElementById('pokemon-type');
let count = 20;
let typesArray = [];
let pokeInput = document.getElementById('pokeName-search');
typeSelector.addEventListener('change', (e) => {
    if (e.target instanceof HTMLSelectElement) {
        let selectedVal = e.target.value;
        filteredArray(pokeData, selectedVal);
    }
});
pokeInput.addEventListener('input', (e) => {
    if (e.target instanceof HTMLInputElement) {
        let inputVal = e.target.value;
        filterBySearch(pokeData, inputVal);
    }
});
loadBtn.addEventListener('click', () => {
    count += 20;
    pokeData = [];
    getPokemonData(count);
});
function getPokemonData(count) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=0`);
        let data = yield res.json();
        // console.log(data.results);
        const pokemonDetails = yield Promise.all(data.results.map((pokemon) => __awaiter(this, void 0, void 0, function* () {
            const detailResponse = yield fetch(pokemon.url);
            return yield detailResponse.json();
        })));
        const rectifiedDetails = pokemonDetails.map((pokemonData) => {
            // console.log(pokemonData);
            return {
                "name": pokemonData.name,
                "imageUrl": pokemonData.sprites.other.dream_world.front_default,
                "type": pokemonData.types[0].type.name,
                "base_exp": pokemonData.base_experience
            };
        });
        // console.log(rectifiedDetails);
        for (let i = 0; i < rectifiedDetails.length; i++) {
            if (!typesArray.includes(rectifiedDetails[i].type)) {
                typesArray.push(rectifiedDetails[i].type);
            }
        }
        pokeData.push(...rectifiedDetails);
        console.log(typesArray);
        console.log(pokeData);
        displayData(pokeData);
        displayFilter(typesArray);
    });
}
function displayData(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        mainContainer.innerHTML = '';
        arr.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            let div1 = document.createElement('div');
            div1.setAttribute('class', 'flip-card');
            let div2 = document.createElement('div');
            div2.setAttribute('class', 'flip-card-inner');
            let div3 = document.createElement('div');
            div3.setAttribute('class', 'flip-card-front');
            let imgChar = document.createElement('img');
            imgChar.alt = "avatar";
            imgChar.src = element.imageUrl;
            let nameLabel = document.createElement('h2');
            nameLabel.innerText = element.name.charAt(0).toUpperCase() + element.name.slice(1);
            div3.append(imgChar, nameLabel); // Append image and name
            let div4 = document.createElement('div');
            div4.setAttribute('class', 'flip-card-back');
            let h1 = document.createElement('h2');
            h1.innerText = element.name.charAt(0).toUpperCase() + element.name.slice(1); // Capitalize first letter
            let p1 = document.createElement('p');
            p1.innerText = element.type;
            let p2 = document.createElement('p');
            p2.innerText = `Base Experience: ${element.base_exp}`; // Make it more descriptive
            div4.append(h1, p1, p2);
            div2.append(div3, div4);
            div1.appendChild(div2);
            mainContainer.append(div1);
        }));
    });
}
function displayFilter(arr) {
    typeSelector.innerHTML = '';
    arr.forEach((ele) => {
        let optionTag = document.createElement('option');
        optionTag.value = ele;
        optionTag.innerText = ele;
        typeSelector.append(optionTag);
    });
}
function filteredArray(arr, selectedOption) {
    const filteredArray = arr.filter((ele) => ele.type === selectedOption);
    console.log(filteredArray);
    displayData(filteredArray);
}
function filterBySearch(arr, inputOption) {
    const filteredArray = arr.filter((ele) => ele.name.includes(inputOption));
    console.log(filteredArray);
    displayData(filteredArray);
}
getPokemonData(count);
