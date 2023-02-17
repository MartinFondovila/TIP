export class FighterSelectionContainerUnknown extends Phaser.GameObjects
  .Container {
  constructor(scene, x, y, texture, selectionCallback) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.fighterFace = scene.add.sprite(0, 0, texture, 0).setOrigin(0, 0);
    this.leftFrame = scene.add.sprite(0, 0, "fighterFrame", 0).setOrigin(0, 0);
    this.rightFrame = scene.add
      .sprite(32, 0, "fighterFrame", 1)
      .setOrigin(0, 0);
    this.add([this.fighterFace, this.leftFrame, this.rightFrame]);
    this.selectionCallback = selectionCallback;
    this.selected = false;
  }

  handleTint(tint) {
    this.rightFrame.setTint(tint);
    this.leftFrame.setTint(tint);
  }

  clearTint() {
    this.rightFrame.clearTint();
    this.leftFrame.clearTint();
  }

  handleSelect(playerSelector) {
    this.blinkAnimation(
      500,
      [this.leftFrame, this.rightFrame],
      playerSelector.tint
    );
    this.scene.sound.play("blocked");
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
        console.log(target);
        console.log(tint);
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
