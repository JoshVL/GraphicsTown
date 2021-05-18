import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let treeObCtr = 0;
/**
 * @typedef FlagProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrTree extends GrObject {
  /**
   * @param {TreeProperties} params
   */
  constructor(params = {}) {
    let tree = new T.Group();

    // Tree Top
    let base_geom = new T.CylinderGeometry(0, 1, 3, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "green",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(3.5);
    tree.add(base);

    // Tree Root
    let root = new T.Group();
    let pole = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 3), new T.MeshStandardMaterial({color: "brown"}));
    root.add(pole);
    root.position.y = 2;
    tree.add(root);

    // Super Call
    super(`Tree-${treeObCtr++}`, tree);
    this.whole_ob = tree;
    this.root = root;

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    tree.scale.set(scale, scale, scale);
  }
}