import { Col, Row, Container } from 'react-bootstrap';
import DeviceType from '../models/device_type';
import { DeviceButtonCard } from './DeviceButtonCard';
import { DevicesCards } from './DevicesCards';
import './SideBar.scss';

type DevicesProps = {
	devicesTypes: DeviceType[];
};

export function Devices(props: DevicesProps) {
	return (
		<>
			<div>
				<Container>
					<Row>
						{props.devicesTypes.map((deviceType, index) => (
							<DeviceButtonCard
								key={index}
								deviceType={deviceType}
							/>
						))}
					</Row>
				</Container>
			</div>
		</>
	);
}
