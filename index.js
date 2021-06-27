const Gpio = require('pigpio').Gpio;

const inputPin = new Gpio(17, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
});

inputPin.on('interrupt', (level) => {
    console.log('GPIO 17 interrupted, level now: ' + level);
});