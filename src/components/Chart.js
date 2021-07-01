import { Component } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

class ChartComponent extends Component {
  state = {
    stockPrices: [],
  };

  componentDidMount = () => {
    axios
      .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
      .then((response) => {
        let prices = response.data.bpi;
        console.log(prices);
        this.setState({ stockPrices: { ...prices }});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate = () => {
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: Object.keys(this.state.stockPrices),
        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: "rgba(235, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            data: Object.values(this.state.stockPrices),
            fill: true,
          },
        ],
      },
    });
  };

  render() {
    return (
      <div>
        <input type="date"></input>
        <input type="date"></input>
        <button>Search</button>
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default ChartComponent;
