class PauseMenuScene extends Phaser.Scene {
  constructor() {
    super("PauseMenuScene");
    this.controls;
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
      resume: KeyCodes.ESC,
      enter: KeyCodes.ENTER,
    });

    this.cameras.main.setBackgroundColor("#000000");

    this.options.push(
      this.add.text(225, 100, "Resume", { fontSize: 40 }).setTint(0xffff00)
    );
    this.options.push(this.add.text(225, 150, "Sound", { fontSize: 40 }));
    this.options.push(this.add.text(225, 200, "Controls", { fontSize: 40 }));

    this.selectedOption = this.options[0];

    console.log(this.selectedOption.text);
    console.log(this.options);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.controls.resume)) {
      this.handleResume();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
      console.log("Se selecciono la opción: " + this.selectedOption.text);
    }
  }

  handleResume() {
    this.scene.moveAbove("PauseMenuScene", "FightScene");
    this.resetSelectedOption();
    this.scene.sleep();
    this.scene.resume("FightScene");
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

  resetSelectedOption() {
    this.selectedOption.clearTint();
    this.selectedOption = this.options[0];
    this.selectedOption.setTint(0xffff00);
  }

  isOutOfBounds(index) {
    return this.options.length - 1 < index || index < 0;
  }
}

export default PauseMenuScene;
