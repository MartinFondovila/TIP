import { makeAutoObservable } from "mobx";

class SFXVolumeState {
  constructor() {
    this.sfxVolume = 1.0;
    makeAutoObservable(this);
  }

  setVolume(number) {
    this.musicVolume = number;
  }
}

export const SFX_VOLUME = new SFXVolumeState();
