import { Knight } from "../classes/fighters/knight.js";
import { Ninja } from "../classes/fighters/ninja.js";
import { MatchTimer } from "../classes/timer/MatchTimer.js";
import { PreTimer } from "../classes/timer/PreTimer.js";

class FightScene extends Phaser.Scene {
  constructor() {
    super("FightScene");
    this.player1;
    this.player2;
    this.matchTimer;
    this.preTimer;
    this.controls;
  }

  init() {
    console.log("Scene Fight");
  }

  preload() {}

  create() {
    this.add.image(0, 0, "background").setOrigin(0);

    this.wall_floor = this.physics.add.staticGroup();

    this.wall_floor.create(0, 0, "wall").setOrigin(0);
    this.wall_floor
      .create(this.scale.width, 0, "wall")
      .setOrigin(1, 0)
      .setFlipX(true);

    this.wall_floor.create(0, this.scale.height, "floor").setOrigin(0, 1);
    this.wall_floor.create(500, 200, "floor");

    this.wall_floor.refresh();

    this.wall_floor.getChildren()[2].setOffset(0, 15);

    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
    // Controles
    // Configurar controles desde un archivo
    const Player1Controls = this.input.keyboard.addKeys({
      left: KeyCodes.A,
      right: KeyCodes.D,
      jump: KeyCodes.W,
      attack: KeyCodes.V,
    });
    const Player2Controls = this.input.keyboard.addKeys({
      left: KeyCodes.LEFT,
      right: KeyCodes.RIGHT,
      jump: KeyCodes.UP,
      attack: KeyCodes.L,
    });
    this.controls = this.input.keyboard.addKeys({
      pause: KeyCodes.ESC,
    });

    // Jugador 1
    this.player1 = new Knight(this, 200, 400, Player1Controls);
    this.add.existing(this.player1);
    this.player1.setCollideWorldBounds(true);

    // Jugador 2
    this.player2 = new Ninja(this, 590, 100, Player2Controls);
    this.add.existing(this.player2);
    this.player2.setCollideWorldBounds(true);

    //PreTimer
    this.player1.disableControls();
    this.player2.disableControls();
    this.preTimer = new PreTimer(
      this,
      300,
      100,
      3,
      { fontSize: 100 },
      this.endOfPretimer,
      this
    );
    this.preTimer.startTimer();

    // Timer
    this.matchTimer = new MatchTimer(
      this,
      320,
      40,
      5,
      { fontSize: 60 },
      this.endMatch,
      this
    );

    // Colisiones
    this.physics.add.collider([this.player1, this.player2], this.wall_floor);
    this.physics.add.overlap(
      this.player1.attackHitbox,
      this.player2,
      this.handleHit
    );
    this.physics.add.overlap(
      this.player2.attackHitbox,
      this.player1,
      this.handleHit
    );
  }

  update(time, deltaTime) {
    this.player1.update(deltaTime);
    this.player2.update(deltaTime);
    // Pausar y pasar a escena de pause y resumir desde ahi
    if (Phaser.Input.Keyboard.JustDown(this.controls.pause)) {
      this.handlePause();
    }
  }

  endOfPretimer() {
    this.preTimer.hideTimer();
    this.matchTimer.startTimer();
    this.player1.enableControls();
    this.player2.enableControls();
  }

  endMatch() {
    this.player1.disableControls();
    this.player2.disableControls();
    if (this.player1.healthPoints === this.player2.healthPoints) {
      this.player1.stateMachine.setState("defeated");
      this.player2.stateMachine.setState("defeated");
      this.add.text(120, 190, "TIE!", { fontSize: 45 });
    } else if (this.player1.healthPoints > this.player2.healthPoints) {
      this.player2.stateMachine.setState("defeated");
      this.add.text(120, 190, "PLAYER 1 WON!", { fontSize: 45 });
    } else {
      this.player1.stateMachine.setState("defeated");
      this.add.text(120, 190, "PLAYER 2 WON!", { fontSize: 45 });
    }
  }

  handleHit(attackHitbox, player) {
    // Esto esta feo, definir bien lo de recibir daño
    player.enemy = attackHitbox.player;
    console.log(this.player.healthPoints);
    this.player2.stateMachine.setState("hit");
    if (this.player.isDefeated()) {
      this.matchTimer.stopTimer();
      this.endMatch();
    }
  }

  handlePause() {
    this.scene.pause();
    this.scene.launch("PauseMenuScene");
    this.scene.moveAbove("FightScene", "PauseMenuScene");
  }
}

export default FightScene;
