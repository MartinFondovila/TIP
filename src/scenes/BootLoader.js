import { Knight } from "../classes/knight.js";
import { Ninja } from "../classes/ninja.js";

class BootLoader extends Phaser.Scene {
  constructor() {
    super("BootLoaderScene");
    this.player1;
    this.player2;
  }
  init() {
    console.log("Scene Bootloader");
  }
  preload() {
    this.load.setPath("./assets/");
    this.load.image(["background", "floor", "wall"]);
    this.load.image("font", "font/font.png");
    this.load.json("fontData", "font/font.json");
    this.load.atlas(
      "adventurer",
      "adventurer/adventurer.png",
      "adventurer/adventurer_atlas.json"
    );
    this.load.animation("adventurerAnim", "adventurer/adventurer_anim.json");
    this.load.atlas(
      "minotaur",
      "minotaur/minotaur.png",
      "minotaur/minotaur_atlas.json"
    );
    this.load.animation("minotaurAnim", "minotaur/minotaur_anim.json");

    this.load.on("complete", () => {
      const fontData = this.cache.json.get("fontData");
      this.cache.bitmapFont.add(
        "pixelFont",
        Phaser.GameObjects.RetroFont.Parse(this, fontData)
      );
    });
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0);

    this.wall_floor = this.physics.add.staticGroup();

    this.wall_floor.create(0, 0, "wall").setOrigin(0);
    this.wall_floor
      .create(this.scale.width, 0, "wall")
      .setOrigin(1, 0)
      .setFlipX(true);

    this.wall_floor.create(0, this.scale.height, "floor").setOrigin(0, 1);
    this.wall_floor.create(500, 200, "floor");

    this.wall_floor.refresh();

    this.wall_floor.getChildren()[2].setOffset(0, 15);

    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
    const Player1Controls = this.input.keyboard.addKeys({
      left: KeyCodes.A,
      right: KeyCodes.D,
      jump: KeyCodes.W,
      attack: KeyCodes.V,
    });
    const Player2Controls = this.input.keyboard.addKeys({
      left: KeyCodes.LEFT,
      right: KeyCodes.RIGHT,
      jump: KeyCodes.UP,
      attack: KeyCodes.L,
    });

    //let teclaa = this.input.keyboard.addKey("a");
    //teclaa.

    this.player1 = new Knight(this, 200, 100, Player1Controls);
    this.add.existing(this.player1);
    this.player1.setCollideWorldBounds(true);
    this.player2 = new Ninja(this, 200, 100, Player2Controls);
    this.add.existing(this.player2);
    this.player2.setCollideWorldBounds(true);
    this.physics.add.collider([this.player1, this.player2], this.wall_floor);
  }
  update(time, delta) {
    this.player1.update();
    this.player2.update();
  }
}

export default BootLoader;
