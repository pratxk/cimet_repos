interface getPokemonData{
    name: string
    imageUrl: string
    type: string
    base_exp: number
}



let pokeData :getPokemonData[] = [];
let mainContainer = document.getElementById('main-container') as HTMLElement;
let loadBtn = document.getElementById('loadBtn') as HTMLButtonElement;
let typeSelector = document.getElementById('pokemon-type') as HTMLSelectElement;
let count = 20;
let typesArray:string[] = [];
let pokeInput = document.getElementById('pokeName-search') as HTMLInputElement;



typeSelector.addEventListener('change',(e)=>{
    if(e.target instanceof HTMLSelectElement){
        let selectedVal = e.target.value;
        filteredArray(pokeData,selectedVal);
    }
    
})


pokeInput.addEventListener('input',(e)=>{
    if(e.target instanceof HTMLInputElement){
        let inputVal:string = e.target.value;
        // console.log(inputVal);
        filterBySearch(pokeData,inputVal);
    }
   
})




loadBtn.addEventListener('click',()=>{
    count += 20;
    pokeData = [];
    getPokemonData(count);
})


async function getPokemonData(count: number): Promise<void> {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=0`);
    let data = await res.json();
    // console.log(data.results);

    const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon:  { name: string; url: string }) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
        })
    );

    const rectifiedDetails = pokemonDetails.map((pokemonData) => {
        // console.log(pokemonData);
        return {
            "name": pokemonData.name,
            "imageUrl": pokemonData.sprites.other.dream_world.front_default,
            "type": pokemonData.types[0].type.name,
            "base_exp" : pokemonData.base_experience
        }
    })
    // console.log(rectifiedDetails);

    for(let i =0; i<rectifiedDetails.length;i++){
        if(!typesArray.includes(rectifiedDetails[i].type)){
            typesArray.push(rectifiedDetails[i].type)
        }
    }

    pokeData.push(...rectifiedDetails);
    console.log(typesArray);
    console.log(pokeData)
    displayData(pokeData);
    displayFilter(typesArray);
}

async function displayData(arr: getPokemonData[]) {
    mainContainer.innerHTML = '';
    arr.forEach(async (element) => {
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
    });
}


function displayFilter(arr: string[]){
    typeSelector.innerHTML = '';
    arr.forEach((ele)=>{
        let optionTag = document.createElement('option') as HTMLOptionElement;
        optionTag.value = ele;
        optionTag.innerText = ele;
        typeSelector.append(optionTag);
    })
}

function filteredArray(arr: getPokemonData[],selectedOption: string){
    const filteredArray = arr.filter((ele) =>
     ele.type === selectedOption
    )
    console.log(filteredArray)
    displayData(filteredArray);
}


function filterBySearch(arr: getPokemonData[],inputOption:string){
    const filteredArray = arr.filter((ele) =>   
     ele.name.includes(inputOption) 
    )
    console.log(filteredArray)
    displayData(filteredArray);
}




getPokemonData(count);


