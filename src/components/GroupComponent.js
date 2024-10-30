import PropTypes from "prop-types";
import styles from "./GroupComponent.module.css";

const GroupComponent = ({ className = "" }) => {
  return (
    <div className={[styles.sliderParent, className].join(" ")}>
      <img className={styles.sliderIcon} alt="" src="/slider@2x.png" />
      <img
        className={styles.logoIcon}
        loading="lazy"
        alt=""
        src="/logo@2x.png"
      />
      <button className={styles.homePage} autoFocus={true} id="home">
        <img
          className={styles.homePageIcon}
          alt=""
          loading="lazy"
          src="/home-page@3x.png"
        />
      </button>
      <button className={styles.foodBar} autoFocus={true}>
        <img
          className={styles.foodBarIcon}
          alt=""
          loading="lazy"
          src="/food-bar@3x.png"
        />
      </button>
      <div className={styles.frameChild} />
      <button className={styles.dumbbell}>
        <img
          className={styles.dumbbellIcon}
          alt=""
          loading="lazy"
          src="/dumbbell@3x.png"
        />
      </button>
      <button className={styles.calendar} autoFocus={true}>
        <img
          className={styles.calendarIcon}
          alt=""
          loading="lazy"
          src="/calendar@3x.png"
        />
      </button>
      <button className={styles.person1}>
        <img
          className={styles.person1Icon}
          alt=""
          loading="lazy"
          src="/person-1@3x.png"
        />
      </button>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;
