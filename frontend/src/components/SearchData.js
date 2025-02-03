import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const SearchData = ({ searchdata }) => {
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    let value = e.target.value;
    setSearchText(value);
  };
  return (
    <>
      <div className="w-100">
        <InputGroup className="mb-3 custom-inp">
          <Form.Control
            type="text"
            placeholder="Search here"
            aria-label="Username"
            aria-describedby="basic-addon1"
            className="me-1 mx-auto"
            value={searchText}
            onChange={handleChange}
          />
          <Button onClick={() => searchdata(searchText)}>Search</Button>
        </InputGroup>
      </div>
    </>
  );
};

export default SearchData;
