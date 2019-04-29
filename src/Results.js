import React, { Component } from "react";
import { Card, CardText, CardBody } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class results extends Component {
  render() {
    if (this.props.data.length === 0) {
      return (
        <div>
          <img
            src={require("./not-found.svg")}
            alt="Not found!"
            id="notfound"
          />
          <h3>Not Found!</h3>
          <h4>Please retry with different a spelling or value.</h4>
        </div>
      );
    } else {
      return (
        <div>
          <div id="search-div">
            {this.props.data.map((bank, i) => {
              console.log("Entered");
              // Return the element. Also pass key
              return (
                <CSSTransition
                  key={i}
                  in={true}
                  appear={true}
                  timeout={1500}
                  classNames="fade"
                >
                  <Card key={i}>
                    <CardBody key={i}>
                      <CardText>
                        <b className="imp">Name:</b> {bank.bank_name}
                        <br />
                        <b className="imp">IFSC Code:</b> <kbd>{bank.ifsc}</kbd>
                        <br />
                        <b className="imp">Address:</b> {bank.address}
                        <br />
                        <b className="imp">Branch:</b> {bank.branch}
                        <br />
                        <b className="imp">City:</b> {bank.city}
                        <br />
                        <b className="imp">State:</b> {bank.state}
                        <br />
                      </CardText>
                    </CardBody>
                  </Card>
                </CSSTransition>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

results.propTypes = {
  data: PropTypes.array,
};

export default results;
