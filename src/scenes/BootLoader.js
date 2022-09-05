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

    // Jugador 1
    this.player1 = new Knight(this, 200, 100, Player1Controls);
    this.add.existing(this.player1);
    this.player1.setCollideWorldBounds(true);

    // Jugador 2
    this.player2 = new Ninja(this, 200, 100, Player2Controls);
    this.add.existing(this.player2);
    this.player2.setCollideWorldBounds(true);

    // Colisiones
    this.physics.add.collider([this.player1, this.player2], this.wall_floor);
    this.physics.add.overlap(this.player1.attackHitbox, this.player2, () => {
      this.player2.enemy = this.player1;
      console.log(this.player2.healthPoints);
      this.player2.stateMachine.setState("hit");
    });
    this.physics.add.overlap(this.player2.attackHitbox, this.player1, () => {
      this.player1.enemy = this.player2;
      console.log(this.player1.healthPoints);
      this.player1.stateMachine.setState("hit");
    });

    this.player1HP = this.add
      .bitmapText(
        100,
        25,
        "pixelFont",
        "PLAYER1 HP " + this.player2.healthPoints,
        16
      )
      .setFontSize(10);

    this.player2HP = this.add
      .bitmapText(
        400,
        25,
        "pixelFont",
        "PLAYER2 HP " + this.player1.healthPoints,
        16
      )
      .setFontSize(10);
  }
  update(time, deltaTime) {
    this.player1.update(deltaTime);
    this.player2.update(deltaTime);
    this.player1HP.setText("PLAYER1 HP " + this.player1.healthPoints);
    this.player2HP.setText("PLAYER2 HP " + this.player2.healthPoints);
  }
}

export default BootLoader;
