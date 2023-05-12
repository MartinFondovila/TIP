export class VolumeControl extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    text,
    volumeState,
    selectedTint,
    exampleSound,
    controls,
    blockSound
  ) {
    super(scene, x, y);
    this.inputKeyboard = Phaser.Input.Keyboard;
    this.controls = controls;
    this.scene.add.existing(this);
    this.selectedTint = selectedTint;
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
    this.leftArrow.clearAlpha();
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

  selectedIn() {
    this.volumneText.setTint(this.selectedTint);
    this.isSelected = true;
  }

  selectedOut() {
    this.volumneText.clearTint();
    this.isSelected = false;
  }

  handleSelect() {
    this.blockSound.play();
  }

  update() {
    if (this.isSelected) {
      if (this.inputKeyboard.JustDown(this.controls.reduce)) {
        this.handleReduceVolume();
      } else if (this.inputKeyboard.JustDown(this.controls.increase)) {
        this.handleIncreaseVolume();
      }

      if (this.inputKeyboard.JustUp(this.controls.reduce)) {
        this.leftArrow.setAlpha(0.5);
      } else if (this.inputKeyboard.JustUp(this.controls.increase)) {
        this.rightArrow.setAlpha(0.5);
      }
    }
  }
}
