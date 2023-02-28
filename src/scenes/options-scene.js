import BaseMenuScene from "./base-menu-scene";

class OptionsScene extends BaseMenuScene {
  constructor() {
    super("OptionsScene");
  }

  create() {
    super.createVolumeUpdaters();
    this.createControls();
    this.createOptions();
  }

  update() {}

  createOptions() {}
}

export default OptionsScene;
