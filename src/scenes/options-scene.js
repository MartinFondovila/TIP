import BaseMenuScene from "./base-menu-scene.js";
import { MenuSwitchOption } from "../classes/menu-switch-option.js";
import { VolumeControl } from "../classes/volume-controls.js";
import { VOLUME_CONTROL_OPTIONS } from "../utils.js";
import NextOptionSimpleArrayStrategy from "../classes/next-option-simple-array-strategy.js";

class OptionsScene extends BaseMenuScene {
  constructor() {
    super("OptionsScene");
    this.nextOptionStrategy = new NextOptionSimpleArrayStrategy();
    this.volumes = [];
  }

  init(data) {
    this.sceneToReturn = data.sceneKey;
  }

  create() {
    this.createBackground();
    this.createSounds();
    this.createVolumeUpdaters();
    this.createControls();
    this.createOptions();
    this.setDefaultOption();

    this.events.on(this.sceneEvents.WAKE, (event, data) => {
      this.sceneToReturn = data.sceneKey;
      this.backOption.sceneToSwitch = this.sceneToReturn;
    });

    this.events.on(this.sceneEvents.SLEEP, () => {
      this.setDefaultOption();
    });
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.moveUp)) {
      this.setSelectedOption(
        this.nextOptionStrategy.getNextOption(
          "UP",
          this.options,
          this.selectedOption
        )
      );
      this.changeOptionSound.play();
    } else if (this.inputKeyboard.JustDown(this.controls.moveDown)) {
      this.setSelectedOption(
        this.nextOptionStrategy.getNextOption(
          "DOWN",
          this.options,
          this.selectedOption
        )
      );
      this.changeOptionSound.play();
    } else if (this.inputKeyboard.JustDown(this.controls.select)) {
      this.handleSelectOnOption();
    } else if (this.inputKeyboard.JustDown(this.controls.back)) {
      this.handleBack();
    }

    this.volumes.forEach((volumeControl) => {
      volumeControl.update();
    });
  }

  // Cambiar
  handleBack() {
    this.selectSound.play();
    this.options[this.options.length - 1].handleSelect();
    this.setDefaultOption();
  }

  createOptions() {
    let lastYPosition = this.conf.gameHeight * 0.2;

    VOLUME_CONTROL_OPTIONS.forEach((conf) => {
      let volumeControl = new VolumeControl(
        this,
        0,
        lastYPosition,
        conf.volumeText,
        conf.volumeState,
        conf.selectedTint,
        this.selectSound,
        this.volumeControls,
        this.optionBlockedSound
      );
      let volumeBounds = volumeControl.getBounds();
      volumeControl.x = this.conf.gameWidth / 2 - volumeBounds.width / 2;
      lastYPosition += volumeBounds.height + 10;
      this.options.push(volumeControl);
      this.volumes.push(volumeControl);
    });

    this.backOption = new MenuSwitchOption(
      this,
      this.conf.gameWidth / 2,
      lastYPosition,
      "BACK",
      this.sceneToReturn,
      0xffff00,
      this.selectSound,
      { fontSize: 49 }
    );
    this.backOption.setOrigin(0.5, 0);

    this.options.push(this.backOption);
  }

  createControls() {
    super.createControls();
    this.volumeControls = this.input.keyboard.addKeys({
      reduce: this.keyCodes.LEFT,
      increase: this.keyCodes.RIGHT,
    });
  }

  createSounds() {
    this.changeOptionSound = this.sound.add("changeOption");
    this.selectSound = this.sound.add("select");
    this.optionBlockedSound = this.sound.add("optionBlocked");

    this.sfxSounds = [
      this.changeOptionSound,
      this.selectSound,
      this.optionBlockedSound,
    ];
  }
}

export default OptionsScene;
