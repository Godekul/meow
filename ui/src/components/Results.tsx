import { DiagramModel } from '@projectstorm/react-diagrams';
import { Col, Row, Container, Button } from 'react-bootstrap';
import DeviceInfo from '../models/device_info';
import DeviceType from '../models/device_type';
import { DeviceButtonCard } from './DeviceButtonCard';
import { DevicesCards } from './DevicesCards';
import './SideBar.scss';

type ResultsProps = {
	model: DiagramModel;
	devices: { [id: string]: DeviceInfo };
};

export function Results(props: ResultsProps) {
	const handleResults = () => {
		const links = props.model.getLinks();
		for (const link of links) {
			const sourceDevice = link.getSourcePort().getNode().getID();
			const targetDevice = link.getTargetPort().getNode().getID();
			props.devices[sourceDevice].outputs.push({
				id: link.getID(),
				sourceDevice: sourceDevice,
				targetDevice: targetDevice,
			});
			props.devices[targetDevice].inputs.push({
				id: link.getID(),
				sourceDevice: sourceDevice,
				targetDevice: targetDevice,
			});
		}
		alert(JSON.stringify(props.devices));
	};

	return (
		<>
			<div>
				<Container>
					<Button
						variant="outline-primary"
						onClick={() => {
							handleResults();
						}}>
						Primary
					</Button>
				</Container>
			</div>
		</>
	);
}
