export class PlayerSelector extends Phaser.GameObjects.Text {
  constructor(scene, x, y, playerNumber, style) {
    super(scene, x, y, "P" + playerNumber, style);
    this.scene.add.existing(this);
    this.playerNumber = playerNumber;
    this.selectionComplete = false;
    this.setTint(0xff0000);
    this.setVisible(false);
  }

  positionRightBasedOn(option) {
    this.x = option.x + 200;
    this.y = option.y;
  }

  positionLeftBasedOn(option) {
    this.x = option.x - 50;
    this.y = option.y;
  }

  blinkAnimation(milliseconds) {
    let interval = setInterval(() => {
      this.setVisible(!this.visible);
    }, 200);
    this.scene.time.delayedCall(
      milliseconds,
      () => {
        clearInterval(interval);
        // Puede ser que esto no sea necesario
        this.setVisible(true);
      },
      [],
      this.scene
    );
  }
}
