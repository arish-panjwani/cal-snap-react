import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.frameWrapper}>
        <div className={styles.frameContainer}>
          <div className={styles.ellipseParent}>
            <div className={styles.frameItem} />
            <a className={styles.logoDesign1} target="_blank">
              <img
                className={styles.logoDesign1Icon}
                alt=""
                loading="lazy"
                src="/logo-design-1@3x.png"
              />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.aboutUsWrapper}>
          <h1 className={styles.aboutUs}>ABOUT US</h1>
        </div>
        <div className={styles.calsnapIsA}>
          Calsnap is a web application that allows users to capture/upload food
          images and classify using CV as well as add their exercise logs to get
          calorie estimates per day and in turn allow them to track their
          present and future health risks.
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
