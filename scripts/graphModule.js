var myModules = myModules || {};

myModules.graphModule = (function() {
    'use strict';
    
    //data shared by all instances goes here

    return function() {
        var myCanvas = document.createElement('canvas'),
            pen = myCanvas.getContext("2d"),
            marginLeft = 0,
            marginTop = 0,
            pixelsPerUnitX = 25,
            pixelsPerUnitY = 25,
            pixelZoom = 5,
            drawingPathsPerUnitX = 0,
            drawingPathsPerUnitY = 0,
            stickLengthX = 0,
            stickLengthY = 0,
            funcX = 0,
            funcY = 0,
            x = 0, 
            y = 0;
        
        function convert() {
            x = (funcX * pixelsPerUnitX) + marginLeft;
            y = (-funcY * pixelsPerUnitY) + marginTop;
        }

        function setStickLength(axis) {
            if(axis === 'x') {
                stickLengthX = pixelsPerUnitX * 0.15;
            } else {
                stickLengthY = pixelsPerUnitY * 0.15;
            }
        }

        function setDrawingPathsPerUnit(axis) {
            if(axis === 'x') {
                drawingPathsPerUnitX = pixelsPerUnitX / 2;
            } else {
                drawingPathsPerUnitY = pixelsPerUnitY / 2;
            }
        }

        return {
            initialize: function() {
                this.setSize(300);
                this.setBackgroundColor('white');
                return this;
            },
            setSize: function(x, y) {
                y = y || x;
                myCanvas.width = x;
                myCanvas.height = y;
                marginLeft = myCanvas.width / 2;
                marginTop = myCanvas.height / 2;
                return this;
            },
            setBackgroundColor: function(color) {
                myCanvas.style.backgroundColor = color;
                return this;
            },
            appendGraph: function(element) {
                element.appendChild(myCanvas);
                return this;
            },
            drawGraphingSquare: function() {
                var i;
                setStickLength('x');
                setStickLength('y');
                setDrawingPathsPerUnit('x');
                setDrawingPathsPerUnit('y');

                pen.clearRect(0, 0, myCanvas.width, myCanvas.height);
                pen.beginPath();
                pen.moveTo(marginLeft, 0);
                pen.lineTo(marginLeft, myCanvas.height);
                pen.stroke();

                pen.beginPath();
                pen.moveTo(0, marginTop);
                pen.lineTo(myCanvas.width, marginTop);
                pen.stroke();

                for(i = pixelsPerUnitX; i < myCanvas.width; i+= pixelsPerUnitX) {
                    pen.beginPath();
                    pen.moveTo(i, marginTop - stickLengthX);
                    pen.lineTo(i, marginTop + stickLengthX);
                    pen.stroke();
                }

                for(i = pixelsPerUnitY; i < myCanvas.height; i+= pixelsPerUnitY) {
                    pen.beginPath();
                    pen.moveTo(marginLeft - stickLengthY, i);
                    pen.lineTo(marginLeft + stickLengthY, i);
                    pen.stroke();
                }
                return this;
            },
            graphFunc: function(getFuncY) {
                if(!getFuncY) {
                    return this.drawGraphingSquare();
                }
                
                var start,
                    i;

                this.drawGraphingSquare();
                start = -((marginLeft / pixelsPerUnitX) * drawingPathsPerUnitX);
                i = start;

                x = 0;
                y = 0;
                
                while(x < parseInt(myCanvas.width)) {
                    funcX = (i/drawingPathsPerUnitX);
                    funcY = getFuncY(funcX);
                    if(i === start) {
                        convert();
                        i++; 
                    } 
                    pen.beginPath();
                    pen.moveTo(x, y);
                    convert();
                    pen.lineTo(x, y);
                    pen.stroke();
                    i++;
                }
                return this;
            },
            zoomInX: function() {
                if(pixelsPerUnitX + pixelZoom < parseInt(myCanvas.width) / 2) {
                    pixelsPerUnitX += pixelZoom;
                    while((parseInt(myCanvas.width) / 2) % pixelsPerUnitX !== 0) {
                        if(pixelsPerUnitX < parseInt(myCanvas.width) / 2) {
                            pixelsPerUnitX++;
                        } else {
                            break;
                        }
                    }
                    setDrawingPathsPerUnit('x');
                    setStickLength('x');
                }
                return this;
            },
            zoomOutX: function() {
                if(pixelsPerUnitX - pixelZoom > 1 && drawingPathsPerUnitX - ((pixelsPerUnitX - pixelZoom) / 2) > 1) {
                    pixelsPerUnitX -= pixelZoom;
                    while((parseInt(myCanvas.width) / 2) % pixelsPerUnitX !== 0) {
                        if(pixelsPerUnitX > 5) {
                            pixelsPerUnitX--;
                        } else {
                            break;
                        }
                    }
                    setDrawingPathsPerUnit('x');
                    setStickLength('x');
                }
                return this;
            },
            zoomInY: function() {
                if(pixelsPerUnitY + pixelZoom < parseInt(myCanvas.height) / 2) {
                    pixelsPerUnitY += pixelZoom;
                    while((parseInt(myCanvas.height) / 2) % pixelsPerUnitY !== 0) {
                        if(pixelsPerUnitY < parseInt(myCanvas.height) / 2) {
                            pixelsPerUnitY++;
                        } else {
                            break;
                        }
                    }
                    setDrawingPathsPerUnit('y');
                    setStickLength('y');
                }
                return this;
            },
            zoomOutY: function() {
                if(pixelsPerUnitY - pixelZoom > 1 && drawingPathsPerUnitY - ((pixelsPerUnitY - pixelZoom) / 2) > 1) {
                    pixelsPerUnitY -= pixelZoom;
                    while((parseInt(myCanvas.height) / 2) % pixelsPerUnitY !== 0) {
                        if(pixelsPerUnitY > 5) {
                            pixelsPerUnitY--;
                        } else {
                            break;
                        }
                    }
                    setDrawingPathsPerUnit('y');
                    setStickLength('y');
                }
                return this;
            },
            zoomIn: function() {
                this.zoomInX().zoomInY();
                return this;
            },
            zoomOut: function() {
                this.zoomOutX().zoomOutY();
                return this;
            }
             
        };
    };
}());