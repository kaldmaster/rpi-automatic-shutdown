const Gpio = require('pigpio').Gpio;

const GPIO_PIN = 17;

const inputPin = new Gpio(GPIO_PIN, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
});

inputPin.glitchFilter(500000); // Debounce for 500 ms

inputPin.on('alert', (level, tick) => {
    console.log('GPIO ${GPIO_PIN} interrupted, level now:  ${level}');
});

console.log('Listening for changes on GPIO ${GPIO_PIN}...');