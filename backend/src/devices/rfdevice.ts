import Device from "../models/device";
import Link from "../models/link";

export default abstract class RFDevice implements Device {

    private _id: string;
    private _inputs: Link[];
    private _outputs: Link[];

    constructor(id: string) {
        this._id = id;
        this._inputs = [];
        this._outputs = [];
    }

    public get id() {
        return this._id;
    }

    public get inputs() {
        return this._inputs;
    }

    public set inputs(inputs: Link[]) {
        this._inputs = inputs;
    }

    public get outputs() {
        return this._outputs;
    }

    public set outputs(outputs: Link[]) {
        this._outputs = outputs;
    }

    abstract calcOutputs: () => void;
}