'use strict';
var ref = require('ref')
var ArrayType = require('ref-array')
var FFI = require('ffi');

var byte = ref.types.byte;
var ByteArray = ArrayType(byte);

var states = [new ByteArray(256),new ByteArray(256)];

var user32 = new FFI.Library('user32', {
   'GetKeyboardState': [ 'bool', [ByteArray] ],
   'GetKeyState': [ 'short', [ 'int32' ] ],
});

states.forEach(state => user32.GetKeyboardState(state))

var n = 0;
function loop(){
    n^=1;
    user32.GetKeyState(0)
    user32.GetKeyboardState(states[n]);
    for (let i = 256; i--;) {
        if ((states[n][i] >> 7) && states[0][i]!==states[1][i]) process.stdout.write(String.fromCharCode(i));
    }
    setImmediate(loop);
}
loop()
