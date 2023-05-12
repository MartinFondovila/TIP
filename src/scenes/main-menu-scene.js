import BaseMenuScene from "./base-menu-scene.js";
import { MAIN_MENU_OPTIONS } from "../utils.js";
import { MenuSwitchOption } from "../classes/menu-switch-option.js";
import NextOptionSimpleArrayStrategy from "../classes/next-option-simple-array-strategy.js";
import ShakePosition from "phaser3-rex-plugins/plugins/shakeposition.js";

class MainMenuScene extends BaseMenuScene {
  constructor() {
    super("MainMenuScene");
    this.selectedOption;
    this.fists = [];
    // De esto se puede hacer un singleton
    this.nextOptionStrategy = new NextOptionSimpleArrayStrategy();
  }

  create() {
    this.createBackground();
    this.createSounds();
    this.createVolumeUpdaters();
    this.createControls();
    this.disableControls();
    this.createFists();
    this.createLogo();
    this.createParticles();
    this.createTweens();
    this.createOptions();
    this.setDefaultOption();
    this.introEffect();

    this.logo.on(
      "animationcomplete",
      function (anim, frame) {
        this.emit("animationcomplete_" + anim.key, anim, frame);
      },
      this.logo
    );
    this.logo.once(
      "animationcomplete_" + "logoCracking",
      function () {
        this.enableControls();
        this.emmiter.stop();
      },
      this
    );
    this.events.once(this.sceneEvents.SLEEP, () => {
      this.emmiter.killAll();
    });
  }

  createFists() {
    this.fists.push(
      this.add
        .sprite(
          this.conf.gameWidth * 0.5 -
            this.conf.fistDimensions.sprite.width * 4 -
            4,
          this.conf.gameHeight * 0.45,
          "knightFist"
        )
        .setScale(4)
        .setOrigin(0, 0.5)
    );
    this.fists.push(
      this.add
        .sprite(
          this.conf.gameWidth * 0.5 +
            this.conf.fistDimensions.sprite.width * 4 +
            4,
          this.conf.gameHeight * 0.45,
          "ninjaFist"
        )
        .setScale(4)
        .setFlip(true)
        .setOrigin(1, 0.5)
    );
  }

  createLogo() {
    this.logo = this.add
      .sprite(this.conf.gameWidth * 0.5, 140, "clashOfFistsLogo", 0)
      .setOrigin(0.5, 1)
      .setAlpha(0)
      .setScale(1.5)
      .setDepth(20);
  }

  createParticles() {
    const deathZone = new Phaser.Geom.Rectangle(
      0,
      this.conf.gameHeight - 10,
      this.conf.gameWidth,
      10
    );

    this.emmiter = this.add
      .particles(0, 120, "purpleParticle", {
        x: { min: 80, max: 560 },
        quantity: 2,
        lifespan: 4000,
        scale: { start: 1.2, end: 0.1 },
        gravityY: 800,
        deathZone: deathZone,
      })
      .stop();
  }

  createTweens() {
    this.createFistsTween();
    this.createLogoTween();
  }

  createFistsTween() {
    this.tweens.add({
      targets: this.fists,
      y: this.fists[0].y + 2,
      yoyo: true,
      loop: -1,
      duration: 700,
    });
  }

  createLogoTween() {
    this.shakeLogo = new ShakePosition(this.logo, {
      duration: 500,
      axis: 1,
      magnitudeMode: 1,
      magnitude: 10,
    });
    this.tweens.add({
      targets: [this.logo],
      alpha: 1,
      duration: 2000,
      onComplete: () => {
        this.shakeLogo.shake();
        this.logo.play("logoCracking");
        this.logoCrackingSound.play();
        this.emmiter.start();
      },
      onCompleteScope: this,
    });
  }

  createOptions() {
    let lastOptionPositionY = 0;

    MAIN_MENU_OPTIONS.forEach((option) => {
      this.options.push(
        new MenuSwitchOption(
          this,
          this.conf.gameWidth / 2,
          this.conf.gameHeight * 0.67 + lastOptionPositionY,
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

  createSounds() {
    this.changeOptionSound = this.sound.add("changeOption");
    this.selectSound = this.sound.add("select");
    this.logoCrackingSound = this.sound.add("logoCracking");

    this.sfxSounds = [
      this.changeOptionSound,
      this.selectSound,
      this.logoCrackingSound,
    ];
  }

  introEffect() {
    this.cameras.main.fadeIn(2000, 255, 255, 255);
    //.on(this.camerasEvents.FADE_IN_COMPLETE, this.enableControls, this);
    this.cameras.main.shake(2000, 0.01);
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
    }
  }
}

export default MainMenuScene;
