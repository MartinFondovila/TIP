export class MatchTimer extends Phaser.GameObjects.Text {
  constructor(scene, x, y, time, styles, gameover, contextOfGameOver) {
    super(scene, x, y, time, styles);
    this.timeLeft = time;
    this.gameover = gameover;
    // Esto del contexto esta medio feo, revisarlo
    this.contextOfGameOver = contextOfGameOver;
    this.stop = false;
    scene.add.existing(this);
  }

  refreshTimer() {
    if (this.stop) {
      return;
    }

    this.timeLeft -= 1;
    this.setText(this.timeLeft);
    if (this.runOutOfTime()) {
      this.gameover.call(this.contextOfGameOver);
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
