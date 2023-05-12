import * as Phaser from "phaser";

export class FighterSelection extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    texture,
    fighterKey,
    fighterAnimsKey,
    accessories,
    flipConf,
    selectSound,
    selectionCallback
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.fighterFace = scene.add.sprite(0, 0, texture, 0).setOrigin(0, 0);
    this.leftFrame = scene.add
      .sprite(0, 0, "knownFighterFrame", 0)
      .setOrigin(0, 0);
    this.rightFrame = scene.add
      .sprite(32, 0, "knownFighterFrame", 1)
      .setOrigin(0, 0);
    this.add([this.fighterFace, this.leftFrame, this.rightFrame]);
    this.fighterKey = fighterKey;
    this.fighterAnimsKey = fighterAnimsKey;
    // Cambiar nombre
    this.accessories = accessories;
    this.selectionCallback = selectionCallback;
    this.selectSound = selectSound;
    this.selected = false;
    this.static = false;
    this.flipConf = flipConf;
  }

  selectedIn(argsIn) {
    let { tint } = argsIn;
    if (this.selected) {
      this.rightFrame.setTint(tint);
    } else {
      this.rightFrame.setTint(tint);
      this.leftFrame.setTint(tint);
    }
  }

  selectedOut() {
    if (this.selected) {
      this.rightFrame.clearTint();
      this.rightFrame.setTint(this.leftFrame.tintTopLeft);
    } else {
      this.rightFrame.clearTint();
      this.leftFrame.clearTint();
    }
  }

  restart() {
    this.selected = false;
    this.rightFrame.clearTint();
    this.leftFrame.clearTint();
  }

  isSelected() {
    return this.selected;
  }

  canBeSelected() {
    return true;
  }

  handleSelect(playerSelector) {
    this.scene.fightConf[playerSelector.playerKey] = this.fighterKey;
    this.scene.fightConf[playerSelector.playerKey + "SelectionTexture"] =
      this.fighterFace.texture;
    this.scene.fightConf[playerSelector.playerKey + "Tint"] =
      playerSelector.tint;
    this.selectSound.play();
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
