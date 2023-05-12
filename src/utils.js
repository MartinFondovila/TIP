import * as Phaser from "phaser";
import { MUSIC_VOLUME } from "./classes/volume-states/music-volume-state.js";
import { SFX_VOLUME } from "./classes/volume-states/sfx-volume-state.js";
const KEYCODES = Phaser.Input.Keyboard.KeyCodes;

export const SHARED_CONF = {
  gameWidth: 640,
  gameHeight: 360,
  fistDimensions: {
    sprite: { width: 19, height: 18 },
    canvas: { width: 21, height: 28 },
  },
  fighterSelectionDimensions: { width: 64, height: 64 },
  arrowsDimensions: { width: 17, height: 17 },
  mapDisplaySelection: { width: 320, height: 180 },
  fighterDimensions: { width: 48, height: 48 },
  //mapSelectionScale: 0.5,
};

export const MAIN_MENU_OPTIONS = [
  {
    text: "VERSUS",
    scene: "FighterSelectionScene",
    selectedTint: 0xffff00,
    styles: { fontSize: 40 },
  },
  {
    text: "OPTIONS",
    scene: "OptionsScene",
    selectedTint: 0xffff00,
    styles: { fontSize: 40 },
  },
  {
    text: "CREDITS",
    scene: "CreditsScene",
    selectedTint: 0xffff00,
    styles: { fontSize: 40 },
  },
];

export const END_FIGHT_MENU = [
  {
    text: "SELECT FIGHTERS",
    scene: "FighterSelectionScene",
    selectedTint: 0xffff00,
    styles: { fontSize: 40 },
  },
  {
    text: "EXIT TO MAIN MENU",
    scene: "MainMenuScene",
    selectedTint: 0xffff00,
    styles: { fontSize: 40 },
  },
];

export const SECRET_COMBO = [
  {
    key: KEYCODES.UP,
    texture: "comboArrows",
    frame: 0,
  },
  {
    key: KEYCODES.UP,
    texture: "comboArrows",
    frame: 0,
  },
  {
    key: KEYCODES.RIGHT,
    texture: "comboArrows",
    frame: 1,
  },
  {
    key: KEYCODES.LEFT,
    texture: "comboArrows",
    frame: 3,
  },
  {
    key: KEYCODES.DOWN,
    texture: "comboArrows",
    frame: 2,
  },
];

export const MAPS = [
  {
    name: "KNIGHT CASTLE",
    texture: "knightCastleMapMini",
    mapKey: "knightCastleMap",
  },
  {
    name: "NINJA MOUNTAIN",
    texture: "ninjaMountainMapMini",
    mapKey: "ninjaMountainMap",
  },
];

export const FIGHTERS = [
  {
    selectionTexture: "knightSelectionPreview",
    fighterKey: "KNIGHT",
    fighterAnimsKey: "knight",
    static: false,
    flipConf: {
      onlyFlipOnLeft: false,
      onlyFlipOnRight: false,
      flip: false,
    },
    accessories: [
      {
        texture: "knightFist",
        // La X e Y son relativas al origen (0,0) del container
        x: 11,
        y: 13,
        scale: 0.75,
      },
    ],
  },
  {
    selectionTexture: "ninjaSelectionPreview",
    fighterKey: "NINJA",
    fighterAnimsKey: "ninja",
    static: false,
    flipConf: {
      onlyFlipOnLeft: false,
      onlyFlipOnRight: false,
      flip: false,
    },
    accessories: [
      {
        texture: "ninjaFist",
        // La X e Y son relativas al origen (0,0) del container
        x: 12,
        y: 8,
        scale: 0.6,
      },
      {
        texture: "shuriken",
        x: 25,
        y: 8,
        scale: 0.6,
      },
    ],
  },
];

export const PLAYERS_SELECTORS = [
  {
    tint: 0x0000ff,
    previewX: 30,
    previewY: SHARED_CONF.gameHeight / 2,
    previewFlip: false,
  },
  {
    tint: 0xff0000,
    previewX: SHARED_CONF.gameWidth - 30,
    previewY: SHARED_CONF.gameHeight / 2,
    previewFlip: true,
  },
];

export const VOLUME_CONTROL_OPTIONS = [
  {
    volumeState: MUSIC_VOLUME,
    volumeText: "MUSIC VOLUME",
    selectedTint: 0xffff00,
  },
  {
    volumeState: SFX_VOLUME,
    volumeText: "SFX VOLUME",
    selectedTint: 0xffff00,
  },
];
