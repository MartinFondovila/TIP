export class Attack extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, width, height, baseDamage, player) {
    super(scene, x, y);
    this.setDisplaySize(width, height);
    this.baseDamage = baseDamage;
    this.player = player;
  }
}
