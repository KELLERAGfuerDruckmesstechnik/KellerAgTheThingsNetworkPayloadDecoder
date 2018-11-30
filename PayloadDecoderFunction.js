function Decoder(bytes, port) {  
  var channelCount = bytes.length/4 - 1;
  var result = {
    func: bytes[0],
    ct: bytes[1],
    channel: bytesToInt([bytes[2], bytes[3]], false),
    channelCount: channelCount,
    payload : bytes, 
  };

  for (var i = 1; i <= channelCount; i++) {
    var MSBIndex = i * 4;
    var byteValue = bytes.slice(MSBIndex, MSBIndex + 4);

    result['Channel_' + i] = bytesToFloat(byteValue);
  }

  return result;
}

// Based on https://stackoverflow.com/a/37471538 by Ilya Bursov
function bytesToFloat(bytes) {
  // JavaScript bitwise operators yield a 32 bits integer, not a float.
  // Assume MSB (most significant byte first).
  var bits = bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3];
  var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
  var e = bits>>>23 & 0xff;
  var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
  var f = sign * m * Math.pow(2, e - 150);
  return f;
}  
  
function bytesToInt(bytes, isLittleEndian) {
  //var totalBits = (signBits + exponentBits + fractionBits);
  var binary = "";

  for (var i = 0, l = bytes.length; i < l; i++) {
    var bits = bytes[i].toString(2);

    while (bits.length < 8) {
      bits = "0" + bits;
    }

    if (isLittleEndian) {
      binary = bits + binary;
    } else {
      binary = binary + bits;
    }
  }

  return binary;
}