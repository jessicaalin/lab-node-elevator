const Elevator = require('./elevator.js');
const Person = require('./person.js');

let jess  = new Person("Jess",  0, 8);
let sandra = new Person("Sandra", 2, 5);
let louis  = new Person("Louis",  5, 1);

let elevator = new Elevator();

elevator.start();

elevator.call(jess);
elevator.call(sandra);
elevator.call(louis);