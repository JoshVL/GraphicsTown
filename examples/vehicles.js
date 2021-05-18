/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

// Dump Truck
let dumpObCtr = 0;
/**
 * @typedef DumpProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrDump extends GrObject {
  constructor(params = {}) {
    let dumptruck = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 1.0,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    let baseGroup = new T.Group();
    let base = new T.Mesh(new T.BoxGeometry(3, 0.25, 1), new T.MeshBasicMaterial({color: "grey"}));
    let front = new T.Mesh(new T.BoxGeometry(1, 1, 1), new T.MeshBasicMaterial({color: "brown"}));
    front.position.x = 2;
    front.position.y = 0.375;
    let wheel1 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel1.position.set(1.3, -0.1, 0.5);
    let wheel2 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel2.position.set(-1.3, -0.1, 0.5);
    let wheel3 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel3.position.set(1.3, -0.1, -0.5);
    let wheel4 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel4.position.set(-1.3, -0.1, -0.5);
    baseGroup.add(base);
    baseGroup.add(front);
    baseGroup.add(wheel1);
    baseGroup.add(wheel2);
    baseGroup.add(wheel3);
    baseGroup.add(wheel4);
    baseGroup.position.y = 0.25;

    let dumpGroup = new T.Group();
    let botplat = new T.Mesh(new T.BoxGeometry(3, 0.25, 1), new T.MeshBasicMaterial({color: "red"}));
    let wall1 = new T.Mesh(new T.BoxGeometry(3, 1, 0.1), new T.MeshBasicMaterial({color: "red"}));
    wall1.position.z = 0.5;
    wall1.position.y = 0.5;
    let wall2 = new T.Mesh(new T.BoxGeometry(3, 1, 0.1), new T.MeshBasicMaterial({color: "red"}));
    wall2.position.z = -0.5;
    wall2.position.y = 0.5;
    let wall3 = new T.Mesh(new T.BoxGeometry(0.1, 1, 1), new T.MeshBasicMaterial({color: "red"}));
    wall3.position.x = 1.5;
    wall3.position.y = 0.5;
    let backWall = new T.Mesh(new T.BoxGeometry(0.1, 1, 1), new T.MeshBasicMaterial({color: "red"}));
    backWall.position.x = -1.5;
    backWall.position.y = 0.5;
    dumpGroup.add(botplat);
    dumpGroup.add(wall1);
    dumpGroup.add(wall2);
    dumpGroup.add(wall3);
    dumpGroup.add(backWall);
    dumpGroup.position.y = 0.5;
    dumptruck.add(baseGroup);
    dumptruck.add(dumpGroup);
    dumptruck.castShadow;

    super(`Dump Truck-${dumpObCtr++}`, dumptruck, [
      ["x", -5, 5, -4],
      ["z", -5, 5, 5],
      ["theta", 0, 360, 0],
      ["dumper", 0, 60, 0]
    ]);

    this.whole_ob = dumptruck;
    this.dumper = dumpGroup;
    this.wheel1 = wheel1;
    this.wheel2 = wheel2;
    this.wheel3 = wheel3;
    this.wheel4 = wheel4;

    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    dumptruck.scale.set(scale, scale, scale);
  }

  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.dumper.rotation.z = degreesToRadians(paramValues[3]);
  }
  /**
     * StepWorld method
     * @param {*} delta 
     * @param {*} timeOfDay 
     */
   stepWorld(delta, timeOfDay) {
    // Rotates the wheels
    this.wheel1.rotateZ(-0.1 * delta);
    this.wheel2.rotateZ(-0.1 * delta);
    this.wheel3.rotateZ(-0.1 * delta);
    this.wheel4.rotateZ(-0.1 * delta);
  };
}

// Cement Mixer
let mixerObCtr = 0;
/**
 * @typedef MixerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
 export class GrMixer extends GrObject {
  constructor(params = {}) {
    let cementmixer = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 1.0,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    let baseGroup = new T.Group();
    let base = new T.Mesh(new T.BoxGeometry(3, 0.25, 1), new T.MeshBasicMaterial({color: "grey"}));
    let front = new T.Mesh(new T.BoxGeometry(1, 1, 1), new T.MeshBasicMaterial({color: "gold"}));
    front.position.x = 2;
    front.position.y = 0.375;
    let wheel1 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel1.position.set(1.3, -0.1, 0.5);
    let wheel2 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel2.position.set(-1.3, -0.1, 0.5);
    let wheel3 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel3.position.set(1.3, -0.1, -0.5);
    let wheel4 = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 0.25), new T.MeshBasicMaterial({color: "black"}));
    wheel4.position.set(-1.3, -0.1, -0.5);
    baseGroup.add(base);
    baseGroup.add(front);
    baseGroup.add(wheel1);
    baseGroup.add(wheel2);
    baseGroup.add(wheel3);
    baseGroup.add(wheel4);
    baseGroup.position.y = 0.25;

    let mixerGroup = new T.Group();
    let body = new T.Mesh(new T.CylinderGeometry(1, 0.4, 2.5), new T.MeshBasicMaterial({color: "gold"}));
    mixerGroup.add(body);
    mixerGroup.position.y = 1.25;
    mixerGroup.rotateZ(-0.75 * Math.PI / 2);
    cementmixer.add(baseGroup);
    cementmixer.add(mixerGroup);
    cementmixer.castShadow;

    super(`Cement Mixer-${mixerObCtr++}`, cementmixer, [
      ["x", -5, 5, -3],
      ["z", -5, 5, -4],
      ["theta", 0, 360, 270],
      ["mixer", 0, 360, 0]
    ]);

    this.whole_ob = cementmixer;
    this.mixer = mixerGroup;
    this.wheel1 = wheel1;
    this.wheel2 = wheel2;
    this.wheel3 = wheel3;
    this.wheel4 = wheel4;
    

    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    cementmixer.scale.set(scale, scale, scale);
  }

  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.mixer.rotation.x = degreesToRadians(paramValues[3]);
  }
  /**
     * StepWorld method
     * @param {*} delta 
     * @param {*} timeOfDay 
     */
   stepWorld(delta, timeOfDay) {
    // Rotates the wheels
    this.wheel1.rotateZ(-0.1 * delta);
    this.wheel2.rotateZ(-0.1 * delta);
    this.wheel3.rotateZ(-0.1 * delta);
    this.wheel4.rotateZ(-0.1 * delta);
    // Rotates mixer
    this.mixer.rotateY(0.01 * delta);

  };
}