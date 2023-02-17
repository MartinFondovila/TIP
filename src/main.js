import BootLoader from "./scenes/boot-loader.js";
import CharacterSelectionScene from "./scenes/character-selection-scene.js";
import FightScene from "./scenes/fight-scene.js";
import MainMenuScene from "./scenes/main-menu-scene.js";
import PauseMenuScene from "./scenes/pause-menu-scene.js";
import MapSelectionScene from "./scenes/map-selection-scene.js";
import CreditsScene from "./scenes/credits-scene.js";
import IntroScene from "./scenes/intro-scene.js";
import TestScene from "./scenes/controls-test-scene.js";

const config = {
  title: "Curso Phaser",
  url: "http://google.es",
  version: "0.0.1",

  // WebGL (Web graphics library) JS Api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  scale: {
    parent: "phaser_container",
    width: 640,
    height: 360,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  pixelArt: true,

  plugins: {
    scene: [
      {
        key: "DebugDrawPlugin",
        plugin: PhaserDebugDrawPlugin,
        mapping: "debugDraw",
      },
    ],
  },

  banner: {
    hidePhaser: false,
    text: "#fff00f",
    background: ["#16a085", "#2ecc71", "#e74c3c", "#000000"],
  },

  physics: {
    // Arcade physics plugin, manages physics simulation
    default: "arcade",
    arcade: {
      // True para ver las hitboxes
      debug: true,
      // La gravity se aplica a todos los bodys de arcade
      // gravity: {
      //   y: 800,
      // },
    },
  },

  scene: [
    BootLoader,
    FightScene,
    TestScene,
    IntroScene,
    MainMenuScene,
    MapSelectionScene,
    CharacterSelectionScene,
    PauseMenuScene,
    CreditsScene,
  ],
};

const game = new Phaser.Game(config);
