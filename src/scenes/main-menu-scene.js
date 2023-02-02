import BaseMenuScene from "./base-menu-scene.js";
// TAREA ACOMODAR MENUS
class MainMenuScene extends BaseMenuScene {
  constructor() {
    super("MainMenuScene", false);
    this.selectedOption;
    this.fists = [];
  }

  init() {}

  preload() {}

  create() {
    this.fistSourceImage = this.textures.get("fist").getSourceImage();
    super.create();
    this.createBackground();
    this.createFists();
    this.createLogo();
    this.createTweens();
    this.createOptions();
    this.setDefaultOption();
    this.createAudios();
    this.cameras.main.fadeIn(4000, 255, 255, 255);
    this.cameras.main.shake(2000, 0.01);

    // Ver si hay otra forma de settear el fondo
    //this.cameras.main.setBackgroundColor("#000000");
    console.log(this.selectedOption.text);
    console.log(this.controls);
    console.log(this.options);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.select)) {
      this.handleSelectOnOption(this.selectedOption.text);
      console.log("Se selecciono la opción: " + this.selectedOption.text);
    }
  }

  createOptions() {
    let optionsText = ["Versus", "Options", "Credits"];
    let lastOptionPositionY = 0;

    optionsText.forEach((text) => {
      this.options.push(
        this.add
          .text(
            this.scale.width / 2,
            this.scale.height * 0.65 + lastOptionPositionY,
            text,
            { fontSize: 40 }
          )
          .setOrigin(0.5, 1)
      );
      lastOptionPositionY += 50;
    });
  }

  createFists() {
    this.fists.push(
      this.add
        .sprite(
          this.scale.width * 0.5 - this.fistSourceImage.width * 4,
          this.scale.height * 0.4,
          "knightFist"
        )
        .setScale(4)
        .setOrigin(0, 0.5)
    );
    this.fists.push(
      this.add
        .sprite(
          this.scale.width * 0.5 + this.fistSourceImage.width * 4,
          this.scale.height * 0.4,
          "ninjaFist"
        )
        .setScale(4)
        .setFlip(true)
        .setOrigin(1, 0.5)
    );
  }

  createLogo() {
    this.logo = this.add
      .image(this.scale.width * 0.5, 0, "clashOfFistsLogo")
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
      //ease: "Bounce",
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
    console.log(nextOptionIndex);
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
    console.log(nextOptionIndex);
  }

  handleSelectOnOption(option) {
    switch (option) {
      case "Versus":
        this.switchScene("CharacterSelectionMenu");
        break;
      case "Options":
        this.switchScene("OptionScene");
        break;
      case "Credits":
        this.switchScene("CreditsScene");
        break;
    }
  }

  switchScene(sceneName) {
    this.scene.start(sceneName);
    this.scene.moveAbove("MainMenuScene", "sceneName");
  }

  scenesFunctions() {
    this.scene.launch;
    this.scene.pause;
    this.scene.remove;
    this.scene.restart;
    this.scene.resume;
    this.scene.run;
    this.scene.sleep;
    this.scene.start;
    this.scene.stop;
    this.scene.transition;
    this.scene.wake;
    this.scene.switch;
  }

  resetSelectedOption() {
    this.selectedOption.clearTint();
    this.selectedOption = this.options[0];
    this.selectedOption.setTint(0xffff00);
  }

  isOutOfBounds(index) {
    return this.options.length - 1 < index || index < 0;
  }
}

export default MainMenuScene;
