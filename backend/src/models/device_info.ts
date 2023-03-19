interface DeviceInfo {
    id: string,
    type: string,
    inputs: LinkInfo[],
    outputs: LinkInfo[],
    parameters: any
}

type LinkInfo = {
    id: string;
    sourceDevice?: string;
    targetDevice?: string;
    value?: any
}

export default DeviceInfo;