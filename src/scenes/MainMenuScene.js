class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
    this.Controls;
    this.options = [];
    this.selectedOption;
  }

  init() {}

  preload() {}

  create() {
    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.controls = this.input.keyboard.addKeys({
      moveUp: KeyCodes.UP,
      moveDown: KeyCodes.DOWN,
      enter: KeyCodes.ENTER,
    });

    // Ver si hay otra forma de settear el fondo
    this.cameras.main.setBackgroundColor("#000000");

    this.options.push(
      this.add.text(225, 100, "Versus", { fontSize: 40 }).setTint(0xffff00)
    );
    this.options.push(this.add.text(225, 150, "Options", { fontSize: 40 }));
    this.options.push(this.add.text(225, 200, "Credits", { fontSize: 40 }));

    this.selectedOption = this.options[0];

    console.log(this.selectedOption.text);
    console.log(this.options);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
      this.handleEnterOnOption(this.selectedOption.text);
      console.log("Se selecciono la opción: " + this.selectedOption.text);
    }
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
    console.log(nextOptionIndex);
  }

  handleEnterOnOption(option) {
    switch (option) {
      case "Versus":
        this.switchScene("CharacterSelectionMenu");
        break;
      case "Options":
        this.switchScene("OptionScene");
        break;
      case "Controls":
        this.switchScene("ConfigControlsScene");
        break;
    }
  }

  switchScene(sceneName) {
    if (!this.scene.isSleeping(sceneName)) {
      this.scene.launch(sceneName);
    } else {
      this.scene.wake(sceneName);
    }
    this.scene.moveAbove("MainMenuScene", "sceneName");
    this.scene.sleep();
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
