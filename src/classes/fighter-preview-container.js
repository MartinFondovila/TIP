export class FighterPreview extends Phaser.GameObjects.Container {
  constructor(scene, x, y, previewFlip) {
    super(scene, x, y);
    this.scene.add.existing(this);

    if (previewFlip) {
      this.fighter = this.scene.add.sprite(0, 0).setOrigin(1, 0.5);
      // Cambiar posicion del fist por una const en la SHARED_CONF o algo por el estilo
      this.fist = this.scene.add
        .sprite(11 * -1, 13)
        .setOrigin(1, 0.5)
        .setScale(0.75);
      this.fighter.setFlipX(true);
      this.fist.setFlipX(true);
    } else {
      this.fighter = this.scene.add.sprite(0, 0).setOrigin(0, 0.5);
      // Cambiar posicion del fist por una const en la SHARED_CONF o algo por el estilo
      this.fist = this.scene.add
        .sprite(11, 13)
        .setOrigin(0, 0.5)
        .setScale(0.75);
    }

    this.add([this.fighter, this.fist]);
    this.setScale(3);
  }

  changeFighterAnimsKey(fighterAnimsKey) {
    if (fighterAnimsKey == null) {
      this.stopPreview();
    } else {
      this.fighterAnimsKey = fighterAnimsKey;
      console.log("idle animation");
      this.fighter.anims.play(fighterAnimsKey + "Idle");
      this.fist.anims.play(fighterAnimsKey + "FistIdle");
      this.setVisible(true);
    }
  }

  stopPreview() {
    this.fighter.anims.stop();
    this.fist.anims.stop();
    this.setVisible(false);
  }

  completePreview() {
    this.fighter.anims.play(this.fighterAnimsKey + "VictoryPose");
    this.fist.anims.play(this.fighterAnimsKey + "FistVictoryPose");
  }
}
