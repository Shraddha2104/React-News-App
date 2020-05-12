import React, { Component } from "react";

class DetailedChild extends Component {
	render() {
		return (
			<div> {this.props.description} </div>
		);
	}
}

export default DetailedChild;