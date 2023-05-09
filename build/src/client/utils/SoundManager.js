"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundManager = void 0;
var SoundManager;
(function (SoundManager) {
    let Notes;
    (function (Notes) {
        Notes[Notes["G3"] = 196] = "G3";
        Notes[Notes["A3"] = 220] = "A3";
        Notes[Notes["B3"] = 246.94] = "B3";
        Notes[Notes["C4"] = 261.63] = "C4";
        Notes[Notes["D4"] = 293.66] = "D4";
        Notes[Notes["E4"] = 329.63] = "E4";
        Notes[Notes["F4"] = 349.23] = "F4";
        Notes[Notes["G4"] = 392] = "G4";
        Notes[Notes["A4"] = 440] = "A4";
        Notes[Notes["B4"] = 493.88] = "B4";
        Notes[Notes["C5"] = 523.25] = "C5";
        Notes[Notes["D5"] = 587.33] = "D5";
        Notes[Notes["E5"] = 659.25] = "E5";
        Notes[Notes["F5"] = 698.46] = "F5";
        Notes[Notes["G5"] = 783.99] = "G5";
        Notes[Notes["A5"] = 880] = "A5";
        Notes[Notes["B5"] = 987.77] = "B5";
        Notes[Notes["C6"] = 1046.5] = "C6";
    })(Notes || (Notes = {}));
    function setupGainNode(audioCtx, time, value) {
        time += audioCtx.currentTime;
        const gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(value, time + 0.01);
        return gainNode;
    }
    function setupOscillator(audioCtx, frequency, gainNode) {
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        oscillator.connect(gainNode);
        return oscillator;
    }
    function playSound(audioCtx, frequency, time, len, gainValue = 1) {
        const gainNode = setupGainNode(audioCtx, time, gainValue);
        const oscillator = setupOscillator(audioCtx, frequency, gainNode);
        oscillator.start(time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + len);
        oscillator.stop(time + len);
    }
    function playInContext(cb) {
        if (!window.AudioContext) {
            console.log('This web browser does not support Web Audio API');
            return;
        }
        const audioCtx = new AudioContext();
        audioCtx.resume().then(() => {
            cb(audioCtx);
        });
    }
    function playActivePlayerSound() {
        playInContext((audioCtx) => {
            playSound(audioCtx, Notes.C5, 0, 0.4);
            playSound(audioCtx, Notes.A4, 0.2, 0.4);
        });
    }
    SoundManager.playActivePlayerSound = playActivePlayerSound;
    function newLog() {
        playInContext((audioCtx) => {
            playSound(audioCtx, Notes.G3, 0.02, 0.05, .1);
        });
    }
    SoundManager.newLog = newLog;
})(SoundManager = exports.SoundManager || (exports.SoundManager = {}));
