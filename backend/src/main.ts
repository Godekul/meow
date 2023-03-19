import ChainHandler from "./chain_handler";
import DeviceInfo from "./models/device_info";

const devicesList: DeviceInfo[] = [
	{
		id: 'amp1',
		type: 'Amplifier',
		inputs: [{ id: 'link1', value: 5 }],
		outputs: [{ id: 'link2', sourceDevice: 'amp1', targetDevice: 'att1' }],
		parameters: {
			gain: 10
		}
	},
	{
		id: 'att1',
		type: 'Attenuator',
		inputs: [{ id: 'link2', sourceDevice: 'amp1', targetDevice: 'att1' }],
		outputs: [{ id: 'link3', sourceDevice: 'att1', targetDevice: 'comb1' }],
		parameters: {
			attenuation: 2
		}
	},
	{
		id: 'amp2',
		type: 'Amplifier',
		inputs: [{ id: 'link4', value: 3 }],
		outputs: [{ id: 'link5', sourceDevice: 'amp2', targetDevice: 'comb1' }],
		parameters: {
			gain: 10
		}
	},
	{
		id: 'comb1',
		type: 'Combiner',
		inputs: [{ id: 'link3', sourceDevice: 'att1', targetDevice: 'comb1' }, { id: 'link5', sourceDevice: 'amp2', targetDevice: 'comb1' }],
		outputs: [],
		parameters: {
			isolation: 5
		}
	},
]

const startApp = () => {
	const chainHandler = new ChainHandler();
	chainHandler.calculateChain(devicesList);
};

startApp();