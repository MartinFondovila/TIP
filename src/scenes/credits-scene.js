import BaseMenuScene from "./base-menu-scene.js";

class CreditsScene extends BaseMenuScene {
  constructor() {
    super("CreditsScene", false, false);
  }

  init() {}

  preload() {}

  create() {
    this.createControls();
    this.createCredits();
    this.createBackOption();
    this.createSecret();
    this.createAudios();
    this.createSecretTimeline();
    // VER COMO SOLUCIONAR LA REUTILIZACION
    this.input.keyboard.on(
      this.inputKeyboardEvents.COMBO_MATCH,
      function (event) {
        console.log("secret");
        this.tweens.resumeAll();
      },
      this
    );
  }

  update() {
    if (
      this.inputKeyboard.JustDown(this.controls.back) ||
      this.inputKeyboard.JustDown(this.controls.select)
    ) {
      this.switchScene("MainMenuScene");
      // que suene un ruidito de haber elegido
    }
  }

  createCredits() {
    this.header = this.add
      .text(
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        "Programing and Design:",
        { fontSize: 40 }
      )
      .setOrigin(0.5, 1);
    this.author = this.add
      .text(
        this.conf.gameWidth / 2,
        this.header.y + this.header.height,
        "Martin Fondovila",
        {
          fontSize: 40,
        }
      )
      .setOrigin(0.5, 1);
  }

  createSecret() {
    this.carapan = this.add
      .sprite(
        this.conf.gameWidth / 2,
        this.author.y + this.author.height,
        "carapan",
        0
      )
      .setAlpha(0);

    this.combo = this.input.keyboard.createCombo(
      [this.controls.moveUp, this.controls.moveDown, this.controls.moveDown],
      {
        maxKeyDelay: 1000,
        resetOnMatch: true,
        resetOnWrongKey: true,
        deleteOnMatch: false,
      }
    );
  }

  createAudios() {
    this.disappearAudio = this.sound.add("disappear");
  }

  createSecretTimeline() {
    this.secretTimeline = this.tweens.timeline({
      targets: [this.carapan],
      loop: -1,
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
            this.secretTimeline.pause();
            console.log(this.secretTimeline);
          },
          alpha: 0,
          duration: 1000,
        },
      ],
    });
    this.secretTimeline.on(
      "pause",
      () => {
        this.secretTimeline.data.forEach((tween) => {
          tween.pause();
        });
      },
      this
    );
  }

  createBackOption() {
    this.back = this.add
      .text(this.conf.gameWidth - 10, this.conf.gameHeight - 10, "Back", {
        fontSize: 40,
      })
      .setOrigin(1, 1)
      .setTint(0xffff00);
  }
}

export default CreditsScene;
