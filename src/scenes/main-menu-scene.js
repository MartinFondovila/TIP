import BaseMenuScene from "./base-menu-scene.js";
import { MENU_OPTIONS } from "../utils.js";
import { MenuOption } from "../classes/menu-option.js";
// TAREA ACOMODAR MENUS
class MainMenuScene extends BaseMenuScene {
  constructor() {
    super("MainMenuScene", false, false);
    this.selectedOption;
    this.fists = [];
  }

  create() {
    console.log("created");
    this.createControls();
    this.disableControls();
    this.createBackground();
    this.createFists();
    this.createLogo();
    this.createTweens();
    this.createOptions();
    this.setDefaultOption();
    this.createAudios();
    this.cameras.main
      .fadeIn(2000, 255, 255, 255)
      .on(this.camerasEvents.FADE_IN_COMPLETE, this.enableControls, this);
    this.cameras.main.shake(2000, 0.01);
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (this.inputKeyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (this.inputKeyboard.JustDown(this.controls.select)) {
      this.handleSelectOnOption();
    }
  }

  createOptions() {
    let lastOptionPositionY = 0;

    MENU_OPTIONS.forEach((option) => {
      this.options.push(
        new MenuOption(
          this,
          this.conf.gameWidth / 2,
          this.conf.gameHeight * 0.65 + lastOptionPositionY,
          option.text,
          option.scene,
          { fontSize: 40 }
        ).setOrigin(0.5, 1)
      );
      lastOptionPositionY += 50;
    });
  }

  createFists() {
    this.fists.push(
      this.add
        .sprite(
          this.conf.gameWidth * 0.5 - this.conf.fistDimensions.width * 4,
          this.conf.gameHeight * 0.4,
          "knightFist"
        )
        .setScale(4)
        .setOrigin(0, 0.5)
    );
    this.fists.push(
      this.add
        .sprite(
          this.conf.gameWidth * 0.5 + this.conf.fistDimensions.width * 4,
          this.conf.gameHeight * 0.4,
          "ninjaFist"
        )
        .setScale(4)
        .setFlip(true)
        .setOrigin(1, 0.5)
    );
  }

  createLogo() {
    this.logo = this.add
      .image(this.conf.gameWidth * 0.5, 0, "clashOfFistsLogo")
      .setOrigin(0.5, 1);
  }

  createTweens() {
    this.createFistsTween();
    this.createLogoTween();
  }

  createFistsTween() {
    this.tweens.add({
      targets: this.fists,
      y: this.fists[0].y + 2,
      yoyo: true,
      loop: -1,
      duration: 700,
    });
  }

  createLogoTween() {
    this.tweens.add({
      targets: [this.logo],
      y: 100,
      duration: 2000,
    });
  }

  createBackground() {
    //this.add.image(0, 0, "menuBackgroundBroken").setOrigin(0, 0);
  }

  createAudios() {
    this.changeOptionSound = this.sound.add("changeOption");
    this.selectSound = this.sound.add("select");
  }

  setSelectedOption(option) {
    if (this.selectedOption) {
      this.selectedOption.clearTint();
    }
    this.selectedOption = option;
    this.selectedOption.setTint(0xffff00);
  }

  setDefaultOption() {
    this.setSelectedOption(this.options[0]);
  }

  handleChangeOptionDown() {
    this.selectedOption.clearTint();
    let nextOptionIndex = this.options.indexOf(this.selectedOption) + 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.selectedOption = this.options[0];
    } else {
      this.selectedOption = this.options[nextOptionIndex];
    }
    this.selectedOption.setTint(0xffff00);
    this.changeOptionSound.play();
  }

  handleChangeOptionUp() {
    this.selectedOption.clearTint();
    let nextOptionIndex = this.options.indexOf(this.selectedOption) - 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.selectedOption = this.options[this.options.length - 1];
    } else {
      this.selectedOption = this.options[nextOptionIndex];
    }
    this.selectedOption.setTint(0xffff00);
    this.changeOptionSound.play();
  }

  handleSelectOnOption() {
    this.selectSound.play();
    this.selectedOption.handleSelect();
  }

  isOutOfBounds(index) {
    return this.options.length - 1 < index || index < 0;
  }
}

export default MainMenuScene;
