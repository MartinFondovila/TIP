import * as Phaser from "phaser";

export class PreTimer extends Phaser.GameObjects.Text {
  constructor(scene, x, y, time, styles, timeOver, contextOfTimeOver) {
    super(scene, x, y, time, styles);
    this.timeLeft = time;
    this.timeOver = timeOver;
    // Esto del contexto esta medio feo, revisarlo
    this.contextOfTimeOver = contextOfTimeOver;
    scene.add.existing(this);
  }

  refreshTimer() {
    if (this.stop) {
      return;
    }

    this.timeLeft -= 1;
    this.setText(this.timeLeft);
    if (this.runOutOfTime()) {
      this.setText("FIGHT");
      this.scene.time.delayedCall(
        1000,
        this.timeOver,
        [],
        this.contextOfTimeOver
      );
    } else {
      this.scene.time.delayedCall(1000, this.refreshTimer, [], this);
    }
  }

  startTimer() {
    this.stop = false;
    this.scene.time.delayedCall(1000, this.refreshTimer, [], this);
  }

  stopTimer() {
    this.stop = true;
  }

  runOutOfTime() {
    return this.timeLeft === 0;
  }

  hideTimer() {
    this.visible = false;
  }

  showTimer() {
    this.visible = true;
  }
}
