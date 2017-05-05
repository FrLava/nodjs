import { getRandomRecipe,saveRecipe } from './burger.js';

tabBurger: [];
let ulRecipe=document.createElement('ul');
let bouttonBurger=document.createElement('input');
bouttonBurger.name="normie";
bouttonBurger.type="button";
bouttonBurger.value="Burger";

let bouttonBurgerVegan=document.createElement('input');
bouttonBurgerVegan.name="vegan";
bouttonBurgerVegan.type="button";
bouttonBurgerVegan.value="Burger Vegan";

let ButtonAddRecipe=document.createElement('input');
ButtonAddRecipe.name="addRecipe";
ButtonAddRecipe.type="button";
ButtonAddRecipe.value="Ajouter recette";

let normieRecipe = displayRecipeFactory();
let veganRecipe = displayRecipeFactory({ vegan: true });

var tabToppings=[];

let recipeToAdd;

function displayRecipeFactory(option){
    return function (){
        let type=this.name;
        ulRecipe.innerHTML = "";
        getRandomRecipe(option)
            .then(recipe => {
                recipe.forEach(toppings => {
                    let li = document.createElement('li');
                    let a = document.createElement('a');
                    a.href="#";
                    a.innerText = toppings;
                    li.appendChild(a)
                    ulRecipe.appendChild(li);
                });
                document.body.appendChild(ulRecipe);
                recipeToAdd = recipe;
                console.log(recipeToAdd);
        })
    }
}

document.body.appendChild(bouttonBurger);
document.body.appendChild(bouttonBurgerVegan);
document.body.appendChild(ButtonAddRecipe);

//Listener
bouttonBurger.addEventListener('click',normieRecipe,false);
bouttonBurgerVegan.addEventListener('click',veganRecipe,false);
ButtonAddRecipe.addEventListener('click',function(){
     saveRecipe(recipeToAdd);
    },false);