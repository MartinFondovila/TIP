import BaseMenuScene from "./base-menu-scene";
import { MenuSwitchOption } from "../classes/menu-switch-option";
import NextOptionSimpleArrayStrategy from "../classes/next-option-simple-array-strategy";
import { END_FIGHT_MENU } from "../utils";
import { FighterNameVersus } from "../classes/fighter-name-versus";
import { MenuOption } from "../classes/menu-option";

class EndFightMenuScene extends BaseMenuScene {
  constructor() {
    super("EndFightMenuScene", false, false);
    this.nextOptionStrategy = new NextOptionSimpleArrayStrategy();
  }

  init() {}

  preload() {}

  create() {
    this.createControls();
    this.createBackground();
    this.createVolumeUpdaters();
    this.createSounds();
    this.createOptions();
    this.createSceneTitle();
    this.setDefaultOption();

    this.events.on(this.sceneEvents.WAKE, (event, data) => {
      this.setDefaultOption();
    });
  }

  createOptions() {
    let lastOptionPositionY = 0;

    this.options.push(
      new MenuOption(
        this,
        this.conf.gameWidth / 2,
        this.conf.gameHeight * 0.5 + lastOptionPositionY,
        "REMATCH",
        () => {
          this.scene.moveAbove(this.keyName, "FightScene");
          this.scene.run("FightScene");
          this.scene.sleep();
        },
        0xffff00,
        this.selectSound,
        { fontSize: 40 },
        { sceneKey: this.keyName }
      )
        .setOrigin(0.5, 1)
        .setDepth(15)
    );
    lastOptionPositionY += 50;

    END_FIGHT_MENU.forEach((option) => {
      this.options.push(
        new MenuSwitchOption(
          this,
          this.conf.gameWidth / 2,
          this.conf.gameHeight * 0.5 + lastOptionPositionY,
          option.text,
          option.scene,
          option.selectedTint,
          this.selectSound,
          option.styles,
          { sceneKey: this.keyName }
        )
          .setOrigin(0.5, 1)
          .setDepth(15)
      );
      lastOptionPositionY += 50;
    });
  }

  createSceneTitle() {
    this.sceneTitle = new FighterNameVersus(
      this,
      0,
      0,
      "AWESOME FIGHT",
      "fighterNameFrame",
      60
    );
    this.sceneTitle.setX(
      this.conf.gameWidth / 2 - this.sceneTitle.fighterNameFrame.width / 2
    );
    this.sceneTitle.setY(40);
  }

  createSounds() {
    this.changeOptionSound = this.sound.add("changeOption");
    this.selectSound = this.sound.add("select");

    this.sfxSounds = [this.changeOptionSound, this.selectSound];
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.moveUp)) {
      this.setSelectedOption(
        this.nextOptionStrategy.getNextOption(
          "UP",
          this.options,
          this.selectedOption
        )
      );
      this.changeOptionSound.play();
    } else if (this.inputKeyboard.JustDown(this.controls.moveDown)) {
      this.setSelectedOption(
        this.nextOptionStrategy.getNextOption(
          "DOWN",
          this.options,
          this.selectedOption
        )
      );
      this.changeOptionSound.play();
    } else if (this.inputKeyboard.JustDown(this.controls.select)) {
      this.handleSelectOnOption();
    } else if (this.inputKeyboard.JustDown(this.controls.back)) {
      this.options[this.options.length - 1].handleSelect();
    }
  }
}

export default EndFightMenuScene;
