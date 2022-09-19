import { Knight } from "../classes/fighters/knight.js";
import { Ninja } from "../classes/fighters/ninja.js";
import { MatchTimer } from "../classes/timer/MatchTimer.js";
import { PreTimer } from "../classes/timer/PreTimer.js";

class BootLoader extends Phaser.Scene {
  constructor() {
    super("BootLoaderScene");
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
    this.scene.start("FightScene");
  }

  update(time, deltaTime) {}
}

export default BootLoader;
