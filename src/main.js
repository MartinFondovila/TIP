import BootLoader from "./scenes/BootLoader.js";
import CharacterSelectionScene from "./scenes/CharacterSelectionScene.js";
import FightScene from "./scenes/FightScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";
import PauseMenuScene from "./scenes/PauseMenuScene.js";
import MapSelectionScene from "./scenes/MapSelectionScene.js";

const config = {
  title: "Curso Phaser",
  url: "http://google.es",
  version: "0.0.1",

  type: Phaser.AUTO,
  scale: {
    parent: "phaser_container",
    width: 640,
    height: 360,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,

  banner: {
    hidePhaser: false,
    text: "#fff00f",
    background: ["#16a085", "#2ecc71", "#e74c3c", "#000000"],
  },

  physics: {
    default: "arcade",
    arcade: {
      // True para ver las hitboxes
      debug: true,
      gravity: {
        y: 800,
      },
    },
  },

  scene: [
    BootLoader,
    MainMenuScene,
    MapSelectionScene,
    FightScene,
    CharacterSelectionScene,
    PauseMenuScene,
  ],
};

const game = new Phaser.Game(config);
