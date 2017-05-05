import { version } from './module.js';
import { getRandomRecipe } from './burger.js';
import { get } from './http.js';



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


var tabToppings=[];

console.log(tabToppings);

function showListe(){
    let type=this.name;
    ulRecipe.innerHTML = "";
    getRandomRecipe(type)
        .then(recipe => {
            recipe.forEach(toppings => {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.href="#";
                a.innerText = toppings;
                li.appendChild(a)
                ulRecipe.appendChild(li);
            });
            document.body.appendChild(ulRecipe)
    })
}

document.body.appendChild(bouttonBurger);
document.body.appendChild(bouttonBurgerVegan);

//Listener
bouttonBurger.addEventListener('click',showListe,false);
bouttonBurgerVegan.addEventListener('click',showListe,false);