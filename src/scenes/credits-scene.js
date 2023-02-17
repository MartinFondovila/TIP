import BaseMenuScene from "./base-menu-scene.js";
import { SECRET_COMBO } from "../utils.js";

// PROBLEMAS A RESOLVER, CUANDO SE HACE ENABLED VARIAS VECES, SIEMPRE HAY UNA TECLA QUE SE TIENE QUE APRETAR DOS VECES PARA QUE FUNCIONE
// NO SE COMO REINICIAR LOS TWEEN CUANDO SE SALE DURANTE SU EJECUCION
class CreditsScene extends BaseMenuScene {
  constructor() {
    super("CreditsScene", false, false);
    this.comboKeys = SECRET_COMBO.map((combo) => combo.key);
    this.arrowsSprites = [];
    this.currentComboProgress = 0;
    this.arrowsAlpha = 0.1;
    this.clearArrowsTimeout;
  }

  init() {}

  preload() {}

  create() {
    this.createControls();
    this.createCredits();
    this.createBackOption();
    this.createSecret();
    this.createAudios();
    this.createSecretTweens();
    this.createSecretArrows();
    this.createListeners();
  }

  update() {
    if (this.inputKeyboard.JustDown(this.controls.moveUp)) {
      this.handleComboInput(this.controls.moveUp.keyCode);
    } else if (this.inputKeyboard.JustDown(this.controls.moveRight)) {
      this.handleComboInput(this.controls.moveRight.keyCode);
    } else if (this.inputKeyboard.JustDown(this.controls.moveDown)) {
      this.handleComboInput(this.controls.moveDown.keyCode);
    } else if (this.inputKeyboard.JustDown(this.controls.moveLeft)) {
      this.handleComboInput(this.controls.moveLeft.keyCode);
    }

    if (
      this.inputKeyboard.JustDown(this.controls.back) ||
      this.inputKeyboard.JustDown(this.controls.select)
    ) {
      this.selectSound.play();
      this.switchScene("MainMenuScene");
      this.resetDefault();
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
        "Martín Fondovila",
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

    this.combo = this.input.keyboard.createCombo(this.comboKeys, {
      maxKeyDelay: 1000,
      resetOnMatch: true,
      resetOnWrongKey: true,
      deleteOnMatch: false,
    });
  }

  createAudios() {
    this.disappearSound = this.sound.add("disappear");
    this.selectSound = this.sound.add("select");
  }

  createSecretTweens() {
    this.secretTweenOut = this.tweens.create({
      targets: [this.carapan],
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        this.resetArrowsAlpha();
        this.enableArrows();
      },
    });

    this.secretTweenIn = this.tweens.create({
      targets: [this.carapan],
      onActive: () => {
        this.disappearSound.play();
        this.carapan.anims.play("carapanIdle");
      },
      alpha: 1,
      duration: 1000,
      onComplete: () => {
        this.secretTweenOut.play();
      },
    });
  }

  // Ver como completar
  createSecretArrows() {
    let lastXPosition = 10;
    SECRET_COMBO.forEach((combo) => {
      let newArrow = this.add
        .sprite(
          lastXPosition,
          this.conf.gameHeight - 10,
          combo.texture,
          combo.frame
        )
        .setOrigin(0, 1)
        .setAlpha(0.1);
      newArrow.key = combo.key;
      this.arrowsSprites.push(newArrow);
      lastXPosition = lastXPosition + this.conf.arrowsDimensions.width + 10;
    });
  }

  handleComboInput(key) {
    let actualComboSprite = this.arrowsSprites[this.currentComboProgress];
    if (key == actualComboSprite.key) {
      if (this.clearArrowsTimeout) {
        clearTimeout(this.clearArrowsTimeout);
      }
      this.currentComboProgress += 1;
      actualComboSprite.setAlpha(1);
      this.clearArrowsTimeout = setTimeout(() => {
        this.disableArrows();
        this.resetArrowsAlpha();
        this.currentComboProgress = 0;
        this.clearArrowsTimeout = null;
        console.log("timeout");
        this.enableArrows();
      }, 1000);
    } else {
      if (this.clearArrowsTimeout) {
        clearTimeout(this.clearArrowsTimeout);
        this.clearArrowsTimeout = null;
      }
      this.resetArrowsAlpha();
      this.currentComboProgress = 0;
    }
    if (this.isTheLastComboKey()) {
      this.disableArrows();
      clearTimeout(this.clearArrowsTimeout);
      this.currentComboProgress = 0;
      this.secretTweenIn.play();
    }
  }

  createListeners() {
    this.events.on(this.sceneEvents.WAKE, () => {}, this);
  }

  isTheLastComboKey() {
    return this.currentComboProgress - 1 == this.arrowsSprites.length - 1;
  }

  // Buscar mejor forma
  disableArrows() {
    this.controls.moveLeft.enabled = false;
    this.controls.moveRight.enabled = false;
    this.controls.moveUp.enabled = false;
    this.controls.moveDown.enabled = false;
  }

  enableArrows() {
    this.controls.moveLeft.enabled = true;
    this.controls.moveRight.enabled = true;
    this.controls.moveUp.enabled = true;
    this.controls.moveDown.enabled = true;
  }

  resetArrowsAlpha() {
    this.arrowsSprites.forEach((arrow) => arrow.setAlpha(this.arrowsAlpha));
  }

  resetDefault() {
    if (this.clearArrowsTimeout) {
      clearTimeout(this.clearArrowsTimeout);
      this.clearArrowsTimeout = null;
      this.currentComboProgress = 0;
      this.resetArrowsAlpha();
    }
    if (this.disappearSound.isPlaying) {
      this.disappearSound.stop();
    }
    if (this.secretTweenIn.isPlaying() || this.secretTweenOut.isPlaying()) {
      this.secretTweenIn.restart();
      this.secretTweenOut.restart();
    }
  }
}

export default CreditsScene;
