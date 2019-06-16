import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = () => {
    const newSmurf = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    };

    axios
      .post(`http://localhost:3333/smurfs`, newSmurf)
      .then(res => {
        console.log(res.data);
        this.setState(() => ({ smurfs: res.data }));
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="smurf-form">
        <Form inline onSubmit={this.addSmurf}>
          <Input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <Input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <Input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <Button type="submit">Add to the village</Button>
        </Form>
      </div>
    );
  }
}

export default SmurfForm;
