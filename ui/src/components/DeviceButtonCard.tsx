import { useState } from 'react';
import { Col } from 'react-bootstrap';
import DeviceInfo from '../models/device_info';
import DeviceType from '../models/device_type';
import './DeviceButtonCard.scss';
import { DeviceModal } from './DeviceModal';

type DeviceButtonCardProps = {
	deviceType: DeviceType;
};

export function DeviceButtonCard(props: DeviceButtonCardProps) {
	const typeToImg = (type: string) => {
		const imageTypes: { [type: string]: string } = {
			Amplifier: '/imgs/amplifier.jpg',
			Attenuator: '/imgs/attenuator.jpg',
			Combiner: '/imgs/combiner.jpg',
			Divider: '/imgs/divider.jpg',
		};
		return imageTypes[type] || '';
	};

	return (
		<Col className="device-button" xs={6}>
			<img
				src={typeToImg(props.deviceType.type)}
				alt={props.deviceType.type}
				// draggable={true}
				onDragStart={(event) => {
					event.dataTransfer.setData(
						'device-node',
						JSON.stringify({
							type: props.deviceType.type,
							inputs: props.deviceType.inputs,
							outputs: props.deviceType.outputs,
						} as DeviceType)
					);
				}}
			/>
		</Col>
	);
}
