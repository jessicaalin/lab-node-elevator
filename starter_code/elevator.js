class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.direction = "up";
    // people who are waiting to be picked up
    this.waitingList= [];
    // current passengers
    this.passengers = [];
    // floors requested
    this.requests   = [];
  }


  // should call update every second with a setInterval
  start() { 
    this.timer = setInterval(() => {
      this.update();
    }, 1000);
  }

  // clears the interval
  stop() {
    clearInterval(this.timer);
  }

  // 
  update() {
    // console.log("test"); // "test" prints every second
    this.log();
    this._passengersEnter();
    this._passengersLeave();
    if (this.direction === "up") {
      this.floorUp();
    }
    else if (this.direction === "down") {
      this.floorDown();
    }
    
    this._checkSwitchDirection();
  }

  _passengersEnter() {
    // forEach to check for each elem in the array
    this.waitingList.forEach((person, index) => {
      // if person's originFloor matches current floor
      if (person.originFloor === this.floor) {
        // adds person to the current passengers
        this.passengers.push(person);
        // adds the floor the requests
        this.requests.push(person.destinationFloor);
        // removes the person from waitingList
        this.waitingList.splice(index, 1);
        console.log(`${person.name} has entered the elevator`);
      }
    });

  }
  _passengersLeave() {
    // forEach to check for each elem in the array
    this.passengers.forEach((passenger, index) => {
      // if person's destinationFloor matches current floor
      if (passenger.destinationFloor === this.floor) {
        // remove person from current passengers
        this.passengers.splice(index, 1);
        console.log(`${passenger.name} has left the elevator`);
      }
    });
  }

  floorUp() {
    if (this.floor < this.MAXFLOOR) {
      this.direction = "up";
      return this.floor += 1;
    }
    // this.floor < this.MAXFLOOR ? this.floor += 1: false;
  }

  floorDown() {
    if (this.floor > 0) {
      this.direction = "down";
      return this.floor -= 1;
    }
    // this.floor > 0 ? this.floor -= 1 : false;
  }

  // requiring a person object and pushing that info is part of iteration 4
  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }

  log() {
    console.log(`
    Direction: ${this.direction} | 
    Floor: ${this.floor} | 
    Waiting List: ${ this.waitingList} | 
    Passengers: ${this.passengers} | 
    Requests: ${this.requests}
    `);
    
  }

  // to switch directions
  _checkSwitchDirection () {
    const requestMax = Math.max(...this.requests);
    const requestMin = Math.min(...this.requests);

    if (( this.direction === "up"   && this.floor > requestMax) ||
        ( this.direction === "down" && this.floor < requestMin)) {
       console.log('change direction!')
       this.direction = this.direction === "up" ? "down" : "up";
    }
  }

}

module.exports = Elevator;

