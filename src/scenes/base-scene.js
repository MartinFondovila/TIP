import * as Phaser from "phaser";
import { SHARED_CONF } from "../utils.js";
import { SFX_VOLUME } from "../classes/volume-states/sfx-volume-state.js";
import { MUSIC_VOLUME } from "../classes/volume-states/music-volume-state.js";
import { reaction } from "mobx";

class BaseScene extends Phaser.Scene {
  constructor(sceneName) {
    if (new.target === BaseScene) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }
    super(sceneName);

    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.inputPointerEvents = Phaser.Input.Events;
    this.sceneEvents = Phaser.Scenes.Events;
    this.animationEvents = Phaser.Animations.Events;
    this.inputKeyboard = Phaser.Input.Keyboard;
    this.inputKeyboardEvents = Phaser.Input.Keyboard.Events;
    this.loaderEvents = Phaser.Loader.Events;
    this.camerasEvents = Phaser.Cameras.Scene2D.Events;

    this.musicThemes = [];
    this.sfxSounds = [];
    this.keyName = sceneName;

    this.conf = SHARED_CONF;
  }

  createVolumeUpdaters() {
    this.musicVolumeUpdater = reaction(
      () => {
        return MUSIC_VOLUME.musicVolume;
      },
      (musicVolume) => {
        this.updateMusicVolume(musicVolume);
      }
    );

    this.sfxVolumeUpdater = reaction(
      () => SFX_VOLUME.sfxVolume,
      (sfxVolume) => {
        this.updateSFXVolume(sfxVolume);
      }
    );

    this.updateMusicVolume(MUSIC_VOLUME.musicVolume);
    this.updateSFXVolume(SFX_VOLUME.sfxVolume);
  }

  updateMusicVolume(musicVolume) {
    this.musicThemes.forEach((music) => {
      music.setVolume(musicVolume);
    });
  }

  updateSFXVolume(sfxVolume) {
    this.sfxSounds.forEach((sfxSound) => {
      sfxSound.setVolume(sfxVolume);
    });
  }

  createBackground() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
  }
}

export default BaseScene;
