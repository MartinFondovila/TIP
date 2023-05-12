import BaseScene from "./base-scene.js";
import { SFX_VOLUME } from "../classes/volume-states/sfx-volume-state.js";
import SoundFade from "phaser3-rex-plugins/plugins/soundfade.js";

class IntroScene extends BaseScene {
  constructor() {
    super("IntroScene");
    this.clash = false;
    this.firstFist;
    this.secondFist;
  }

  create() {
    //this.createBackground();
    this.createFists();
    this.createClash();
    this.createIntroText();
    this.createTimelines();
    this.createTweens();
    this.createFistsCollider();
    this.createSounds();

    this.windSound.play({ loop: -1, volume: SFX_VOLUME.sfxVolume / 8 });
    this.input.keyboard.once(
      this.inputKeyboardEvents.ANY_KEY_DOWN,
      this.startIntro,
      this
    );
  }

  createFists() {
    this.firstFist = this.physics.add
      .sprite(
        this.conf.gameWidth * 0.2,
        this.conf.gameHeight * 0.4,
        "knightFist"
      )
      .setScale(4)
      .setOrigin(0, 0.5)
      .setBodySize(
        this.conf.fistDimensions.width,
        this.conf.fistDimensions.height
      );
    this.secondFist = this.physics.add
      .sprite(
        this.conf.gameWidth - this.conf.gameWidth * 0.2,
        this.conf.gameHeight * 0.4,
        "ninjaFist"
      )
      .setScale(4)
      .setOrigin(1, 0.5)
      .setFlip(true)
      .setBodySize(
        this.conf.fistDimensions.width,
        this.conf.fistDimensions.height
      );
  }

  createClash() {
    this.circle = this.add
      .sprite(
        this.conf.gameWidth * 0.5,
        this.conf.gameHeight * 0.4,
        "introClash"
      )
      .setVisible(false)
      .setDepth(10);
  }

  createIntroText() {
    this.introText = this.add
      .text(
        this.conf.gameWidth * 0.5,
        this.conf.gameHeight - 40,
        "PRESS ANY KEY",
        { fontSize: 35 }
      )
      .setOrigin(0.5, 1);
  }

  createTimelines() {
    this.createIntroTextTimelines();
    this.createFistsTimelines();
  }

  createIntroTextTimelines() {
    this.blinkTextIdleTimeline = this.tweens.chain({
      targets: [this.introText],
      loop: -1,
      tweens: [
        {
          alpha: 0,
          duration: 0,
          delay: 1000,
        },
        {
          alpha: 1,
          duration: 0,
          delay: 1000,
        },
      ],
    });

    this.blinkTextActiveTimeline = this.tweens.chain({
      targets: [this.introText],
      loop: 10,
      // Ver porque onStart no se activa
      // onStart: () => {
      //   console.log("start");
      // },
      onResume: () => {
        this.introText.setTint(0xffff00);
        this.introStartSound.play();
      },
      paused: true,
      tweens: [
        {
          alpha: 0,
          duration: 0,
          delay: 25,
        },
        {
          alpha: 1,
          duration: 0,
          delay: 25,
        },
      ],
    });
  }

  createFistsTimelines() {
    this.firstFistTimeline = this.tweens.chain({
      targets: [this.firstFist],
      paused: true,
      tweens: [
        {
          x: this.firstFist.x - this.conf.gameWidth * 0.15,
          y: {
            value: this.firstFist.y - 50,
            duration: 2000,
          },
          ease: "Power2",
          loop: 0,
          duration: 1500,
        },
        {
          x: this.conf.gameWidth * 0.5 - this.firstFist.width * 4,
          y: this.firstFist.y,
          ease: "Back.easeInOut",
          loop: 0,
          duration: 500,
        },
      ],
    });

    this.secondFistTimeline = this.tweens.chain({
      targets: [this.secondFist],
      paused: true,
      tweens: [
        {
          x: this.secondFist.x + this.conf.gameWidth * 0.15,
          y: {
            value: this.secondFist.y - 50,
            duration: 2000,
          },
          ease: "Power2",
          loop: 0,
          duration: 1500,
        },
        {
          x: this.conf.gameWidth * 0.5 + this.secondFist.width * 4,
          y: this.secondFist.y,
          ease: "Back.easeInOut",
          loop: 0,
          duration: 500,
          onStart: () => {
            this.preClashSound.play();
          },
        },
      ],
    });
  }

  createTweens() {
    this.clashTween = this.tweens.create({
      targets: [this.circle],
      scale: 60,
      angle: 360,
      duration: 1000,
      onComplete: () => {
        this.scene.start("MainMenuScene");
      },
    });

    this.fistsIdleTween = this.tweens.add({
      targets: [this.firstFist, this.secondFist],
      y: this.firstFist.y + 2,
      yoyo: true,
      loop: -1,
      duration: 700,
    });
  }

  createFistsCollider() {
    this.physics.add.collider(
      this.firstFist,
      this.secondFist,
      this.clashOfFists,
      this.fistsDidntClash,
      this
    );
  }

  createSounds() {
    this.clashSound = this.sound.add("introClash");
    this.introStartSound = this.sound.add("introStart");
    this.preClashSound = this.sound.add("introPreClash");
    this.windSound = this.sound.add("introWind");

    this.sfxSounds = [
      this.clashSound,
      this.introStartSound,
      this.preClashSound,
      this.windSound,
    ];

    this.updateSFXVolume(SFX_VOLUME.sfxVolume);
  }

  fistsDidntClash() {
    return !this.clash;
  }

  startIntro() {
    this.fistsIdleTween.stop();
    this.blinkTextIdleTimeline.stop();
    SoundFade.fadeOut(this.windSound, 1300);
    this.blinkTextActiveTimeline.resume();
    this.firstFistTimeline.play();
    this.secondFistTimeline.play();
  }

  clashOfFists() {
    this.clash = true;
    this.circle.setVisible(true);
    this.tweens.existing(this.clashTween);
    this.clashSound.play();
    this.cameras.main.shake(1000, 0.01);
  }
}

export default IntroScene;
