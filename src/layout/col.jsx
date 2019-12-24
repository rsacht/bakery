import React from "react";

export default props => (
  <div className={props.className || "col"}>{props.children}</div>
);
