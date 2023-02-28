class VolumeControl extends Phaser.GameObjects.Container {
  constructor(scene, x, y, volumeState) {
    super(scene, x, y);
    this.inputKeyboard = Phaser.Input.Keyboard;
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.scene.add.existing(this);
    this.controls = this.input.keyboard.addKeys({
      left: this.keyCodes.LEFT,
      right: this.keyCodes.RIGHT,
    });
    this.volumeState = volumeState;
    this.isSelected = false;
    this.volumneText = scene.add.text(0, 0, "PRUEBA");
    this.volumeNumber = scene.add.text(0, 0, "queseyo");
  }
}
