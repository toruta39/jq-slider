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

  module('jQuery#slider', {
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

}(jQuery));
