import React from "react";
import "./LoadingIndicator.css";

const LoadingIndicator: React.FC = () => (
  <div className="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingIndicator;
