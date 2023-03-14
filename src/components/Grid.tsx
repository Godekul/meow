import React, { useState } from "react";
import "./Grid.scss";
import { Devices } from "./Devices";
import "./scrollbar.css";
import deviceTypes from "../data/deviceTypes.json";
import { SelectedDevicesChain } from "./SelectedDevicesChain";
import items from "../data/items.json";

const Grid = () => {
  const [selectedDevices, setSelectedDevices] = useState([]);

  const addDevice = (device: any) => {}; //WE STOPED HERE

  return (
    <>
      <div className="containerGrid">
        <main>
          <SelectedDevicesChain selectedDevices={selectedDevices} />
        </main>
        <section id="sidebar">
          <div className="scrollbar scrollbar-winter-neva">
            <h4>Devices</h4>
            <Devices
              deviceTypes={deviceTypes}
              selectedDevices={selectedDevices}
              setSelectedDevices={setSelectedDevices}
            />
          </div>
        </section>
        <footer>Fotter</footer>
      </div>
    </>
  );
};

export default Grid;
