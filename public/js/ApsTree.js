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
  launchViewer('dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aW90X3Rlc3Qvc2hlbHZlcy0xODAtMTIwLTIuaWFtLnppcA')
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
    let increment = this.value/100
    fragslist.forEach(frgid=>{
      const proxy = viewer.impl.getFragmentProxy(viewer.model, frgid);
      proxy.scale = new THREE.Vector3((1+increment), 1,1);
      proxy.updateAnimTransform();
    })
    viewer.impl.invalidate(true, true, true);
  }
});
