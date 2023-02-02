class BootLoader extends Phaser.Scene {
  constructor() {
    super("BootLoaderScene");
  }
  init() {
    console.log("Scene Bootloader");
  }
  preload() {
    this.load.setPath("./assets/");
    this.load.image(["background", "floor", "wall", "Icons_05"]);
    this.load.image("introClash", "intro-clash.png");
    this.load.image("fist", "fist.png");
    this.load.image("knightFist", "knight-fist.png");
    this.load.image("ninjaFist", "ninja-fist.png");
    this.load.image("introBackground", "intro-background.png");
    this.load.image("menuBackgroundBroken", "menu-background-broken.png");
    this.load.image("clashOfFistsLogo", "clash-of-fists-logo.png");
    this.load.aseprite(
      "knight",
      "knight/knight.png",
      "knight/knight-atlas.json"
    );
    this.load.aseprite(
      "arrows",
      "arrows/arrows.png",
      "arrows/arrows-atlas.json"
    );
    this.load.aseprite(
      "carapan",
      "carapan/carapan.png",
      "carapan/carapan-atlas.json"
    );
    this.load.animation("knightAnim", "knight/knight-anims.json");
    this.load.animation("carapanAnim", "carapan/carapan-anims.json");
    this.load.audio("changeOption", ["audio/change-option.wav"]);
    this.load.audio("clashIntro", ["audio/clash-intro.wav"]);
    this.load.audio("blinkIntro", ["audio/blink-intro.wav"]);
    this.load.audio("preClash", ["audio/pre-clash.wav"]);
    this.load.audio("disappear", ["audio/disappear.m4a"]);

    this.load.on("complete", () => {
      this.scene.start("FightScene");
    });
  }

  create() {}

  update(time, deltaTime) {}
}

export default BootLoader;
