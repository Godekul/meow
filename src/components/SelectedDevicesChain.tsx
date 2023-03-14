import { useEffect, useState } from "react";
// import * as SRD from "storm-react-diagrams";
// import "storm-react-diagrams/dist/style.min.css";
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";
import "./SelectedDevicesChain.scss";

type SelectedDevicesProps = {
  selectedDevices: any;
};

const initEngine = createEngine();
const initModel = new DiagramModel();
initEngine.setModel(initModel);

export function SelectedDevicesChain(props: SelectedDevicesProps) {
  const [model, setModel] = useState<DiagramModel>();

  const updateDiagram = () => {
    const model = new DiagramModel();
    for (const device of props.selectedDevices) {
      const deviceNode = new DefaultNodeModel({
        name: device.name,
        id: device.name,
        color: "rgb(0,192,255)",
      });
      for (let i = 0; i < device.inputs; i++) {
        deviceNode.addInPort(`intput ${i}`);
      }

      for (let i = 0; i < device.outputs; i++) {
        deviceNode.addOutPort(`output ${i}`);
      }

      //   deviceNode.setPosition(100, 100);
      model.addAll(deviceNode);
    }
    initEngine.setModel(model);
    setModel(model);
  };

  useEffect(() => {
    updateDiagram();
  }, [props.selectedDevices]);
  return (
    <>
      {<CanvasWidget engine={initEngine} className="diagram" />}
      <button
        onClick={() => {
          alert(
            `${model?.getLinks()[0].getSourcePort().getNode().getID()} - ${model
              ?.getLinks()[0]
              .getTargetPort()
              .getNode()
              .getID()}`
          );
        }}
      ></button>{" "}
    </>
  );
}
