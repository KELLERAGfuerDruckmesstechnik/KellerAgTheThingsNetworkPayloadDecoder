var fs = require('fs');
eval(fs.readFileSync('ttn-v3-payload-decoder.js') + '');

describe('ttn-v3-payload-decoder', function () {
    it('should decode a given the example payload', function () {
        var payload = [0x01, 0x03, 0x00, 0xD3, 0xBF, 0x78, 0x93, 0x7D, 0xB8, 0x00, 0x00, 0x00, 0x41, 0xAE, 0x66, 0x66, 0x3F, 0x78, 0x91, 0x7D, 0x41, 0xBE, 0x00, 0x00]
        var input = { bytes: payload, fPort: 1 }
        var result = decodeUplink(input);
        /*
          port: 1 # defines the base message type (1-Measurements, 2-Alarm, 3-Configure, 4-Info, 5-AnswerOfRequest)
          payload: '010300D3BF78937DB800000041AE66663F78917D41BE0000' # input bytes
          func: 1 # function code which defines the type of message format (Measurements, SensorInfo, 4 byte stream ...)
          ct: 3 # Connection Type: Defines the scheme of sensors attached and mapped to the device channels
          channel: '0000000011010011' # shows which of these channels are active and used
          channelCount: 5 # the number of channels attached
          P1: -0.000030517578125 # Channel 'Pressure 1' which the pressure in [bar] from first pressure sensor
          PBaro: 0.9709699749946594 # barometric pressure [bar]
          Pd (P1-PBaro): -0.9710004925727844 # pressure difference [bar] - used to calculate water level etc.
          TBaro: 23.75 # temperature in [°C] in the ADT1/ARC1 which is similar to the air temperature
          TOB1: 21.799999237060547 # temperature (over bridge) [°C]: temperature on the first pressure sensor
        */
        expect(result).toEqual({
            'data': {
                'func': 1,
                'port': 1,
                'payload': '010300D3BF78937DB800000041AE66663F78917D41BE0000',
                'ct': 3,
                'channel': '0000000011010011',
                'channelCount': 5,
                'Pd (P1-PBaro)': -0.9710004925727844,
                'P1': -0.000030517578125,
                'TOB1': 21.799999237060547,
                'PBaro': 0.9709699749946594,
                'TBaro': 23.75
            },
            'warnings': [],
            'errors': []
        });
    });

    it('should decode a given payload correctly (1/6)', function () {
        var payload = [0x0C, 0x01, 0x13, 0x00, 0x13, 0x26, 0x00, 0x00, 0x00, 0x01, 0x25, 0x4D, 0x4F, 0xCA, 0x40, 0xA4, 0xFC, 0x2B, 0x0D, 0x10];
        var input = { bytes: payload, fPort: 4 }
        var result = decodeUplink(input);

        expect(result).toEqual({
            'data': {
                'func': 12,
                'port': 4,
                'payload': '0C011300132600000001254D4FCA40A4FC2B0D10',
                'battery_voltage': 5.155782222747803,
                'battery_capacity_percentage': 13,
                'humidity_percentage': 16,
                'class_group_text': '19.00',
                'sw_version_text': '19.38',
                'serial_number': 1,
                'device_local_datetime': '2019-10-31 07:54:50'
            }, warnings: [], errors: []
        });
    });

    it('should decode a given payload correctly (2/6)', function () {
        var payload = [0x01, 0x02, 0x00, 0xD3, 0xFF, 0xFF, 0xFF, 0xFF, 0x3C, 0x77, 0x2C, 0xAC, 0x41, 0xAF, 0x51, 0x80, 0x3F, 0x71, 0x70, 0xF8, 0x41, 0xAA, 0xCC, 0xCD];
        var input = { bytes: payload, fPort: 1 }
        var result = decodeUplink(input);

        expect(result).toEqual({
            'data': {
                'func': 1,
                'port': 1,
                'payload': '010200D3FFFFFFFF3C772CAC41AF51803F7170F841AACCCD',
                'ct': 2,
                'channel': '0000000011010011',
                'channelCount': 5,
                'Pd (P1-PBaro)': -6.805646932770577e+38,
                'P1': 0.015086334198713303,
                'TOB1': 21.914794921875,
                'PBaro': 0.9431300163269043,
                'TBaro': 21.350000381469727
            }, warnings: [], errors: []
        });
    });

    it('should decode a given payload correctly (3/6)', function () {
        var payload = [0x01, 0x09, 0x0C, 0xD7, 0xFF, 0xFF, 0xFF, 0xFF, 0x3A, 0x99, 0xF8, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x41, 0xA1, 0xC4, 0x30, 0x3F, 0x77, 0x8F, 0xEF, 0x41, 0xAA, 0x14, 0x7B, 0x3B, 0x43, 0x66, 0xA9, 0x3B, 0x2F, 0x7A, 0x1A];
        var input = { bytes: payload, fPort: 1 }
        var result = decodeUplink(input);

        expect(result).toEqual({
            'data': {
                'func': 1,
                'port': 1,
                'payload': '01090CD7FFFFFFFF3A99F800FFFFFFFF41A1C4303F778FEF41AA147B3B4366A93B2F7A1A',
                'ct': 9,
                'channel': '0000110011010111',
                'channelCount': 8,
                'Pd (P1-P2)': -6.805646932770577e+38,
                'P1': 0.0011746883392333984,
                'P2': -6.805646932770577e+38,
                'TOB1': 20.220794677734375,
                'PBaro': 0.9670400023460388,
                'TBaro': 21.260000228881836,
                'Conductivity Tc': 0.0029815828893333673,
                'Conductivity raw': 0.0026775659061968327
            }, warnings: [], errors: []
        });
    });

    it('should decode a given payload correctly (4/6)', function () {
        var payload = [0x01, 0x02, 0x00, 0xD2, 0x3A, 0x28, 0x00, 0x00, 0x41, 0xB4, 0x66, 0x66, 0x3F, 0x76, 0x7C, 0x07, 0x41, 0xB6, 0x8F, 0x5C];
        var input = { bytes: payload, fPort: 1 }
        var result = decodeUplink(input);

        expect(result).toEqual({
            'data': {
                'P1': 0.000640869140625,
                'PBaro': 0.9628300070762634,
                'TBaro': 22.81999969482422,
                'TOB1': 22.549999237060547,
                'channel': '0000000011010010',
                'channelCount': 4,
                'ct': 2,
                'func': 1,
                'payload': '010200D23A28000041B466663F767C0741B68F5C',
                'port': 1
            }, warnings: [], errors: []
        });
    });

    it('should decode a given payload correctly (5/6)', function () {
        var payload = [0x01, 0x02, 0x00, 0xD3, 0xFF, 0xFF, 0xFF, 0xFF, 0xB9, 0x90, 0x0E, 0x00, 0x41, 0xAE, 0x81, 0x80, 0x3F, 0x77, 0x66, 0xA5, 0x41, 0xA8, 0xF5, 0xC3];
        var input = { bytes: payload, fPort: 1 }
        var result = decodeUplink(input);

        expect(result).toEqual({
            'data': {
                'Pd (P1-PBaro)': -6.805646932770577e+38,
                'P1': -0.00027476251125335693,
                'TOB1': 21.813232421875,
                'PBaro': 0.9664099812507629,
                'TBaro': 21.1200008392334,
                'func': 1,
                'port': 1,
                'payload': '010200D3FFFFFFFFB9900E0041AE81803F7766A541A8F5C3',
                'ct': 2,
                'channel': '0000000011010011',
                'channelCount': 5
            }, warnings: [], errors: []
        });
    });

    it('should decode a given payload correctly (6/6)', function () {
        var payload = [0x01, 0x05, 0x00, 0xD3, 0xBF, 0x78, 0x45, 0x34, 0x3C, 0x5F, 0xE4, 0x40, 0x41, 0xAE, 0x22, 0x80, 0x3F, 0x7B, 0xC4, 0xB1, 0x41, 0xA8, 0x66, 0x66];
        var input = { bytes: payload, fPort: 1 }
        var result = decodeUplink(input);

        expect(result).toEqual({
            'data': {
                'P1': 0.013665258884429932,
                'PBaro': 0.9834700226783752,
                'Pd (P1-PBaro)': -0.9698059558868408,
                'TBaro': 21.049999237060547,
                'TOB1': 21.766845703125,
                'channel': '0000000011010011',
                'channelCount': 5,
                'ct': 5,
                'func': 1,
                'payload': '010500D3BF7845343C5FE44041AE22803F7BC4B141A86666',
                'port': 1
            }, warnings: [], errors: []
        });
    });

    it('should convert bytes to float correctly', function () {
        var bytes = [0x3A, 0x99, 0xF8, 0x00];

        expect(bytesToFloat(bytes)).toBe(0.0011746883392333984);
    });

    it('should convert an empty byte array to float correctly', function () {
        var bytes = [];

        expect(bytesToFloat(bytes)).toBe(0);
    });

    it('should convert bytes to binary string correctly', function () {
        var bytes = [0x3A, 0x99, 0xF8, 0x00];

        expect(bytesToBinaryString(bytes)).toBe('00111010100110011111100000000000');
    });

    it('should convert an empty byte array to binary string correctly', function () {
        var bytes = [];

        expect(bytesToBinaryString(bytes)).toBe('');
    });

    it('should convert bytes to int correctly', function () {
        var bytes = [0x3A, 0x99, 0xF8, 0x00];

        expect(bytesToInt(bytes)).toBe(983169024);
    });

    it('should convert an empty byte array to int correctly', function () {
        var bytes = [];

        expect(bytesToInt(bytes)).toBe(0);
    });

    it('should convert bytes to date correctly', function () {
        var bytes = [0x25, 0x4D, 0x4F, 0xCA];

        expect(bytesToDate(bytes)).toBe('2019-10-31 07:54:50');
    });

    it('should convert an empty byte array to date correctly', function () {
        var bytes = [];

        expect(bytesToDate(bytes)).toBe('2000-01-01 00:00:00');
    });

    it('should convert pad correctly', function () {
        expect(pad(2, 2)).toBe('02');
    });
});