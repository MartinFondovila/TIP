import BaseScene from "./base-scene.js";
import ShakePosition from "phaser3-rex-plugins/plugins/shakeposition.js";
import { FighterNameVersus } from "../classes/fighter-name-versus.js";

class VsScene extends BaseScene {
  constructor() {
    super("VsScene");
  }

  init(data) {
    this.fightConf = data;

    this.p1Versus = {
      fighterSelectionTexture: data.p1SelectionTexture,
      fighterName: data.p1,
      tint: data.p1Tint,
    };

    this.p2Versus = {
      fighterSelectionTexture: data.p2SelectionTexture,
      fighterName: data.p2,
      tint: data.p2Tint,
    };

    this.transitionDuration = data.transitionDuration;

    this.backgroundTexture = data.mapKey + "Mini";

    this.pixelatedTween = {};
  }

  create() {
    this.createSounds();
    this.createVolumeUpdaters();
    this.createVersus();
    this.createScreenSeparators();
    this.createFightersSelected();
    //this.createPixelatedEffect();
    this.createBackground();
    this.createShakers();
    this.createTweens();

    this.events.on(this.sceneEvents.WAKE, (event, data) => {
      this.scene.restart(data);
    });
    this.versusTimeline.play();
  }

  createScreenSeparators() {}

  createFightersSelected() {
    this.firstFighter = this.add
      .image(
        this.conf.gameWidth / 4,
        this.conf.gameHeight,
        this.p1Versus.fighterSelectionTexture
      )
      .setOrigin(0.5, 1)
      .setScale(5)
      .setVisible(false);
    // Parametrizar fighter y nombres
    this.firstFighterName = new FighterNameVersus(
      this,
      0,
      0,
      this.p1Versus.fighterName,
      "fighterNameFrame",
      40
    ).setVisible(false);
    this.firstFighterName.setX(
      this.firstFighter.displayWidth / 2 -
        this.firstFighterName.fighterNameFrame.width / 2
    );
    this.firstFighterName.setY(
      this.conf.gameHeight -
        this.conf.fighterSelectionDimensions.height * 5 -
        10 -
        this.firstFighterName.fighterNameFrame.height / 2
    );

    this.secondFighter = this.add
      .image(
        this.conf.gameWidth - this.conf.gameWidth / 4,
        this.conf.gameHeight,
        this.p2Versus.fighterSelectionTexture
      )
      .setOrigin(0.5, 1)
      .setScale(5)
      .setVisible(false);
    //.setFlipX(true);

    this.secondFighterName = new FighterNameVersus(
      this,
      0,
      0,
      this.p2Versus.fighterName,
      "fighterNameFrame",
      40
    ).setVisible(false);
    this.secondFighterName.setX(
      this.secondFighter.x - this.secondFighterName.fighterNameFrame.width / 2
    );
    this.secondFighterName.setY(
      this.conf.gameHeight -
        this.conf.fighterSelectionDimensions.height * 5 -
        10 -
        this.secondFighterName.fighterNameFrame.height / 2
    );
  }

  createVersus() {
    this.versus = new FighterNameVersus(
      this,
      0,
      0,
      "VS",
      "fighterNameFrame",
      80
    )
      .setVisible(false)
      .setDepth(100);
    this.versus.setX(
      this.conf.gameWidth / 2 - this.versus.fighterNameFrame.width / 2
    );
    this.versus.setY(
      this.conf.gameHeight / 2 - this.versus.fighterNameFrame.height / 2
    );
  }

  createPixelatedEffect() {
    this.pixelated = this.cameras.main.postFX.addPixelate(-1);
    (this.pixelatedTween.targets = this.pixelated),
      (this.pixelatedTween.duration = 700),
      (this.pixelatedTween.amount = 40),
      (this.pixelatedTween.onComplete = () => {
        this.cameras.main.fadeOut(100);
      });
  }

  createShakers() {
    this.firstFighter.shaker = new ShakePosition(this.firstFighter, {
      duration: 1000,
      axis: 1,
      magnitudeMode: 1,
      magnitude: 3,
    });
    this.secondFighter.shaker = new ShakePosition(this.secondFighter, {
      duration: 1000,
      axis: 1,
      magnitudeMode: 1,
      magnitude: 3,
    });
    this.firstFighterName.shaker = new ShakePosition(this.firstFighterName, {
      duration: 1000,
      axis: 1,
      magnitudeMode: 1,
      magnitude: 3,
    });
    this.secondFighterName.shaker = new ShakePosition(this.secondFighterName, {
      duration: 1000,
      axis: 1,
      magnitudeMode: 1,
      magnitude: 3,
    });
    this.versus.shaker = new ShakePosition(this.versus, {
      duration: 1000,
      axis: 1,
      magnitudeMode: 1,
      magnitude: 3,
    });
  }

  createTweens() {
    this.miniMapTween = {
      targets: this.backgroud,
      scale: 2,
      duration: this.transitionDuration,
      ease: "Expo.easeIn",
    };

    this.versusTimeline = this.add.timeline([
      {
        at: 0,
        tween: this.miniMapTween,
      },
      {
        at: this.transitionDuration,
        run: () => {
          this.versusSound.play();
          this.backgroud.shaker.shake();
        },
      },
      {
        at: this.transitionDuration + 1000,
        run: () => {
          this.firstFighter.setVisible(true);
          this.secondFighter.setVisible(true);
          this.firstFighterName.setVisible(true);
          this.secondFighterName.setVisible(true);
          this.firstFighter.shaker.shake();
          this.secondFighter.shaker.shake();
          this.firstFighterName.shaker.shake();
          this.secondFighterName.shaker.shake();
          this.versusSound.play();
        },
      },
      {
        at: this.transitionDuration + 2000,
        run: () => {
          this.versus.setVisible(true);
          this.versus.shaker.shake();
          this.versusSound.play();
        },
      },
      {
        at: this.transitionDuration + 3000,
        run: () => {
          this.createPixelatedEffect();
        },
      },
      {
        at: this.transitionDuration + 3000,
        tween: this.pixelatedTween,
      },
      {
        at: this.transitionDuration + 4500,
        run: () => {
          this.scene.moveAbove(this.keyName, "FightScene");
          this.scene.run("FightScene", this.fightConf);
          this.scene.sleep();
        },
      },
    ]);
  }

  createBackground() {
    this.backgroud = this.add
      .image(
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        this.backgroundTexture
      )
      .setDepth(-1);

    this.backgroud.shaker = new ShakePosition(this.backgroud, {
      duration: 1000,
      axis: 1,
      magnitudeMode: 1,
      magnitude: 3,
    });
  }

  createSounds() {
    this.versusSound = this.sound.add("versus");

    this.sfxSounds = [this.versusSound];
  }

  update() {}
}

export default VsScene;
