import React, { useEffect, useRef } from "react";

export default props => {
  const handleKeyUp = e => {
    let v = e.target.value; // .replace(/\D/g, "");
    v = (v / 100).toFixed(2) + "";
    // console.log(v, v.length);
    if (v == "0.00" || v == "0,00" || v == 0) v = "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    e.target.value = v;
  };

  const initialValue = () => {
    if (refInput.current.value != "") {
      let v = refInput.current.value; //.replace(/\D/g, "");
      v = (v / 1).toFixed(2) + "";
      if (v == "0.00" || v == "0,00" || v == 0) v = "";
      v = v.replace(".", ",");
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
      v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
      refInput.current.value = v;
    }
  };

  const refInput = useRef();

  useEffect(() => {
    initialValue();
  });

  return (
    <input
      ref={refInput}
      type="text"
      onKeyUp={e => handleKeyUp(e)}
      {...props}
    />
  );
};
