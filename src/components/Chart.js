import { Component } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

class ChartComponent extends Component {
  state = {
    stockPrices: [],
    startDate: "",
    endDate: "",
    selectedDate: "",
  };

  componentDidMount = () => {
    axios
      .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
      .then((response) => {
        let prices = response.data.bpi;
        console.log(prices);
        this.setState({ stockPrices: { ...prices } });
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

  componentDidMount = async () => {
    this.getNewDate()
    const response = await axios.get(
      'https://api.coindesk.com/v1/bpi/historical/close.json',
    )

    console.log(response.data)

    this.setState({ selectedDate: [...response.data] })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedDate !== this.state.selectedDate) {
      this.getNewDate()
      this.handleSubmit()
    }
  }

  handleChange = (event) => {
    this.setState({ startDate: event.target.value });
  };

  render() {
    return (
        <div>
      <div className="container-m5">
        <label>Starting date</label>
        <input
          type="date"
          className="form-control"
          name="startDate"
          value="datetime"
        />
        </div>

     <div className="form-group">
          <label>Ending date</label>
        <input
          type="date"
          className="form-control"
          name="endtDate"
          value="datetime"
        />
        </div>
        <div className="form-group">
          <label>Currency</label>
        <select
          type="date"
          className="form-control"
          name="endtDate"
          value="datetime"
        >
          <option value="USD">Dollar</option>
          <option value="EUR">Euro</option>
          <option value="BRL">Brazillian Real</option>
        </select>
      </div>
              <canvas id="myChart" width="200"></canvas>
      </div>
    );
  }
}

export default ChartComponent;
