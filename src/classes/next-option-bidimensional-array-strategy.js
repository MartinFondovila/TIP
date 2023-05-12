class NextOptionBidimensionalArrayStrategy {
  constructor() {}

  getNextOption(direction, optionsArray, actualOption) {
    switch (direction) {
      case "LEFT":
        return this.getNextOptionLeft(optionsArray, actualOption);
      case "RIGHT":
        return this.getNextOptionRight(optionsArray, actualOption);
      case "UP":
        return this.getNextOptionUp(optionsArray, actualOption);
      case "DOWN":
        return this.getNextOptionDown(optionsArray, actualOption);
    }
  }

  getNextOptionLeft(optionsArray, actualOption) {
    let actualOptionRow;
    optionsArray.forEach((row) => {
      if (row.includes(actualOption)) {
        actualOptionRow = row;
        return;
      }
    });
    let nextOption;

    let nextOptionIndex = actualOptionRow.indexOf(actualOption) - 1;
    if (this.isOutOfBounds(actualOptionRow, nextOptionIndex)) {
      nextOption = actualOptionRow[actualOptionRow.length - 1];
    } else {
      nextOption = actualOptionRow[nextOptionIndex];
    }

    return nextOption;
  }

  getNextOptionRight(optionsArray, actualOption) {
    let actualOptionRow;
    optionsArray.forEach((row) => {
      if (row.includes(actualOption)) {
        actualOptionRow = row;
        return;
      }
    });
    let nextOption;

    let nextOptionIndex = actualOptionRow.indexOf(actualOption) + 1;
    if (this.isOutOfBounds(actualOptionRow, nextOptionIndex)) {
      nextOption = actualOptionRow[0];
    } else {
      nextOption = actualOptionRow[nextOptionIndex];
    }

    return nextOption;
  }

  getNextOptionUp(optionsArray, actualOption) {
    let actualOptionRow;
    optionsArray.forEach((row) => {
      if (row.includes(actualOption)) {
        actualOptionRow = row;
        return;
      }
    });
    let nextArrayIndex = optionsArray.indexOf(actualOptionRow) - 1;
    let nextOption;

    if (this.isOutOfBounds(optionsArray, nextArrayIndex)) {
      let lastRow = optionsArray[optionsArray.length - 1];
      nextOption = lastRow[actualOptionRow.indexOf(actualOption)];
    } else {
      nextOption =
        optionsArray[nextArrayIndex][actualOptionRow.indexOf(actualOption)];
    }

    return nextOption;
  }

  getNextOptionDown(optionsArray, actualOption) {
    let actualOptionRow;
    optionsArray.forEach((row) => {
      if (row.includes(actualOption)) {
        actualOptionRow = row;
        return;
      }
    });
    let nextArrayIndex = optionsArray.indexOf(actualOptionRow) + 1;
    let nextOption;

    if (this.isOutOfBounds(optionsArray, nextArrayIndex)) {
      let firstRow = optionsArray[0];
      nextOption = firstRow[actualOptionRow.indexOf(actualOption)];
    } else {
      nextOption =
        optionsArray[nextArrayIndex][actualOptionRow.indexOf(actualOption)];
    }

    return nextOption;
  }

  getDefaultOption(options) {
    return options[0][0];
  }

  isOutOfBounds(array, index) {
    return array.length - 1 < index || index < 0;
  }
}

export default NextOptionBidimensionalArrayStrategy;
