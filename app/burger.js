import { get } from './http.js';

let tabToppingsCache;

function getToppings(promise, type){
    return promise.then(toppings=>{
        tabToppingsCache=toppings;
        console.log(type);
        return tabToppingsCache;
    }).then(toppings => toppings.map( t => t.name ))
        .then(toppings => {
            let nbToppings=Math.floor(Math.random()*4)+3;
            let tabRecipe=[];

            for(let i=0;i<nbToppings;i++){
                let indiceTopping=Math.floor(Math.random()*toppings.length-1)+1;

                if(checkDoublon(toppings[indiceTopping],tabRecipe)){
                    tabRecipe.push(toppings[indiceTopping]);
                }else{
                    i--;
                }
            }
            return tabRecipe;
        });
}



export function getRandomRecipe(type){
    
    if(!tabToppingsCache){
        return getToppings(get('http://10.1.0.148:3000/toppings'), type);
        
    }
    else{
        return getToppings(Promise.resolve(tabToppingsCache), type);
    }
}

//compare topping to tab[i]; return false si topping est en doublon
function checkDoublon(topping,tab){
    let a=0;
    for(let i=0;i<tab.length;i++){
        if(tab[i]===topping){
            a++;
        }
    }
    if(a>1){
        return false;
    }else{
        return true;
    }
}