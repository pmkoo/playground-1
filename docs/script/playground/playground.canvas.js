/* pure <canvas> renderer for playground
   that obeys application size, scale and smoothing */

PLAYGROUND.Renderer = function(app) {

  this.app = app;

  app.on("create", this.create.bind(this));
  app.on("resize", this.resize.bind(this));

};

PLAYGROUND.Renderer.plugin = true;

PLAYGROUND.Renderer.prototype = {

  create: function(data) {

    this.app.canvas = document.createElement("canvas");
    this.app.layer = this.app.canvas.getContext("2d");

  },

  resize: function(data) {

    var app = this.app;

    app.canvas.width = app.width;
    app.canvas.height = app.height;

    app.canvas.style.transformOrigin = "0 0";
    app.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
        
    /* disable interpolation for drawing context */
    
    app.layer.imageSmoothingEnabled = smoothing;

    /* disable interpolation when scaling canvas in DOM */

    app.canvas.style.imageRendering = this.app.smoothing ? "auto" : "pixelated";
    
  }

};