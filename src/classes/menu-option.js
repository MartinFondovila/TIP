export class MenuOption extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, sceneToSwitch, style) {
    super(scene, x, y, text);
    this.scene.add.existing(this);
    this.sceneToSwitch = sceneToSwitch;
    if (style) {
      this.setStyle(style);
    }
  }

  handleSelect() {
    this.scene.switchScene(this.sceneToSwitch);
  }
}
