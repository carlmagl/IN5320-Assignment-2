async function getPopulation(country) {
    let response = await fetch (`https://d6wn6bmjj722w.population.io/1.0/population/${country}/today-and-tomorrow/`);
    let data = await response.json();
    return data;
}
getPopulation('Norway').then(data => console.log(data));

let allCountries = [];


async function getAllCountries() {
    let response = await fetch ('https://d6wn6bmjj722w.population.io/1.0/countries/');
    let test = await response.json();
    return test;
}
getAllCountries().then(test => {
    allCountries = test.countries;
});


var names = [];
if(localStorage.getItem("names")){
    names = JSON.parse(localStorage.getItem("names"));
};

if(names.length > 0){
    names.forEach(element => {
        createListElement(element);
    });
}

function addListElement(){
    let input = document.getElementById("input").value;
    
    if(allCountries.includes(input)){
        if(input != '' || !names.includes(input)){
            createListElement(input);
            names.push(input);
            localStorage.setItem("names", JSON.stringify(names));
            console.log(localStorage);
        }else{
            alert(input + " already exist");
        }
    }else{
        alert(input + " is not a country");
    }
    document.getElementById("input").value = '';
}

function removeListElement(name){
    document.getElementById(name).remove();
    names = names.filter(e => e !== name);
    console.log(names)
    console.log("Removed" + name)
    localStorage.setItem("names", JSON.stringify(names));
}

function doesElementStartWith(element, searchWord){
    if(element.startsWith(searchWord)) return true;
    return false;
}

function search(){
    let searchWord = document.getElementById('search').value;
    console.log(searchWord);
    let filtered = names.filter(country => doesElementStartWith(country, searchWord))
    ul = document.getElementById("list");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        if(filtered.includes(li[i].id)){
            li[i].style.display = "";
        }else{
            li[i].style.display = "none";
        }
    }
}


function createListElement(countryName){
    let li = document.createElement('li');
    li.className="country"
    let liste = document.getElementById("list");
    let button = document.createElement("button");
    let p = document.createElement("p");
    let populationNumber = document.createElement("p");
    populationNumber.id = "population" + countryName;
    populationNumber.innerHTML = "NaN"
    li.id = countryName;
    p.innerHTML = countryName;
    button.innerHTML = "Remove";
    button.setAttribute("onclick","removeListElement(this.id)");
    button.id = countryName;
    li.appendChild(p);
    li.appendChild(populationNumber);
    li.appendChild(button);
    liste.appendChild(li);
}


function findPopulation(){
    names.forEach(country => {
        getPopulation(country).then(data => {
            li = document.getElementById("population" + country);
            li.innerHTML = data.total_population[1].population;
        })
    })
}

setInterval(findPopulation, 1000);