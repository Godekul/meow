import React, { useState } from 'react';
import './Grid.scss';
import { Devices } from './Devices';
import './scrollbar.css';
import deviceTypes from '../data/deviceTypes.json';
import { SelectedDevicesChain } from './SelectedDevicesChain';
import items from '../data/items.json';
import createEngine, {
	DefaultLabelModel,
	DefaultLinkModel,
	DefaultNodeModel,
	DiagramEngine,
	DiagramModel,
} from '@projectstorm/react-diagrams';
import DeviceType from '../models/device_type';
import DeviceInfo from '../models/device_info';
import { Results } from './Results';

const initEngine = createEngine();
const initModel = new DiagramModel();
initEngine.setModel(initModel);

const Grid = () => {
	const [devices, setDevices] = useState<{ [id: string]: DeviceInfo }>({});
	const [model, setModel] = useState<DiagramModel>(initModel);

	const addDevice = (deviceType: DeviceType, point: any) => {
		const deviceNode = new DefaultNodeModel({
			name: deviceType.type,
			color: 'rgb(0,192,255)',
		});
		for (let i = 0; i < deviceType.inputs; i++) {
			deviceNode.addInPort(`input ${i}`);
		}

		for (let i = 0; i < deviceType.outputs; i++) {
			deviceNode.addOutPort(`output ${i}`);
		}
		deviceNode.setPosition(point);
		model.addAll(deviceNode);
		const deviceInfo: DeviceInfo = {
			id: deviceNode.getID(),
			type: deviceType.type,
			inputs: [],
			outputs: [],
			parameters: {},
		};
		// setDevices([...devices, deviceInfo]);
		setDevices({ ...devices, [deviceInfo.id]: deviceInfo });
	};

	const updateDevices = (devices: { [id: string]: DeviceInfo }) => {
		setDevices(devices);
		alert(JSON.stringify(devices));
	};

	return (
		<>
			<div className="containerGrid">
				<main
					onDrop={(event) => {
						event.preventDefault();
						const data = JSON.parse(
							event.dataTransfer.getData('device-node')
						) as DeviceType;
						const point = initEngine.getRelativeMousePoint(event);
						addDevice(data, point);
					}}>
					<SelectedDevicesChain engine={initEngine} model={model} />
				</main>
				<section id="sidebar">
					<div className="scrollbar scrollbar-winter-neva">
						<h4>Devices</h4>
						<Devices devicesTypes={deviceTypes} />
					</div>
				</section>
				<footer>
					<Results
						model={model}
						devices={devices}
						updateDevices={updateDevices}
					/>
				</footer>
			</div>
		</>
	);
};

export default Grid;
