import { Fighter } from "../classes/fighter.js";

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
    this.load.image(["cubix", "cubix_fondo"]);
  }
  create() {
    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
    const Player1Controls = this.input.keyboard.addKeys({
      left: KeyCodes.A,
      right: KeyCodes.D,
      jump: KeyCodes.W,
    });
    const Player2Controls = this.input.keyboard.addKeys({
      left: KeyCodes.LEFT,
      right: KeyCodes.RIGHT,
      jump: KeyCodes.UP,
    });

    this.player1 = new Fighter(this, 200, 100, Player1Controls, "cubix");
    console.log(this.physics);
    this.add.existing(this.player1);
    this.player1.setCollideWorldBounds(true);
    this.player2 = new Fighter(this, 200, 300, Player2Controls, "cubix_fondo");
    this.add.existing(this.player2);
    this.player2.setCollideWorldBounds(true);
  }
  update(time, delta) {
    this.player1.update();
    this.player2.update();
  }
}

export default BootLoader;
