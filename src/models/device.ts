interface Device{
    id: string;
    type: string;
    inputs: Device[];
    outputs: Device[];
}

export default Device;