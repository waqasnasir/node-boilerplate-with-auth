const math = require("./math");
const EventEmitter = require("events");

// node setup
console.log("Hello world from node");

// module section
console.log(math.sum(3, 7));
console.log(math.multiply(3, 7));

// event emitter
const eventEmitter = new EventEmitter();
eventEmitter.on("sendEmail", () => console.log("Email sending process"));
eventEmitter.emit("sendEmail");

// event emitter with class
class Person extends EventEmitter {
  constructor(name) {
    super()
    this.name = name;
  }
  getName () {
    console.log(this.name);
  }
}

const ali = new Person('ali');
const usman = new Person('usman');
ali.on('name', ()=>{
  console.log('my name is '+ ali.name)
})
ali.emit('name');
ali.emit('name');
usman.emit('name')

