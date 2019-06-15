import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState(() => ({ smurfs: res.data }));
      })
      .catch(err => {
        console.log('Server Error', err);
      });
  }

  render() {
    return (
      <div className="App">
        <nav className="nav-bar">
          <NavLink
            to={`/`}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
          >
            <div className="home-link">
              <h3>Home</h3>
            </div>
          </NavLink>
          <NavLink
            to={`/smurf-form`}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
          >
            <div className="smurf-form-link">
              <h3>Add a Smurf!</h3>
            </div>
          </NavLink>
        </nav>
        <Route
          exact
          path="/smurf-form"
          render={props => <SmurfForm {...props} />}
        />
        <Route
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
      </div>
    );
  }
}

export default App;
