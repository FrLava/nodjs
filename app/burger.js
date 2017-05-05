import { get, post } from './http';

export function getRandomRecipe(options = {}) {
    return getToppings()
    .then(filterToppings(options))
    .then(toStringToppings)
    .then(doubleToppings)  
    .then(buildRandomRecipe);
}

export function saveRecipe(recipe) {
    console.log('coucou',recipe);
    return post('http://localhost:3000/recipes', recipe);
}

function filterToppings(options) {
    return function(toppings) {
        return toppings.filter(topping => 
            Object.keys(options)
            .filter(opt => options[opt])
            .every(opt => topping[opt])
         )
    }
}

// en entrée : [{ id: number, name: string, vegan: true }, 
//    { id: number, name: string, vegan: false }]
// en sortie : [{ id: number, name: string, vegan: true }]
function filterVeganToppings(toppings) {
    return toppings.filter(t => t.vegan);
}

// en entrée : [{ id: number, name: string }]
// en sortie : [name]
function toStringToppings(toppings) {
    return toppings.map(topping => topping.name);
}


// en entrée : [topping]
// en sortie : [topping, topping]
function doubleToppings(toppings) {
    return [...toppings, ...toppings];
}

let toppingsCache;
function getToppings() {
    return toppingsCache
        ? Promise.resolve(toppingsCache)
        : get('http://localhost:3000/toppings')
            .then(toppings => {
                toppingsCache = toppings;
                return toppingsCache;
            });
}

// en entrée [topping, ...]
// en sortie recette ([topping1, topping2, ...])
function getRandomNbToppings(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function buildRandomRecipe(doubleToppings) {
    let nbToppings = getRandomNbToppings(3, 6);
    let recipe = [];

    for (let i = 0; i < nbToppings; i++) {
        let j = Math.floor(Math.random() * doubleToppings.length);
        let randomTopping = doubleToppings.splice(j, 1);
        recipe.push(randomTopping[0]); 
    }
    return recipe;
}