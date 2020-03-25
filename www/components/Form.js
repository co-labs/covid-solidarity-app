import React from "react";
import axios from "axios";

/**
 * Simple Form submit handler
 */
class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    axios({
      method: this.props.method || 'POST',
      data: data,
    })
      .then(res => {
        if (typeof this.props.onSuccess !== 'undefined') {
          this.props.onSuccess(res);
        }
      })
      .catch(res => {
        if (typeof this.props.onError !== 'undefined') {
          this.props.onError(res);
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;