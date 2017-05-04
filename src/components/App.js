import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { createChart } from '../ducks/chart';

import NewChart from "./NewChart/NewChart";
import Sidebar from "./Sidebar/Sidebar";
import ActiveChart from "./ActiveChart/ActiveChart";

class App extends Component {
  render() {
    console.log('Props in App:', this.props);
    const {
      activeChart,
      charts,
      createChart
    } = this.props;
    
    return (
      <div className="app">
        <Sidebar />
        <main className="app__main">
          <header className="app__header">
            <h1 className="app__title">Categorizer</h1>

            <div className="app__new-chart">
              <NewChart createChart={ createChart } />
            </div>
          </header>
          <div className="app__active-chart">
            <ActiveChart chart={ activeChart } />
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps( { activeChartIndex, charts } ) {
  console.log('Map State to Props fired:', arguments[0]);
  return {
    activeChart: charts[ activeChartIndex ],
    charts: charts
  };
}

export default connect(mapStateToProps, { createChart })(App);
