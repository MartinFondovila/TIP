// X e Y parecen no funcionar de la misma forma que los X e Y de los jugadores
export class HealthBar extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y, healthPoints) {
    super(scene, { x: x, y: y });
    this.maxHealth = healthPoints;
    this.actualHealth = healthPoints;
    this.p = 76 / this.maxHealth;

    //  BG
    this.fillStyle(0x000000);
    console.log("coordenada de la barra: " + this.x);
    this.fillRect(this.x, this.y, 80, 16);

    //  Health

    this.fillStyle(0x00ff00);
    this.fillRect(this.x + 2, this.y + 2, 76, 12);

    this.scene.add.existing(this);
  }

  decrease(amount) {
    this.actualHealth -= amount;

    if (this.actualHealth < 0) {
      this.actualHealth = 0;
    }

    this.draw();

    return this.actualHealth === 0;
  }

  increase(amount) {
    this.actualHealth += amount;

    if (this.actualHealth > this.maxHealth) {
      this.actualHealth = this.maxHealth;
    }

    this.draw();
  }

  draw() {
    this.clear();

    //  BG
    this.fillStyle(0x000000);
    this.fillRect(this.x, this.y, 80, 16);

    //  Health

    this.fillStyle(0xffffff);
    this.fillRect(this.x + 2, this.y + 2, 76, 12);

    if (this.actualHealth < 30) {
      this.fillStyle(0xff0000);
    } else {
      this.fillStyle(0x00ff00);
    }

    let d = Math.floor(this.p * this.actualHealth);

    this.fillRect(this.x + 2, this.y + 2, d, 12);
  }
}
