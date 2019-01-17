import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import DriversList from './DriversList';
import InfoMenu from './InfoMenu';
import LegsList from './LegsList';
import Map from './Map';
import '../styles/App.css';

export default class App extends Component {
  state = {
    legs: [],
  };

  async componentDidMount() {
    this.getLegs()
      .then(res => this.setState({ legs: [...res] }))
      .catch(err => console.log(err));
    // this.setState({ data: [res.express] })
  }

  getLegs = async () => {
    const response = await fetch('/api/legs');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <div className="content">
            <DriversList />
            <InfoMenu />
            <LegsList />
          </div>
        </div>
        <div className="wrapper">
          <div className="content">
            <Map />
          </div>
        </div>
      </div>
    );
  }
}
