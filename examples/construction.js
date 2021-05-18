import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

let pottyObCtr = 0;
/**
 * @typedef PottyProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrPotty extends GrObject {
  /**
   * @param {PottyProperties} params
   */
  constructor(params = {}) {
    let potty = new T.Group();

    // Body
    let base_mat = new T.MeshStandardMaterial({
      color: "blue",
    });
    let base_geom = new T.BoxGeometry(1, 2, 1);
    let body = new T.Mesh(base_geom, base_mat);
    body.position.y = 1;

    // Top
    let top_geom = new T.BoxGeometry(1, 0.25, 1);
    let top = new T.Mesh(top_geom, new T.MeshStandardMaterial({color: "white"}));
    top.position.y = 2.125;

    // Door
    let door_mat = new T.MeshStandardMaterial({
        color: "grey"
      });
    let door_geom = new T.BoxGeometry(0.8, 1.5, 0.01);
    let door = new T.Mesh(door_geom, door_mat);
    door.position.y = 0.75;
    door.position.z = 0.5;

    // Whole OB
    potty.add(body);
    potty.add(top);
    potty.add(door);

    // Super Call
    super(`Potty-${pottyObCtr++}`, potty);
    this.whole_ob = potty;

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    potty.scale.set(scale, scale, scale);
  }
}

let hammerObCtr = 0;
/**
 * @typedef HammerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrHammer extends GrObject {
  /**
   * @param {HammerProperties} params
   */
  constructor(params = {}) {
    let jackhammer = new T.Group();

    // Body
    let base_mat = new T.MeshStandardMaterial({
      color: "orange",
    });
    let base_geom = new T.BoxGeometry(0.5, 1, 0.2);
    let body = new T.Mesh(base_geom, base_mat);
    body.position.y = 0.25;

    // Pole
    let pole = new T.Mesh(new T.CylinderGeometry(0.01, 0.05, 2), new T.MeshStandardMaterial({color: "silver"}));
    pole.rotateX(Math.PI);
    
    // Handle
    let handle = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.75), new T.MeshStandardMaterial({color: "yellow"}));
    handle.rotateZ(Math.PI / 2);
    handle.position.y = 1;

    // Whole OB
    jackhammer.add(body);
    jackhammer.add(pole);
    jackhammer.add(handle);

    // Super Call
    super(`Jackhammer-${hammerObCtr++}`, jackhammer);
    this.whole_ob = jackhammer;
    this.rideable = this.objects[0];

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    jackhammer.scale.set(scale, scale, scale);
  }
  /**
     * StepWorld method
     * @param {*} delta 
     * @param {*} timeOfDay 
     */
   stepWorld(delta, timeOfDay) {
    // Makes the jackhammer drill into the groud
    this.whole_ob.position.y = (0.03 * delta);
  };
}

let rubbleObCtr = 0;
/**
 * @typedef RubbleProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrRubble extends GrObject {
  /**
   * @param {RubbleProperties} params
   */
  constructor(params = {}) {
    // Load Town Hall
    let loader = new OBJLoader();
    let rubble = new T.Group();
    loader.load("../examples/assets/rubble.obj", function(pile) {
        rubble.add(pile);
        rubble.scale.set(0.5, 0.5, 0.5);
        rubble.castShadow = true;
    });

    // Super Call
    super(`Rubble-${rubbleObCtr++}`, rubble);
    this.whole_ob = rubble;

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    rubble.scale.set(scale, scale, scale);
  }
}

let roadObCtr = 0;
/**
 * @typedef RoadProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrRoad extends GrObject {
  /**
   * @param {RoadProperties} params
   */
  constructor(params = {}) {
    // Making Generic Road
    let road = new T.Group();
    let base_mat = new T.MeshStandardMaterial({
      color: "grey",
    });
    let base_geom = new T.BoxGeometry(40, 0.01, 10);
    let base = new T.Mesh(base_geom, base_mat);
    road.add(base);

    // Super Call
    super(`Road-${roadObCtr++}`, road);
    this.whole_ob = road;

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    road.scale.set(scale, scale, scale);
  }
}