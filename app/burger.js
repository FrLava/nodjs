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

//En entrée : [topping: string], [topping: recipe]
//En sortie: string "valid","invalid","running"
export function checkBurger(burger,recipe){
    let flag;
    for(let i=0;i<burger.length;i++){
        if(burger[i]===recipe[i]){
            flag="running";

            if(burger.lenght===recipe.lenght){
                return flag="valid";
            }
        }

        else{
            return flag="invalid";
        }
    }

    return flag;

}

//En entrée : topping, [Tableau de Topping]
//En sortie : string "valid","invalid","running"
export function checkBurger2(topping, recipe){
    let flag;

    //console.log(recipe.tab);
    //console.log(topping);

    if( (topping===recipe.tab[0]) && (recipe.tab.length>=1) ){
        recipe.tab.shift;
        //console.log("ok pas fini");
        //console.log(recipe.tab);
        if(recipe.tab.lenght===0){
            //console.log("fini");
            return "valid";
        }
        return "running";
    }
    else if(topping!==recipe.tab[0]){
        //console.log("pas ok");
        return "invalid";
    }

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
export function getToppings() {
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