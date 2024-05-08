import React, { useEffect, useState } from "react";
import styles from "../../Optimize/twoVariables.module.css";
import Navlink from "../../component/Navlink/Navlink";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import classNames from "classnames/bind";
import SolutionNM from "./SolutionNM";

const cx = classNames.bind(styles);

export default function NewtonMethod() {
  const [input, setInputData] = useState();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState(false);
  const [funct, setFunct] = useState("f(x)");
  const [xi, setXi] = useState("x_i");
  const [err, setErr] = useState("e_s");

  useEffect(() => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }, [data]);

  // useEffect(() => {
  //   if (funct === "") {
  //     setFunct("function");
  //   } else if (xl === "") {
  //     setXl("xl");
  //   } else if (xu === "") {
  //     setXu("xu");
  //   } else if (err === "") {
  //     setErr("err");
  //   }
  // }, [funct, xl, xu, err]);

  const navigator = useNavigate();
  const handleChange = (name, value) => {
    setInputData({ ...input, [name]: value });
  };
  const handleClearPlaceholder = (
    placeholderValue,
    placeholder,
    setPlaceHolder
  ) => {
    if (placeholder === placeholderValue) {
      setPlaceHolder("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getTest = async () => {
      try {
        await axios
          // .post("http://localhost:4000/optimize/NewtonMethod", inputData)     //For NodeJS
          .post("http://127.0.0.1:8081/Optimize/newtonmethod", { input }) //For Flask
          .then((res) => {
            console.log(res.data);
            setData(res.data);
            setStatus(true);
            setMessage(res.data.message);
          });
      } catch (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data);
        } else if (error.response.status === 500) {
          setStatus(false);
          setMessage(error.response.data.message);
        }
      }
    };
    getTest();
    console.log(input);
  };
  addStyles();

  return (
    <div className={cx("container")}>
      {notice && (
        <div className={cx("notice-syntax-container")}>
          <div className={cx("notice-syntax-header")}></div>
          <div className={cx("notice-syntax-dashed")}></div>
          <h2 className={cx("notice-syntax-title")}>Syntax</h2>
          <ul className={cx("notice-syntax-content")}>
            <li>
              <p>
                To display square root: \sqrt&#123;x&#125; =
                <StaticMathField>{"\\sqrt{x}"}</StaticMathField>
              </p>
            </li>
            <li>
              <p>
                To display power: x^&#123;a&#125; =
                <StaticMathField>{"x^{a}"}</StaticMathField>
              </p>
            </li>
            <li>
              <p>
                To display fraction: \frac&#123;a&#125;&#123;b&#125; =
                <StaticMathField>{"\\frac{a}{b}"}</StaticMathField>
              </p>
            </li>
            <li>
              <p>
                To display multiply operator: a \cdot b =
                <StaticMathField>{"a\\cdot b"}</StaticMathField>
              </p>
            </li>
          </ul>
        </div>
      )}
      <div
        onMouseEnter={() => setNotice(true)}
        onMouseLeave={() => setNotice(false)}
        className={cx("syntax-btn")}
      >
        <p>
          <StaticMathField>f(x)</StaticMathField>
        </p>
      </div>
      <div className={cx("interact-field-container")}>
        <div className={cx("optimize-content")}>
          <form className={cx("algorithm-container")}>
            <h1 className={cx("main-title")}>Newton Method</h1>
            <br />
            <div className={cx("function")}>
              <EditableMathField
                className={cx("algorithm-function")}
                latex={funct}
                onChange={(mathField) => {
                  handleChange("function", mathField.latex());
                }}
                onClick={() => {
                  handleClearPlaceholder("f(x)", funct, setFunct);
                }}
              />
            </div>
            <div className={cx("variables")}>
              <EditableMathField
                className={cx("algorithm-variable")}
                latex={xi}
                onChange={(mathField) => {
                  handleChange("x0", mathField.latex());
                }}
                onClick={() => {
                  handleClearPlaceholder("x_i", xi, setXi);
                }}
              />

              <EditableMathField
                className={cx("algorithm-variable")}
                latex={err}
                onChange={(mathField) => {
                  handleChange("es", mathField.latex());
                }}
                onClick={() => {
                  handleClearPlaceholder("e_s", err, setErr);
                }}
              />
            </div>
            <button className={cx("algorithm-submit")} onClick={handleSubmit}>
              SUBMIT
            </button>
            {message && (
              <div className={cx("error-call")}>
                <p>{message}</p>
              </div>
            )}
          </form>
        </div>
        <div className={cx("syntax-container")}>
          <div className={cx("syntax-header")}></div>
          <div className={cx("syntax-dashed")}></div>
          <h2 className={cx("syntax-title")}>Syntax</h2>
          <ul className={cx("syntax-content")}>
            <li>
              <p>
                To display square root: \sqrt&#123;x&#125; =
                <StaticMathField>{"\\sqrt{x}"}</StaticMathField>
              </p>
            </li>
            <li>
              <p>
                To display power: x^&#123;a&#125; =
                <StaticMathField>{"x^{a}"}</StaticMathField>
              </p>
            </li>
            <li>
              <p>
                To display fraction: \frac&#123;a&#125;&#123;b&#125; =
                <StaticMathField>{"\\frac{a}{b}"}</StaticMathField>
              </p>
            </li>
            <li>
              <p>
                To display multiply operator: a \cdot b =
                <StaticMathField>{"a\\cdot b"}</StaticMathField>
              </p>
            </li>
          </ul>
        </div>
      </div>
      {status === true ? <SolutionNM dataObj={data} /> : null}
    </div>
  );
}
