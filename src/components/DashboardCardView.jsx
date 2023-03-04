import { Card } from "react-bootstrap"

export default function (
    {
        icon,
        text,
        number
    }
) {


    return (

        <Card className="shadow-sm">

            <Card.Body className="text-center">
                {icon}
                <h3 className="mt-3"> {number} + </h3>
                <h3 className="text-muted mt-3">{text}</h3>

            </Card.Body>

        </Card>

    )
}