import React from "react";
import variables from "../Variables";
import styles from "../../Optimize/twoVariables.module.css";
import classNames from "classnames/bind";
import { StaticMathField } from "react-mathquill";
import methods from "../../Data/methods";
import { GSSDATA } from "../../Data/methodStep";
const cx = classNames.bind(styles);

export default function SolutionGSS({ data }) {
  console.log(
    "hello",
    data.map((datum) =>
      console.log(
        "vcc",
        GSSDATA[3]
          .tableValue(datum)
          .map((value) => console.log("hele2131232lo", value))
      )
    )
  );
  const comp = data[0].f1 > data[0].f2 ? ">" : "<";
  return (
    <div id="solution" className={cx("algorithm-solution")}>
      <h1 className={cx("solution-title")}>SOLUTION</h1>
      <h3>Full calculation for the first iteration</h3>
      <div className={cx("step-container")}>
        {GSSDATA.map((el) => (
          <>
            <div className={cx("step-one")}>
              <h3>{el.stepTitle}</h3>
              {el.type === "text" && (
                <ul className={cx("step-one-calculate")}>
                  {el.stepContent(data, comp).map((step) => (
                    <li>
                      <p className={cx("equation")}>
                        <StaticMathField>{step}</StaticMathField>
                      </p>
                    </li>
                  ))}
              
                </ul>
              )}
            </div>

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
