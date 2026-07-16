import type { Metadata } from "next";
import Link from "next/link";
import styles from "../syans.module.css";

export const metadata: Metadata = { title: "关于安盛", description: "沈阳安盛自动控制有限公司业务介绍。" };

export default function AboutPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <p className={styles.breadcrumb}><Link href="/lab/syans">首页</Link><span>/</span>关于安盛</p>
        <p className={styles.kicker}>ABOUT ANSHENG</p><h1>关于安盛</h1>
        <p>立足沈阳，服务工业自动化与运动控制设备相关需求。</p>
      </section>
      <section className={styles.aboutBody}>
        <div><p className={styles.kicker}>COMPANY PROFILE</p><h2>沈阳安盛自动控制有限公司</h2></div>
        <div className={styles.longCopy}>
          <p>公司专注于数控产品、机电一体化设备，以及数控系统、交流伺服系统、伺服电机、主轴驱动系统和变频器相关产品的销售、技术支持、维修与调试。</p>
          <p>网站当前以产品体系、维修服务、资料目录和联系入口为核心。公司历史、团队、维修现场、资质和案例将在收到真实材料并完成确认后逐步补充。</p>
        </div>
      </section>
      <section className={styles.valueGrid} aria-label="工作原则">
        <article><span>01</span><h2>信息准确</h2><p>不展示未经确认的型号、库存、授权或资质。</p></article>
        <article><span>02</span><h2>问题导向</h2><p>从设备型号、报警代码和故障现象开始沟通。</p></article>
        <article><span>03</span><h2>流程清楚</h2><p>检测、方案、维修、测试和交付逐步确认。</p></article>
      </section>
    </>
  );
}
