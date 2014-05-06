# jq-slider

A jQuery Slider Plugin

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/toruta39/jq-slider/master/dist/jq-slider.min.js
[max]: https://raw.github.com/toruta39/jq-slider/master/dist/jq-slider.js

In your web page:

```html
<div class="slider"></div>

<script src="jquery.js"></script>
<script src="dist/jq-slider.min.js"></script>
<script>
jQuery(function($) {
  $('.slider').slider(); // initialize jq-slider
});
</script>
```

You can also customize the slider via options:

```html
<div class="slider">
  <div class="slider-inner">
    <div class="scrubber"></div>
    <div class="progress"></div>
  </div>
</div>

<script src="jquery.js"></script>
<script src="dist/jq-slider.min.js"></script>
<script>
jQuery(function($) {
  var slider = $('.slider').slider({
    container: $('.slider-inner'), // initialize jq-slider with a custom container element
    scrubber: $('.scrubber'), // set a custom container element
    progress: $('.progress'), // set a custom progress element
    initialX: 0.5, // set the inital X value
    initialY: 0.5, // set the initial Y value
    scrubberWidth: 20, // set the scrubber width
    scrubberHeight: 20 // set the scrubber height
  });

  slider.setSize(400, null); // set the container size to 400 * auto
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
