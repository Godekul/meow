import { useState } from "react";
import { Col } from "react-bootstrap";
import DeviceType from "../models/device_type";
import "./DeviceButtonCard.scss";
import { DeviceModal } from "./DeviceModal";

type DeviceButtonCardProps = {
  deviceType: DeviceType;
  selectedDevices: number[];
  setSelectedDevices: (devices: any) => void;
};

export function DeviceButtonCard(props: DeviceButtonCardProps) {
  // const [show, setShow] = useState(false);

  const selectDevice = (device: any) => {
    const meow = [...props.selectedDevices, device];
    props.setSelectedDevices(meow);
  };

  return (
    <Col
      className="device-button"
      xs={6}
      onClick={() => selectDevice(props.deviceType)}
    >
      <img src={props.deviceType.imgUrl} alt={props.deviceType.name} />
    </Col>
  );
}
