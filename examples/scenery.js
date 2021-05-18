import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let flagObCtr = 0;
/**
 * @typedef FlagProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrFlag extends GrObject {
  /**
   * @param {FlagProperties} params
   */
  constructor(params = {}) {
    let spinner = new T.Group();

    // Base
    let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "red",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    spinner.add(base);

    // Flagpole
    let flagpole = new T.Group();
    let pole = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 3), new T.MeshStandardMaterial({color: "silver"}));
    let flag = new T.Mesh(new T.BoxGeometry(2, 1, 0.1), new T.MeshStandardMaterial({color: "gold"}));
    flag.position.x = 1;
    flag.position.y = 1;
    flagpole.add(pole);
    flagpole.add(flag);
    flagpole.position.y = 2;
    spinner.add(flagpole);

    // Super Call
    super(`Flag-${flagObCtr++}`, spinner);
    this.whole_ob = spinner;
    this.flagpole = flagpole;
    this.rideable = flag;

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    spinner.scale.set(scale, scale, scale);
  }
  /**
     * StepWorld method
     * @param {*} delta 
     * @param {*} timeOfDay 
     */
   stepWorld(delta, timeOfDay) {
    // Rotates the flagpole
    this.flagpole.rotateY(0.001 * delta);
  };
}


let chairObCtr = 0;
/**
 * @typedef chairProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {THREE.Material} [material]
 * @property {number} [size=1]
 */
export class GrChair extends GrObject {
  /**
   * @param {ChairProperties} params
   */
  constructor(params = {}) {
    let chairobj = new T.Group();
    let material;
    if (params.material) {
      material = params.material;
    } else {
      material = new T.MeshStandardMaterial({ color: "#FF8888" });
    }
    let backbench = new T.BoxGeometry(2, 0.7, 0.1);
    let backmesh = new T.Mesh(backbench, material);
    backmesh.position.y = 0.35;
    backmesh.position.z = -0.25;
    let frontbench = new T.BoxGeometry(2, 0.1, 0.5);
    let frontmesh = new T.Mesh(frontbench, material);
    frontmesh.position.y = 0.2;

    chairobj.add(frontmesh);
    chairobj.add(backmesh);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Chair-${chairObCtr++}`, chairobj);
    this.whole_ob = chairobj;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    chairobj.scale.set(scale, scale, scale);
  }
}