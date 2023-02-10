export class FighterSelection extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, fighterKey, primaryTint, secondaryTint) {
    super(scene, x, y, texture);
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    //this.frame = this.scene.add.sprite(x, y, "whiteFrame").setOrigin(0, 0);
    this.fighterKey = fighterKey;
    this.primaryTint = primaryTint;
    this.secondaryTint = secondaryTint;
    this.whiteTint = 0xffffff;
  }

  handleSelect(player) {
    this.scene.versusConfig[player] = this.fighterKey;
  }

  handleTint() {
    if (!this.isTinted) {
      this.tintTopLeft = this.primaryTint;
      this.tintBottomLeft = this.primaryTint;
    } else {
      this.tintTopRight = this.secondaryTint;
      this.tintBottomRight = this.secondaryTint;
    }
  }
}
