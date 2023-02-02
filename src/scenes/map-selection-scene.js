class MapSelectionScene extends Phaser.Scene {
  constructor() {
    super("MapSelectionScene");
    this.controls;
    this.maps = [];
    this.points;
    this.selectedMap;

    this.minY;
    this.alphaRange;
    this.scaleRange;
  }

  init() {}

  preload() {
    this.load.setPath("./assets/");

    this.load.image("card0", "card_0.png");

    this.load.image("card1", "card_1.png");

    this.load.image("card2", "card_2.png");
  }

  create() {
    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.controls = this.input.keyboard.addKeys({
      moveUp: KeyCodes.UP,
      moveRight: KeyCodes.RIGHT,
      moveDown: KeyCodes.DOWN,
      moveLeft: KeyCodes.LEFT,
      select: KeyCodes.ENTER,
      back: KeyCodes.ESC,
    });

    const graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
    });

    const ellipse = new Phaser.Curves.Ellipse({
      x: 320,
      y: 180,
      xRadius: 150,
      yRadius: 60,
    });

    const totalMaps = 7;

    graphics.strokeEllipseShape(ellipse, totalMaps);

    this.points = ellipse.getPoints(totalMaps);
    this.points.pop();

    this.minY = this.points.reduce(
      (prev, current) => (current.y <= prev ? current.y : prev),
      this.points[0].y
    );
    let maxY = this.points.reduce(
      (prev, current) => (current.y >= prev ? current.y : prev),
      this.points[0].y
    );

    this.alphaRange = 1 / (maxY - this.minY);
    this.scaleRange = 0.4 / (maxY - this.minY);

    this.maps = this.points.map((point, index) => {
      const image = this.add.image(point.x, point.y, "card" + index);
      image.setScale(0.5 + this.scaleRange * (point.y - this.minY));
      image.setAlpha(this.alphaRange * (point.y - this.minY));
      image.setDepth(point.y);

      return image;
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.controls.moveLeft)) {
      this.handleChangeMapLeft();
    }
  }

  handleChangeMapLeft() {
    this.points.forEach((p, index) => {
      const finalPoint = index === this.points.length - 1;

      this.selectedMap = this.maps[index];
      const point = finalPoint ? this.points[0] : this.points[index + 1];

      const x = point.x;
      const y = point.y;

      this.tweens.add({
        targets: this.selectedMap,
        x,
        y,
        ease: "power1",
        duration: 500,
        onUpdate: (tween, target) => {
          this.selectedMap.setScale(
            0.5 + this.scaleRange * (target.y - this.minY)
          );
          this.selectedMap.setAlpha(this.alphaRange * (target.y - this.minY));
          this.selectedMap.setDepth(target.y);
          console.log(this.points);
        },
      });
    });
    Phaser.Utils.Array.RotateLeft(this.points);
  }
}

export default MapSelectionScene;
