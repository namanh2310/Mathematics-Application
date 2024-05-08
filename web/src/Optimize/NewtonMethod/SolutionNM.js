import React from "react";
import variables from "../Variables";
import styles from "../../Optimize/twoVariables.module.css";
import classNames from "classnames/bind";
import { StaticMathField } from "react-mathquill";
import methods from "../../Data/methods";
import { NMDATA } from "../../Data/methodStep";
const cx = classNames.bind(styles);

export default function SolutionNM({ dataObj }) {
  const data = dataObj.data;
  const funct = dataObj.formula;
  const first_deri = dataObj.firtDeri.replace(/\*/g, "\\cdot ");
  const second_deri = dataObj.secondDeri.replace(/\*/g, "\\cdot ");
  return (
    <div id="solution" className={cx("algorithm-solution")}>
      <h1 className={cx("solution-title")}>SOLUTION</h1>
      <h3>Full calculation for the first iteration</h3>
      <div className={cx("step-container")}>
        {NMDATA.map((el) => (
          <>
            <div className={cx("step-one")}>
              <h3>{el.stepTitle}</h3>
              {el.type === "text" && (
                <ul className={cx("step-one-calculate")}>
                  {el
                    .stepContent(data, funct, first_deri, second_deri)
                    .map((step) => (
                      <li>
                        <p className={cx("equation")}>
                          <StaticMathField>{step}</StaticMathField>
                        </p>
                      </li>
                    ))}
                  {/* <li>
                    <p className={cx("equation")}>
                      <StaticMathField>{`x_1 = x_l + d = ${data[0].xl} + ${data[0].d} = ${data[0].x1}`}</StaticMathField>
                    </p>
                  </li>
                  <li>
                    <StaticMathField>{`x_2 = x_u - d = ${data[0].xu} - ${data[0].d} = ${data[0].x2}`}</StaticMathField>
                  </li> */}
                </ul>
              )}
            </div>

            {/* <div className={cx("step-two")}>
              <h3>2. Check</h3>
              <ul className={cx("step-two-check")}>
                <li>
                  <StaticMathField>{`f(x_1) = ${data[0].f1} ${comp} f(x_2) = ${data[0].f2}`}</StaticMathField>
                </li>
                <li>
                  <StaticMathField>{`\\rightarrow x_l = x_{opt} = x_2 = ${data[0].x2}`}</StaticMathField>
                </li>
              </ul>
            </div>

            <div className={cx("step-three")}>
              <h3>3. Error</h3>
              <ul className={cx("step-three-error")}>
                <li>
                  <p className="equation">
                    <StaticMathField>{`e_a = (1 - R) * \\frac{interval}{x_{opt}} \\cdot 100`}</StaticMathField>
                  </p>
                </li>
                <li>
                  <StaticMathField>{`= (1 - \\frac{\\sqrt{5} - 1}{2})\\frac{${
                    data[0].xu - data[0].xl
                  }}{ ${data[0].x2}}*100=${data[0].ea}`}</StaticMathField>
                </li>
              </ul>
            </div> */}
            {el.type === "table" && (
              <div className={cx("step-four")}>
                <h3>4. Table result</h3>
                <table className={cx("step-four-table")}>
                  <tr className={cx("step-four-row")}>
                    {el.tableHeader.map((header) => (
                      <th className={cx("step-four-table-title")}>
                        {" "}
                        <StaticMathField>{header}</StaticMathField>
                      </th>
                    ))}
                  </tr>
                  {data.map((datum) => (
                    <tr className={cx("step-four-row")}>
                      {el.tableValue(datum).map((value) => (
                        <td className={cx("step-four-table-data")}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </table>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
