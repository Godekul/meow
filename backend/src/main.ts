// import Attenuator from "./models/attenuator";
// import Combiner from "./models/combiner";
// import Device from "./models/device";
// import Divider from "./models/divider";

import Amplifier from "./devices/amplifier";
import Attenuator from "./devices/attenuator";
import Combiner from "./devices/combiner";
import Divider from "./devices/divider";
import RFDevice from "./devices/rfdevice";
import Link from "./models/link";

const calcChain = (headDevice: RFDevice) => {
	for (const input of headDevice.inputs) {
		console.log(`inside ${headDevice.id}: sourceDevice: ${input.sourceDevice?.id} targetDevice: ${input.targetDevice?.id}`)
		if (input.sourceDevice && !input.value) {
			console.log('calculating')
			calcChain(input.sourceDevice);
			console.log(`finished calculating, current input value is ${headDevice.inputs[0]?.value}`)
		}
	}
	console.log(`Calculating outputs of ${headDevice.id}, input[0]: ${headDevice.inputs[0]?.value}, input[1]: ${headDevice.inputs[1]?.value}`)
	headDevice.calcOutputs()
	console.log(`calculated value of ${headDevice.id} is ${headDevice.outputs[0]?.value}`)
}


const startApp = () => {

	const json: any = [
		{
			id: 'amp1',
			type: 'Amplifier',
			inputs: [{ id: 'link1', value: 5 }],
			outputs: [{ id: 'link2', sourceDevice: 'amp1', targetDevice: 'att1' }],
			gain: 10
		},
		{
			id: 'att1',
			type: 'Attenuator',
			inputs: [{ id: 'link2', sourceDevice: 'amp1', targetDevice: 'att1' }],
			outputs: [{ id: 'link3', sourceDevice: 'att1', targetDevice: 'comb1' }],
			attenuation: 2
		},
		{
			id: 'amp2',
			type: 'Amplifier',
			inputs: [{ id: 'link4', value: 3 }],
			outputs: [{ id: 'link5', sourceDevice: 'amp2', targetDevice: 'comb1' }],
			gain: 10
		},
		{
			id: 'comb1',
			type: 'Combiner',
			inputs: [{ id: 'link3', sourceDevice: 'att1', targetDevice: 'comb1' }, { id: 'link5', sourceDevice: 'amp2', targetDevice: 'comb1' }],
			outputs: [],
			isolation: 5
		},
	]


	const devices: { [id: string]: RFDevice } = {};
	const links: { [id: string]: Link } = {};

	for (const device of json) {
		switch (device.type) {
			case 'Amplifier':
				devices[device['id']] = new Amplifier(device['id'], device['gain']!);
				break;
			case 'Attenuator':
				devices[device['id']] = new Attenuator(device['id'], device['attenuation']!);
				break;
			case 'Combiner':
				devices[device['id']] = new Combiner(device['id'], device['isolation']!);
				break;
			case 'Divider':
				devices[device['id']] = new Divider(device['id']);
				break;
			default:
				break;
		}
	}
	for (const device of json) {
		for (const input of device['inputs']) {
			links[input['id']] = { id: input['id'] as string, sourceDevice: devices[input['sourceDevice']], targetDevice: devices[input['targetDevice']], value: input['value'] };
		}

		for (const output of device['outputs']) {
			links[output['id']] = { id: output['id'] as string, sourceDevice: devices[output['sourceDevice']], targetDevice: devices[output['targetDevice']], value: output['value'] };
		}
	}

	for (const device of json) {
		for (const input of device['inputs']) {
			devices[device['id']].inputs.push(links[input['id']]);
		}

		for (const output of device['outputs']) {
			devices[device['id']].outputs.push(links[output['id']]);
		}
	}

	// const lastDevices = findLastDevices(devices);
	// console.log(devices['comb1'].inputs[0].targetDevice?.id)
	calcChain(devices['comb1']);
	// console.log(devices['comb1'].outputs[0]?.value)
};

const findLastDevices = (devices: RFDevice[]) => {
	const lastDevices = devices.filter(device => device.outputs.length == 0);
	return lastDevices;
}


startApp();