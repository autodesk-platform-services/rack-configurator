/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by APS Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

$(document).ready(function () {

  launchViewer('dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aW90X3Rlc3Qvc2hlbHZlcy0xODAtMTIwLTIuaWFtLnppcA')  // Change this from your model
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;
  let increment = 0
  slider.oninput = function() {
    output.innerHTML = this.value;
    increment = this.value/100
    scale()
  }

  $('#tilt').change((e)=>{
    let pos1 = {x:0,y:50,z:10}
    let angle1 = -100
    let pos2 = {x:0,y:0,z:0}
    let angle2 = 0
    if (e.currentTarget.checked) {
      tilt(pos1,angle1)
    } else {
      tilt(pos2,angle2)
    }
    scale()
  })

  let scale = ()=>{
    fragslistforscale.forEach(frgid=>{
      const proxy = viewer.impl.getFragmentProxy(viewer.model, frgid);
      proxy.scale = new THREE.Vector3((1+increment), 1,1);
      proxy.updateAnimTransform();
    })
    viewer.impl.invalidate(true, true, true);
  }

  let tilt = (pos,angle)=> {
    const axis = new THREE.Vector3(1, 0, 0);
    const meshes = [];
    fragslistfortilt.forEach(fragId => {
      const mesh = viewer.impl.getFragmentProxy(viewer.model, fragId);
      mesh.scale = new THREE.Vector3(1, 1, 1);
      mesh.quaternion = new THREE.Quaternion(0, 0, 0, 0);
      mesh.position = new THREE.Vector3(pos.x, pos.y, pos.z);
      meshes.push(mesh);
    });
    for (const mesh of meshes) {
      mesh.quaternion.setFromAxisAngle(axis, angle);
      mesh.updateAnimTransform();
    }
    viewer.impl.invalidate(true, true, true);
  }
  
});
