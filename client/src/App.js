/**
 * Author: ali mongi
 * WHITESOFT TECHNICAL TEST - React Form Submission to Node backend (mongo) | GCP
 */
import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Col, Modal, Table } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      form: {},
      errors: {},
      fullname: "",
      country: "",
      dbUsers: [],
      showUserData: false,
      url: "https://api-dot-ali-whitesoft-01.ew.r.appspot.com",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // pop up modal user list
  handleShow() {
    this.getUserDataAll();
    this.setState({ showUserData: true });
  }

  // close modal user list
  handleClose() {
    this.setState({ showUserData: false });
  }

  // set field values
  handleChange = (field, value) => {
    const { form, errors } = this.state;
    this.setState({ form: { ...form, [field]: value } });

    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      this.setState({ errors: { ...errors, [field]: null } });

    if (field === "fullname") this.setState({ fullname: value });
    if (field === "country") this.setState({ country: value });
  };

  // form validation checks
  findFormErrors = () => {
    const { fullname, country } = this.state.form;
    const newErrors = {};

    if (!fullname || fullname === "")
      newErrors.fullname = "> please provide a fullname";
    if (!country || country === "")
      newErrors.country = "> please select your country";

    return newErrors;
  };

  // submit for data
  handleSubmit(e) {
    e.preventDefault(); // prevent form auto-submit

    const newErrors = this.findFormErrors(); // get our new errors

    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors }); // capture found errors!
    } else {
      // No errors!
      const { fullname, country } = this.state.form;
      let bodyData = {
        fullname: fullname,
        country: country,
      };
      this.addUserData(bodyData);
    }
  }

  // data post request to mongo
  addUserData = async (bodyData) => {
    const { url } = this.state;
    let res = await axios.post(`${url}/api/whitesoft_user/add`, bodyData);
    if (res.status === 200) {
      alert(res.data.message); // post successful ?
      this.clearForm();
    }
  };

  // find list of active user details
  getUserDataAll = async () => {
    const { url } = this.state;
    let res = await axios.get(`${url}/api/whitesoft_user/index/all`);
    if (res.status === 200) this.setState({ dbUsers: res.data });
  };

  // api to get world countries - https://restcountries.eu/#api-endpoints-all
  getCountriesAPI = async () => {
    let res = await axios.get(`https://restcountries.eu/rest/v2/all`);
    if (res.status === 200) {
      let countriesarr = [];
      let countriesLength = res.data.length;
      for (var i = 0; i < countriesLength; i++) {
        countriesarr.push(res.data[i].name);
      }
      this.setState({ countries: countriesarr });
    }
  };

  componentDidMount() {
    this.getCountriesAPI();
  }

  clearForm() {
    this.setState({ form: {}, errors: {}, fullname: "", country: "" });
  }

  render() {
    const { errors, dbUsers } = this.state;

    // populate country dropdown
    let countryOptions = this.state.countries.map((country) => (
      <option value={country}>{country}</option>
    ));

    let allusers = "";
    // populate user data
    if (dbUsers.length > 0)
      allusers = dbUsers.map((user, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{user.fullname}</td>
          <td>{user.country}</td>
        </tr>
      ));
    // while user list fetch is processing
    else
      allusers = (
        <tr style={{ color: "green", textAlign: "center" }}>
          <td colSpan="3">
            <h4>...LOADING...</h4>
          </td>
        </tr>
      );

    return (
      <div className="App">
        <div id="formData" className="center" style={{ minHeight: "50vh" }}>
          <Form
            style={{
              padding: "30px",
              border: "3px solid silver",
              borderRadius: "20px",
            }}
            onSubmit={this.handleSubmit}
          >
            <Form.Group as={Col} className="mb-3">
              <Form.Label>
                Full Name <font color="red">*</font>
              </Form.Label>
              <Form.Control
                type="text"
                //placeholder="full name"
                value={this.state.fullname}
                onChange={(e) => this.handleChange("fullname", e.target.value)}
                isInvalid={!!errors.fullname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullname}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>
                Country <font color="red">*</font>
              </Form.Label>
              <Form.Control
                as="select"
                value={this.state.country}
                onChange={(e) => this.handleChange("country", e.target.value)}
                isInvalid={!!errors.country}
              >
                <option value="" selected disabled>
                  select
                </option>
                {countryOptions}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" style={{ float: "right" }}>
              Submit
            </Button>
          </Form>
        </div>

        <div id="modalViewUserList" className="center">
          <Button
            variant="outline-secondary"
            width="200px"
            onClick={this.handleShow}
          >
            View User DB
          </Button>

          <Modal
            show={this.state.showUserData}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>User List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>{allusers}</tbody>
              </Table>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
