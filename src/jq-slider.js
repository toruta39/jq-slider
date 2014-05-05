/*
 * jq-slider
 *
 *
 * Copyright (c) 2014 Joshua Zhang
 * Licensed under the MIT license.
 */

(function ($) {

  // Collection method.
  $.fn.slider = function (options) {
    options = $.extend({}, $.fn.slider.options, options);

    var
      startClientX, startClientY, // clientX/Y when starting dragging
      startScrubberX, startScrubberY, // sliderX/Y when starting dragging
      containerX, containerY, containerWidth, containerHeight,
      maxScrubberX, maxScrubberY,
      scrubberXActualRatio, scrubberYActualRatio, // Ratio to keep slider within container
      LMBReleaseCount = 0,
      $body = $('body'),
      slider = this;

    // this.x, this.y relfect percent value
    this.x = 0;
    this.y = 0;
    // this.left, this.top relfect the px offset value
    this.left = 0;
    this.top = 0;

    this.container = this.empty();
    this.scrubber = $('<div class="scrubber"></div>').appendTo(this);
    if (options.progress) {
      this.progress = $('<div class="progress"></div>').appendTo(this);
    }

    // Value of x, y should be between 0 and 1
    this.setValue = function (x, y) {
      if (typeof x === 'number') {
        slider.x = x;
      }
      if (typeof y === 'number') {
        slider.y = y;
      }

      updateSliderPos();
    };

    this.updateSize = function () {
      updateContainerOffset();

      maxScrubberX = Math.max(0, containerWidth - options.scrubberWidth);
      maxScrubberY = Math.max(0, containerHeight - options.scrubberHeight);
      scrubberXActualRatio = 1 - options.scrubberWidth / containerWidth;
      scrubberYActualRatio = 1 - options.scrubberHeight / containerHeight;
      updateSliderPos();
    };

    function bindDragging () {
      $body.addClass('dragging');
        $(window)
          .on($.fn.slider.options.pointermove, onPointerMove)
          .on($.fn.slider.options.pointerup, onPointerUp);
    }

    function unbindDragging () {
      $body.removeClass('dragging');
      $(window)
        .off($.fn.slider.options.pointermove, onPointerMove)
        .off($.fn.slider.options.pointerup, onPointerUp);
    }

    function onPointerUp () {
      LMBReleaseCount = 0;
      unbindDragging();

      slider.container.trigger('slider.release');
    }

    function onPointerDown (e) {
      var data = {},
          sliderOffset;

      e.preventDefault();
      e.stopPropagation();

      updateContainerOffset();

      slider.container.trigger('slider.grab');

      if (!options.isTouchDevice) {
        startClientX = e.clientX;
        startClientY = e.clientY;
      } else {
        startClientX = e.originalEvent.touches[0].clientX;
        startClientY = e.originalEvent.touches[0].clientY;
      }

      if (maxScrubberX) {
          slider.left = startClientX - containerX - options.scrubberWidth / 2;
          slider.left = Math.max(0, Math.min(maxScrubberX, slider.left));
          data.x = slider.x = slider.left / maxScrubberX;
      }

      if (maxScrubberY) {
          slider.top = startClientY - containerY - options.scrubberHeight / 2;
          slider.top = Math.max(0, Math.min(maxScrubberY, slider.top));
          data.y = slider.y = slider.top / maxScrubberY;
      }

      updateSliderPos();

      slider.container.trigger('slider.change', data);

      sliderOffset = slider.scrubber.offset();

      startScrubberX = sliderOffset.left;
      startScrubberY = sliderOffset.top;

      bindDragging();
    }

    function onPointerMove (e) {
      e.preventDefault();

      if (!options.isTouchDevice) {
        if (e.which !== 1) {
          LMBReleaseCount++;
          if (LMBReleaseCount > 2) {
            onPointerUp(e);
            return;
          } else if (LMBReleaseCount > 1) {
            return;
          }
        } else {
          LMBReleaseCount = 0;
        }
      }

      var data = {};

      if (!options.isTouchDevice) {
        slider.left = e.clientX;
        slider.top = e.clientY;
      } else {
        slider.left = e.originalEvent.touches[0].clientX;
        slider.top = e.originalEvent.touches[0].clientY;
      }

      slider.left += -startClientX + startScrubberX - containerX;
      slider.top += -startClientY + startScrubberY - containerY;

      slider.left = Math.max(0, Math.min(slider.left, maxScrubberX));
      slider.top = Math.max(0, Math.min(slider.top, maxScrubberY));

      if (maxScrubberX) {
        data.x = slider.x = slider.left / maxScrubberX;
      }

      if (maxScrubberY) {
        data.y = slider.y = slider.top / maxScrubberY;
      }

      updateSliderPos();

      slider.container.trigger('slider.change', data);
    }

    function updateContainerOffset () {
      var containerOffset = slider.container.offset();

      containerX = containerOffset.left;
      containerY = containerOffset.top;
      containerWidth = slider.container.width();
      containerHeight = slider.container.height();
    }

    function updateSliderPos () {
      if (maxScrubberX) {
        slider.left = maxScrubberX * slider.x;
        slider.scrubber.css('left', slider.x * scrubberXActualRatio * 100 + '%');

        if (slider.progress) {
          slider.progress.css('width', slider.x * scrubberXActualRatio * 100 + '%');
        }
      }

      if (maxScrubberY) {
        slider.top = maxScrubberY * slider.y;
        slider.scrubber.css('top', slider.y * scrubberYActualRatio * 100 + '%');

        if (slider.progress) {
          slider.progress.css('width', slider.y * scrubberYActualRatio * 100 + '%');
        }
      }
    }

    // Initialization
    if (this.css('position') === 'static') {
      this.css({position: 'relative'});
    }

    this.scrubber.css({
      width: options.scrubberWidth,
      height: options.scrubberHeight,
      position: 'absolute'
    });

    this.updateSize();
    this.container.on($.fn.slider.options.pointerdown, onPointerDown);

    return this;
  };

  // Default options.
  var isTouchDevice =  /iPhone|iPod|iPad|Android/i.test(navigator.userAgent);
  $.fn.slider.options = {
    isTouchDevice: isTouchDevice,
    pointerdown: isTouchDevice ? 'touchstart' : 'mousedown',
    pointermove: isTouchDevice ? 'touchmove' : 'mousemove',
    pointerup: isTouchDevice ? 'touchend' : 'mouseup',
    scrubberWidth: 16,
    scrubberHeight: 16
  };

}(jQuery));
