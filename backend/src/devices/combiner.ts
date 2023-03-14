import RFDevice from "./rfdevice";

export default class Combiner extends RFDevice {

    private isolation: number;

    constructor(id: string, isolation: number) {
        super(id);
        this.isolation = isolation;
    }

    public calcOutputs = () => {
        let sum = 0;
        for (const input of this.inputs) {
            sum += input.value!;
        }
        if (!this.outputs[0])
            this.outputs[0] = { id: '', value: sum }
        else this.outputs[0].value = sum;
    }

}