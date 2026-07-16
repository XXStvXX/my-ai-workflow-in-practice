import { PosterCarousel } from "./PosterCarousel";
import { posters } from "./site-data";
import styles from "./syans.module.css";

export default function SyansHomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="syans-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>SHENYANG · INDUSTRIAL AUTOMATION</p>
          <h1 id="syans-title">
            数控、驱动与维修
            <span>面向工业现场的技术服务</span>
          </h1>
          <p className={styles.lead}>
            沈阳安盛自动控制有限公司专注于安川相关数控系统、伺服驱动、变频器、电机与机床主轴的产品支持、维修及调试。
          </p>
        </div>
        <PosterCarousel posters={posters} />
      </section>

      <section className={styles.homeOverview} aria-labelledby="home-overview-title">
        <p className={styles.kicker}>COMPANY / OVERVIEW</p>
        <h2 id="home-overview-title">围绕工业现场的设备、故障与技术资料开展支持</h2>
        <p>公司立足沈阳，面向工业自动化与运动控制设备相关需求，以真实设备信息和实际问题为沟通起点。</p>
      </section>
    </>
  );
}
