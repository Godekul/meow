import Amplifier from "./devices/amplifier";
import Attenuator from "./devices/attenuator";
import Combiner from "./devices/combiner";
import RFDevice from "./devices/rfdevice";
import DeviceInfo from "./models/device_info";
import Link from "./models/link";

export default class ChainHandler {

    public calculateChain = (devicesList: DeviceInfo[]) => {
        const devices = this.parseDevices(devicesList);
        const links = this.parseLinks(devicesList, devices);
        this.parseConnections(devicesList, devices, links);
        const lastDevices = this.findLastDevices(Object.values(devices));
        this.calcChain(lastDevices[0])
    }

    private parseDevices = (devicesList: DeviceInfo[]) => {
        const devices: { [id: string]: RFDevice } = {};
        for (const device of devicesList) {
            switch (device.type) {
                case 'Amplifier':
                    devices[device.id] = new Amplifier(device.id, device.parameters.gain);
                    break;
                case 'Attenuator':
                    devices[device.id] = new Attenuator(device.id, device.parameters.attenuation);
                    break;
                case 'Combiner':
                    devices[device.id] = new Combiner(device.id, device.parameters.isolation);
                    break;
                default:
                    break;
            }
        }
        return devices;
    }

    private parseLinks = (devicesList: DeviceInfo[], devices: { [id: string]: RFDevice }) => {
        const links: { [id: string]: Link } = {};
        for (const device of devicesList) {
            for (const input of device.inputs) {
                links[input.id] = {
                    id: input.id,
                    sourceDevice: input.sourceDevice ? devices[input.sourceDevice] : undefined,
                    targetDevice: input.targetDevice ? devices[input.targetDevice] : undefined,
                    value: input.value
                };
            }
            for (const output of device.outputs) {
                links[output.id] = {
                    id: output.id,
                    sourceDevice: output.sourceDevice ? devices[output.sourceDevice] : undefined,
                    targetDevice: output.targetDevice ? devices[output.targetDevice] : undefined,
                    value: output.value
                };
            }
        }
        return links;
    }

    private parseConnections = (devicesList: DeviceInfo[], devices: { [id: string]: RFDevice }, links: { [id: string]: Link }) => {
        for (const device of devicesList) {
            for (const input of device.inputs) {
                devices[device.id].inputs.push(links[input.id]);
            }

            for (const output of device['outputs']) {
                devices[device.id].outputs.push(links[output.id]);
            }
        }
    }

    private findLastDevices = (devices: RFDevice[]) => {
        const lastDevices = devices.filter(device => device.outputs.length == 0);
        return lastDevices;
    }

    private calcChain = (headDevice: RFDevice) => {
        for (const input of headDevice.inputs) {
            console.log(`inside ${headDevice.id}: sourceDevice: ${input.sourceDevice?.id} targetDevice: ${input.targetDevice?.id}`)
            if (input.sourceDevice && !input.value) {
                console.log('calculating')
                this.calcChain(input.sourceDevice);
                console.log(`finished calculating, current input value is ${headDevice.inputs[0]?.value}`)
            }
        }
        console.log(`Calculating outputs of ${headDevice.id}, input[0]: ${headDevice.inputs[0]?.value}, input[1]: ${headDevice.inputs[1]?.value}`)
        headDevice.calcOutputs()
        console.log(`calculated value of ${headDevice.id} is ${headDevice.outputs[0]?.value}`)
    }
}