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
    legsData: [],
  };

  async componentDidMount() {
    this.getLegs()
      .then(res => this.setState({ legsData: [...res] }))
      .catch(err => console.log(err));
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
    const { legsData } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="wrapper">
          <div className="content">
            <DriversList />
            <InfoMenu />
            <LegsList legsData={legsData} />
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
