(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery.fn.slider', {
    // This will run before each test in this module.
    setup: function() {
      this.elem = $('#qunit-fixture');
    }
  });

  test('it is chainable', function() {
    expect(1);
    strictEqual(this.elem.slider(), this.elem, 'should be chainable');
  });

  test('it initializes components', function() {
    expect(4);
    var slider;

    slider = this.elem.slider();
    ok(slider.container, 'has container');
    ok(slider.scrubber, 'has scrubber');
    ok(!slider.progress, 'has not progress by default');

    slider = this.elem.slider({progress: true});
    ok(slider.progress, 'has progress accroding to options');
  });

  test('its components can be set seperated', function() {
    expect(2);
    var someContainer = $('<div class="some-container">'),
      someScrubber = $('<div class="some-scrubber">'),
      someProgress = $('<div class="some-progress">'),
      someInnerWrapper = $('<div class="some-inner-wrapper">'),
      slider;

    someContainer.append(someInnerWrapper.append(someScrubber, someProgress));
    this.elem.append(someContainer);

    someContainer.width(200).height(16);

    slider = this.elem.slider({
      container: someContainer,
      scrubber: someScrubber,
      progress: someProgress
    });

    slider.setValue(1, 1);
    strictEqual(slider.left, 200 - 16, 'custom scrubber x-offset is correct');
    strictEqual(slider.top, 0, 'custom scrubber x-offset is correct');
  });

  test('it initializes components', function() {
    var slider = this.elem.slider({
      initialX: 1,
      initialY: 1
    });

    strictEqual(slider.left, slider.width() - $.fn.slider.options.scrubberWidth, 'scrubber x-offset should be set according to initialX');
    strictEqual(slider.top, slider.height() - $.fn.slider.options.scrubberHeight, 'scrubber y-offset should be set according to initialX');
  });

  module('jQuery.fn.slider#setValue', {
    setup: function() {
      this.elem = $('#qunit-fixture');
    }
  });

  test('its value can be set', function() {
    expect(8);
    var slider = this.elem.slider({
      scrubberWidth: 20,
      scrubberHeight: 20
    });
    slider.setValue(1, 1);

    strictEqual(slider.x, 1, 'value x should be set');
    strictEqual(slider.y, 1, 'value y should be set');
    strictEqual(slider.left, this.elem.width() - 20, 'scrubber x-offset should be updated');
    strictEqual(slider.top, this.elem.height() - 20, 'scrubber y-offset should be updated');

    slider.setValue(0, 0);
    strictEqual(slider.x, 0, 'value x should be set to 0');
    strictEqual(slider.y, 0, 'value y should be set to 0');
    strictEqual(slider.left, 0, 'scrubber x-offset should be updated to 0');
    strictEqual(slider.top, 0, 'scrubber y-offset should be updated to 0');
  });

  module('jQuery.fn.slider#setSize', {
    setup: function() {
      this.elem = $('#qunit-fixture');
    }
  });

  test('its container size can be set', function() {
    expect(4);
    this.elem.append('<div class="some-slider">');
    var slider = this.elem.find('.some-slider').slider();

    slider.setValue(1, 1);
    slider.setSize(200, 200);

    strictEqual(slider.left, 200 - $.fn.slider.options.scrubberWidth, 'scrubber x-offset should be updated');
    strictEqual(slider.top, 200 - $.fn.slider.options.scrubberHeight, 'scrubber y-offset should be updated');

    slider.setSize(null, null);

    strictEqual(slider.left, slider.width() - $.fn.slider.options.scrubberWidth, 'scrubber x-offset should be updated when null is passed as width');
    strictEqual(slider.top, slider.height() - $.fn.slider.options.scrubberHeight, 'scrubber y-offset should be updated when null is passed as height');
  });

}(jQuery));
