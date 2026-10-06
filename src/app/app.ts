import { Component, signal, inject } from '@angular/core';
import { AudioService, AudioTrack } from './services/audio';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // allow math functions inside html template
  protected Math = Math;

  // inject audioservice
  private audioService = inject(AudioService);

  // define list of tracks
  public tracks = signal<AudioTrack[]>([
    {
      id: 'lofi-beat-1',
      name: 'Lofi Relax Beat',
      filePath: 'audio-files/lofi-beats/lofi-relax-beat.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'calming-rain',
      name: 'Calming Rain',
      filePath: 'audio-files/nature-sounds/calming-rain.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'night-ambience',
      name: 'Night Ambience',
      filePath: 'audio-files/nature-sounds/night-ambience.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'relaxing-rain',
      name: 'Relaxing Rain',
      filePath: 'audio-files/nature-sounds/relaxing-rain.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'sea-waves-and-seagulls',
      name: 'Sea waves and Seagulls',
      filePath: 'audio-files/nature-sounds/sea-waves-and-seagulls.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'wind-blowing',
      name: 'Wind Blowing',
      filePath: 'audio-files/nature-sounds/wind-blowing.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'chalkboard',
      name: 'Chalkboard',
      filePath: 'audio-files/office-sounds/chalkboard.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'keyboard-typing',
      name: 'Keyboard Typing',
      filePath: 'audio-files/office-sounds/keyboard-typing.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'office-ambience',
      name: 'Office Ambience',
      filePath: 'audio-files/office-sounds/office-ambience.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'pen-on-paper',
      name: 'Pen on Paper',
      filePath: 'audio-files/office-sounds/pen-on-paper.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    },
    {
      id: 'phone-typing',
      name: 'Phone Typing',
      filePath: 'audio-files/office-sounds/phone-typing.mp3',
      volume: 0.5,
      pan: 0,
      isPlaying: false
    }
  ]);

  // play or pause a track when the play button is clicked
  public onToggleTrack(track: AudioTrack): void {
    this.audioService.togglePlay(track);
    this.tracks.update(currentTracks => [...currentTracks]); // updates UI button from play to pause when the track changes
  }

  // update track volume when the volume slider moves
  public onVolumeChange(track: AudioTrack, event: Event): void {
    const slider = event?.target as HTMLInputElement;
    const newVolume = parseFloat(slider.value);
    this.audioService.setVolume(track, newVolume);
  }

  // update track stereo panning when slider moves
  public onPanChange(track: AudioTrack, event: Event): void {
    const slider = event.target as HTMLInputElement;
    const newPan = parseFloat(slider.value);
    this.audioService.setPan(track, newPan);
  }
}
