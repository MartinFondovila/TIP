import BaseMenuScene from "./base-menu-scene.js";
import { MapContainer } from "../classes/map-container.js";
import { MAPS } from "../utils.js";
import { MenuSwitchOption } from "../classes/menu-switch-option.js";
import { FighterNameVersus } from "../classes/fighter-name-versus.js";

class MapSelectionScene extends BaseMenuScene {
  constructor() {
    super("MapSelectionScene");
    this.maps = [];
    this.selectedMap;
  }

  init(data) {
    this.fightConf = data;
  }

  create() {
    this.createBackground();
    this.createControls();
    this.createBackOption();
    this.createMaps();
    this.createArrows();
    this.createSounds();
    this.createListeners();
    this.setDefaultMap();
    this.createSceneTitle();
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.moveRight)) {
      this.handleChangeOptionRight();
    } else if (this.inputKeyboard.JustDown(this.controls.moveLeft)) {
      this.handleChangeOptionLeft();
    } else if (this.inputKeyboard.JustDown(this.controls.select)) {
      this.handleSelect();
    } else if (this.inputKeyboard.JustDown(this.controls.back)) {
      this.handleBack();
    }

    if (this.inputKeyboard.JustUp(this.controls.moveRight)) {
      this.rightArrow.setAlpha(0.5);
    }

    if (this.inputKeyboard.JustUp(this.controls.moveLeft)) {
      this.leftArrow.setAlpha(0.5);
    }
  }

  createMaps() {
    MAPS.forEach((map) => {
      let newMap = new MapContainer(
        this,
        this.conf.gameWidth / 2 - this.conf.mapDisplaySelection.width / 2,
        this.conf.gameHeight * 0.5,
        map.name,
        map.texture,
        map.mapKey
      ).setVisible(false);
      this.maps.push(newMap);
    });
  }

  createBackOption() {
    this.backOption = new MenuSwitchOption(
      this,
      this.conf.gameWidth - 55,
      this.conf.gameHeight - 10,
      "BACK",
      "MainMenuScene",
      0xffff00,
      this.selectSound,
      { fontSize: 40 }
    );
    this.backOption.setOrigin(1, 1);
    this.backOption.selectedIn();
  }

  createListeners() {
    this.events.on(this.sceneEvents.WAKE, (event, data) => {
      this.fightConf = { ...data };
    });
  }

  createSceneTitle() {
    this.sceneTitle = new FighterNameVersus(
      this,
      0,
      0,
      "CHOOSE THE MAP",
      "fighterNameFrame",
      40
    );
    this.sceneTitle.setX(
      this.conf.gameWidth / 2 - this.sceneTitle.fighterNameFrame.width / 2
    );
    this.sceneTitle.setY(25);
  }

  createArrows() {
    let YPosition = this.maps[0].y;
    this.rightArrow = this.add
      .image(this.conf.gameWidth - 60, YPosition, "mapsArrows", 0)
      .setOrigin(1, 0.5)
      .setScale(3)
      .setAlpha(0.5);

    this.leftArrow = this.add
      .image(60, YPosition, "mapsArrows", 1)
      .setOrigin(0, 0.5)
      .setScale(3)
      .setAlpha(0.5);
  }

  handleChangeOptionLeft() {
    this.changeSound.play();
    this.leftArrow.setAlpha(1);
    let nextOptionIndex = this.maps.indexOf(this.selectedMap) + 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.setSelectedMap(this.maps[0]);
    } else {
      this.setSelectedMap(this.maps[nextOptionIndex]);
    }
  }

  handleChangeOptionRight() {
    this.changeSound.play();
    this.rightArrow.setAlpha(1);
    let nextOptionIndex = this.maps.indexOf(this.selectedMap) - 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.setSelectedMap(this.maps[this.maps.length - 1]);
    } else {
      this.setSelectedMap(this.maps[nextOptionIndex]);
    }
  }

  handleBack() {
    this.selectSound.play();
    this.scene.moveAbove(this.keyName, "FighterSelectionScene");
    this.scene.run("FighterSelectionScene");
    this.scene.sleep();
    this.setDefaultMap();
  }

  handleSelect() {
    this.disableControls();
    let transitionDuration = 1000;
    this.fightConf.mapKey = this.selectedMap.mapKey;
    this.fightConf.transitionDuration = transitionDuration;
    this.scene.transition({
      target: "VsScene",
      duration: transitionDuration,
      moveAbove: true,
      data: this.fightConf,
      sleep: true,
    });
    this.time.delayedCall(transitionDuration, () => {
      this.setDefaultMap();
      this.enableControls();
    });
  }

  createSounds() {
    this.changeSound = this.sound.add("changeOption");
    this.selectSound = this.sound.add("select");

    this.sfxSounds = [this.changeSound, this.selectSound];
  }

  setDefaultMap() {
    this.setSelectedMap(this.maps[0]);
  }

  setSelectedMap(map) {
    if (this.selectedMap) {
      this.selectedMap.setVisible(false);
    }
    this.selectedMap = map;
    this.selectedMap.setVisible(true);
  }

  isOutOfBounds(index) {
    return this.maps.length - 1 < index || index < 0;
  }
}

export default MapSelectionScene;
