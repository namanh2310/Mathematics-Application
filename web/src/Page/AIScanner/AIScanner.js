import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./AIScanner.module.css";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { addStyles, StaticMathField } from "react-mathquill";

function AIScanner() {
  const cx = classNames.bind(styles);

  const [fileData, setFileData] = useState(null);
  const [format, setFormat] = useState(null);
  const [result, setResult] = useState(null);

  //   useEffect(() => {
  //     handleSubmit();
  //   }, [format]);

  const handleSubmit = () => {
    // e.preventDefault();
    const getTest = async () => {
      try {
        await axios
          // .post("http://localhost:4000/optimize/goldenSectionSearch", inputData)     //For NodeJS
          .post("http://127.0.0.1:8081/AIScanner/ ", { format }) //For Flask
          .then((res) => {
            console.log(res.data);
            setResult(res.data);
            console.log(res.data.step);
            // setStatus(true);
            // setMessage(res.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getTest();
  };
  addStyles();

  const handleFileUpload = (file) => {
    // Access the base64 representation of the file
    setFormat(file.base64.split(",")[1]);
    setFileData(file.base64);
  };
  return (
    <div className={result ? cx("AI-container-activate") : cx("AI-container")}>
      <div className={cx("AI-interact-field")}>
        <h1>Simplify and Scan with AI !!</h1>
        <p className={cx("equation")}></p>
        <div className={cx("AI-input")}>
          <FileBase64
            className={cx("filebase64")}
            multiple={false}
            onDone={handleFileUpload}
          />
        </div>
        <div className={cx("AI-image-container")}>
          {fileData && (
            <>
              <img
                className={cx("AI-img")}
                src={fileData}
                alt="Uploaded file"
              />
              <button onClick={handleSubmit} className={cx("AI-button")}>
                Submit
              </button>
            </>
          )}
        </div>
      </div>
      {result ? (
        <div className={cx("AI-step-field")}>
          <h1>Solution</h1>
          <div className={cx("AI-step-general")}>
            <p>Your equation is:</p>
            <p className={cx("equation")}>
              <StaticMathField>{result.eq}</StaticMathField>
            </p>
            <p>Result:</p>
            <p className={cx("equation")}>
              <StaticMathField>{result.res}</StaticMathField>
            </p>
          </div>
          <h2 className={cx("step-title")}>Steps: </h2>
          {result.step.length !== 0 ? (
            result.step.map((el) => (
              <div className={cx("AI-steps")}>
                <p>1. Calculate the anti-derivative: </p>
                <p>
                  <StaticMathField>{`${el[0]}`}</StaticMathField>
                </p>
                <p>
                  <StaticMathField>{` = ${el[1]}`}</StaticMathField>
                </p>
                <p>
                  2. Subtitute the range value to x, and then we can get the
                  result:{" "}
                </p>
                <StaticMathField>{`${el[2]}`}</StaticMathField>
              </div>
            ))
          ) : (
            <div className={cx("AI-steps")}>
              {result.res.includes("x") && result.res.includes("=") ? (
                <>
                  <p>Switching the sign and isolating x, we can calculate x:</p>
                  <p>{result.res}</p>
                </>
              ) : (
                <>
                  <p>Do the basic calculation with operators, we have:</p>
                  <p>{result.res}</p>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: "45%" }}></div>
      )}
    </div>
  );
}

export default AIScanner;
