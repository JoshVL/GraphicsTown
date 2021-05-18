/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Simple Circular Track - and an object that goes around on it
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrCopter } from "./flying.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value).
 * They can also ask for the direction vector.
 */
export class CircularTrack extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 15;
    let group = new T.Group();
    group.translateX(params.x || 0);
    group.translateY(params.bias || 0);
    group.translateZ(params.z || 0);
    super(`CircularTrack`, group);

    this.x = params.x || 0;
    this.z = params.z || 0;
    this.y = params.bias || 0.1;
    this.r = radius;
  }
  eval(u) {
    let p = u * 2 * Math.PI;
    return [
      this.x + this.r * Math.cos(p),
      this.y,
      this.z + this.r * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }
}

// Assigning Copter To Track
export class TrackCopter extends GrCopter {
  constructor(track, params = {}) {
    super({});
    this.track = track;
    this.u = 0;
    this.rideable = this.objects[0];
  }
  stepWorld(delta, timeOfDay) {
    this.u += delta / 4000;
    let pos = this.track.eval(this.u);
    this.objects[0].position.set(pos[0], 8 + pos[1], pos[2]);
    let dir = this.track.tangent(this.u);

    let zAngle = Math.atan2(dir[2], dir[0]);
    this.objects[0].rotation.y = zAngle + -Math.PI / 2;
    this.prop1.rotateY(0.1 * delta);
    this.prop2.rotateY(0.1 * delta);
  }
}
