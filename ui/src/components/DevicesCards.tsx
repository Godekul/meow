import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

type DeviceItemProps = {
  place: number;
  id: string;
  gain?: number;
  nf: number;
  imgUrl: string;
  numberOfObject: number;
};

export function DevicesCards({
  place,
  id,
  gain,
  nf,
  imgUrl,
  numberOfObject,
}: DeviceItemProps) {
  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={imgUrl}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="">{id}</span>
          </Card.Title>
          <div className="mt-auto">
            <Button className="w-100">+ Add</Button>
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button>-</Button>
                <div>
                  <span className="fs-3">3</span> {/*in cart*/}
                </div>
                <Button>+</Button>
              </div>
              <Button variant="danger" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
