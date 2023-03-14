import RFDevice from "./rfdevice";

export default class Amplifier extends RFDevice {

    private gain: number;

    constructor(id: string, gain: number) {
        super(id);
        this.gain = gain;
    }

    public calcOutputs = () => {
        const value = this.gain * this.inputs[0].value!;
        if (!this.outputs[0])
            this.outputs[0] = { id: '', value: value }
        this.outputs[0].value = value;
    }

}