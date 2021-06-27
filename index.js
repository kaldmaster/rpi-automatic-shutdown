const Gpio = require('pigpio').Gpio;

let GPIO_PIN = 17;
let DEBOUNCE_TIME_MS = 300000; // Debounce for 300 ms (max)

const inputPin = new Gpio(GPIO_PIN, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
});

//inputPin.glitchFilter(DEBOUNCE_TIME_MS); 

inputPin.on('alert', (level, tick) => {
    console.log('GPIO ${GPIO_PIN} interrupted, level now:  ${level}');
});

console.log('Listening for changes on GPIO ${GPIO_PIN}...');