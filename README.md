# KellerAgTheThingsNetworkPayloadDecoder
Payload decoder function to decode a LoRa payload from a KELLER device to meaningful values viewable on console.thethingsnetwork.org  

For a more detailed explanation please please visit to https://docs.kolibricloud.ch/sending-technology/lora-technology/keller-lora-payload/

To use it:
 * Step 1: Open console.thethingsnetwork.org and go to your "application" 

 * Step 2: Choose "Payload Formats"
![alt text](https://raw.githubusercontent.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/master/TheThingsNetworkApplicationPayloadFormat.png "https://console.thethingsnetwork.org/applications/{your_application_name}/payload-formats")

 * Step 3: Copy-Paste the source code from PayloadDecoderFunction.js into the [Payload  formats] -> [decoder] text box and press the [save payload function] button:
![alt text](https://raw.githubusercontent.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/master/ExamplePayloadFunctionInTTN.png "TheThingsNetworkApplicationPayloadFormat.png")
 * Step 4: Verify by entering an example Payload string such as: ```010500D3BF7845343C5FE44041AE22803F7BC4B141A86666```
 this should result into:
 ```json
 {
  "Channel_1": -0.9698059558868408,
  "Channel_2": 0.013665258884429932,
  "Channel_3": 21.766845703125,
  "Channel_4": 0.9834700226783752,
  "Channel_5": 21.049999237060547,
  "channel": "0000000011010011",
  "channelCount": 5,
  "ct": 5,
  "func": 1,
  "payload": "AQUA0794RTQ8X+RAQa4igD97xLFBqGZm"
}
```
