import BaseMenuScene from "./base-menu-scene.js";

class CreditsScene extends BaseMenuScene {
  constructor() {
    super("CreditsScene", true);
  }

  init() {}

  preload() {}

  create() {
    super.create();
    this.header = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        "Programing and Design:",
        { fontSize: 40 }
      )
      .setOrigin(0.5, 1);
    this.author = this.add
      .text(
        this.scale.width / 2,
        this.header.y + this.header.height,
        "Martin Fondovila",
        {
          fontSize: 40,
        }
      )
      .setOrigin(0.5, 1);

    this.combo = this.input.keyboard.createCombo(
      [this.controls.moveUp, this.controls.moveDown, this.controls.moveDown],
      {
        maxKeyDelay: 1000,
        resetOnMatch: true,
        resetOnWrongKey: true,
        deleteOnMatch: false,
      }
    );

    this.carapan = this.add
      .sprite(
        this.scale.width / 2,
        this.author.y + this.author.height,
        "carapan",
        0
      )
      .setAlpha(0);

    this.disappearAudio = this.sound.add("disappear");

    // this.prueba2 = this.tweens.add({
    //   targets: [this.carapan],
    //   paused: true,
    //   alpha: 0,
    //   duration: 1000,
    //   onComplete: () => {
    //     this.prueba2.restart();
    //     this.prueba.restart();
    //   },
    // });
    // this.prueba = this.tweens.add({
    //   targets: [this.carapan],
    //   paused: true,
    //   onStart: () => {
    //     this.disappearAudio.play();
    //     this.carapan.anims.play("carapanIdle");
    //   },
    //   alpha: 1,
    //   duration: 1000,
    //   onComplete: () => {
    //     this.prueba2.play();
    //   },
    // });

    this.bro = this.tweens.timeline({
      targets: [this.carapan],
      loop: -1,
      paused: true,
      tweens: [
        {
          onStart: () => {
            this.disappearAudio.play();
            this.carapan.anims.play("carapanIdle");
          },
          alpha: 1,
          duration: 1000,
        },
        {
          onComplete: () => {
            console.log("COMPLETE");
          },
          alpha: 0,
          duration: 1000,
        },
      ],
    });
    this.input.keyboard.on(
      "keycombomatch",
      function (event) {
        console.log("secreto");
        this.bro.resume();
      },
      this
    );
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.back)) {
      this.scene.start("MainMenuScene");
    }
  }
}

export default CreditsScene;
