# KellerAgTheThingsNetworkPayloadDecoder

[![Build Status](https://github.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/workflows/Testing/badge.svg)](https://github.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/actions?query=workflow%3A%22Testing%22)

Payload decoder function to decode a LoRa payload from a KELLER device to meaningful values viewable on the TTN console.

## TTN V3 portal - https://eu1.cloud.thethings.network/console
For a more detailed explanation of the payload format please visit <https://docs.pressuresuite.com/sending-technology/lora-technology/keller-lora-payload/>

To use the decoder please follow this:

  1. Open https://eu1.cloud.thethings.network/console and go to your "application"  
  2. Choose **Payload formatters** -> **Uplink** -> '**Formatter type**'=*Javascript*
  3. Copy-Paste the source code from [ttn-v3-payload-decoder.js](https://github.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/blob/master/ttn-v3-payload-decoder.js) into the **Formatter parameter** text box and press **[Save changes]** button:
![alt text](https://raw.githubusercontent.com/KELLERAGfuerDruckmesstechnik/KellerAgTheThingsNetworkPayloadDecoder/master/assets/ExamplePayloadFunctionInTTNv3.png "Just Copy-Paste the source code")
  4. Verify the working decoder in the **Live data** viewer
