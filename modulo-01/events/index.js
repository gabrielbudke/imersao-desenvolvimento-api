const EventEmitter = require("events");
class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
const eventName = "user:click";

myEmitter.on(eventName, function (click) {
   console.log("um usuário clicou", click);
});

let count = 0;
setInterval(() => {
   myEmitter.emit(eventName, `no ok ${count++}`);
}, 1000);

const stdin = process.openStdin();
stdin.addListener("data", function (value) {
   console.log(`Você digitou: ${value.toString().trim()}`);
});