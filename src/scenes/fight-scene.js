import { Knight } from "../classes/fighters/knight.js";
import { PlayerContainer } from "../classes/player-container/player-container.js";
import { MatchTimer } from "../classes/timer/match-timer.js";
import { PreTimer } from "../classes/timer/pre-timer.js";

// PASAR LAS PARTES DEL create() a funciones separadas
class FightScene extends Phaser.Scene {
  constructor() {
    super("FightScene");
    this.player1;
    this.player2;
    this.matchTimer;
    this.preTimer;
    this.controls;
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
  }

  init() {}

  preload() {}

  create() {
    this.createMap();
    this.createPlayers();
    this.createSceneControls();

    // this.player1Container = new PlayerContainer(
    //   this,
    //   100,
    //   100,
    //   [this.prueba, this.fistPrueba],
    //   this.player1.controls
    // );

    // this.add.existing(this.player1Container);

    // Jugador 1
    // GET BOUNDS PARA COLLIDEAR CON ALGUN LADO ESPECIFICO DEL SPRITE

    // Se agrega a las fisicas en lugar de la escena para que tenga body directamente

    // // Jugador 2
    // this.player2 = new Knight(this, 200, 100, Player2Controls);
    // this.player2.body.setGravityY(800);
    // this.player2.setCollideWorldBounds(true);

    // //PreTimer
    // this.player1.disableControls();
    // this.player2.disableControls();
    // this.preTimer = new PreTimer(
    //   this,
    //   300,
    //   100,
    //   3,
    //   { fontSize: 100 },
    //   this.endOfPretimer,
    //   this
    // );
    // this.preTimer.startTimer();

    // // Timer
    // this.matchTimer = new MatchTimer(
    //   this,
    //   320,
    //   40,
    //   30,
    //   { fontSize: 60 },
    //   this.endMatch,
    //   this
    // );

    //Colisiones;
    this.physics.add.collider(
      [this.player1Container, this.player1, this.player2],
      this.wall_floor
    );
  }

  update(time, deltaTime) {
    this.player1.update(deltaTime);
    this.player2.update(deltaTime);
    // Pausar y pasar a escena de pause y resumir desde ahi
    if (Phaser.Input.Keyboard.JustDown(this.controls.pause)) {
      //this.handlePause();
    }
  }

  createMap() {
    this.map = this.add.sprite(0, 0, "ninjaMountainMap").setOrigin(0);
    this.map.anims.play("ninjaMountainMapIdle");

    // this.wall_floor = this.physics.add.staticGroup();

    // this.wall_floor.create(0, 0, "wall").setOrigin(0);
    // this.wall_floor
    //   .create(this.scale.width, 0, "wall")
    //   .setOrigin(1, 0)
    //   .setFlipX(true);

    // this.wall_floor.create(0, this.scale.height, "floor").setOrigin(0, 1);

    // this.wall_floor.refresh();

    // this.wall_floor.getChildren()[2].setOffset(0, 15);
  }

  createPlayers() {
    let playersControls = this.createPlayersControls();
    this.player1 = new Knight(this, 100, 100, playersControls[0], 900)
      .setOrigin(0, 0)
      .setScale(1.7);
    this.player2 = new Knight(this, 300, 300, playersControls[1], 900);
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
    // this.preTimer.hideTimer();
    // this.matchTimer.startTimer();
    // this.player1.enableControls();
    // this.player2.enableControls();
  }

  endMatch() {
    // this.player1.disableControls();
    // this.player2.disableControls();
    // if (this.player1.healthPoints === this.player2.healthPoints) {
    //   this.player1.stateMachine.setState("defeated");
    //   this.player2.stateMachine.setState("defeated");
    //   this.add.text(120, 190, "TIE!", { fontSize: 45 });
    // } else if (this.player1.healthPoints > this.player2.healthPoints) {
    //   this.player2.stateMachine.setState("defeated");
    //   this.add.text(120, 190, "PLAYER 1 WON!", { fontSize: 45 });
    // } else {
    //   this.player1.stateMachine.setState("defeated");
    //   this.add.text(120, 190, "PLAYER 2 WON!", { fontSize: 45 });
    // }
  }

  handlePause() {
    // REVISAR QUE SE STACKEAN LAS OPCIONES CUANDO VUELVO A LA ESCENA
    //   this.physics.pause();
    //   this.scene.pause();
    //   if (!this.scene.isSleeping("PauseMenuScene")) {
    //     console.log(!this.scene.isSleeping("PauseMenuScene"));
    //     this.scene.launch("PauseMenuScene");
    //   } else {
    //     this.scene.wake("PauseMenuScene");
    //   }
    //   this.scene.moveAbove("FightScene", "PauseMenuScene");
    // }
  }
}

export default FightScene;

// VER SI ES NECESARIO DELOAD LOS PRELOAD DE LAS OTRAS SCENES O QUEDAN PARA SIEMPRE
