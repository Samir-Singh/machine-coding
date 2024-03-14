import React, { useEffect, useRef, useState } from "react";
import style from "./OtpBox.module.css";

const OtpBox = () => {
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(["", "", "", ""]);

  useEffect(() => {
    refs[0]?.current.focus();
  }, []);

  const handleInputChange = (e, index) => {
    if (!Number(e.target.value)) {
      return;
    }

    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }

    const copyInputs = [...inputs];
    copyInputs[index] = e.target.value;
    setInputs(copyInputs);
  };

  const handleOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = "";
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  return (
    <div className={style.main_otp_box}>
      {inputs?.map((item, index) => (
        <input
          ref={refs[index]}
          value={inputs[index]}
          type="text"
          maxLength={"1"}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          className={style.input_box}
        />
      ))}
    </div>
  );
};

export default OtpBox;
