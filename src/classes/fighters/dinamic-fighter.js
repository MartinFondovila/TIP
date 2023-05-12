import { Knight } from "./knight";
import { Ninja } from "./ninja";

const classes = {
  KNIGHT: Knight,
  NINJA: Ninja,
};

class DynamicFighter {
  constructor(classKeyName, { scene, x, y, controls, gravityY, flipX }) {
    return new classes[classKeyName](scene, x, y, controls, gravityY, flipX);
  }
}

export default DynamicFighter;
