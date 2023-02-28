import BaseMenuScene from "./base-menu-scene.js";
import { MapContainer } from "../classes/map-container.js";
import { MAPS } from "../utils.js";

class MapSelectionScene extends BaseMenuScene {
  constructor() {
    super("MapSelectionScene", false, false);
    this.maps = [];
    this.selectedMap;
  }

  create() {
    this.createControls();
    this.createBackOption();
    this.createMaps();
    this.createArrows();
    this.setDefaultMap();
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.moveRight)) {
      this.handleChangeOptionRight();
    } else if (this.inputKeyboard.JustDown(this.controls.moveLeft)) {
      this.handleChangeOptionLeft();
    } else if (this.inputKeyboard.JustDown(this.controls.select)) {
      // handle on enter
      this.switchScene("FightScene");
    } else if (this.inputKeyboard.JustDown(this.controls.back)) {
      this.handleBack();
    }

    if (this.inputKeyboard.JustUp(this.controls.moveRight)) {
      this.rightArrow.setAlpha(0.5);
      console.log("hola");
    }

    if (this.inputKeyboard.JustUp(this.controls.moveLeft)) {
      this.leftArrow.setAlpha(0.5);
      console.log("hola");
    }
  }

  createMaps() {
    MAPS.forEach((map) => {
      let newMap = new MapContainer(
        this,
        this.conf.gameWidth / 2 - this.conf.mapDisplaySelection.width / 2, //* this.conf.mapSelectionScale,
        this.conf.gameHeight * 0.2,
        map.name,
        map.texture
        //this.conf.mapSelectionScale
      ).setVisible(false);
      this.maps.push(newMap);
    });
  }

  createArrows() {
    let YPosition = this.maps[0].y + this.conf.mapDisplaySelection.height / 2;
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
    this.leftArrow.setAlpha(1);
    let nextOptionIndex = this.maps.indexOf(this.selectedMap) + 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.setSelectedMap(this.maps[0]);
    } else {
      this.setSelectedMap(this.maps[nextOptionIndex]);
    }
  }

  handleChangeOptionRight() {
    this.rightArrow.setAlpha(1);
    let nextOptionIndex = this.maps.indexOf(this.selectedMap) - 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.setSelectedMap(this.maps[this.maps.length - 1]);
    } else {
      this.setSelectedMap(this.maps[nextOptionIndex]);
    }
  }

  handleBack() {
    this.switchScene("CharacterSelectionScene");
    this.setDefaultMap();
    // Agregar sonido
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
