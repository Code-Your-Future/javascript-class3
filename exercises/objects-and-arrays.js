// 1) create a person object and give it a name property
var person ={firstName:'Arockia', lastName:'Ansi'};


// 2) assign a favourite food property to this person object
person.favouriteFood = 'Pasta';


// 3) how many ways can you access these properties?

document.write(person.favouriteFood +'<br />');
document.write(person['lastName']+'<br />');

// 4) take the farourite food property of your person and add it to a new array
var food =[person.favouriteFood];


// 5) add more foods to this array
food.push('Chilli','pizza','coffee');
document.write(food+'<br />');

// 6) change the person object's favourite food property to be this new array
person.favouriteFood = food;
document.write(person.favouriteFood +'<br />');



// 7) write a function that takes a person as an argument and returns one of their favourite foods.
function favFoodFn(Snowly){
    document.write(Snowly.favouriteFood+'<br />');
}
favFoodFn(person);
// 8) can you turn this object into a two-dimestional array?
var arr = [];
for (var key in person){
    arr.push([key,person[key]]);
}
document.write(arr+'<br />');

// 9) can you turn the two-dimensional array back into an object?

// more? http://eloquentjavascript.net/04_data.html#h_TcUD2vzyMe