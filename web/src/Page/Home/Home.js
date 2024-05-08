import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal/Modal";
import styles from "./Home.module.css";
import classNames from "classnames/bind";
import { BiMath } from "react-icons/bi";
import { FaCube, FaInfinity, FaPercent } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import calBg from "../../assets/img/calBg.png";
import linearBg from "../../assets/img/linearBg.png";
import geoBg from "../../assets/img/geoBg.png";
import optBg from "../../assets/img/optimizeBg.png";
import odeBg from "../../assets/img/odeBg.png";
import statBg from "../../assets/img/statBg.png";
import probaBg from "../../assets/img/probaBg.png";

const cx = classNames.bind(styles);
const data = [
  {
    fieldTitle: "Calculus",
    id: "calculus",
    icon: <BiMath color="white" size={36} />,
    desc: "Calculus is an advanced math, including many fields, such as differential, integral, ...",
    subField: [
      {
        subFieldTitle: "Fundamental of Calculus",
        rate: "4.5",
        bgImg: calBg,
      },
      {
        subFieldTitle: "Linear Algebra",
        rate: "4.2",
        bgImg: linearBg,
      },
    ],
  },
  {
    fieldTitle: "Geometry",
    id: "geometry",
    icon: <FaCube color="white" size={28} />,
    desc: "Geometry is a branch of mathematics that deals with questions of shape, size, relative positions of shapes, and properties of space.",
    subField: [
      {
        subFieldTitle: "Fundamental of Geometry",
        rate: "4.5",
        bgImg: geoBg,
      },
    ],
  },
  {
    fieldTitle: "Theoretical models in computing",
    id: "tmc",
    icon: <FaInfinity color="white" size={28} />,
    desc: "TMC refer to mathematical or abstract models that rely on the knowledge of numerical methods",
    subField: [
      {
        subFieldTitle: "Optimize method",
        algorithm: [
          {
            alName: "Golden Section Method",
            nav: "goldenSectionSearch",
            color: "",
          },
          { alName: "Newton Method", nav: "newtonMethod", color: "" },
          {
            alName: "Interpolation Method",
            nav: "parabolicInterpolation",
            color: "",
          },
        ],
        rate: "4.5",
        bgImg: optBg,
      },
      {
        subFieldTitle: "ODE method",
        algorithm: [
          { alName: "Euler Method", nav: "eulerMethod", color: "" },
          { alName: "Heun Method", nav: "heunMethod", color: "" },
          { alName: "Midpoint Method", nav: "midpointMethod", color: "" },
          { alName: "Ralston Method", nav: "ralstonMethod", color: "" },
          { alName: "3rd order Method", nav: "thirdOrderMethod", color: "" },
          {
            alName: "Classic 4th order Method",
            nav: "classicFourthMethod",
            color: "",
          },
          { alName: "Simpson 1/3 Rule", nav: "simpson13Rule", color: "" },
          { alName: "Simpson 1/3 MA Rule", nav: "simpson13MArule", color: "" },
          { alName: "Simpson 3/8 Rule", nav: "simpson38Rule", color: "" },
        ],
        rate: "4.5",
        bgImg: odeBg,
      },
      // {
      //   subFieldTitle: "Optimize method",
      //   rate: "4.5",
      //   bgImg: optBg,
      // },
    ],
  },
  {
    fieldTitle: "Probability, Statistic and Random Process",
    id: "proba",
    icon: <FaPercent color="white" size={24} />,
    desc: "Probability is the study of uncertain events, statistics involves analyzing data for meaningful insights, and random processes encompass sequences of random events occurring over time.",
    subField: [
      {
        subFieldTitle: "Probability Calculator",
        algorithm: [
          {
            alName: "Probability Basic",
            nav: "goldenSectionSearch",
            color: "",
          },
          { alName: "Independent Events", nav: "newtonMethod", color: "" },
          {
            alName: "Normal Distribution",
            nav: "parabolicInterpolation",
            color: "",
          },
        ],
        rate: "4.5",
        bgImg: probaBg,
      },
      {
        subFieldTitle: "Statistic Calculator",
        algorithm: [
          {
            alName: "Statistic Basics Calculator",
            nav: "eulerMethod",
            color: "",
          },
          { alName: "Confidence Interval", nav: "heunMethod", color: "" },
          { alName: "Z-score Calculator", nav: "midpointMethod", color: "" },
          { alName: "Ralston Method", nav: "ralstonMethod", color: "" },
          { alName: "3rd order Method", nav: "thirdOrderMethod", color: "" },
        ],
        rate: "4.5",
        bgImg: statBg,
      },
      // {
      //   subFieldTitle: "Optimize method",
      //   rate: "4.5",
      //   bgImg: optBg,
      // },
    ],
  },
];

export default function Home() {
  const [modalData, setModalData] = useState();
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [format, setFormat] = useState(null);

  return (
    <div className={cx("home-container")}>
      <div className={cx("home-math-fields-container")}>
        {open && <Modal data={modalData} setOpen={setOpen} open={open} />}
        {data.map((el) => (
          <div id={el.id} className={cx("home-math-field-container")}>
            <div className={cx("home-math-field-infor")}>
              <div className={cx("home-math-field-icon")}>{el.icon}</div>
              <div className={cx("home-math-field-text")}>
                <h1>{el.fieldTitle}</h1>
                <p>{el.desc}</p>
              </div>
            </div>
            <div
              style={{
                gridTemplateColumns: `repeat(${el.subField.length}, 1fr)`,
              }}
              className={cx("home-math-field-carousel")}
            >
              {el.subField.map((sub) => (
                <div className={cx("carousel-container")}>
                  <div className={cx("carousel-container-img")}>
                    <img src={sub.bgImg} />
                  </div>
                  <div className={cx("carousel-container-text")}>
                    <div className={cx("carousel-container-text-left")}>
                      <h2>{sub.subFieldTitle}</h2>
                      <p>Rate: {sub.rate}/5</p>
                    </div>
                    <button
                      className={cx("carousel-container-text-right")}
                      onClick={() => {
                        if (
                          el.fieldTitle === "Theoretical models in computing"
                        ) {
                          setModalData({
                            modalName: sub.subFieldTitle,
                            modalRate: sub.rate,
                            algorithm: sub.algorithm,
                          });
                          setOpen(!open);
                        }
                      }}
                    >
                      <AiOutlineArrowRight color="white" size={32} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
