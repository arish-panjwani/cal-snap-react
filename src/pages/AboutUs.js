import GroupComponent from "../components/GroupComponent";
import FrameComponent from "../components/FrameComponent";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.aboutUsChild} />
      <footer className={styles.dGraphicWallpaperWithColorParent}>
        <section
          className={styles.dGraphicWallpaperWithColor}
          id="background-img"
        />
        <img
          className={styles.untitled11Icon}
          alt=""
          src="/untitled1-1@2x.png"
        />
        <GroupComponent />
      </footer>
      <div className={styles.aboutUsInner}>
        <FrameComponent />
      </div>
    </div>
  );
};

export default AboutUs;
