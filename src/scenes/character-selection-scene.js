import { PlayerSelector } from "../classes/player-selector.js";
import BaseMenuScene from "./base-menu-scene.js";
import { FighterSelectionContainer } from "../classes/fighter-selection-container.js";
import { FighterSelectionContainerUnknown } from "../classes/fighter-selection-container-unknown.js";

class CharacterSelectionScene extends BaseMenuScene {
  constructor() {
    super("CharacterSelectionScene", false, false);
    this.fightersSelection = [];
    this.playerSelectors = [];
    this.actualPlayerSelector;
    this.selectedFighter;
    this.actualRow;
    this.fightConf = {};
  }

  create() {
    this.createControls();
    this.createBackOption();
    this.createFighterSelection(3, 3, 1.2);
    this.createPlayersSelectors();
    this.setDefaultFighter();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveLeft)) {
      this.handleChangeOptionLeft();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveRight)) {
      this.handleChangeOptionRight();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.select)) {
      this.handleFighterSelection();
      console.log("enter");
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.back)) {
      this.handleBack();
    }
  }

  // Se puede hacer un loop para crearlos
  createPlayersSelectors() {
    let player1Selector = new PlayerSelector("player1Fighter", 0x0000ff);

    let player2Selector = new PlayerSelector("player2Fighter", 0xff0000);

    this.playerSelectors.push(player1Selector, player2Selector);

    this.actualPlayerSelector = player1Selector;
  }

  setSelectedFighter(fighter, row) {
    if (this.selectedFighter) {
      this.selectedFighter.clearTint();
    }
    this.selectedFighter = fighter;
    this.selectedFighter.handleTint(this.actualPlayerSelector.tint);
    if (row) {
      this.actualRow = row;
    }
  }

  setDefaultFighter() {
    this.setSelectedFighter(
      this.fightersSelection[0][0],
      this.fightersSelection[0]
    );
    this.selectedFighter.handleTint(this.actualPlayerSelector.tint);
  }

  handleChangeOptionDown() {
    let nextArrayIndex = this.fightersSelection.indexOf(this.actualRow) + 1;

    if (this.isOutOfBounds(nextArrayIndex, this.fightersSelection)) {
      console.log("out");
      let firstRow = this.fightersSelection[0];
      this.setSelectedFighter(
        firstRow[this.actualRow.indexOf(this.selectedFighter)],
        firstRow
      );
    } else {
      let nextFighter =
        this.fightersSelection[nextArrayIndex][
          this.actualRow.indexOf(this.selectedFighter)
        ];
      this.setSelectedFighter(
        nextFighter,
        this.fightersSelection[nextArrayIndex]
      );
    }
  }

  handleChangeOptionUp() {
    let nextArrayIndex = this.fightersSelection.indexOf(this.actualRow) - 1;

    console.log(nextArrayIndex);

    if (this.isOutOfBounds(nextArrayIndex, this.fightersSelection)) {
      console.log("out");
      let lastRow = this.fightersSelection[this.fightersSelection.length - 1];
      this.setSelectedFighter(
        lastRow[this.actualRow.indexOf(this.selectedFighter)],
        lastRow
      );
    } else {
      let nextFighter =
        this.fightersSelection[nextArrayIndex][
          this.actualRow.indexOf(this.selectedFighter)
        ];
      this.setSelectedFighter(
        nextFighter,
        this.fightersSelection[nextArrayIndex]
      );
    }
  }

  handleChangeOptionRight() {
    let nextOptionIndex = this.actualRow.indexOf(this.selectedFighter) + 1;
    console.log(nextOptionIndex);
    if (this.isOutOfBounds(nextOptionIndex, this.actualRow)) {
      this.setSelectedFighter(this.actualRow[0]);
    } else {
      this.setSelectedFighter(this.actualRow[nextOptionIndex]);
    }
  }

  handleChangeOptionLeft() {
    let nextOptionIndex = this.actualRow.indexOf(this.selectedFighter) - 1;
    console.log(nextOptionIndex);
    if (this.isOutOfBounds(nextOptionIndex, this.actualRow)) {
      this.setSelectedFighter(this.actualRow[this.actualRow.length - 1]);
    } else {
      this.setSelectedFighter(this.actualRow[nextOptionIndex]);
    }
  }

  isOutOfBounds(index, array) {
    return array.length - 1 < index || index < 0;
  }

  handleBack() {
    if (!this.thereIsCharactersSelected()) {
      this.switchScene("MainMenuScene");
      this.setDefaultFighter();
      this.sound.play("select");
    } else {
      // OTRO SONIDO

      this.actualPlayerSelector = this.previousSelector();
      this.actualPlayerSelector.selectionComplete = false;
      this.actualPlayerSelector.fighterSelected.selected = false;
      this.setSelectedFighter(
        this.actualPlayerSelector.fighterSelected,
        this.actualPlayerSelector.fighterRow
      );
    }
  }

  previousSelector() {
    return this.playerSelectors[
      this.playerSelectors.indexOf(this.actualPlayerSelector) - 1
    ];
  }

  handleFighterSelection() {
    this.disableControls();
    this.actualPlayerSelector.handleSelect(
      this.selectedFighter,
      this.actualRow
    );
  }

  // Al reactivar las teclas, ENTER se debe presionar dos veces para que funcione, por que??????
  // Arreglar esto
  handleFighterSelectionAux() {
    if (this.isSelectionComplete()) {
      this.switchScene("FightScene", this.fightConf);
      return;
    }
    if (this.actualPlayerSelector.selectionComplete) {
      this.actualPlayerSelector = this.nextPlayerSelector();
      this.setDefaultFighter();
    }
    this.enableControls();
  }

  nextPlayerSelector() {
    return this.playerSelectors[
      this.playerSelectors.indexOf(this.actualPlayerSelector) + 1
    ];
  }

  createFighterSelection(rowsQuantity, fightersPerRow, scale) {
    let lastSlice = 0;
    let YPosition = this.conf.gameHeight * 0.2;

    console.log(YPosition);
    for (let indexRow = 1; indexRow <= rowsQuantity; indexRow++) {
      let fighterSliced = fighters.slice(lastSlice, fightersPerRow * indexRow);
      lastSlice += fightersPerRow;
      let row = [];
      let lastXPosition =
        this.conf.gameWidth / 2 -
        this.conf.fighterSelectionDimensions.width *
          scale *
          (fightersPerRow / 2 + 1);
      fighterSliced.forEach((fighter) => {
        let newSelection = new FighterSelectionContainer(
          this,
          lastXPosition + this.conf.fighterSelectionDimensions.width * scale,
          YPosition,
          fighter.selectionTexture,
          fighter.fighterKey,
          this.handleFighterSelectionAux
        ).setScale(1.2);
        row.push(newSelection);
        lastXPosition =
          lastXPosition +
          this.conf.fighterSelectionDimensions.width * scale +
          2;
      });

      while (row.length != fightersPerRow) {
        let newSelection = new FighterSelectionContainerUnknown(
          this,
          lastXPosition + this.conf.fighterSelectionDimensions.width * scale,
          YPosition,
          "interrogationMark",
          this.handleFighterSelectionAux
        ).setScale(1.2);
        row.push(newSelection);
        lastXPosition =
          lastXPosition +
          this.conf.fighterSelectionDimensions.width * scale +
          2;
      }
      this.fightersSelection.push(row);
      YPosition =
        this.conf.gameHeight * 0.2 +
        this.conf.fighterSelectionDimensions.height * scale * indexRow +
        2 * indexRow;
      console.log(YPosition);
    }
  }

  isSelectionComplete() {
    return this.playerSelectors.every((selector) => selector.selectionComplete);
  }

  thereIsCharactersSelected() {
    return this.playerSelectors.some((selector) => selector.selectionComplete);
  }
}

const fighters = [
  { selectionTexture: "knightSelection", fighterKey: "knight" },
];

export default CharacterSelectionScene;
