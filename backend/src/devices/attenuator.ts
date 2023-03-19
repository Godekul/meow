import RFDevice from "./rfdevice";

export default class Attenuator extends RFDevice {

    private attenuation: number;

    constructor(id: string, attenuation: number) {
        super(id);
        this.attenuation = attenuation;
    }

    public calcOutputs = () => {
        const value = this.inputs[0].value! / this.attenuation;
        this.outputs[0].value = value;
    }

}