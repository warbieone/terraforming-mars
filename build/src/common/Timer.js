"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = exports.Clock = void 0;
class Clock {
    now() {
        return Date.now();
    }
}
exports.Clock = Clock;
const REAL_CLOCK = new Clock();
class Timer {
    constructor(clock) {
        this.clock = clock;
        this.sumElapsed = 0;
        this.startedAt = 0;
        this.running = false;
        this.afterFirstAction = false;
    }
    static newInstance(clock = REAL_CLOCK) {
        return new Timer(clock);
    }
    serialize() {
        return {
            sumElapsed: this.sumElapsed,
            startedAt: this.startedAt,
            running: this.running,
            afterFirstAction: this.afterFirstAction,
            lastStoppedAt: Timer.lastStoppedAt,
        };
    }
    static deserialize(d) {
        const timer = new Timer(REAL_CLOCK);
        timer.sumElapsed = d.sumElapsed;
        timer.startedAt = d.startedAt;
        timer.running = d.running;
        timer.afterFirstAction = d.afterFirstAction;
        Timer.lastStoppedAt = d.lastStoppedAt;
        return timer;
    }
    start() {
        this.running = true;
        this.startedAt = Timer.lastStoppedAt === 0 ? this.clock.now() : Timer.lastStoppedAt;
    }
    stop() {
        this.running = false;
        Timer.lastStoppedAt = this.clock.now();
        if (!this.afterFirstAction) {
            this.afterFirstAction = true;
            return;
        }
        this.sumElapsed += Timer.lastStoppedAt - this.startedAt;
    }
    getElapsed() {
        return this.sumElapsed + (this.running ? this.clock.now() - this.startedAt : 0);
    }
    getElapsedTimeInMinutes() {
        const elapsedTimeInMin = this.getElapsed() / (60 * 1000);
        return elapsedTimeInMin;
    }
    static toString(d, clock = REAL_CLOCK) {
        const elapsed = d.sumElapsed + (d.running ? clock.now() - d.startedAt : 0);
        const elapsedDate = new Date(elapsed);
        const hours = elapsedDate.getUTCHours() + (elapsedDate.getUTCDate() - 1) * 24;
        if (hours > 0) {
            return String(hours) + elapsedDate.toISOString().substr(13, 6);
        }
        return elapsedDate.toISOString().substr(14, 5);
    }
}
exports.Timer = Timer;
Timer.lastStoppedAt = 0;
