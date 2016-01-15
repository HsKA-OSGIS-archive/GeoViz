//############### Open Layers part ###############//

/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;


//
// Define rotate to north control.
//



/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
app.RotateNorthControl = function(opt_options) {

  var options = opt_options || {};
  console.log("basic parameters of the function to create button");
  console.log(options);

//var button = document.createElement('button');
  var button = document.createElement('a');
  button.setAttribute("href", "#");
  button.setAttribute("class", "btn btn-primary");
  button.setAttribute("data-action", "toggle");
  button.setAttribute("data-side", "left");
  button.innerHTML = 'N';
  

  var this_ = this;
  var handleRotateNorth = function(e) {
    alert("button was pressed!");
 //   this_.getMap().getView().setRotation(0);
  };

  button.addEventListener('click', handleRotateNorth, false);
  button.addEventListener('touchstart', handleRotateNorth, false);

  var element = document.createElement('div');
  element.className = 'rotate-north ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};
ol.inherits(app.RotateNorthControl, ol.control.Control);


//
// Create map, giving it a rotate to north control.
//


var map = new ol.Map({
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }).extend([
    new app.RotateNorthControl()
  ]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [49, 8],
    zoom: 3,
    rotation: 0
  })
});

//############### accordion part ###############//


$(document).ready(function(){
  $("dt").click(function(){ // trigger 
    $(this).next("dd").slideToggle("fast"); // blendet beim Klick auf "dt" die nächste "dd" ein. 
    $(this).children("a").toggleClass("closed open"); // wechselt beim Klick auf "dt" die Klasse des enthaltenen a-Tags von "closed" zu "open". 
  });
});