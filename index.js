const Gpio = require('pigpio').Gpio;

let GPIO_PIN = 25;
let DEBOUNCE_TIME_MS = 300000; // Debounce for 300 ms (max)

const inputPin = new Gpio(GPIO_PIN, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    alert: true
});

// Define child process and execute method
var exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, function(error, stdout, stderr){ callback(stdout, stderr); });
}

function shutdown() {
    console.log('Shutting down...');
    execute('sudo shutdown -r now', function(callback, error) {
        console.log(callback);
        if (error) {
            console.error(error);
        }
    });
}

// Check current state of power
let currentLevel = inputPin.digitalRead();
console.log(`GPIO ${GPIO_PIN} startup level:  ${currentLevel}`);
if (currentLevel) {
    shutdown();
}
else {
    // Trigger on changes
    inputPin.glitchFilter(DEBOUNCE_TIME_MS); 
    inputPin.on('alert', (level, tick) => {
        console.log(`GPIO ${GPIO_PIN}, level now:  ${level}`);
        if (!level) {
            shutdown();
        }
    });

    console.log(`Listening for changes on GPIO ${GPIO_PIN}...`);
}