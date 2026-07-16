import type { Metadata } from "next";
import Link from "next/link";
import { services, serviceSteps } from "../site-data";
import styles from "../syans.module.css";

export const metadata: Metadata = { title: "维修服务", description: "主轴驱动器、伺服驱动器、数控系统、电机、变频器及机床主轴维修服务。" };

export default function ServicesPage() {
  return (
    <>
      <section className={`${styles.pageHero} ${styles.pageHeroBlue}`}>
        <p className={styles.breadcrumb}><Link href="/lab/syans">首页</Link><span>/</span>维修服务</p>
        <p className={styles.kicker}>REPAIR SERVICE / 01—07</p><h1>维修服务</h1>
        <p>先确认设备与故障信息，再沟通检测、维修、周期和交付方式。</p>
      </section>
      <section className={styles.pageBody}>
        <div className={styles.serviceDirectory}>
          {services.map((service) => <Link href={`/lab/syans/services/${service.slug}`} key={service.slug}><span>{service.code}</span><div><h2>{service.name}</h2><p>{service.summary}</p></div><b aria-hidden="true">→</b></Link>)}
        </div>
      </section>
      <section className={styles.processBlock}>
        <div className={styles.sectionHead}><div><p className={styles.kicker}>SERVICE FLOW</p><h2>基本服务流程</h2></div><p>实际流程以设备情况和双方确认为准。</p></div>
        <ol>{serviceSteps.map(([step, title, detail]) => <li key={step}><span>{step}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol>
      </section>
    </>
  );
}
