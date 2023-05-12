import BaseScene from "./base-scene.js";

class BootLoader extends BaseScene {
  constructor() {
    super("BootLoaderScene");
  }

  preload() {
    this.drawProgressBar();
    this.drawProgressText();
    this.load.setPath("./assets/");
    this.loadMaps();
    this.loadMapsAnims();
    this.loadFighters();
    this.loadFightersAnims();
    this.loadFightersSelectionPreview();
    this.loadFighterSelectionFrames();
    this.loadArrows();
    this.loadBackgrounds();
    this.loadClashOfFistslogo();
    this.loadClashOfFistsIntro();
    this.loadCarapan();
    this.loadAudios();
    this.loadUtils();
    this.createListeners("IntroScene");
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

  drawProgressText() {
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

  createListeners(sceneToStart) {
    this.load.on(this.loaderEvents.COMPLETE, () => {
      this.scene.start(sceneToStart);
    });
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

  loadMaps() {
    // Atlases de los mapas
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

    // Imagenes de previsualización para la seleccion de mapas
    this.load.image(
      "ninjaMountainMapMini",
      "maps/ninja-mountain-map/ninja-mountain-mini.png"
    );
    this.load.image(
      "knightCastleMapMini",
      "maps/knight-castle-map/knight-castle-mini.png"
    );
  }

  loadMapsAnims() {
    this.load.animation(
      "knightCastleMapAnims",
      "maps/knight-castle-map/knight-castle-anims.json"
    );
    this.load.animation(
      "ninjaMountainMapAnims",
      "maps/ninja-mountain-map/ninja-mountain-anims.json"
    );
  }

  loadFighters() {
    // Atlases de los luchadores
    this.load.aseprite(
      "knight",
      "fighters/knight/knight.png",
      "fighters/knight/knight-atlas.json"
    );
    this.load.aseprite(
      "ninja",
      "fighters/ninja/ninja.png",
      "fighters/ninja/ninja-atlas.json"
    );

    // Atlases de los puños de los luchadores
    this.load.aseprite(
      "knightFist",
      "fighters/knight/fist/knight-fist.png",
      "fighters/knight/fist/knight-fist-atlas.json"
    );
    this.load.aseprite(
      "ninjaFist",
      "fighters/ninja/fist/ninja-fist.png",
      "fighters/ninja/fist/ninja-fist-atlas.json"
    );

    // Atlases especiales de los luchadores
    this.load.aseprite(
      "shuriken",
      "fighters/ninja/shuriken/shuriken.png",
      "fighters/ninja/shuriken/shuriken-atlas.json"
    );
  }

  loadFightersAnims() {
    // Jsons con las animaciones de los luchadores
    this.load.animation("knightAnims", "fighters/knight/knight-anims.json");
    this.load.animation("ninjaAnims", "fighters/ninja/ninja-anims.json");

    // Jsons con las animaciones de los puños de los luchadores
    this.load.animation(
      "knightFistAnims",
      "fighters/knight/fist/knight-fist-anims.json"
    );
    this.load.animation(
      "ninjaFistAnims",
      "fighters/ninja/fist/ninja-fist-anims.json"
    );

    // Jsons con animaciones de objetos especiales de los luchadores
    this.load.animation(
      "shurikenAnims",
      "fighters/ninja/shuriken/shuriken-anims.json"
    );
  }

  loadFightersSelectionPreview() {
    this.load.image(
      "knightSelectionPreview",
      "fighters/knight/knight-selection-preview.png"
    );
    this.load.image(
      "ninjaSelectionPreview",
      "fighters/ninja/ninja-selection-preview.png"
    );
    this.load.image(
      "unknownSelectionPreview",
      "fighters/unknown/unknown-selection-preview.png"
    );

    // Esta imagen es para completar los espacios de luchadores que no se encuentran disponibles
    this.load.image(
      "questionMarkSelectionPreview",
      "fighter-selection/unknown-selection/question-mark-selection-preview.png"
    );
  }

  loadFighterSelectionFrames() {
    // Este es un atlas de un marco dividido en dos mitades para poder tintar cada una segun el color del jugador que este eligiendo
    this.load.aseprite(
      "knownFighterFrame",
      "fighter-selection/known-selection/frame.png",
      "fighter-selection/known-selection/frame.json"
    );
    // Es marco es solo una imagen, ya que nunca podra ser elegido por dos jugadores al mismo tiempo no fue necesario dividirlo en dos
    this.load.image(
      "unknownFighterFrame",
      "fighter-selection/unknown-selection/frame.png",
      "fighter-selection/unknown-selection/frame.json"
    );
  }

  loadArrows() {
    // Flechas utilizadas en los créditos
    this.load.aseprite(
      "comboArrows",
      "arrows/combo-arrows/arrows.png",
      "arrows/combo-arrows/arrows-atlas.json"
    );
    // Flechas utilizadas en la selección de mapas
    this.load.aseprite(
      "mapsArrows",
      "arrows/maps-arrows/arrows.png",
      "arrows/maps-arrows/arrows-atlas.json"
    );
    // Flechas utilizadas en el control del volumen del juego
    this.load.aseprite(
      "optionsArrows",
      "arrows/options-arrows/arrows.png",
      "arrows/options-arrows/arrows-atlas.json"
    );
  }

  loadBackgrounds() {
    this.load.image("background", "backgrounds/clash-of-fists-background.png");
  }

  loadClashOfFistslogo() {
    // Atlas del logo
    this.load.aseprite(
      "clashOfFistsLogo",
      "logo/clash-of-fists-logo.png",
      "logo/clash-of-fists-logo-atlas.json"
    );

    // Animación del logo
    this.load.animation(
      "clashOfFistsLogoAnims",
      "logo/clash-of-fists-logo-anims.json"
    );
  }

  loadCarapan() {
    // Atlas del carapan
    this.load.aseprite(
      "carapan",
      "carapan/carapan.png",
      "carapan/carapan-atlas.json"
    );

    // Animación del carapan
    this.load.animation("carapanAnims", "carapan/carapan-anims.json");
  }

  loadClashOfFistsIntro() {
    this.load.image("introClash", "intro/clash.png");
  }

  loadUtils() {
    this.load.image("purpleParticle", "utils/purple.png");
    this.load.image("fighterNameFrame", "utils/fighter-name-frame.png");
  }

  loadAudios() {
    this.load.audio("changeOption", ["audio/change-option.wav"]);
    this.load.audio("introClash", ["audio/intro-clash.wav"]);
    this.load.audio("introStart", ["audio/intro-start.wav"]);
    this.load.audio("introPreClash", ["audio/intro-pre-clash.wav"]);
    this.load.audio("disappear", ["audio/disappear.m4a"]);
    this.load.audio("selectFighterBlocked", [
      "audio/select-fighter-blocked.wav",
    ]);
    this.load.audio("select", ["audio/select.wav"]);
    this.load.audio("selectFighter", ["audio/select-fighter.wav"]);
    this.load.audio("optionBlocked", ["audio/option-blocked.wav"]);
    this.load.audio("unselect", ["audio/unselect.wav"]);
    this.load.audio("comboHit", ["audio/combo-hit.wav"]);
    this.load.audio("comboMiss", ["audio/combo-miss.wav"]);
    this.load.audio("logoCracking", ["audio/logo-cracking.wav"]);
    this.load.audio("introWind", ["audio/intro-wind.mp3"]);
    this.load.audio("versus", ["audio/versus.wav"]);
  }
}

export default BootLoader;
