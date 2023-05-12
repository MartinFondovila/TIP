import { makeAutoObservable } from "mobx";

class MusicVolumeState {
  constructor() {
    this.musicVolume = 1.0;
    makeAutoObservable(this);
  }

  setVolume(number) {
    this.musicVolume = number;
  }
}

export const MUSIC_VOLUME = new MusicVolumeState();
