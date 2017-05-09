import { getRandomRecipe,saveRecipe,getToppings,checkBurger2 } from './burger.js';

let inter;
let randomRecipeList = document.querySelector('.recipe');
let toppingsList = document.querySelector('.toppings');
let buttonStop=document.getElementById('stop');
let buttonStart=document.getElementById('start');
let listOkToppingsAffichage=document.getElementById('toppingOK');
let listOkToppings={
    tab:[]
};
let gameEnCours=false;

//Recupère la liste des ingredients
let listToppings=getToppings()
    .then(toppings=>
        toppings.map(t=>
            `<button class="btn">${t.name}</button>`
        
        ))
    .then(buttons=>buttons.join(''))
    .then(buttons=>toppingsList.innerHTML+=buttons);
    
toppingsList.addEventListener('click', evt => {
    if (evt.target.tagName !== 'BUTTON') return;

    if(!gameEnCours){
        listOkToppings.tab=getListRandomToppings();
        gameEnCours=true;
    }
    
    
    let res = checkBurger2(evt.target.innerText,listOkToppings);

    if(res==="running"){
        console.log("running");
    }

    else if(res==="valid"){
        gameEnCours=false;
        console.log("valid");
    }

    else if(res==="invalid"){
        console.log("invalid");
    }
    
}, false);

//Génère des ingredients aléatoires
function randomRecipe(){
    return function(){
        gameEnCours=false;
        randomRecipeList.innerHTML="";
        getRandomRecipe({ vegan: true })
        .then(topping=>
            topping.map(t=>
                `<li class="liTopping">${t}</li>`
            
        ))
        .then(liens=>liens.join(''))
        .then(liens=>randomRecipeList.innerHTML+=liens);
        
        
        //console.log(listOkToppings);
    }

}


//Bouttons start et stop

buttonStop.addEventListener('click',function(){
    buttonStart.style='visibility:visible';
    this.style='visibility:hidden';
    clearInterval(inter);
},false);


buttonStart.addEventListener('click',function(){
        buttonStop.style='visibility:visible';
        this.style='visibility:hidden';
        randomRecipe()();
        inter=setInterval(randomRecipe(),30000);
    }
,false);

function getListRandomToppings(){
    let list=[];
     if(randomRecipeList.hasChildNodes()){
            for(let i=0;i<randomRecipeList.childNodes.length;i++){
                list.push(randomRecipeList.childNodes[i].innerText);
            }
        }
    return list;
}

// let ulRecipe=document.createElement('ul');
// let bouttonBurger=document.createElement('input');
// bouttonBurger.name="normie";
// bouttonBurger.type="button";
// bouttonBurger.value="Burger";

// let bouttonBurgerVegan=document.createElement('input');
// bouttonBurgerVegan.name="vegan";
// bouttonBurgerVegan.type="button";
// bouttonBurgerVegan.value="Burger Vegan";

// let ButtonAddRecipe=document.createElement('input');
// ButtonAddRecipe.name="addRecipe";
// ButtonAddRecipe.type="button";
// ButtonAddRecipe.value="Ajouter recette";

// let normieRecipe = displayRecipeFactory();
// let veganRecipe = displayRecipeFactory({ vegan: true });

// var tabToppings=[];

// let recipeToAdd;

// function displayRecipeFactory(option){
//     return function (){
//         ulRecipe.innerHTML = "";
//         getRandomRecipe(option)
//             .then(recipe => {
//                 recipe.forEach(toppings => {
//                     let li = document.createElement('li');
//                     let a = document.createElement('a');
//                     a.href="#";
//                     a.innerText = toppings;
//                     li.appendChild(a)
//                     ulRecipe.appendChild(li);
//                 });
//                 document.body.appendChild(ulRecipe);
//                 recipeToAdd = recipe;
//                 console.log(recipeToAdd);
//         })
//     }
// }

// document.body.appendChild(bouttonBurger);
// document.body.appendChild(bouttonBurgerVegan);
// document.body.appendChild(ButtonAddRecipe);

// //let timerNormie=setInterval(normieRecipe,3000);
// //let timerVegan=setInterval(veganRecipe,3000);

// //Listener
// bouttonBurger.addEventListener('click',function(){
//     setInterval(normieRecipe,3000);
//     },false);

// bouttonBurgerVegan.addEventListener('click',function(){
//     setInterval(veganRecipe,3000);
//     },false);

// ButtonAddRecipe.addEventListener('click',function(){
//      saveRecipe(recipeToAdd);
//     },false);