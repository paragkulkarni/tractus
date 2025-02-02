import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";


const ContractShow = ({ details }) => {
  return (
    <>
      <Card style={{ width: "40rem" }}
        bg={details.status == 'start' ? 'info' :'success'}
        text={(details.status == 'start' ? 'info' :'success')=== 'light' ? 'dark' : 'white'}
        className="mb-2">
        <Card.Header className="primary"><b>List of Contract Data</b></Card.Header>
          <Card.Body>
            <Card.Title>
            <b>{details.id}. Show contract</b>
            </Card.Title>
            <Card.Subtitle>
              <Card.Title>Title : {details.title}</Card.Title>
          </Card.Subtitle>
          <Card.Subtitle>Client Name : {details.contract_owner}</Card.Subtitle>

            <Card.Text>
              Agreement : {details.agreement}
            </Card.Text>
            <Card.Text>
              Status : {details.status}
            </Card.Text>
            <Link to={"contract/edit/" + details.id}>
              <Button variant="primary">Go To Contract</Button>
            </Link>
          </Card.Body>
        </Card>
    </>
  );
};

export default ContractShow;
