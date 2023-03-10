import BaseScene from "./base-scene.js";

class BootLoader extends BaseScene {
  constructor() {
    super("BootLoaderScene");
  }
  // Ver bien el nombre de las funciones
  preload() {
    this.drawProgressBar();
    this.drawText();
    this.load.setPath("./assets/");
    this.createListeners();
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

  createListeners() {
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
  }

  loadImages() {
    this.load.image(["background", "floor", "wall"]);
    this.load.image("introClash", "intro-clash.png");
    this.load.image("clashOfFistsLogo", "clash-of-fists-logo.png");
    this.load.image("whiteFrame", "white-frame.png");
    this.load.image("knightSelection", "knight-selection.png");
    this.load.image("interrogationMark", "interrogation-mark.png");
    this.load.image(
      "ninjaMountainMini",
      "maps/ninja-mountain-map/ninja-mountain-mini.png"
    );
    this.load.image(
      "knightCastleMini",
      "maps/knight-castle-map/knight-castle-mini.png"
    );
  }

  loadAtlas() {
    this.load.aseprite(
      "knight",
      "knight/knight.png",
      "knight/knight-atlas.json"
    );
    this.load.aseprite(
      "knightFist",
      "knight/fist/knight-fist.png",
      "knight/fist/knight-fist-atlas.json"
    );
    this.load.aseprite(
      "ninjaFist",
      "ninja/fist/ninja-fist.png",
      "ninja/fist/ninja-fist-atlas.json"
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
    this.load.aseprite(
      "fighterFrame",
      "fighter-frame/fighter-frame.png",
      "fighter-frame/fighter-frame.json"
    );
    this.load.aseprite(
      "arrows",
      "arrows/arrows.png",
      "arrows/arrows-atlas.json"
    );
    this.load.aseprite(
      "mapsArrows",
      "maps-arrows/maps-arrows.png",
      "maps-arrows/maps-arrows-atlas.json"
    );
    this.load.aseprite(
      "optionsArrows",
      "options-arrows/option-arrows.png",
      "options-arrows/option-arrows-atlas.json"
    );
    this.load.aseprite(
      "knightCastleMap",
      "maps/knight-castle-map/knight-castle.png",
      "maps/knight-castle-map/knight-castle-atlas.json"
    );
    this.load.aseprite(
      "ninjaMountainMap",
      "maps/ninja-mountain-map/ninja-mountain.png",
      "maps/ninja-mountain-map/ninja-mountain-atlas.json"
    );
  }

  loadAnimations() {
    this.load.animation("knightAnims", "knight/knight-anims.json");
    this.load.animation(
      "knightFistAnims",
      "knight/fist/knight-fist-anims.json"
    );
    this.load.animation("ninjaFistAnims", "ninja/fist/ninja-fist-anims.json");
    this.load.animation("carapanAnims", "carapan/carapan-anims.json");
    this.load.animation(
      "knightCastleMapAnims",
      "maps/knight-castle-map/knight-castle-anims.json"
    );
    this.load.animation(
      "ninjaMountainMapAnims",
      "maps/ninja-mountain-map/ninja-mountain-anims.json"
    );
  }

  loadAudios() {
    this.load.audio("changeOption", ["audio/change-option.wav"]);
    this.load.audio("clashIntro", ["audio/clash-intro.wav"]);
    this.load.audio("blinkIntro", ["audio/blink-intro.wav"]);
    this.load.audio("preClash", ["audio/pre-clash.wav"]);
    this.load.audio("disappear", ["audio/disappear.m4a"]);
    this.load.audio("blocked", ["audio/blocked.wav"]);
    this.load.audio("select", ["audio/select.wav"]);
    this.load.audio("selectFighter", ["audio/select-fighter.wav"]);
    this.load.audio("block", ["audio/block.wav"]);
    this.load.audio("unselect", ["audio/unselect.wav"]);
  }
}

export default BootLoader;
