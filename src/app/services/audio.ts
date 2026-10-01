import { Injectable, Service } from '@angular/core';

// structure of a single audio track
export interface AudioTrack {
    id: string;
    name: string;
    filePath: string;
    audioElement?: HTMLAudioElement; // '?' means the values are optional, since at first there's no file loaded yet
    gainNode?: GainNode;
    pannerNode?: StereoPannerNode;
    volume: number;
    pan: number;
    isPlaying: boolean;
}

@Injectable({
    providedIn: 'root', // create a single shared instance of audioservice in the entire website
})
export class AudioService {
    private audioContext!: AudioContext; // '!' means that audiocontext cannot be null

    // initialize web audio context
    public initAudio(): void {
        if (!this.audioContext) {
            const AudioCtx = window.AudioContext;
            this.audioContext = new AudioCtx();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // load and setup audio track
    public setupTrack(track: AudioTrack): void {
        this.initAudio();

        // create html audio element for looping track
        const audioElement = new Audio(track.filePath);
        audioElement.loop = true;
        audioElement.crossOrigin = 'anonymous';

        // connect html audio to web audio api nodes
        const sourceNode = this.audioContext.createMediaElementSource(audioElement);
        const gainNode = this.audioContext.createGain();
        const pannerNode = this.audioContext.createStereoPanner();
        
        // initial values
        gainNode.gain.value = track.volume;
        pannerNode.pan.value = track.pan;

        // connect nodes in sequence
        sourceNode.connect(gainNode); // sourcenode connected to gainnode -> volume
        gainNode.connect(pannerNode); // gainnode connected to pannernode -> stereo balance
        pannerNode.connect(this.audioContext.destination); // pannernode connected to destination -> physical speakers 

        // save references into track object
        track.audioElement = audioElement;
        track.gainNode = gainNode;
        track.pannerNode = pannerNode;
    }

    // play or pause a track
    public togglePlay(track: AudioTrack): void {
        if (!track.audioElement) {
            this.setupTrack(track);
        }

        if (track.isPlaying) {
            track.audioElement?.pause();
            track.isPlaying = false;
        } else {
            this.audioContext.resume().then(() => {
                track.audioElement?.play();
                track.isPlaying = true;
            });
        }
    }

    // update track volume
    public setVolume(track: AudioTrack, newVolume: number): void {
        track.volume = newVolume;
        if (track.gainNode) {
            track.gainNode.gain.value = newVolume;
        }
    }

    // update track left/right pan
    public setPan(track: AudioTrack, newPan: number): void {
        track.pan = newPan;
        if (track.pannerNode) {
            track.pannerNode.pan.value = newPan;
        }
    }
}