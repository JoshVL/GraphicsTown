/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import * as T from "../libs/CS559-Three/build/three.module.js";
import { SimpleHouse } from "./house.js";
import { GrDump, GrMixer } from "./vehicles.js"
import { GrTree } from "./nature.js"
import { GrFlag, GrChair } from "./scenery.js"
import { GrATM } from "./technology.js"
import { GrPotty, GrHammer, GrRubble, GrRoad } from "./construction.js";
import { GrHall } from "./townhall.js";
import { CircularTrack, TrackCopter } from "./track.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

/********************************************************************** */
export function main(world) {
  // Houses
  for (let i = -19; i < 0; i += 5) {
    world.add(new SimpleHouse({ x: i, z: -18 }));
    world.add(new SimpleHouse({ x: i, z: -10 }));
  }

  // Copter
  let track = new CircularTrack();
  track.setPos(0, -0.1, 0);
  let circleCopter = new TrackCopter(track);
  world.add(track);
  world.add(circleCopter);

  // Simple Main Road
  let mainroad = new GrRoad();
  world.add(mainroad);
  // Populating The Road
  for (let i = -18; i < 20; i += 10) {
    world.add(new GrDump({ x: i, z: 3 }));
    world.add(new GrMixer({ x: i + 3, z: -3 }));
  }

  // Benches with Simple Shader
  let shaderMat = shaderMaterial("./shaders/simple.vs", "./shaders/simple.fs", {
    side: T.DoubleSide,
  });
  world.add(new GrChair({x: 5, z: -8, material: shaderMat}));
  world.add(new GrChair({x: 2, z: -8, material: shaderMat}));

  // Adding Construction Vehicles
  let dumptruck = new GrDump();
  dumptruck.setPos(8, 0, 15);
  dumptruck.whole_ob.rotateY(Math.PI);
  let mixer = new GrMixer();
  mixer.setPos(10, 0, 10);
  mixer.whole_ob.rotateY(-23);
  world.add(dumptruck);
  world.add(mixer);

  // Adding Town Hall
  
  let townhall = new GrHall();
  townhall.setPos(10, 0, -15);
  world.add(townhall);

  // Adding Nature
  let tree = new GrTree();
  tree.setPos(1, -0.5, -12);
  let tree2 = new GrTree();
  tree2.setPos(18, -0.5, -12);
  world.add(tree);
  world.add(tree2);
  for (let i = -19; i < 0; i += 3) {
    world.add(new GrTree({ x: i, y: -0.5, z: 18 }));
    world.add(new GrTree({ x: i + 2.5, y: -0.5, z: 14 }));
    world.add(new GrTree({ x: i, y: -0.5, z: 10 }));
  }

  // Adding Construction Facilities
  let potty = new GrPotty();
  potty.setPos(5, 0, 11);
  potty.whole_ob.rotateY(1);
  let potty2 = new GrPotty();
  potty2.setPos(6, 0, 9);
  potty2.whole_ob.rotateY(1);
  world.add(potty);
  world.add(potty2);

  // Adding Technology
  let atm = new GrATM();
  atm.setPos(4.75, 0.1, -12.5);
  let atm2 = new GrATM();
  atm2.setPos(3, 0.1, -12.5);
  world.add(atm);
  world.add(atm2);

  // Adding Scenery
  let flag = new GrFlag();
  flag.setPos(15.5, 0, -10);
  world.add(flag);

  // Adding Tools
  let jackhammer = new GrHammer();
  jackhammer.setPos(12, 1, 12);
  jackhammer.setScale(0.5, 0.5, 0.5);
  world.add(jackhammer);

  // Adding Rubble
  let rubble = new GrRubble();
  rubble.setPos(16, -0.1, 12);
  rubble.whole_ob.rotateY(Math.PI / 2);
  world.add(rubble);
}

