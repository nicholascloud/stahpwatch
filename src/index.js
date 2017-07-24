#!/usr/bin/env node
'use strict';
const StopWatch = require('timer-stopwatch');
const moment = require('moment');
require('moment-duration-format');
const argv = require('minimist')(process.argv.slice(2));

const usage = function () {
    console.info('usage: stahpwatch [--duration=#seconds]');
};

if (argv.help) {
    usage();
    process.exit(0);
}

let timer;
if (argv.duration) {
    const milliseconds = parseInt(argv.duration, 10) * 1000;
    timer = new StopWatch(milliseconds);
} else {
    timer = new StopWatch();
}

let lastTime;

timer.onTime((time) => {
    if (lastTime) {
        const len = lastTime.length;
        const bs = '\b'.repeat(len);
        process.stdout.write(bs);
    }
    lastTime = moment.duration(time.ms, 'millisecond')
        .format('hh:mm:ss', { trim: false });
    process.stdout.write(lastTime);
});

timer.start();