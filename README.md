jquery.ghSlider
===============

Super Small jQuery Slider

Example:

Html

<ul class="ghSlider">
    <li><img src="/img/slider-foto1.jpg" /></li>
    <li><img src="/img/slider-foto2.jpg" /></li>
    <li><img src="/img/slider-foto3.jpg" /></li>
</ul>

Css

<style>
  .ghSlider {
    width: 1920px;
    height: 280px;
}

.ghSlider li {
    float: left;
}
</style>

Js initer


<script>
    $(function () {
        $(".ghSlider").ghSlider({ width: 1920, height: 290, arrows: false });
    });
</script>
