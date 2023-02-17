const KEYCODES = Phaser.Input.Keyboard.KeyCodes;

export const SHARED_CONF = {
  gameWidth: 640,
  gameHeight: 360,
  fistDimensions: { width: 19, height: 18 },
  fighterSelectionDimensions: { width: 64, height: 64 },
  arrowsDimensions: { width: 17, height: 17 },
};

export const MENU_OPTIONS = [
  {
    text: "VERSUS",
    scene: "CharacterSelectionScene",
  },
  {
    text: "OPTIONS",
    scene: "OptionsScene",
  },
  {
    text: "CREDITS",
    scene: "CreditsScene",
  },
];

export const SECRET_COMBO = [
  {
    key: KEYCODES.UP,
    texture: "arrows",
    frame: 0,
  },
  {
    key: KEYCODES.UP,
    texture: "arrows",
    frame: 0,
  },
  {
    key: KEYCODES.RIGHT,
    texture: "arrows",
    frame: 1,
  },
  {
    key: KEYCODES.LEFT,
    texture: "arrows",
    frame: 3,
  },
  {
    key: KEYCODES.DOWN,
    texture: "arrows",
    frame: 2,
  },
];
