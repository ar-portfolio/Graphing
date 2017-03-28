/* global $ */
/* global myModules */
(function() {
    "use strict";

    var graph1 = myModules.graphModule(),
        graph2 = myModules.graphModule(),
        calc1 = $('#calc1'),
        calc2 = $('#calc2'),
        graph1Div = $('#calcDiv1'),
        graph2Div = $('#calcDiv2'),
        functionList = $('#functionList ul'),
        myModal = $('#myModal'),
        termForm = $('#term'),
        coefficient = $('#coefficient'),
        exponent = $('#exponent'),
        zoomOut1 = $('#zoomOut1'),
        zoomOutX1 = $('#zoomOutX1'),
        zoomOutY1 = $('#zoomOutY1'),
        zoomIn1 = $('#zoomIn1'),
        zoomInX1 = $('#zoomInX1'),
        zoomInY1 = $('#zoomInY1'),
        clear1 = $('#clear1'),
        zoomOut2 = $('#zoomOut2'),
        zoomOutX2 = $('#zoomOutX2'),
        zoomOutY2 = $('#zoomOutY2'),
        zoomIn2 = $('#zoomIn2'),
        zoomInX2 = $('#zoomInX2'),
        zoomInY2 = $('#zoomInY2'),
        clear2 = $('#clear2'),
        currentGraph1Func,
        currentGraph2Func;
    
    function nthPower(num, exponent) {
        var product = num,
            i;
        for(i = 1; i < exponent; i++) {
            product *= num;
        }
        return product;
    }

    function createTerm(coefficient, num, exponent) {
        return coefficient * (nthPower(num, exponent));
    }
                
    var mathFunctions = [ 
        {
            regular: function(funcX) {
                return (createTerm(2, funcX, 1)) + 2;
            },
            derivative: function() {
                return 2;
            },
            regularLabel: "<em>f</em> (x) = 2x + 2",
            derivativeLabel: "<em>f</em> ' = 2",
            title: "Line - positive slope"
        },
        {
            regular: function(funcX) {
                return -(createTerm(2, funcX, 1)) + 2;
            },
            derivative: function() {
                return -2;
            },
            regularLabel: "<em>f</em> (x) = -2x + 2",
            derivativeLabel: "<em>f</em> ' = -2",
            title: "Line - negative slope"
        },
        {
            regular: function(funcX) {
                return (createTerm(3, funcX, 2)) + (createTerm(2, funcX, 1)) - 1;
            },
            derivative: function(funcX) {
                return (createTerm(6, funcX, 1)) + 2;
            },
            regularLabel: "<em>f</em> (x) = 3x^2 + 2x - 1",
            derivativeLabel: "<em>f</em> ' = 6x + 2",
            title: "Quadratic"
        },
        {
            regular: function(funcX) {
                return ((createTerm(1, funcX, 4)) - (createTerm(3, funcX, 2))) + 1;
            },
            derivative: function(funcX) {
                return (createTerm(3, funcX, 3)) - (createTerm(6, funcX, 1));
            },
            regularLabel: "<em>f</em> (x) = x^4 - 3x^2 + 1",
            derivativeLabel: "<em>f</em> ' = 3x^3 - 6x",
            title: "Polynomial"
        },
        {
            regular: function(funcX) {
                return (funcX + 1) / funcX;
                
            },
            derivative: function(funcX) {
                return -1 / (createTerm(1, funcX, 2));
            },
            regularLabel: "<em>f</em> (x) = x + 1 / x",
            derivativeLabel: "<em>f</em> ' = -1 / x^2",
            title: "Asymptote"
        },
        {
            regular: function(funcX) {
                return (funcX - 2) / ((createTerm(1, funcX, 2)) - (createTerm(2, funcX, 1)));
            },
            derivative: function(funcX) {
                return (-(createTerm(1, funcX, 2)) + (4 * funcX) - (4)) / ((createTerm(1, funcX, 4)) - (createTerm(4, funcX, 3)) + (createTerm(4, funcX, 2)));
            },
            regularLabel: "<em>f</em> (x) = x-2 / x^2 - 2x",
            derivativeLabel: "<em>f</em> ' = -x^2 + 4x - 4 / x^4 - 4x^3 + 4x^2",
            title: "Asymptote with discontinuity"
        }
    ];

    graph1.initialize().appendGraph(graph1Div[0]).drawGraphingSquare();

    $('<li><h4><strong>Want to try it?</strong></h4><h5><strong>Graph your own Function</strong></h5></li>')
        .appendTo(functionList)
        .click(function() {
            termForm.trigger('reset');
            myModal.modal('show');
        });
    mathFunctions.forEach(function(mathFunction) {
        $('<li><h4><strong>' + mathFunction.title + '</strong></h4><h5><strong>' + mathFunction.regularLabel + '</strong></h5></li>')
        .appendTo(functionList)
        .click(function() {
            currentGraph1Func = mathFunction.regular;
            $('.caption').empty();
            calc2.hide();
            graph1.graphFunc(currentGraph1Func);
            calc1.append('<div class="caption"><h4>' + mathFunction.regularLabel + '</h4></div>');
            $('<div class="caption"><button id="derivative" class="btn btn-primary">Graph Derivative</button></div>')
            .appendTo(calc1)
            .click(function() {
                currentGraph2Func = mathFunction.derivative;
                $('#calc2Caption').remove();
                graph2.initialize().appendGraph(graph2Div[0]).graphFunc(currentGraph2Func);
                calc2.append('<div id="calc2Caption" class="caption"><h4>' + mathFunction.regularLabel + '</h4><h4>' + mathFunction.derivativeLabel + '</h4></div>');
                calc2[0].style.display = 'inline-block'; //jQuery 'show()' sets display: block
                $('#derivative').hide();
            });
        }); 
    });
    clear1.click(function() {
        graph1.drawGraphingSquare();
        currentGraph1Func = 0;
        $('.caption').empty();
        calc2.hide();
    });
    zoomOut1.click(function() {
        graph1.zoomOut().graphFunc(currentGraph1Func);
    });
    zoomOutX1.click(function() {
        graph1.zoomOutX().graphFunc(currentGraph1Func);
    });
    zoomOutY1.click(function() {
        graph1.zoomOutY().graphFunc(currentGraph1Func);
    });
    zoomIn1.click(function() {
        graph1.zoomIn().graphFunc(currentGraph1Func);
    });
    zoomInX1.click(function() {
        graph1.zoomInX().graphFunc(currentGraph1Func);
    });
    zoomInY1.click(function() {
        graph1.zoomInY().graphFunc(currentGraph1Func);
    });
    clear2.click(function() {
        $('#calc2Caption').remove();
        calc2.hide();
        $('#derivative').show();
    });
    zoomOut2.click(function() {
        graph2.zoomOut().graphFunc(currentGraph2Func);
    });
    zoomOutX2.click(function() {
        graph2.zoomOutX().graphFunc(currentGraph2Func);
    });
    zoomOutY2.click(function() {
        graph2.zoomOutY().graphFunc(currentGraph2Func);
    });
    zoomIn2.click(function() {
        graph2.zoomIn().graphFunc(currentGraph2Func);
    });
    zoomInX2.click(function() {
        graph2.zoomInX().graphFunc(currentGraph2Func);
    });
    zoomInY2.click(function() {
        graph2.zoomInY().graphFunc(currentGraph2Func);
    });

    termForm.submit(function(event) {
        var coeff = coefficient.val(),
            exp = exponent.val();
            
        currentGraph1Func = function(funcX) {
            return createTerm(coeff, funcX, exp);
        }; 
        $('.caption').empty();
         calc2.hide();
        graph1.graphFunc(currentGraph1Func);
        myModal.modal('hide');
        event.preventDefault();
    });
 
}());