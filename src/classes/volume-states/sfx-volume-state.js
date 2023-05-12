import { makeAutoObservable } from "mobx";

class SFXVolumeState {
  constructor() {
    this.sfxVolume = 1.0;
    makeAutoObservable(this);
  }

  setVolume(number) {
    this.sfxVolume = number;
  }
}

export const SFX_VOLUME = new SFXVolumeState();
