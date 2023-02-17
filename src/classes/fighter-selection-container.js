export class FighterSelectionContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, texture, fighterKey, selectionCallback) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.fighterFace = scene.add.sprite(0, 0, texture, 0).setOrigin(0, 0);
    this.leftFrame = scene.add.sprite(0, 0, "fighterFrame", 0).setOrigin(0, 0);
    this.rightFrame = scene.add
      .sprite(32, 0, "fighterFrame", 1)
      .setOrigin(0, 0);
    this.add([this.fighterFace, this.leftFrame, this.rightFrame]);
    this.fighterKey = fighterKey;
    this.selectionCallback = selectionCallback;
    this.selected = false;
  }

  handleTint(tint) {
    if (this.selected) {
      this.rightFrame.setTint(tint);
    } else {
      this.rightFrame.setTint(tint);
      this.leftFrame.setTint(tint);
    }
  }

  clearTint() {
    if (this.selected) {
      this.rightFrame.clearTint();
      this.rightFrame.setTint(this.leftFrame.tintTopLeft);
    } else {
      this.rightFrame.clearTint();
      this.leftFrame.clearTint();
    }
  }

  handleSelect(playerSelector) {
    this.scene.fightConf[playerSelector.playerKey] = this.fighterKey;
    this.scene.sound.play("selectFighter");
    if (this.selected) {
      this.blinkAnimation(1000, [this.rightFrame], playerSelector.tint);
    } else {
      this.blinkAnimation(
        1000,
        [this.leftFrame, this.rightFrame],
        playerSelector.tint
      );
      this.selected = true;
    }
    playerSelector.setSelectionComplete(true);
  }

  handleUnselect() {
    if (this.mirror) {
      this.mirror = false;
    } else if (this.selected) {
      this.selected = false;
    }
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
    }, 200);
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
