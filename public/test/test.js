QUnit.test('Testing Leading Zero function', function (assert) {

    assert.equal(leadingZero(10),10 , 'Testing  with greater than 9 timer');
    assert.equal(leadingZero(6),6,'Testing with less than 9 timer');
    assert.equal(leadingZero(30),30,'Testing with greater than 9 timer');
    assert.throws(function () { leadingZero('a'); },/The given argument is not a number/, 'Passing in a string correctly raises an Error');
    assert.throws(function () { leadingZero('null'); },/The given argument is not a number/, 'please  pass a number');
}
);