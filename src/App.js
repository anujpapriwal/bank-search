import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { Input, InputGroup } from "reactstrap";
import Loader from "react-loader-spinner";
import Results from "./Results";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mumbai: [],
      bangalore: [],
      pune: [],
      indore: [],
      chennai: [],
      load_counter: 0,
      search_query: "",
      search_results: [],
      searchable_data: [],
      search_city: "BANGALORE",
      isLoading: true,
      searchBy: "name",
    };
  }

  componentWillMount() {
    Axios.get("https://vast-shore-74260.herokuapp.com/banks?city=BANGALORE")
      .then(res => {
        this.setState({
          bangalore: res.data,
          searchable_data: res.data,
          load_counter: this.state.load_counter + 1,
        });
        if (this.state.load_counter === 5) {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    Axios.get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then(res => {
        this.setState({
          mumbai: res.data,
          load_counter: this.state.load_counter + 1,
        });
        if (this.state.load_counter === 5) {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    Axios.get("https://vast-shore-74260.herokuapp.com/banks?city=PUNE")
      .then(res => {
        this.setState({
          pune: res.data,
          load_counter: this.state.load_counter + 1,
        });
        if (this.state.load_counter === 5) {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    Axios.get("https://vast-shore-74260.herokuapp.com/banks?city=INDORE")
      .then(res => {
        this.setState({
          indore: res.data,
          load_counter: this.state.load_counter + 1,
        });
        if (this.state.load_counter === 5) {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    Axios.get("https://vast-shore-74260.herokuapp.com/banks?city=CHENNAI")
      .then(res => {
        this.setState({
          chennai: res.data,
          load_counter: this.state.load_counter + 1,
        });
        if (this.state.load_counter === 5) {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCityChange = e => {
    const emptyArray = [];
    switch (e.target.value.toLowerCase()) {
      case "bangalore":
        this.setState({
          search_city: e.target.value,
          searchable_data: this.state.bangalore,
          search_results: emptyArray,
        });
        break;
      case "mumbai":
        this.setState({
          search_city: e.target.value,
          searchable_data: this.state.mumbai,
          search_results: emptyArray,
        });
        break;
      case "pune":
        this.setState({
          search_city: e.target.value,
          searchable_data: this.state.pune,
          search_results: emptyArray,
        });
        break;
      case "indore":
        this.setState({
          search_city: e.target.value,
          searchable_data: this.state.indore,
          search_results: emptyArray,
        });
        break;
      case "chennai":
        this.setState({
          search_city: e.target.value,
          searchable_data: this.state.chennai,
          search_results: emptyArray,
        });
        break;

      default:
        this.setState({
          search_city: e.target.value,
          searchable_data: this.state.bangalore,
          search_results: emptyArray,
        });
        break;
    }
  };

  handleSearchBy = e => {
    switch (e.target.value) {
      case "By Name":
        this.setState({
          searchBy: "name",
        });
        break;

      case "By Ifsc":
        this.setState({
          searchBy: "ifsc",
        });
        break;

      case "By Address":
        this.setState({
          searchBy: "address",
        });
        break;

      default:
        this.setState({
          searchBy: "name",
        });
        break;
    }
  };

  searchByName = e => {
    const emptyArray = [];
    if (e.target.value === "") {
      this.setState({
        search_results: emptyArray,
      });
    } else {
      this.setState({
        search_query: e.target.value,
      });
      var data = this.state.searchable_data;
      var query = e.target.value.toUpperCase();
      var results = [];
      data.forEach(element => {
        var check = element.bank_name.indexOf(query);
        if (check !== -1) {
          results.push(element);
        }
      });
      this.setState({
        search_results: results,
      });
    }
  };

  searchByIfsc = e => {
    const emptyArray = [];
    if (e.target.value === "") {
      this.setState({
        search_results: emptyArray,
      });
    } else {
      this.setState({
        search_query: e.target.value,
      });
      var data = this.state.searchable_data;
      var query = e.target.value.toUpperCase();
      var results = [];
      data.forEach(element => {
        var check = element.ifsc.indexOf(query);
        if (check !== -1) {
          results.push(element);
        }
      });
      this.setState({
        search_results: results,
      });
    }
  };

  searchByAddress = e => {
    const emptyArray = [];
    if (e.target.value === "") {
      this.setState({
        search_results: emptyArray,
      });
    } else {
      this.setState({
        search_query: e.target.value,
      });
      var data = this.state.searchable_data;
      var query = e.target.value.toUpperCase();
      var results = [];
      data.forEach(element => {
        var check = element.address.indexOf(query);
        if (check !== -1) {
          results.push(element);
        }
      });
      this.setState({
        search_results: results,
      });
    }
  };

  render() {
    const Hidden = {
      opacity: 0,
      visibility: "hidden",
    };
    const Visible = {
      opacity: 1,
    };

    var loaderClass = this.state.isLoading ? "fadeIn" : "fadeOut";
    var loaderStyle = this.state.isLoading ? Visible : Hidden;
    var dataClass = this.state.isLoading ? "fadeOut" : "fadeIn";
    var dataStyle = this.state.isLoading ? Hidden : Visible;

    var textInput;
    if (this.state.searchBy === "ifsc") {
      textInput = (
        <Input
          type="text"
          name="lastname"
          placeholder="Search by ifsc."
          id="search-input"
          onChange={this.searchByIfsc}
        />
      );
    } else if (this.state.searchBy === "address") {
      textInput = (
        <Input
          type="text"
          name="lastname"
          placeholder="Search by address."
          id="search-input"
          onChange={this.searchByAddress}
        />
      );
    } else if (this.state.searchBy === "name") {
      textInput = (
        <Input
          type="text"
          name="lastname"
          placeholder="Search by name."
          id="search-input"
          onChange={this.searchByName}
        />
      );
    } else {
      textInput = (
        <Input
          type="text"
          name="lastname"
          placeholder="Search by name."
          id="search-input"
          onChange={this.searchByName}
        />
      );
    }
    return (
      <div className="App">
        <div id="loader-div" className={loaderClass} style={loaderStyle}>
          <Loader
            type="TailSpin"
            color="#04d9d9"
            height="100"
            width="100"
            className={loaderClass}
          />{" "}
          <h2>Loading data..</h2>
          <br />
        </div>
        <div id="input-wrapper" className={dataClass} style={dataStyle}>
          <InputGroup>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={this.handleCityChange}
            >
              <option>BANGALORE</option>
              <option>MUMBAI</option>
              <option>PUNE</option>
              <option>INDORE</option>
              <option>CHENNAI</option>
            </Input>
            <br />
            <br />
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={this.handleSearchBy}
            >
              <option>By Name</option>
              <option>By Ifsc</option>
              <option>By Address</option>
            </Input>
            {textInput}
          </InputGroup>
          <br /> <Results data={this.state.search_results} />
          <div id="footer">&copy;Anuj Papriwal, 2019</div>
        </div>
      </div>
    );
  }
}

export default App;
