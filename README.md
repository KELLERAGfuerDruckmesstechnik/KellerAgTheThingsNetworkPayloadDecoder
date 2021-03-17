# KellerAgTheThingsNetworkPayloadDecoder

[![Build Status](https://github.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/workflows/Testing/badge.svg)](https://github.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/actions?query=workflow%3A%22Testing%22)

Payload decoder function to decode a LoRa payload from a KELLER device to meaningful values viewable on the TTN console.

## TTN V3 portal - https://eu1.cloud.thethings.network/console
For a more detailed explanation of the payload format please visit <https://docs.kolibricloud.ch/sending-technology/lora-technology/keller-lora-payload/>

To use the decoder please follow this:

  1. Open https://eu1.cloud.thethings.network/console and go to your "application"  
  2. Choose **Payload formatters** -> **Uplink** -> '**Formatter type**'=*Javascript*
  3. Copy-Paste the source code from [ttn-v3-payload-decoder.js](https://github.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/blob/master/ttn-v3-payload-decoder.js) into the **Formatter parameter** text box and press **[Save changes]** button:
![alt text](https://raw.githubusercontent.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/master/assets/ExamplePayloadFunctionInTTNv3.png "Just Copy-Paste the source code")
  4. Verify the working decoder in the **Live data** viewer

## TTN V2 portal - https://console.thethingsnetwork.org
For a more detailed explanation of the payload format please visit <https://docs.kolibricloud.ch/sending-technology/lora-technology/keller-lora-payload/>

To use the decoder please follow this:

  1. Open console.thethingsnetwork.org and go to your "application"  
  2. Choose "Payload Formats"
![alt text](https://raw.githubusercontent.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/master/assets/TheThingsNetworkApplicationPayloadFormat.png "https://console.thethingsnetwork.org/applications/{your_application_name}/payload-formats")
  3. Copy-Paste the source code from [ttn-v2-payload-decoder.js](https://github.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/blob/master/ttn-v3-payload-decoder.js) into the [Payload  formats] -> [decoder] text box and press the [save payload function] button:
![alt text](https://raw.githubusercontent.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/master/assets/ExamplePayloadFunctionInTTN.png "TheThingsNetworkApplicationPayloadFormat.png")
  4. Verify by entering an example Payload string such as: ```010500D3BF7845343C5FE44041AE22803F7BC4B141A86666```
  This should result in:

```json
{
    "P1": 0.013665258884429932,
    "PBaro": 0.9834700226783752,
    "Pd (P1-PBaro)": -0.9698059558868408,
    "TBaro": 21.049999237060547,
    "TOB1": 21.766845703125,
    "channel": "0000000011010011",
    "channelCount": 5,
    "ct": 5,
    "func": 1,
    "payload": "010500D3BF7845343C5FE44041AE22803F7BC4B141A86666",
    "port": 1
}
```
