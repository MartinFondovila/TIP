export class VolumeControl extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, volumeState, exampleSound, blockSound) {
    super(scene, x, y);
    this.inputKeyboard = Phaser.Input.Keyboard;
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.scene.add.existing(this);
    this.controls = scene.input.keyboard.addKeys({
      left: this.keyCodes.LEFT,
      right: this.keyCodes.RIGHT,
    });
    this.volumeState = volumeState;
    this.isSelected = false;
    this.exampleSound = exampleSound;
    this.blockSound = blockSound;
    this.volumneText = this.scene.add.text(0, 0, text, { fontSize: 40 });
    this.volumeNumber = this.scene.add
      .text(
        this.volumneText.displayWidth / 2,
        this.volumneText.displayHeight + 2,
        10,
        { fontSize: 40 }
      )
      .setOrigin(0.5, 0);
    this.rightArrow = this.scene.add
      .image(
        this.volumeNumber.x + this.volumeNumber.displayWidth / 2 + 20,
        this.volumeNumber.y + this.volumeNumber.displayHeight / 2,
        "optionsArrows",
        0
      )
      .setScale(1.2)
      .setAlpha(0.5);
    this.leftArrow = scene.add
      .image(
        this.volumeNumber.x - this.volumeNumber.displayWidth / 2 - 20,
        this.volumeNumber.y + this.volumeNumber.displayHeight / 2,
        "optionsArrows",
        1
      )
      .setScale(1.2)
      .setAlpha(0.5);

    this.add([
      this.volumneText,
      this.volumeNumber,
      this.rightArrow,
      this.leftArrow,
    ]);
  }

  handleReduceVolume() {
    console.log(this.volumeNumber.text);
    this.leftArrow.clearAlpha();
    console.log(parseInt(this.volumeNumber.text) / 10);
    if (this.volumeNumber.text > 0) {
      let volume = parseInt(this.volumeNumber.text) - 1;
      this.volumeNumber.setText(volume);
      this.volumeState.setVolume(volume / 10);
      if (this.exampleSound.isPlaying) {
        this.exampleSound.stop();
      }
      this.exampleSound.play();
    } else {
      this.blockSound.play();
    }
  }

  handleIncreaseVolume() {
    console.log(this.volumeNumber.text);
    console.log(parseInt(this.volumeNumber.text) / 10);
    this.rightArrow.clearAlpha();
    if (this.volumeNumber.text < 10) {
      let volume = parseInt(this.volumeNumber.text) + 1;
      this.volumeNumber.setText(volume);
      this.volumeState.setVolume(volume / 10);
      if (this.exampleSound.isPlaying) {
        this.exampleSound.stop();
      }
      this.exampleSound.play();
    } else {
      this.blockSound.play();
    }
  }

  // Refactorizar y no hacer sonido
  handleSelect() {}

  setTint(tint) {
    this.volumneText.setTint(tint);
  }

  clearTint() {
    this.volumneText.clearTint();
  }

  update() {
    if (this.isSelected) {
      if (this.inputKeyboard.JustDown(this.controls.left)) {
        this.handleReduceVolume();
      } else if (this.inputKeyboard.JustDown(this.controls.right)) {
        this.handleIncreaseVolume();
      }

      if (this.inputKeyboard.JustUp(this.controls.left)) {
        this.leftArrow.setAlpha(0.5);
      } else if (this.inputKeyboard.JustUp(this.controls.right)) {
        this.rightArrow.setAlpha(0.5);
      }
    }
  }
}
