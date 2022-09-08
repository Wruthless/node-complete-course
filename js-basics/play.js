
/*
    Look up Primitive and Reference Types
*/


/*
    Look up the way arrow functions affect `this`
*/

// const summarizeUser = (userName, userAge, userHasHobby) => {

// }

// const add = (a,b) => {
//     return a+b;
// }

// const justReturn = (a,b) => a+b;
// const oneArg = a => a + 1;
// const noArgs = () => 1+2;


/* 
    Spread Operator
*/
// const hobbies = ['Sports', 'Cooking'];

// // slice copies an array
// const copiedArray = hobbies.slice();
// console.log(copiedArray);

// // the spread operator copies existing arrays to a new one
// const copiedArray2 = [...hobbies];
// console.log(copiedArray2);

// hobbies.push('Programming');
// console.log(copiedArray);
// console.log(copiedArray2);
// console.log(hobbies);


// /*
//     Rest operator bundles arguments as an array.
//     Good for functions where the number of arguments is variable.
// */
// const toArray = (...args) => {
//     return args;
// }
// console.log(toArray(1,2,3,4));


/*
    Destructuring
*/
const person = {
    name: 'Max',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

// no object destructuring
const printName = (personData) => {
    console.log(personData.name);
}

printName(person);

// object destructuring, specify the name of the property you are
// pulling in from the object.
const printNameDes = ({ name }) => {
    console.log(name);
}

printNameDes(person);

// store values from object in another constant
const { name, age } = person;
console.log(name, age);