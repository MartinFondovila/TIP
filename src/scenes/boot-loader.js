import BaseScene from "./base-scene.js";

class BootLoader extends BaseScene {
  constructor() {
    super("BootLoaderScene");
  }

  preload() {
    this.drawProgressBar();
    this.drawText();
    this.load.setPath("./assets/");

    this.load.on(this.loaderEvents.COMPLETE, () => {
      this.scene.start("IntroScene");
    });
    console.log(this.percentText);
    this.load.on(
      this.loaderEvents.PROGRESS,
      function (value) {
        this.percentText.setText(parseInt(value * 100) + "%");
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(
          this.conf.gameWidth / 2 - 150,
          this.conf.gameHeight / 2 + 10,
          300 * value,
          30
        );
      },
      this
    );

    this.load.on(
      this.loaderEvents.FILE_PROGRESS,
      function (file) {
        this.assetText.setText("Loading asset: " + file.key);
      },
      this
    );

    this.loadImages();
    this.loadAtlas();
    this.loadAnimations();
    this.loadAudios();
  }

  drawProgressBar() {
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(
      this.conf.gameWidth / 2 - 160,
      this.conf.gameHeight / 2,
      320,
      50
    );
  }

  drawText() {
    this.loadingText = this.make
      .text({
        x: this.conf.gameWidth / 2,
        y: this.conf.gameHeight / 2 - 15,
        text: "Loading",
        style: {
          font: "20px monospace",
          fill: "#ffffff",
        },
      })
      .setOrigin(0.5, 0.5);

    this.percentText = this.make
      .text({
        x: this.conf.gameWidth / 2,
        y: this.conf.gameHeight / 2 + 25,
        text: "0%",
        style: {
          font: "18px monospace",
          fill: "#ffffff",
        },
      })
      .setOrigin(0.5, 0.5);

    this.assetText = this.make
      .text({
        x: this.conf.gameWidth / 2,
        y: this.conf.gameHeight / 2 + 55,
        text: "",
        style: {
          font: "18px monospace",
          fill: "#ffffff",
        },
      })
      .setOrigin(0.5, 0);
  }

  loadImages() {
    this.load.image(["background", "floor", "wall"]);
    this.load.image("introClash", "intro-clash.png");
    this.load.image("fist", "fist.png");
    this.load.image("knightFist", "knight-fist.png");
    this.load.image("ninjaFist", "ninja-fist.png");
    this.load.image("clashOfFistsLogo", "clash-of-fists-logo.png");
    this.load.image("whiteFrame", "white-frame.png");
    this.load.image("knightSelection", "knight-selection.png");
    this.load.image("interrogationMark", "interrogation-mark.png");
  }

  loadAtlas() {
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
  }

  loadAnimations() {
    this.load.animation("knightAnim", "knight/knight-anims.json");
    this.load.animation("carapanAnim", "carapan/carapan-anims.json");
  }

  loadAudios() {
    this.load.audio("changeOption", ["audio/change-option.wav"]);
    this.load.audio("clashIntro", ["audio/clash-intro.wav"]);
    this.load.audio("blinkIntro", ["audio/blink-intro.wav"]);
    this.load.audio("preClash", ["audio/pre-clash.wav"]);
    this.load.audio("disappear", ["audio/disappear.m4a"]);
  }
}

export default BootLoader;
