import RFDevice from "../devices/rfdevice";
import Device from "./device";

interface Link {
    id: string;
    sourceDevice?: RFDevice;
    targetDevice?: RFDevice;
    value?: number;
}

export default Link;