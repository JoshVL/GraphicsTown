import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

let hallObCtr = 0;
/**
 * @typedef HallProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrHall extends GrObject {
  /**
   * @param {HallProperties} params
   */
  constructor(params = {}) {
    // Load Town Hall
    let loader = new OBJLoader();
    let townhall = new T.Group();
    loader.load("../examples/assets/townhall.obj", function(hall) {
        townhall.add(hall);
        townhall.scale.set(0.05, 0.05, 0.05);
        townhall.castShadow = true;
    });

    // Super Call
    super(`Hall-${hallObCtr++}`, townhall);
    this.whole_ob = townhall;

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    townhall.scale.set(scale, scale, scale);
  }
}