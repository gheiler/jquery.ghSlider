jquery.ghSlider
===============

Super Small jQuery Slider

Example:

Html
<div class="banners">
    <ul class="ghSlider">
        <li><img src="/img/slider-foto1.jpg" /></li>
        <li><img src="/img/slider-foto2.jpg" /></li>
        <li><img src="/img/slider-foto3.jpg" /></li>
    </ul>
</div>
Css

.banners {
    max-width: 1920px;
    overflow: hidden;
    clear: both;
}

.ghSlider {
   width: 1920px;
   height: 280px;
}

.ghSlider li {
    float: left;
}

Js initer


     $(function () {
       $(".ghSlider").ghSlider({ width: 1920, height: 290, arrows: false });
     });

