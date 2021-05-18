import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let atmObCtr = 0;
/**
 * @typedef ATMProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrATM extends GrObject {
  /**
   * @param {ATMProperties} params
   */
  constructor(params = {}) {
    let atm = new T.Group();

    // ATM Body
    let base_mat = new T.MeshStandardMaterial({
      color: "grey",
      metalness: 0.5,
      roughness: 0.8
    });
    let base_geom = new T.BoxGeometry(1, 1, 1);
    let base = new T.Mesh(base_geom, base_mat);
    let back_geom = new T.BoxGeometry(1, 1, 0.2);
    let back = new T.Mesh(back_geom, base_mat);
    let top_geom = new T.BoxGeometry(1, 0.3, 1);
    let top = new T.Mesh(top_geom, base_mat);
    base.position.y = 0.25;
    back.position.y = 1;
    back.position.z = -0.4;
    top.position.y = 1.6;
    top.rotateX(-0.25);
    atm.add(base);
    atm.add(back);
    atm.add(top);

    // ATM Screen
    let screen = new T.Mesh(new T.BoxGeometry(0.5, 0.5, 0.01), new T.MeshStandardMaterial({color: "black"}));
    screen.position.z = -0.2;
    screen.position.y = 1;
    screen.rotateX(-0.25);
    atm.add(screen);

    // Super Call
    super(`ATM-${atmObCtr++}`, atm);
    this.whole_ob = atm;

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    atm.scale.set(scale, scale, scale);
  }
}