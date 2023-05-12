export class MapContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, mapName, texture, mapKey) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.mapKey = mapKey;

    this.map = this.scene.add.sprite(0, 0, texture, 0).setOrigin(0.5, 0.5);

    this.map.setX(0 + this.map.width / 2);

    this.name = this.scene.add
      .text(
        this.map.displayWidth / 2,
        this.map.displayHeight / 2 + 10,
        mapName,
        {
          fontSize: 40,
        }
      )
      .setOrigin(0.5, 0);

    this.add([this.map, this.name]);
  }
}
