import React from "react";

const SelectedResult = ({ result }) => (
  <a style={{ color: "red" }} href={result && result.url}>
    {result && result.title}
  </a>
);

export default SelectedResult;