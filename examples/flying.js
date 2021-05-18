/*jshint esversion: 6 */
// @ts-check

 import * as T from "../libs/CS559-Three/build/three.module.js";
 import { GrObject } from "../libs/CS559-Framework/GrObject.js";
 // Creates propellers
 function createProp() {
     let props = new T.Group();
     let propMaterial = new T.MeshStandardMaterial({color: "silver"});
     let prop1 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.4), propMaterial);
     prop1.rotateX(Math.PI / 2);
     prop1.position.z = 0.1;
     let prop2 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.4), propMaterial);
     prop2.rotateX(Math.PI / 2);
     prop2.position.z = -0.1;
     props.add(prop1);
     props.add(prop2);
     return props;
 }


let copterObCtr = 0;
/**
 * @typedef CopterProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCopter extends GrObject {
  /**
   * @param {CopterProperties} params
   */
  constructor(params = {}) {
    // Copter 1
    let copter1 = new T.Group();
    let copter1Material = new T.MeshStandardMaterial({color: "red"});
    let copter1Body = new T.Mesh(new T.CylinderGeometry(0.5, 0.2, 1), copter1Material);
    let copter1Tail = new T.Mesh(new T.CylinderGeometry(0.01, 0.2, 1), copter1Material);
    let copter1Front = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.3), copter1Material);
    let copter1Props1 = createProp();
    let copter1Props2 = createProp();
    copter1Props1.rotateZ(Math.PI / 2);
    copter1Props1.position.x = 0.6;
    copter1Props2.rotateZ(Math.PI / 2);
    copter1Props2.position.x = -1.45;
    copter1Props2.scale.set(1, 1, 2);
    copter1Body.rotateZ(Math.PI / 2);
    copter1Tail.rotateZ(Math.PI / 2);
    copter1Tail.position.x = -1;
    copter1Front.rotateZ(Math.PI / 2);
    copter1Front.position.x = 0.5;
    copter1.add(copter1Body);
    copter1.add(copter1Tail);
    copter1.add(copter1Front);
    copter1.add(copter1Props1);
    copter1.add(copter1Props2);
    copter1.position.y = 2;

    // Super Call
    super(`Copter-${copterObCtr++}`, copter1);
    this.whole_ob = copter1;
    this.prop1 = copter1Props1;
    this.prop2= copter1Props2;
    this.rideable = this.objects[0];

    // Place Object
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    copter1.scale.set(scale, scale, scale);
  }
  /**
     * StepWorld method
     * @param {*} delta 
     * @param {*} timeOfDay 
     */
   stepWorld(delta, timeOfDay) {
    // Rotates the blades
    this.prop1.rotateY(0.1 * delta);
    this.prop2.rotateY(0.1 * delta);
  };
}