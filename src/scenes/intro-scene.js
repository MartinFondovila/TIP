import BaseScene from "./base-scene.js";

class IntroScene extends BaseScene {
  constructor() {
    super("IntroScene");
    this.clash = false;
    this.firstFist;
    this.secondFist;
  }

  create() {
    this.createBackground();
    this.createFists();
    this.createClash();
    this.createIntroText();
    this.createTimelines();
    this.createTweens();
    this.createFistsCollider();
    this.createAudios();

    this.add
      .sprite(this.conf.gameWidth / 2, this.conf.gameHeight / 2, "whiteFrame")
      .setTintFill(0x0000ff, null, 0x0000ff, null);

    this.input.keyboard.once(
      this.inputKeyboardEvents.ANY_KEY_DOWN,
      this.startIntro,
      this
    );
  }

  createBackground() {
    //this.add.image(0, 0, "introBackground").setOrigin(0, 0);
  }

  createFists() {
    this.firstFist = this.physics.add
      .sprite(
        this.conf.gameWidth * 0.2,
        this.conf.gameHeight * 0.4,
        "knightFist"
      )
      .setScale(4)
      .setOrigin(0, 0.5);
    this.secondFist = this.physics.add
      .sprite(
        this.conf.gameWidth - this.conf.gameWidth * 0.2,
        this.conf.gameHeight * 0.4,
        "ninjaFist"
      )
      .setScale(4)
      .setOrigin(1, 0.5)
      .setFlip(true);
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
        "PULSA CUALQUIER TECLA",
        { fontSize: 35 }
      )
      .setOrigin(0.5, 1);
  }

  createTimelines() {
    this.createIntroTextTimelines();
    this.createFistsTimelines();
  }

  createIntroTextTimelines() {
    this.blinkTextIdleTimeline = this.tweens.timeline({
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

    this.blinkTextActiveTimeline = this.tweens.createTimeline({
      targets: [this.introText],
      loop: 10,
      onStart: () => {
        this.introText.setTint(0xffff00);
        this.blinkAudio.play();
      },
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
    this.firstFistTimeline = this.tweens.createTimeline({
      targets: [this.firstFist],
      tweens: [
        {
          x: this.firstFist.x - this.conf.gameWidth * 0.15,
          y: {
            value: this.firstFist.y - 50,
            duration: 3000,
          },
          ease: "Power2",
          loop: 0,
          duration: 2000,
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

    this.secondFistTimeline = this.tweens.createTimeline({
      targets: [this.secondFist],
      tweens: [
        {
          x: this.secondFist.x + this.conf.gameWidth * 0.15,
          y: {
            value: this.secondFist.y - 50,
            duration: 3000,
          },
          ease: "Power2",
          loop: 0,
          duration: 2000,
        },
        {
          x: this.conf.gameWidth * 0.5 + this.secondFist.width * 4,
          y: this.secondFist.y,
          ease: "Back.easeInOut",
          loop: 0,
          duration: 500,
          onStart: () => {
            this.preClashAudio.play();
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

  createAudios() {
    this.clashAudio = this.sound.add("clashIntro");
    this.blinkAudio = this.sound.add("blinkIntro");
    this.preClashAudio = this.sound.add("preClash");
  }

  fistsDidntClash() {
    return !this.clash;
  }

  startIntro() {
    this.fistsIdleTween.stop();
    this.blinkTextIdleTimeline.stop();
    this.tweens.existing(this.blinkTextActiveTimeline);
    this.tweens.existing(this.firstFistTimeline);
    this.tweens.existing(this.secondFistTimeline);
  }

  clashOfFists() {
    this.clash = true;
    this.circle.setVisible(true);
    this.clashTween.play();
    this.clashAudio.play();
    this.cameras.main.shake(1000, 0.01);
  }
}

export default IntroScene;
