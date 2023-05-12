import * as Phaser from "phaser";

export class MenuOption extends Phaser.GameObjects.Text {
  constructor(
    scene,
    x,
    y,
    text,
    selectCallback,
    selectedTint,
    selectSound,
    style,
    data
  ) {
    super(scene, x, y, text);
    this.scene.add.existing(this);
    this.selectCallback = selectCallback;
    this.selectedTint = selectedTint;
    this.selectSound = selectSound;
    if (style) {
      this.setStyle(style);
    }
    this.data = data;
  }

  selectedIn() {
    this.setTint(this.selectedTint);
  }

  selectedOut() {
    this.clearTint();
  }

  handleSelect() {
    this.selectSound.play();
    this.selectCallback();
  }
}
