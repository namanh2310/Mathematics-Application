import React from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import { FaCube, FaInfinity } from "react-icons/fa";

const cx = classNames.bind(styles);

function Modal({ data, setOpen, open }) {
  const navigator = useNavigate();

  console.log(data);
  return (
    <div className={cx("modal-container")}>
      <div className={cx("modal-box")}>
        <div className={cx("modal-infor")}>
          <div className={cx("modal-icon")}>
            <FaInfinity color="white" size={28} />
          </div>
          <div className={cx("modal-text")}>
            <h1 onClick={() => setOpen(false)}>{data.modalName}</h1>
            <p>Rate: {data.modalRate}/5</p>
          </div>
        </div>
        <div className={cx("modal-algorithms")}>
          {data.algorithm.map((el) => (
            <div
              onClick={() => navigator(`/${el.nav}`)}
              className={cx("modal-algorithm")}
            >
              {el.alName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
