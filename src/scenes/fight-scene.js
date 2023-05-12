import { MatchTimer } from "../classes/timer/match-timer.js";
import { PreTimer } from "../classes/timer/pre-timer.js";
import { FighterNameVersus } from "../classes/fighter-name-versus.js";
import BaseScene from "./base-scene.js";
import DynamicFighter from "../classes/fighters/dinamic-fighter.js";
import { HealthBar } from "../classes/health-bar/health-bar.js";

// PASAR LAS PARTES DEL create() a funciones separadas
class FightScene extends BaseScene {
  constructor() {
    super("FightScene", true, true);
    this.player1;
    this.player2;
    this.matchTimer;
    this.preTimer;
    this.controls;
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
  }

  init(fightConf) {
    this.fightConf = fightConf;
    this.cameras.main.fadeIn(100);
    const fxCamera = this.cameras.main.postFX.addPixelate(40);
    this.add.tween({
      targets: fxCamera,
      duration: 700,
      amount: -1,
      onComplete: () => {
        this.cameras.main.postFX.remove(fxCamera);
      },
    });
  }

  preload() {}

  create() {
    this.createMap();
    this.createPlayers();
    //this.createColliders();
    this.createSceneControls();

    this.events.on(this.sceneEvents.WAKE, (event, data) => {
      this.scene.restart(data);
    });

    this.events.on(this.sceneEvents.RESUME, () => {
      this.physics.resume();
    });

    //PreTimer
    this.player1.disableControls();
    this.player2.disableControls();
    this.preTimer = new PreTimer(
      this,
      this.conf.gameWidth / 2,
      this.conf.gameHeight / 2,
      3,
      { fontSize: 100, stroke: 0x000000, strokeThickness: 4 },
      this.endOfPretimer,
      this
    );
    this.preTimer.setOrigin(0.5, 1);
    this.preTimer.startTimer();

    // Timer
    this.matchTimer = new MatchTimer(
      this,
      this.conf.gameWidth / 2,
      10,
      20,
      { fontSize: 60, stroke: 0x000000, strokeThickness: 4 },
      this.endMatchTimer,
      this
    ).setOrigin(0.5, 0);
    this.matchTimer.hideTimer();

    //Colisiones;
    this.physics.add.collider([this.player1, this.player2], this.floor);
    this.physics.add.overlap(
      this.player1.fist,
      this.player2,
      () => {
        this.player2.enemyHit = this.player1.fist;
        if (this.player2.isDefeated() || this.player1.isDefeated()) {
          this.endMatch();
        }
      },
      () => {
        return this.player1.fist.attacking && !this.player2.isImmune();
      },
      this
    );
    this.physics.add.overlap(
      this.player2.fist,
      this.player1,
      () => {
        this.player1.enemyHit = this.player2.fist;
        if (this.player2.isDefeated() || this.player1.isDefeated()) {
          this.endMatch();
        }
      },
      () => {
        return this.player2.fist.attacking && !this.player1.isImmune();
      },
      this
    );
  }

  update(time, deltaTime) {
    this.player1.update(deltaTime);
    this.player2.update(deltaTime);

    if (Phaser.Input.Keyboard.JustDown(this.controls.pause)) {
      this.handlePause();
    }
  }

  createMap() {
    this.map = this.add.sprite(0, 0, this.fightConf.mapKey).setOrigin(0, 0);
    this.map.anims.play(this.fightConf.mapKey + "Idle");

    // Ver si hay forma de hacerlo con un static group

    this.floor = this.physics.add
      .sprite(0, this.conf.gameHeight)
      .setOrigin(0, 1);
    this.floor.setImmovable(true);
    this.floor.body.setAllowGravity(false);
    this.floor.body.setSize(640, 18, false);
    this.floor.body.setOffset(0, 20);
  }

  createPlayers() {
    let playersControls = this.createPlayersControls();
    this.player1 = new DynamicFighter(this.fightConf.p1, {
      scene: this,
      x: 70,
      y: 100,
      controls: playersControls[0],
      gravityY: 900,
      flipX: false,
    });
    this.player1.setScale(3);
    this.player2 = new DynamicFighter(this.fightConf.p2, {
      scene: this,
      x: this.conf.gameWidth - 200,
      y: 100,
      controls: playersControls[1],
      gravityY: 900,
      flipX: false,
    });
    this.player2.setScale(3);
    this.player2.setFlipX(true);

    let p1HealthBar = new HealthBar(
      this,
      10,
      10,
      250,
      40,
      this.player1.healthPoints
    );
    this.player1.healthBar = p1HealthBar;

    let p2HealthBar = new HealthBar(
      this,
      185,
      10,
      250,
      40,
      this.player1.healthPoints
    );
    this.player2.healthBar = p2HealthBar;
  }

  createPlayersControls() {
    let player1Controls = this.input.keyboard.addKeys({
      left: this.keyCodes.A,
      right: this.keyCodes.D,
      jump: this.keyCodes.W,
      attack: this.keyCodes.V,
    });
    let player2Controls = this.input.keyboard.addKeys({
      left: this.keyCodes.LEFT,
      right: this.keyCodes.RIGHT,
      jump: this.keyCodes.UP,
      attack: this.keyCodes.L,
    });

    return [player1Controls, player2Controls];
  }

  createSceneControls() {
    this.controls = this.input.keyboard.addKeys({
      pause: this.keyCodes.ESC,
    });
  }

  endOfPretimer() {
    this.preTimer.hideTimer();
    this.matchTimer.showTimer();
    this.matchTimer.startTimer();
    this.player1.enableControls();
    this.player2.enableControls();
  }

  endMatch() {
    this.controls.pause.enabled = false;
    this.matchTimer.stopTimer();
    this.player1.disableControls();
    this.player2.disableControls();
    if (this.player1.healthPoints == this.player2.healthPoints) {
      let tie = new FighterNameVersus(
        this,
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        "TIE",
        "fighterNameFrame",
        80
      );
      tie.setX(this.conf.gameWidth / 2 - tie.fighterNameFrame.width / 2);
      tie.setY(this.conf.gameHeight * 0.4 - tie.fighterNameFrame.height / 2);
    } else if (this.player1.healthPoints > this.player2.healthPoints) {
      let tie = new FighterNameVersus(
        this,
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        "PLAYER 1 WINS",
        "fighterNameFrame",
        60
      );
      tie.setX(this.conf.gameWidth / 2 - tie.fighterNameFrame.width / 2);
      tie.setY(this.conf.gameHeight * 0.4 - tie.fighterNameFrame.height / 2);
    } else {
      let tie = new FighterNameVersus(
        this,
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        "PLAYER 2 WINS",
        "fighterNameFrame",
        60
      );
      tie.setX(this.conf.gameWidth / 2 - tie.fighterNameFrame.width / 2);
      tie.setY(this.conf.gameHeight * 0.4 - tie.fighterNameFrame.height / 2);
    }
    this.time.delayedCall(1500, () => {
      this.scene.moveAbove(this.keyName, "EndFightMenuScene");
      this.scene.run("EndFightMenuScene");
      this.scene.sleep();
    });
  }

  endMatchTimer() {
    this.controls.pause.enabled = false;
    this.player1.disableControls();
    this.player2.disableControls();
    if (this.player1.healthPoints == this.player2.healthPoints) {
      this.player1.stateMachine.setState("defeated");
      this.player2.stateMachine.setState("defeated");
      let tie = new FighterNameVersus(
        this,
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        "TIE",
        "fighterNameFrame",
        80
      );
      tie.setX(this.conf.gameWidth / 2 - tie.fighterNameFrame.width / 2);
      tie.setY(this.conf.gameHeight * 0.4 - tie.fighterNameFrame.height / 2);
    } else if (this.player1.healthPoints > this.player2.healthPoints) {
      this.player2.stateMachine.setState("defeated");
      let tie = new FighterNameVersus(
        this,
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        "PLAYER 1 WINS",
        "fighterNameFrame",
        60
      );
      tie.setX(this.conf.gameWidth / 2 - tie.fighterNameFrame.width / 2);
      tie.setY(this.conf.gameHeight * 0.4 - tie.fighterNameFrame.height / 2);
    } else {
      this.player1.stateMachine.setState("defeated");
      let tie = new FighterNameVersus(
        this,
        this.conf.gameWidth / 2,
        this.conf.gameHeight / 2,
        "PLAYER 2 WINS",
        "fighterNameFrame",
        60
      );
      tie.setX(this.conf.gameWidth / 2 - tie.fighterNameFrame.width / 2);
      tie.setY(this.conf.gameHeight * 0.4 - tie.fighterNameFrame.height / 2);
    }
    this.time.delayedCall(1500, () => {
      this.scene.moveAbove(this.keyName, "EndFightMenuScene");
      this.scene.run("EndFightMenuScene");
      this.scene.sleep();
    });
  }

  handlePause() {
    this.scene.moveAbove(this.keyName, "PauseMenuScene");
    this.scene.run("PauseMenuScene");
    this.physics.pause();
    this.scene.pause();
  }
}

export default FightScene;
