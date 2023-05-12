import { PlayerSelector } from "../classes/player-selector.js";
import BaseMenuScene from "./base-menu-scene.js";
import { FighterSelection } from "../classes/fighter-selection.js";
import { FighterSelectionUnknown } from "../classes/fighter-selection-unknown.js";
import { MenuSwitchOption } from "../classes/menu-switch-option.js";
import { FIGHTERS, PLAYERS_SELECTORS } from "../utils.js";
import NextOptionBidimensionalArrayStrategy from "../classes/next-option-bidimensional-array-strategy.js";
import { FighterNameVersus } from "../classes/fighter-name-versus.js";

// Se podrian simplificar muchas cosas si solo reseteo las escenas en lugar de volver las cosas a default de forma manual
// this.scene.reset()
// testear en la scene de test si se crean muchos objetos o se mantienen listas a lo largo de los resets
class FighterSelectionScene extends BaseMenuScene {
  constructor() {
    super("FighterSelectionScene", false, false);
    this.playerSelectors = [];
    this.actualPlayerSelector;
    this.fightConf = {};
    this.otherKeyPressed = false;
    // Pasar a un singleton
    this.nextOptionStrategy = new NextOptionBidimensionalArrayStrategy();
  }

  create() {
    this.createBackground();
    this.createSounds();
    this.createVolumeUpdaters();
    this.createControls();
    this.createPlayersSelectors();
    this.createBackOption();
    this.createFighterSelection(3, 3, 1.2);
    this.setDefaultOption();
    this.createSceneTitle();

    this.events.addListener(
      this.sceneEvents.SLEEP,
      () => {
        this.restartPlayersSelectors();
        this.setDefaultOption();
      },
      this
    );

    // Ver esta parte
    this.events.addListener(
      this.sceneEvents.WAKE,
      () => {
        this.enableControls();
      },
      this
    );
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.back)) {
      this.handleBack();
    } else if (this.inputKeyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOption("DOWN");
    } else if (this.inputKeyboard.JustDown(this.controls.moveLeft)) {
      this.handleChangeOption("LEFT");
    } else if (this.inputKeyboard.JustDown(this.controls.moveRight)) {
      this.handleChangeOption("RIGHT");
    } else if (this.inputKeyboard.JustDown(this.controls.select)) {
      this.handleSelectOnOption();
    } else if (this.inputKeyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOption("UP");
    }
  }

  createSceneTitle() {
    this.sceneTitle = new FighterNameVersus(
      this,
      0,
      0,
      "CHOOSE YOUR FIGHTER",
      "fighterNameFrame",
      40
    );
    this.sceneTitle.setX(
      this.conf.gameWidth / 2 - this.sceneTitle.fighterNameFrame.width / 2
    );
    this.sceneTitle.setY(17);
  }

  createPlayersSelectors() {
    let playerNumber = 1;
    PLAYERS_SELECTORS.forEach((playerSelectorConf) => {
      let playerSelector = new PlayerSelector(
        this,
        "p" + playerNumber,
        playerSelectorConf.tint,
        playerSelectorConf.previewX,
        playerSelectorConf.previewY,
        playerSelectorConf.previewFlip
      );
      this.playerSelectors.push(playerSelector);
      playerNumber += 1;
    });
    this.actualPlayerSelector = this.playerSelectors[0];
  }

  setDefaultOption() {
    super.setDefaultOption({ tint: this.actualPlayerSelector.tint });
    this.actualPlayerSelector.setFighterSelected(this.selectedOption);
  }

  // BUG SI SE SPAMEA MUY RAPIDO ESQ Y ENTER ENTRE VERSUS Y MENU PRINCIPAL
  // BUG SI SE APRETA AL MISMO TIEMPO ESQ Y ENTER SE HANDELEA AMBOS, ESTO NO DEBERIA PASAR
  handleBack() {
    this.disableControls();
    if (!this.thereIsCharactersSelected()) {
      this.backOption.handleSelect();
    } else {
      this.unselectSound.play();
      this.actualPlayerSelector.stopPreview();
      this.actualPlayerSelector = this.previousSelector();
      this.actualPlayerSelector.restart();
      this.setSelectedOption(this.actualPlayerSelector.fighterSelected, {
        tint: this.actualPlayerSelector.tint,
      });
      this.actualPlayerSelector.setFighterSelected(this.selectedOption);
    }
    this.enableControls();
  }

  previousSelector() {
    if (this.playerSelectors.indexOf(this.actualPlayerSelector) == 0) {
      return this.playerSelectors[0];
    } else {
      return this.playerSelectors[
        this.playerSelectors.indexOf(this.actualPlayerSelector) - 1
      ];
    }
  }

  handleSelectOnOption() {
    //this.otherKeyPressed = true;
    this.disableControls();
    this.actualPlayerSelector.handleSelect();
  }

  handleChangeOption(direction) {
    this.changeOptionSound.play();
    this.setSelectedOption(
      this.nextOptionStrategy.getNextOption(
        direction,
        this.options,
        this.selectedOption
      ),
      { tint: this.actualPlayerSelector.tint }
    );
    this.actualPlayerSelector.setFighterSelected(this.selectedOption);
  }

  handleFighterSelectionAux() {
    if (this.isSelectionComplete()) {
      this.scene.moveAbove(this.keyName, "MapSelectionScene");
      this.scene.run("MapSelectionScene", this.fightConf);
      this.scene.sleep();
      return;
    }
    if (this.actualPlayerSelector.selectionComplete) {
      this.actualPlayerSelector = this.nextPlayerSelector();
      this.setDefaultOption({ tint: this.actualPlayerSelector.tint });
    }
    this.enableControls();
  }

  restartPlayersSelectors() {
    this.playerSelectors.forEach((playerSelector) => {
      playerSelector.restart();
      playerSelector.stopPreview();
    });
    this.actualPlayerSelector = this.playerSelectors[0];
    super.setDefaultOption({ tint: this.actualPlayerSelector.tint });
    this.actualPlayerSelector.setFighterSelected(this.selectedOption);
  }

  nextPlayerSelector() {
    return this.playerSelectors[
      this.playerSelectors.indexOf(this.actualPlayerSelector) + 1
    ];
  }

  createFighterSelection(rowsQuantity, fightersPerRow, scale) {
    let lastSlice = 0;
    let YPosition = this.conf.gameHeight * 0.2;

    for (let indexRow = 1; indexRow <= rowsQuantity; indexRow++) {
      let fighterSliced = FIGHTERS.slice(lastSlice, fightersPerRow * indexRow);
      lastSlice += fightersPerRow;
      let row = [];
      let lastXPosition =
        this.conf.gameWidth / 2 -
        this.conf.fighterSelectionDimensions.width *
          scale *
          (fightersPerRow / 2 + 1);
      fighterSliced.forEach((fighter) => {
        let newSelection = new FighterSelection(
          this,
          lastXPosition + this.conf.fighterSelectionDimensions.width * scale,
          YPosition,
          fighter.selectionTexture,
          fighter.fighterKey,
          fighter.fighterAnimsKey,
          fighter.accessories,
          fighter.flipConf,
          this.selectFighterSound,
          this.handleFighterSelectionAux
        ).setScale(1.2);
        row.push(newSelection);
        lastXPosition =
          lastXPosition +
          this.conf.fighterSelectionDimensions.width * scale +
          2;
      });

      while (row.length != fightersPerRow) {
        let newSelection = new FighterSelectionUnknown(
          this,
          lastXPosition + this.conf.fighterSelectionDimensions.width * scale,
          YPosition,
          "questionMarkSelectionPreview",
          "unknownSelectionPreview",
          "UNKOWN",
          {
            onlyFlipOnLeft: false,
            onlyFlipOnRight: true,
            flip: true,
          },
          this.selectFighterBlockedSound,
          this.handleFighterSelectionAux
        ).setScale(1.2);
        row.push(newSelection);
        lastXPosition =
          lastXPosition +
          this.conf.fighterSelectionDimensions.width * scale +
          2;
      }
      this.options.push(row);
      YPosition =
        this.conf.gameHeight * 0.2 +
        this.conf.fighterSelectionDimensions.height * scale * indexRow +
        2 * indexRow;
    }
  }

  isSelectionComplete() {
    return this.playerSelectors.every((selector) => selector.selectionComplete);
  }

  thereIsCharactersSelected() {
    return this.playerSelectors.some((selector) => selector.selectionComplete);
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

  createSounds() {
    this.selectSound = this.sound.add("select");
    this.selectFighterSound = this.sound.add("selectFighter");
    this.unselectSound = this.sound.add("unselect");
    this.changeOptionSound = this.sound.add("changeOption");
    this.selectFighterBlockedSound = this.sound.add("selectFighterBlocked");

    this.sfxSounds = [
      this.selectSound,
      this.unselectSound,
      this.selectFighterSound,
      this.changeOptionSound,
      this.selectFighterBlockedSound,
    ];
  }
}

export default FighterSelectionScene;
