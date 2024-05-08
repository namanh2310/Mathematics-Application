import React, { useEffect, useState } from "react";
import styles from "../../Optimize/twoVariables.module.css";
import Navlink from "../../component/Navlink/Navlink";
// import SolutionGSS from "./SolutionGSS";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import classNames from "classnames/bind";
import SolutionPI from "./SolutionPI";

const cx = classNames.bind(styles);

export default function ParabolicInterpolation() {
  const [input, setInputData] = useState();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState(false);
  const [funct, setFunct] = useState("f(x)");
  const [x0, setX0] = useState("x_0");
  const [x1, setX1] = useState("x_1");
  const [x2, setX2] = useState("x_2");
  const [err, setErr] = useState("e_s");

  useEffect(() => {
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  }, [data]);

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
          .post("http://127.0.0.1:8081/Optimize/interpolation", { input }) //For Flask
          .then((res) => {
            // console.log(res.data.message);
            setData(res.data);
            setStatus(true);
            // setMessage(res.data.message);
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
          {/* <Navlink
        link={{
          parent: location.state.parent,
          children: location.state.children,
        }}
      /> */}
          <form className={cx("algorithm-container")}>
            <h1 className={cx("main-title")}>PARABOLIC INTERPOLATION</h1>

            <br />
            <div className={cx("function")}>
              {/* <i className={cx("input-symbol")}>f(x)</i> */}
              <EditableMathField
                placeholder="function"
                className={cx("algorithm-function")}
                latex={funct}
                onChange={(mathField) => {
                  handleChange("function", mathField.latex());
                }}
                onClick={() => {
                  handleClearPlaceholder("f(x)", funct, setFunct);
                }}
              />
              {/* <p>{latex}</p> */}
            </div>

            <div className={cx("variables")}>
              {/* <i className={cx("input-symbol")}>
            x<sub>l</sub>
          </i> */}

              <EditableMathField
                placeholder="function"
                className={cx("algorithm-variable")}
                latex={x0}
                onChange={(mathField) => {
                  handleChange("x0", mathField.latex());
                }}
                onClick={() => {
                  handleClearPlaceholder("x_0", x0, setX0);
                }}
              />

              <EditableMathField
                placeholder="function"
                className={cx("algorithm-variable")}
                latex={x1}
                onChange={(mathField) => {
                  handleChange("x1", mathField.latex());
                }}
                onClick={() => {
                    handleClearPlaceholder("x_1", x1, setX1);
                  }}
                />

              <EditableMathField
                placeholder="function"
                className={cx("algorithm-variable")}
                latex={x2}
                onChange={(mathField) => {
                  handleChange("x2", mathField.latex());
                }}
                onClick={() => {
                    handleClearPlaceholder("x_2", x2, setX2);
                  }}
                />

              <EditableMathField
                placeholder="function"
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

            {/* <div className={cx("error")}>
          <i className={cx("input-symbol")}>
            e<sub>s</sub>%
          </i>
        </div> */}

            <div className={cx("types")}>
              <label className={cx("algorithm-type")}>
                <input
                  style={{ boxShadow: "none" }}
                  type="radio"
                  value="minimum"
                  name="type"
                  onChange={() => handleChange("type", "minimum")}
                />
                Minimum
              </label>
              <label className={cx("algorithm-type")}>
                <input
                  style={{ boxShadow: "none" }}
                  type="radio"
                  value="maximum"
                  name="type"
                  onChange={() => handleChange("type", "maximum")}
                />
                Maximum
              </label>
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
      {status === true ? <SolutionPI data={data} /> : null}
    </div>
  );
}
