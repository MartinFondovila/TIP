class NextOptionSimpleArrayStrategy {
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
    let nextOptionIndex = optionsArray.indexOf(actualOption) - 1;
    let nextOption;
    if (this.isOutOfBounds(optionsArray, nextOptionIndex)) {
      nextOption = optionsArray[optionsArray.length - 1];
    } else {
      nextOption = optionsArray[nextOptionIndex];
    }

    return nextOption;
  }

  getNextOptionRight(optionsArray, actualOption) {
    let nextOptionIndex = optionsArray.indexOf(actualOption) + 1;
    let nextOption;
    if (this.isOutOfBounds(optionsArray, nextOptionIndex)) {
      nextOption = optionsArray[0];
    } else {
      nextOption = optionsArray[nextOptionIndex];
    }

    return nextOption;
  }

  getNextOptionUp(optionsArray, actualOption) {
    return this.getNextOptionLeft(optionsArray, actualOption);
  }

  getNextOptionDown(optionsArray, actualOption) {
    return this.getNextOptionRight(optionsArray, actualOption);
  }

  getDefaultOption(options) {
    return options[0];
  }

  isOutOfBounds(array, index) {
    return array.length - 1 < index || index < 0;
  }
}

export default NextOptionSimpleArrayStrategy;
