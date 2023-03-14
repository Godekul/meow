import { Col, Row, Container } from "react-bootstrap";
import { DeviceButtonCard } from "./DeviceButtonCard";
import { DevicesCards } from "./DevicesCards";
import "./SideBar.scss";

type DevicesProps = {
  deviceTypes: any[];
  selectedDevices: any[];
  setSelectedDevices: (devices: any) => void;
};

export function Devices(props: DevicesProps) {
  return (
    <>
      {/* <div className="device-tool-bar"> */}
      <div>
        <Container>
          <Row>
            {props.deviceTypes.map((deviceType, index) => (
              <DeviceButtonCard
                key={index}
                deviceType={deviceType}
                selectedDevices={props.selectedDevices}
                setSelectedDevices={props.setSelectedDevices}
              />
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
