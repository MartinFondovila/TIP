import { PlayerSelector } from "../classes/options-text/player-selector.js";
import BaseMenuScene from "./base-menu-scene.js";
import { FighterSelection } from "../classes/fighter-selection.js";

class CharacterSelectionScene extends BaseMenuScene {
  constructor() {
    super("CharacterSelectionScene", false, false);
    this.fightersSelection = [];
    this.playerSelectors = [];
    this.actualSelector;
    this.selectedOption;
    this.fightInfo = {};
  }

  create() {
    console.log("holas");
    this.createControls();
    this.createFighterSelection(2, 4);

    this.add
      .text(this.conf.gameWidth / 2, this.conf.gameHeight / 2, "MEDIO")
      .setOrigin(0.5, 0);

    console.log(this.fightersSelection);
    // Ver si hay otra forma de settear el fondo
    //this.cameras.main.setBackgroundColor("#000000");

    // this.selectedOption = this.fighters[0];
    // this.selectedOption.setTint(0xffff00);

    // //Ver otra forma de crear los selectors
    // this.playerSelectors.push(
    //   new PlayerSelector(
    //     this,
    //     this.selectedOption.x - 50,
    //     this.selectedOption.y,
    //     1,
    //     { fontSize: 40 }
    //   )
    // );
    // this.playerSelectors.push(
    //   new PlayerSelector(
    //     this,
    //     this.selectedOption.x - 50,
    //     this.selectedOption.y,
    //     2,
    //     { fontSize: 40 }
    //   )
    // );

    // this.actualSelector = this.playerSelectors[0];
    // this.actualSelector.setVisible(true);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.select)) {
      this.handleEnterOnOption(this.selectedOption);
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.back)) {
      this.handleBack();
    }
  }

  handleChangeOptionDown() {
    this.selectedOption.clearTint();
    let nextOptionIndex = this.fighters.indexOf(this.selectedOption) + 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.selectedOption = this.fighters[0];
    } else {
      this.selectedOption = this.fighters[nextOptionIndex];
    }
    this.selectedOption.setTint(0xffff00);
    this.handleSelectorPositioning();
    console.log(nextOptionIndex);
  }

  handleSelectorPositioning() {
    this.actualSelector.positionLeftBasedOn(this.selectedOption);
  }

  handleChangeOptionUp() {
    this.selectedOption.clearTint();
    let nextOptionIndex = this.fighters.indexOf(this.selectedOption) - 1;
    if (this.isOutOfBounds(nextOptionIndex)) {
      this.selectedOption = this.fighters[this.fighters.length - 1];
    } else {
      this.selectedOption = this.fighters[nextOptionIndex];
    }
    this.selectedOption.setTint(0xffff00);
    this.handleSelectorPositioning();
    console.log(nextOptionIndex);
  }

  // Ver como esperar a que termine de parpadear el P2 antes de lanza la pelea
  handleEnterOnOption(option) {
    this.disableControls();
    // Agrego el fighter a el objeto fightInfo
    this.fightInfo["player" + this.actualSelector.playerNumber] = option.text;
    // Seteo que la seleccion del selector se completo
    this.actualSelector.selectionComplete = true;
    // Cambio el color y hago la animacion
    this.actualSelector.setTint(0x00ff00);
    this.actualSelector.blinkAnimation(1000);
    // Actualizo el siguiente selector
    if (this.isCharacterSelectionComplete()) {
      // Se termino la seleccion de fighters
      this.disableControls();
      // Redirijo a la siguiente escena y espero para que termina la animacion
      this.time.delayedCall(
        1000,
        () => this.scene.start("MapSelectionScene"),
        null,
        this
      );
    } else {
      // Espero para terminar la animacion y deshabilito las teclas para que no haya errores
      this.time.delayedCall(
        1000,
        () => {
          // Reseteo el color de la opcion elegida y la cambio por la primera
          // TODO hacer un setter que hago esto
          this.selectedOption.clearTint();
          this.selectedOption = this.fighters[0];
          this.selectedOption.setTint(0xffff00);
          this.actualSelector = this.nextSelector();
          this.actualSelector.setVisible(true);
          this.enableControls();
        },
        null,
        this
      );
    }
    console.log(this.fightInfo);
  }

  isCharacterSelectionComplete() {
    return this.playerSelectors.every((selector) => selector.selectionComplete);
  }

  nextSelector() {
    return this.playerSelectors[
      this.playerSelectors.indexOf(this.actualSelector) + 1
    ];
  }

  previousSelector() {
    return this.playerSelectors[
      this.playerSelectors.indexOf(this.actualSelector) - 1
    ];
  }

  disableControls() {
    Object.values(this.controls).forEach(
      (control) => (control.enabled = false)
    );
  }

  enableControls() {
    Object.values(this.controls).forEach((control) => (control.enabled = true));
  }

  handleBack() {
    if (!this.thereIsCharactersSelected()) {
      // Vuelvo al menu principal
      this.switchScene("MainMenuScene");
    } else if (this.actualSelector.selectionComplete) {
      // Deshago la ultima seleccion pero sigo eligiendo con el mismo selector
      this.actualSelector.selectionComplete = false;
      this.actualSelector.setTint(0xff0000);
    } else {
      // Vuelvo al selector anterior y oculto el actual
      this.actualSelector.setVisible(false);
      this.actualSelector = this.previousSelector();
      this.actualSelector.selectionComplete = false;
      this.actualSelector.setTint(0xff0000);
    }
  }

  thereIsCharactersSelected() {
    return this.playerSelectors.some((selector) => selector.selectionComplete);
  }

  switchScene(sceneName) {
    if (!this.scene.isSleeping(sceneName)) {
      this.scene.launch(sceneName);
    } else {
      this.scene.wake(sceneName);
    }
    this.scene.moveAbove("MainMenuScene", "sceneName");
    this.resetSelection();
    this.scene.sleep();
  }

  resetSelectedOption() {
    this.selectedOption.clearTint();
    this.selectedOption = this.fighters[0];
    this.selectedOption.setTint(0xffff00);
    this.player1Selector.positionLeftBasedOn(this.fighters[0]);
    this.player2Selector.positionRightBasedOn(this.fighters[0]);
  }

  isOutOfBounds(index) {
    return this.fighters.length - 1 < index || index < 0;
  }

  createFighterSelection(rowsQuantity, fightersPerRow) {
    let lastSlice = 0;
    for (let indexRow = 1; indexRow <= rowsQuantity; indexRow++) {
      let fighterSliced = fighters.slice(lastSlice, fightersPerRow * indexRow);
      lastSlice += fightersPerRow;
      let row = [];
      let lastXPosition =
        this.conf.gameWidth / 2 -
        this.conf.characterSelectionDimensions.width * (fightersPerRow / 2 + 1);
      fighterSliced.forEach((fighter) => {
        let newSelection = new FighterSelection(
          this,
          lastXPosition + this.conf.characterSelectionDimensions.width,
          this.conf.gameHeight * 0.3 +
            this.conf.characterSelectionDimensions.height * (indexRow - 1),
          fighter.selectionTexture,
          fighter.fighterKey,
          0x0000ff,
          0xff0000
        ).setOrigin(0, 0);
        let newFrame = this.add
          .sprite(newSelection.x, newSelection.y, "whiteFrame")
          .setOrigin(0, 0);
        row.push(newSelection);
        lastXPosition =
          lastXPosition + this.conf.characterSelectionDimensions.width;
      });

      while (row.length != fightersPerRow) {
        let newSelection = new FighterSelection(
          this,
          lastXPosition + this.conf.characterSelectionDimensions.width,
          this.conf.gameHeight * 0.3 +
            this.conf.characterSelectionDimensions.height * (indexRow - 1),
          "interrogationMark",
          "",
          0x0000ff,
          0xff0000
        ).setOrigin(0, 0);
        let newFrame = this.add
          .sprite(newSelection.x, newSelection.y, "whiteFrame")
          .setOrigin(0, 0);
        row.push(newSelection);
        lastXPosition =
          lastXPosition + this.conf.characterSelectionDimensions.width;
      }
      this.fightersSelection.push(row);
    }
  }

  // Ver si resetear la escena o reusar un metodo como este
  // resetSelection() {
  //   this.fightInfo = {};
  //   this.selectedOption.clearTint();
  //   this.selectedOption = this.fighters[0];
  //   this.selectedOption.setTint(0xffff00);
  // }
}

const fighters = [
  { selectionTexture: "knightSelection", fighterKey: "knight" },
];

export default CharacterSelectionScene;
