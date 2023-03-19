import React, { useEffect, useState } from 'react';
// import * as SRD from "storm-react-diagrams";
// import "storm-react-diagrams/dist/style.min.css";
import createEngine, {
	DefaultLinkModel,
	DefaultNodeModel,
	DiagramEngine,
	DiagramModel,
} from '@projectstorm/react-diagrams';

import { CanvasEngine, CanvasWidget } from '@projectstorm/react-canvas-core';
import './SelectedDevicesChain.scss';

type SelectedDevicesProps = {
	model: DiagramModel;
	engine: CanvasEngine;
};

export function SelectedDevicesChain(props: SelectedDevicesProps) {
	const [model, setModel] = useState<DiagramModel>();

	useEffect(() => {
		// updateDiagram();
	}, [props.model]);
	return (
		<div
			className="devices-canvas"
			onDragOver={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}>
			<CanvasWidget engine={props.engine} className="diagram" />
		</div>
	);
}
