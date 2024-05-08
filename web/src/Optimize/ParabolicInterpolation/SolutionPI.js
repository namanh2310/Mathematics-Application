import React from "react";
import variables from "../Variables";
import styles from "../../Optimize/twoVariables.module.css";
import classNames from "classnames/bind";
import { StaticMathField } from "react-mathquill";
  
const cx = classNames.bind(styles);
export default function SolutionPI({ data }) {
  // const { f_x0, f_x1, f_x2, f_x3, x_0, x_1, x_2, x_3, x2_1, x2_2, x2_0 } =
  //   variables;
    console.log(data)
    const first_appr = data.first_approach
    const second_appr = data.second_approach
    const steps = data.steps
    const math = 'x_3 = \\frac{f(x_0)(x_1^2 - x_2^2) + f(x_1)(x_2^2 - x_0^2) + f(x_2)(x_0^2 - x_1^2)}{(2 * f(x_0) * (x_1 - x_2) + 2 * f(x_1) * (x_2 - x_0) + 2 * f(x_2) * (x_0 - x_1))}'
    const test = steps.map((step) => console.log(step.replace(/\\\(/g, "").replace(/\\\)/g, "").replace(/\\/g, "\\\\")))
    
  return (
    <div className={cx("algorithm-solution")}>
      <h1 className={cx("h1")}>SOLUTION</h1>
      <h3>Full calculation for the first iteration</h3>
      <div className={cx("step-container")}>
        <div className={cx("step-one")}>
          <h3>1. Calculate</h3>
          <ul className={cx("step-one-calculate")}>
          <li>
            <StaticMathField>{math}</StaticMathField>
          </li>
          {steps.map((step, index) => {
              // Exclude elements at index 1 and 2
              if (index === 1 || index === 2) {
                return null; // Skip rendering for these indices
              }

              // Render the remaining elements
              return <p>{step.replace(/\\\(/g, "").replace(/\\\)/g, "").replace(/\\/g, "\\\\")}</p>
          })}
          </ul>
        </div>

        

        <div className={cx("step-four")}>
          <h3>Table result</h3>
          
          <table className={cx("step-four-table")}>
            <h4>First Approach</h4>
            <tr className={cx("step-four-row")}>
              <th className={cx("step-four-table-title")}>Iteration</th>
              <th className={cx("step-four-table-title")}>x_0</th>
              <th className={cx("step-four-table-title")}>f_x0</th>
              <th className={cx("step-four-table-title")}>x_1</th>
              <th className={cx("step-four-table-title")}>f_x1</th>
              <th className={cx("step-four-table-title")}>x_2</th>
              <th className={cx("step-four-table-title")}>f_x2</th>
              <th className={cx("step-four-table-title")}>x_3</th>
              <th className={cx("step-four-table-title")}>f_x3</th>
            </tr>
            {first_appr.map((data) => (
              <tr className={cx("step-four-row")}>
                <td className={cx("step-four-table-data")}>{data.a_iteration}</td>
                <td className={cx("step-four-table-data")}>{data.b_x_0}</td>
                <td className={cx("step-four-table-data")}>{data.c_f_0}</td>
                <td className={cx("step-four-table-data")}>{data.d_x_1}</td>
                <td className={cx("step-four-table-data")}>{data.e_f_1}</td>
                <td className={cx("step-four-table-data")}>{data.f_x_2}</td>
                <td className={cx("step-four-table-data")}>{data.g_f_2}</td>
                <td className={cx("step-four-table-data")}>{data.h_x_3}</td>
                <td className={cx("step-four-table-data")}>{data.i_f_3}</td>
              </tr>
            ))}
            
          </table>
          <table className={cx("step-four-table")}>
            <h4>Second Approach</h4>
            <tr className={cx("step-four-row")}>
              <th className={cx("step-four-table-title")}>Iteration</th>
              <th className={cx("step-four-table-title")}>x_0</th>
              <th className={cx("step-four-table-title")}>f_x0</th>
              <th className={cx("step-four-table-title")}>x_1</th>
              <th className={cx("step-four-table-title")}>f_x1</th>
              <th className={cx("step-four-table-title")}>x_2</th>
              <th className={cx("step-four-table-title")}>f_x2</th>
              <th className={cx("step-four-table-title")}>x_3</th>
              <th className={cx("step-four-table-title")}>f_x3</th>
            </tr>
            {second_appr.map((data) => (
              <tr className={cx("step-four-row")}>
                <td className={cx("step-four-table-data")}>{data.a_iteration}</td>
                <td className={cx("step-four-table-data")}>{data.b_x_0}</td>
                <td className={cx("step-four-table-data")}>{data.c_f_0}</td>
                <td className={cx("step-four-table-data")}>{data.d_x_1}</td>
                <td className={cx("step-four-table-data")}>{data.e_f_1}</td>
                <td className={cx("step-four-table-data")}>{data.f_x_2}</td>
                <td className={cx("step-four-table-data")}>{data.g_f_2}</td>
                <td className={cx("step-four-table-data")}>{data.h_x_3}</td>
                <td className={cx("step-four-table-data")}>{data.i_f_3}</td>
              </tr>
            ))}
            
          </table>
        </div>
      </div>
    </div>
  );
}
