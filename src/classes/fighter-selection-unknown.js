import * as Phaser from "phaser";

export class FighterSelectionUnknown extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    texture,
    fighterAnimsKey,
    fighterKey,
    flipConf,
    blockedSound,
    selectionCallback
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.fighterFace = scene.add.sprite(0, 0, texture, 0).setOrigin(0, 0);
    this.frame = scene.add
      .sprite(0, 0, "unknownFighterFrame", 0)
      .setOrigin(0, 0);
    this.add([this.fighterFace, this.frame]);
    this.selectionCallback = selectionCallback;
    this.blockedSound = blockedSound;
    this.fighterAnimsKey = fighterAnimsKey;
    this.fighterKey = fighterKey;
    this.static = true;
    this.flipConf = flipConf;
    this.accessories = [];
  }

  selectedIn(argsIn) {
    let { tint } = argsIn;
    this.frame.setTint(tint);
  }

  selectedOut() {
    this.frame.clearTint();
  }

  restart() {}

  isSelected() {
    return false;
  }

  canBeSelected() {
    return false;
  }

  handleSelect(playerSelector) {
    this.blinkAnimation(500, [this.frame], playerSelector.tint);
    this.blockedSound.play();
  }

  blinkAnimation(milliseconds, targets, tint) {
    let interval = setInterval(() => {
      targets.forEach((target) => {
        target.clearTint();
      });
    }, 100);
    let interval2 = setInterval(() => {
      targets.forEach((target) => {
        target.setTint(tint);
      });
    }, 150);
    this.scene.time.delayedCall(
      milliseconds,
      () => {
        clearInterval(interval);
        clearInterval(interval2);
        targets.forEach((target) => {
          target.setTint(tint);
        });
        this.selectionCallback.bind(this.scene)();
      },
      [],
      this
    );
  }
}
