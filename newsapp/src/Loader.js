import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

class Loader extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div
        className="sweet-loading"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BounceLoader size={40} color="#123ABC" />
        <br />
        <h4>
          <b>Loading</b>
        </h4>
      </div>
    );
  }
}
export default Loader;
