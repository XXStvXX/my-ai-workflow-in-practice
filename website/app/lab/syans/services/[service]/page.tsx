import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceSteps } from "../../site-data";
import styles from "../../syans.module.css";

export function generateStaticParams() { return services.map((service) => ({ service: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service ? { title: service.name, description: service.summary } : {};
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <section className={`${styles.detailHero} ${styles.detailHeroBlue}`}>
        <p className={styles.breadcrumb}><Link href="/lab/syans">首页</Link><span>/</span><Link href="/lab/syans/services">维修服务</Link><span>/</span>{service.name}</p>
        <div><p className={styles.kicker}>{service.code} / REPAIR SERVICE</p><h1>{service.name}</h1><p>{service.summary}</p></div>
        <span className={styles.detailCode}>{service.code}</span>
      </section>
      <section className={styles.detailGrid}>
        <div><p className={styles.kicker}>SERVICE FLOW</p><h2>处理步骤</h2><ol className={styles.compactSteps}>{serviceSteps.map(([step, title, detail]) => <li key={step}><span>{step}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol></div>
        <aside className={styles.inquiryPanel}>
          <p className={styles.kicker}>DEVICE INFORMATION</p><h2>需要提供的信息</h2>
          <ul><li>设备品牌、完整型号及铭牌照片</li><li>故障出现时间、报警代码与现场现象</li><li>是否曾维修及目前设备状态</li></ul>
          <p className={styles.panelNote}>支持型号、检测结论、周期和质保不在网页中预先承诺，以实际确认结果为准。</p>
          <Link className={styles.primaryButton} href="/lab/syans/contact">提交维修咨询 <span aria-hidden="true">→</span></Link>
        </aside>
      </section>
    </>
  );
}
