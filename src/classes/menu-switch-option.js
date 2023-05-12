import * as Phaser from "phaser";

export class MenuSwitchOption extends Phaser.GameObjects.Text {
  constructor(
    scene,
    x,
    y,
    text,
    sceneToSwitch,
    selectedTint,
    selectSound,
    style,
    data
  ) {
    super(scene, x, y, text);
    this.scene.add.existing(this);
    this.sceneToSwitch = sceneToSwitch;
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
    this.scene.scene.moveAbove(this.scene.keyName, this.sceneToSwitch);
    this.scene.scene.run(this.sceneToSwitch, this.data);
    this.scene.scene.sleep();
  }
}
