class TestScene extends Phaser.Scene {
  constructor() {
    super("TestScene");
  }

  init() {}

  preload() {}

  create() {
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.add.sprite(200, 300, "knight");

    this.controls = this.input.keyboard.addKeys({
      moveUp: this.keyCodes.UP,
      moveDown: this.keyCodes.DOWN,
      moveLeft: this.keyCodes.LEFT,
      moveRight: this.keyCodes.RIGHT,
      select: this.keyCodes.ENTER,
    });

    this.row1 = [this.add.text(300, 100, "1"), this.add.text(340, 100, "2")];

    this.row2 = [
      this.add.text(280, 150, "3"),
      this.add.text(320, 150, "4"),
      this.add.text(340, 150, "5"),
      this.add.text(360, 150, "6"),
    ];

    this.row3 = [this.add.text(300, 200, "7"), this.add.text(340, 200, "8")];

    this.options = [
      this.add.text(20, this.scale.height - 10, "option1").setOrigin(0, 1),
      this.add
        .text(this.scale.width - 20, this.scale.height - 10, "option2")
        .setOrigin(1, 1),
    ];

    this.bidemsionalArray = [this.row1, this.row2, this.row3, this.options];
    this.setDefaultOption();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.controls.moveUp)) {
      this.handleChangeOptionUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveDown)) {
      this.handleChangeOptionDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveLeft)) {
      this.handleChangeOptionLeft();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.moveRight)) {
      this.handleChangeOptionRight();
    } else if (Phaser.Input.Keyboard.JustDown(this.controls.select)) {
      this.handleSelectOnOption(this.selectedOption.text);
      console.log("Se selecciono la opción: " + this.selectedOption.text);
    }
  }

  handleChangeOptionDown() {
    this.selectedOption.clearTint();

    let nextArrayIndex = this.bidemsionalArray.indexOf(this.actualRow) + 1;

    console.log(nextArrayIndex);

    if (this.isOutOfBounds(nextArrayIndex, this.bidemsionalArray)) {
      console.log("out");
      let firstRow = this.bidemsionalArray[0];
      this.setSelectedOption(
        firstRow[this.actualRow.indexOf(this.selectedOption)],
        firstRow
      );
      return;
    }

    let nextOption =
      this.bidemsionalArray[nextArrayIndex][
        this.actualRow.indexOf(this.selectedOption)
      ];
    this.setSelectedOption(nextOption, this.bidemsionalArray[nextArrayIndex]);

    // let bottomOption =
    //   this.bidemsionalArray[nextArrayIndex][
    //     this.actualRow.indexOf(this.selectedOption)
    //   ];
    // if (bottomOption == null) {
    //   let newOption =
    //     this.bidemsionalArray[nextArrayIndex][
    //       this.bidemsionalArray[nextArrayIndex].lenght - 1
    //     ];
    //   this.setSelectedOption(newOption, this.bidemsionalArray[nextArrayIndex]);
    // } else {
    //   let newOption =
    //     this.bidemsionalArray[nextArrayIndex][
    //       this.actualRow.indexOf(this.selectedOption)
    //     ];
    //   this.setSelectedOption(newOption, this.bidemsionalArray[nextArrayIndex]);
    // }
  }

  handleChangeOptionUp() {
    this.selectedOption.clearTint();

    let nextArrayIndex = this.bidemsionalArray.indexOf(this.actualRow) - 1;

    console.log(nextArrayIndex);

    if (this.isOutOfBounds(nextArrayIndex, this.bidemsionalArray)) {
      console.log("out");
      let lastRow = this.bidemsionalArray[this.bidemsionalArray.length - 1];
      this.setSelectedOption(
        lastRow[this.actualRow.indexOf(this.selectedOption)],
        lastRow
      );
      return;
    }

    let nextOption =
      this.bidemsionalArray[nextArrayIndex][
        this.actualRow.indexOf(this.selectedOption)
      ];
    this.setSelectedOption(nextOption, this.bidemsionalArray[nextArrayIndex]);
  }

  setSelectedOption(option, row) {
    if (this.selectedOption) {
      this.selectedOption.clearTint();
    }
    this.selectedOption = option;
    this.selectedOption.setTint(0xffff00);
    if (row) {
      this.actualRow = row;
    }
  }

  setDefaultOption() {
    this.setSelectedOption(
      this.bidemsionalArray[0][0],
      this.bidemsionalArray[0]
    );
  }

  handleChangeOptionRight() {
    let nextOptionIndex = this.actualRow.indexOf(this.selectedOption) + 1;
    console.log(nextOptionIndex);
    if (this.isOutOfBounds(nextOptionIndex, this.actualRow)) {
      this.setSelectedOption(this.actualRow[0]);
    } else {
      this.setSelectedOption(this.actualRow[nextOptionIndex]);
    }
  }

  handleChangeOptionLeft() {
    let nextOptionIndex = this.actualRow.indexOf(this.selectedOption) - 1;
    console.log(nextOptionIndex);
    if (this.isOutOfBounds(nextOptionIndex, this.actualRow)) {
      this.setSelectedOption(this.actualRow[this.actualRow.length - 1]);
    } else {
      this.setSelectedOption(this.actualRow[nextOptionIndex]);
    }
  }

  isOutOfBounds(index, array) {
    return array.length - 1 < index || index < 0;
  }
}

export default TestScene;
