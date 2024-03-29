export class StateMachine {
  constructor(context, name) {
    this.states = new Map();
    this.context = context;
    this.name = name ?? "StateMachine";
    this.currentState;
    this.previousState;
    this.isSwitchingState = false;
    this.stateQueue = [];
  }

  getPreviousStateName() {
    if (!this.previousState) {
      return "";
    }

    return this.previousStateName.name;
  }

  isCurrentState(name) {
    if (!this.currentState) {
      return false;
    }

    return this.currentState.name === name;
  }

  addState(name, config) {
    this.states.set(name, {
      name,
      onEnter: config?.onEnter?.bind(this.context),
      onUpdate: config?.onUpdate?.bind(this.context),
      onExit: config?.onExit?.bind(this.context),
    });

    return this;
  }

  setState(name) {
    if (!this.states.has(name)) {
      console.warn(`Tried to change to unknown state: ${name}`);
      return;
    }

    if (this.isSwitchingState) {
      console.log("queue state: " + name);
      this.stateQueue.push(name);
      return;
    }

    this.isSwitchingState = true;

    console.log(
      `[StateMachine (${this.name})] change from ${
        this.currentState?.name ?? "none"
      } to ${name}`
    );

    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit();
    }

    this.previousState = this.currentState;
    this.currentState = this.states.get(name);

    if (this.currentState.onEnter) {
      this.currentState.onEnter();
    }

    this.isSwitchingState = false;

    return this;
  }

  update(deltaTime) {
    if (this.stateQueue.length > 0) {
      const name = this.stateQueue.shift();
      this.setState(name);
      return;
    }

    if (!this.currentState) {
      return;
    }

    if (this.currentState.onUpdate) {
      this.currentState.onUpdate(deltaTime);
    }
  }
}