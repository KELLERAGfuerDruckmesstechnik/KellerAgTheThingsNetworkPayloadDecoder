function Decoder(bytes, port) {
 
// Based on https://stackoverflow.com/a/37471538 by Ilya Bursov
  function bytesToFloat(bytes) {
    // JavaScript bitwise operators yield a 32 bits integer, not a float.
    // Assume LSB (least significant byte first).
    var bits = bytes[3]<<24 | bytes[2]<<16 | bytes[1]<<8 | bytes[0];
    var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
    var e = bits>>>23 & 0xff;
    var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
  }  
    
  function bytesToInt(bytes, isLittleEndian) {
    //var totalBits = (signBits + exponentBits + fractionBits);
    var binary = "";
    for (var i = 0, l = bytes.length; i < l; i++) 
      {
        var bits = bytes[i].toString(2);
        while (bits.length < 8)
            bits = "0" + bits;
        if (isLittleEndian)
            binary = bits + binary;
        else
            binary = binary + bits;
    }
    return binary;
  }  
  
  var value3 = 0;
  var value4 = 0;
  var value5 = 0;
  var value6 = 0;
  var value7 = 0;
  var value8 = 0;
  var value9 = 0;
  var value10 = 0;
  var value11 = 0;
  var value12 = 0;
  var value13 = 0;
  var value14 = 0;
  var value15 = 0;

  
  var channelCount = bytes.length/4 - 1;
  var func = bytes[0];
  var ct = bytes[1];
  var channel = [bytes[2], bytes[3]];
  value1  = [bytes[7],  bytes[6],  bytes[5],  bytes[4]];
  value2  = [bytes[11], bytes[10], bytes[9],  bytes[8]];
  
  if (channelCount>=3)
    value3  = [bytes[15], bytes[14], bytes[13], bytes[12]];
  if (channelCount>=4)
    value4  = [bytes[19], bytes[18], bytes[17], bytes[16]];
  if (channelCount>=5)
    value5  = [bytes[23], bytes[22], bytes[21], bytes[20]];
  if (channelCount>=6)
    value6  = [bytes[27], bytes[26], bytes[25], bytes[24]];
  if (channelCount>=7)
    value7  = [bytes[31], bytes[30], bytes[29], bytes[28]];
  if (channelCount>=8)
    value8  = [bytes[35], bytes[34], bytes[33], bytes[32]];
  if (channelCount>=9)
    value9  = [bytes[39], bytes[38], bytes[37], bytes[36]];
  if (channelCount>=10)
    value10 = [bytes[43], bytes[42], bytes[41], bytes[40]];
  if (channelCount>=11)
    value11 = [bytes[47], bytes[46], bytes[45], bytes[44]];
  if (channelCount>=12)
    value12 = [bytes[54], bytes[50], bytes[49], bytes[48]];
  if (channelCount>=13)
    value13 = [bytes[58], bytes[54], bytes[53], bytes[52]];
  if (channelCount>=14)
    value14 = [bytes[62], bytes[58], bytes[57], bytes[56]];
  if (channelCount>=15)
    value15 = [bytes[66], bytes[62], bytes[61], bytes[60]];
  
  var value0int = bytesToInt(channel, false);
  
  var value1float = bytesToFloat(value1);
  var value2float = bytesToFloat(value2);
  var value3float = bytesToFloat(value3);
  var value4float = bytesToFloat(value4);  
  var value5float = bytesToFloat(value5);
  var value6float = bytesToFloat(value6);
  var value7float = bytesToFloat(value7);
  var value8float = bytesToFloat(value8);
  var value9float = bytesToFloat(value9);
  var value10float = bytesToFloat(value10);  
  var value11float = bytesToFloat(value11);
  var value12float = bytesToFloat(value12);

  if (channelCount==2){
    return {
      func: func,
      ct: ct,
      channel: value0int,
      channelCount: channelCount,
      payload : bytes, 
      Channel_1: value1float,
      Channel_2: value2float
      };
  }else if(channelCount==3){
    return {
      func: func,
      ct: ct,
      channel: value0int,
      channelCount: channelCount,
      payload : bytes, 
      Channel_1: value1float,
      Channel_2: value2float,
      Channel_3: value3float     
      };
  }else if(channelCount==4){
    return {
      func: func,
      ct: ct,
      channel: value0int,
      channelCount: channelCount,
      payload : bytes, 
      Channel_1: value1float,
      Channel_2: value2float,
      Channel_3: value3float,      
      Channel_4: value4float
      };
  }  else if(channelCount==5){
    return {
      func: func,
      ct: ct,
      channel: value0int,
      channelCount: channelCount,
      payload : bytes, 
      Channel_1: value1float,
      Channel_2: value2float,
      Channel_3: value3float,      
      Channel_4: value4float,
      Channel_5: value5float
      };
  }else
  {
    return {
      func: func,
      ct: ct,
      channel: value0int,
      channelCount: channelCount,
      payload : bytes, 
      Channel_1: value1float,
      Channel_2: value2float,
      Channel_3: value3float,      
      Channel_4: value4float,
      Channel_5: value5float,
      Channel_6: value6float,
      Channel_7: value7float,
      Channel_8: value8float,
      Channel_9: value9float
      };
  }
}