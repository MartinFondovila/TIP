import BootLoader from "./scenes/BootLoader.js";

const config = {
  title: "Curso Phaser",
  url: "http://google.es",
  version: "0.0.1",

  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: "container",
  pixelArt: true,
  backgroundColor: "#34495e",

  banner: {
    hidePhaser: false,
    text: "#fff00f",
    background: ["#16a085", "#2ecc71", "#e74c3c", "#000000"],
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 2000,
      },
    },
  },

  scene: [BootLoader],
};

const game = new Phaser.Game(config);
