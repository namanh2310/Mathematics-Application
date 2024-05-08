import React from "react";
import styles from "./Header.module.css";
import classNames from "classnames/bind";
import logo from "../../assets/img/logo.svg";
import avt from "../../assets/img/avt.png";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Header() {
  const navigator = useNavigate();

  return (
    <div className={cx("header")}>
      <div className={cx("header-brand")}>
        <img className={cx("image-logo")} src={logo} />
        <a href="/">AiMA</a>
      </div>
      <div className={cx("header-nav")}>
        <a onClick={() => navigator(`/`)}>CALCULATOR</a>
        <a onClick={() => navigator(`/forum`)}>FORUM</a>
        <a onClick={() => navigator(`/ai-scanner`)}>AI-SCANNER</a>
        {/* <a href="/">SOMETHING...</a> */}
      </div>
      <div className={cx("header-user")}>
        <img className={cx("header-user-top header-user-avt")} src={avt} />
        <div className={cx("header-user-bottom")}>
          <div className={cx("header-user-name")}>Nam Anh</div>
          <a href="/" className={cx("header-user-logout")}>
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
}
