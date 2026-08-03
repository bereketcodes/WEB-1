import {add , subtract , divide} from './modules/calc.js';
// import *as calc from './modules/calc.js';   
import User , {printAge,printName , x} from './modules/User.js';


console.log(x);
console.log(add(2, 3));
console.log(divide(2, 3)); 
console.log(subtract(5, 7));

// console.log(calc.multiply(2, 3));
// console.log(calc.divide(2, 3));


const user1 = new User("beki", 20);
printName(user1);
printAge( user1 );

