export class FighterNameVersus extends Phaser.GameObjects.Container {
  constructor(scene, x, y, fighterName, frameTexture, textFontSize) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.fighterNameText = this.scene.add
      .text(0, 0, fighterName, {
        fontSize: textFontSize,
      })
      .setOrigin(0.5, 0.5);

    // Escalar el frame al tamano del texto
    this.fighterNameFrame = this.scene.add
      .nineslice(
        0,
        0,
        frameTexture,
        null,
        this.fighterNameText.width + 20,
        this.fighterNameText.height + 10,
        13,
        13,
        13,
        13
      )
      .setOrigin(0, 0);

    // Acomodar el texto
    this.fighterNameText.setX(this.fighterNameFrame.displayWidth / 2);
    this.fighterNameText.setY(this.fighterNameFrame.displayHeight / 2);

    this.add([this.fighterNameFrame, this.fighterNameText]);
  }
}
