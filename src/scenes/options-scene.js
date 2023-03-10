import BaseMenuScene from "./base-menu-scene";
import { MenuOption } from "../classes/menu-option.js";
import { VolumeControl } from "../classes/volume-controls.js";
import { MUSIC_VOLUME } from "../classes/music-volume-state.js";
import { SFX_VOLUME } from "../classes/sfx-volume-state.js";

class OptionsScene extends BaseMenuScene {
  constructor() {
    super("OptionsScene");
    this.options;
    this.selectedOption;
  }

  create() {
    super.createVolumeUpdaters();
    this.createAudios();
    this.createOptions();
    this.createControls();
    this.setDefaultOption();
  }

  // ARREGLAR EL TEMA OPCIONES JERARQUIA / HERENCIA
  update() {
    if (this.inputKeyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (this.inputKeyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (this.inputKeyboard.JustDown(this.controls.select)) {
      this.handleSelectOnOption();
    } else if (this.inputKeyboard.JustDown(this.controls.back)) {
      this.handleBack();
    }

    this.volumeControl1.update();
    this.volumeControl2.update();
  }

  isOutOfBounds(index) {
    return this.options.length - 1 < index || index < 0;
  }

  setSelectedOption(option) {
    if (this.selectedOption) {
      this.selectedOption.clearTint();
      this.selectedOption.isSelected = false;
    }
    this.selectedOption = option;
    this.selectedOption.isSelected = true;
    this.selectedOption.setTint(0xffff00);
  }

  setDefaultOption() {
    this.setSelectedOption(this.options[0]);
  }

  handleBack() {
    this.selectSound.play();
    this.options[this.options.length - 1].handleSelect();
  }

  handleChangeOptionDown() {
    this.selectedOption.clearTint();
    let nextOptionIndex = this.options.indexOf(this.selectedOption) + 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.setSelectedOption(this.options[0]);
    } else {
      this.setSelectedOption(this.options[nextOptionIndex]);
    }
    this.selectedOption.setTint(0xffff00);
    this.changeOptionSound.play();
  }

  handleChangeOptionUp() {
    this.selectedOption.clearTint();
    let nextOptionIndex = this.options.indexOf(this.selectedOption) - 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.setSelectedOption(this.options[this.options.length - 1]);
    } else {
      this.setSelectedOption(this.options[nextOptionIndex]);
    }
    this.selectedOption.setTint(0xffff00);
    this.changeOptionSound.play();
  }

  handleSelectOnOption() {
    this.selectSound.play();
    this.selectedOption.handleSelect();
  }

  createOptions() {
    let lastYPosition = this.conf.gameHeight * 0.2;

    this.volumeControl1 = new VolumeControl(
      this,
      0,
      lastYPosition,
      "MUSIC VOLUME",
      MUSIC_VOLUME,
      this.selectSound,
      this.blockSound
    );
    this.volumeControl1.x =
      this.conf.gameWidth / 2 - this.volumeControl1.getBounds().width / 2;

    let volume1Height = this.volumeControl1.getBounds().height;
    lastYPosition += volume1Height;

    this.volumeControl2 = new VolumeControl(
      this,
      0,
      lastYPosition + 10,
      "SFX VOLUME",
      SFX_VOLUME,
      this.selectSound,
      this.blockSound
    );
    this.volumeControl2.x =
      this.conf.gameWidth / 2 - this.volumeControl2.getBounds().width / 2;

    let volume2Height = this.volumeControl2.getBounds().height;
    lastYPosition += volume2Height;

    this.backOption = new MenuOption(
      this,
      0,
      lastYPosition + 20,
      "BACK",
      "MainMenuScene",
      { fontSize: 40 }
    );
    this.backOption.x =
      this.conf.gameWidth / 2 - this.backOption.displayWidth / 2;
    this.options = [this.volumeControl1, this.volumeControl2, this.backOption];
  }

  createAudios() {
    this.changeOptionSound = this.sound.add("changeOption");
    this.selectSound = this.sound.add("select");
    this.blockSound = this.sound.add("block");

    this.sfxSounds = [
      this.changeOptionSound,
      this.selectSound,
      this.blockSound,
    ];
  }
}

export default OptionsScene;
