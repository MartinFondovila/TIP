import BootLoader from "./scenes/boot-loader.js";
import FighterSelectionScene from "./scenes/fighter-selection-scene.js";
import FightScene from "./scenes/fight-scene.js";
import MainMenuScene from "./scenes/main-menu-scene.js";
import PauseMenuScene from "./scenes/pause-menu-scene.js";
import MapSelectionScene from "./scenes/map-selection-scene.js";
import CreditsScene from "./scenes/credits-scene.js";
import IntroScene from "./scenes/intro-scene.js";
import OptionsScene from "./scenes/options-scene.js";
import VsScene from "./scenes/vs-scene.js";
import EndFightMenuScene from "./scenes/end-fight-scene-menu.js";
import DebugDrawPlugin from "phaser-plugin-debug-draw";

const config = {
  title: "Clash of Fists",
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

  // plugins: {
  //   scene: [
  //     { key: "DebugDrawPlugin", plugin: DebugDrawPlugin, mapping: "debugDraw" },
  //   ],
  // },

  pixelArt: true,

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
      debug: false,
    },
  },

  scene: [
    BootLoader,
    FightScene,
    IntroScene,
    EndFightMenuScene,
    MainMenuScene,
    MapSelectionScene,
    FighterSelectionScene,
    PauseMenuScene,
    CreditsScene,
    OptionsScene,
    VsScene,
  ],
};

const game = new Phaser.Game(config);
