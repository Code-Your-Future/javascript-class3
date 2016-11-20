# Objects and Arrays

## Objects

```javascript
var theo = { firstname: 'Theo', surname: 'Leanse' };

theo.firstname;
=> 'Theo'

theo['surname'];
=> 'Leanse'

theo.age = 28;
theo.siblingCount = 8;
theo.favouriteFilm = 'The Godfather Part I';

for (var property in theo) {
	console.log(property + " is " + theo[property])
}
=> 'firstname is Theo'
=> 'surname is Leanse'
=> 'age is 28'
=> 'siblingCount is 8'
=> 'favouriteFilm is The Godfather Part I'

theo.fullname = theo.firstname + ' ' + theo.surname;
delete theo.firstname;
delete theo.surname;

for (var property in theo) {
	console.log(property + " is " + theo[property])
}
=> 'age is 28'
=> 'siblingCount is 8'
=> 'favouriteFilm is The Godfather part I'
=> 'fullname is Theo Leanse'

theo.speak = function (whatToSay) {
	console.log('Hi, I\'m ' + this.fullname + '. ' + whatToSay);
}

theo.speak('Nice to meet you!')
=> 'Hi, I\'m Theo Leanse. Nice to meet you!'

// also...

typeof console;
=> 'object'

{} === {};
=> false
```

## Arrays

```javascript
var bestFilmsEver = ['The Godfather Part I', 'The Godfather Part II'];

bestFilmsEver[1];
=> 'The Godfather Part II'

bestFilmsEver.length;
=> 2

bestFilmsEver.indexOf('Total Recall');
=> -1

bestFilmsEver.push('Total Recall');
bestFilmsEver.length;
=> 3

bestFilmsEver.indexOf('Total Recall');
=> 2

for (var i = 0; i < bestFilmsEver.length; i++) {
	console.log(bestFilmsEver[i] + ' is really good');
}
=> 'The Godfather Part I is really good'
=> 'The Godfather Part II is really good'
=> 'Total Recall is really good'

console.log('The best films ever are ' + bestFilmsEver.join(', '));
=> 'The best films ever are The Godfather Part I, The Godfather Part II, Total Recall'
```
