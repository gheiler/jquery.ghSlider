/**
* Plugin to slide li elements inside an ul
* Author: @gabrielheiler
*/
$.fn.ghSlider = function (options) {
    var obj = new $.ghSlider($(this), options);
    obj.data("ghSlider", obj);

    return obj;
};

/**
* This plugin slides list items inside an unordered list
* @class
* @param {string} <width> Width of the list item
* @param {string} <height> Height of the list item
* @param {bool} <autoSlide> Defines if auto slide or not
* @param {int} <secsToSlide> The seconds in between slides
* @param {bool} <arrows> This parameter is the selector wich will be used to sincronized with a list of ghSlider
* @param {bool} <stopOnChange> This parameter determines if we will stop the autoSlide once the user uses the arrows
*/
$.ghSlider = function ($this, options) {

    $.fn.ghSlider.defaults = {
        width: 100,
        height: 100,
        autoSlide: true,
        secsToSlide: 8,
        arrows: true,
        stopOnChange: false,
        imagesShowed: 0
};

    $this.options = $.extend({}, $.fn.ghSlider.defaults, options);
    var o = $this.options;
    var sliderTimeout;
    var totalItems;
    var itemsCnt;
    var sliderToLeft = true;
    var arrowsLocked = false;

    /**
    * Initilize the plugin, gets the html file to generate the form, bind events to controls
    * @method
    * @private
    * @memberOf $.fn.ghSlider
    */
    function initialize() {
        totalItems = $("li", $this.selector).length;
        itemsCnt = $($this.selector);
        // doy estilo al contenedor y a los items
        $this.addClass("ghSlider");
        $this.css("width", o.width + "px");
        $this.css("height", o.height + "px");
        $("li", $this.selector).each(function (indx, item) {
            $(item).css("width", o.width + "px")
                   .css("height", o.height + "px");
        });
        itemsCnt.css("width", o.width * totalItems + "px");
        // agrego flechas y les doy estilo
        if (o.arrows) {
            var prev = $("<a class='prev'>&#139;</a>")
                        .css("height", o.height + "px")
                        .css("line-height", o.height + "px");
            $this.before(prev);
            var next = $("<a class='next'>&#155;</a>")
                        .css("height", o.height + "px")
                        .css("line-height", o.height + "px");
            $this.after(next);
        }

        // añado evento a flechas

        $(document).on("click", ".prev", function () {
            if (!arrowsLocked) { // esperamos a que termine la animacion antes de dejar apretar otra vez
                if ($(itemsCnt).css("margin-left").split("px")[0] < 0) { // que no se exceda de los limites 
                    arrowsLocked = true; // bloqueamos el movimiento
                    $(itemsCnt).animate({ "margin-left": "+=" + o.width }, "slow", function () {
                        arrowsLocked = false; // permito mover otra vez
                    });
                }
            }
        });

        $(document).on("click", ".next", function () {
            if (!arrowsLocked) { // esperamos a que termine la animacion antes de dejar apretar otra vez
                if ($(itemsCnt).css("margin-left").split("px")[0] + o.width < (o.width * totalItems)) { // que no se exceda de los limites 
                    arrowsLocked = true; // bloqueamos el movimiento
                    $(itemsCnt).animate({ "margin-left": "-=" + o.width }, "slow", function () {
                        arrowsLocked = false; // permito mover otra vez
                    });
                }
            }
        });

        if (o.autoSlide) {
            // slide
            sliderTimeout = setInterval(function () {
                if (!arrowsLocked) {
                    arrowsLocked = true; // bloqueamos el movimiento por flechas
                    if (o.imagesShowed < totalItems - 1) {
                        o.imagesShowed++;
                        $(itemsCnt).animate({ "margin-left": "-=" + o.width }, "slow", function () {
                            arrowsLocked = false; // permito mover otra vez
                        });
                    } else {
                        o.imagesShowed = 0;
                        // vuelvo a empezar
                        $(itemsCnt).animate({ "margin-left": "+=" + o.width * (totalItems - 1) }, "fast", function () {
                            arrowsLocked = false; // permito mover otra vez
                        });
                    }
                }
            }, o.secsToSlide * 1000);
        }
    }

    initialize();

    return $this;
};
