import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../site-data";
import styles from "../syans.module.css";

export const metadata: Metadata = { title: "产品中心", description: "安川相关伺服驱动、主轴驱动、数控系统、电机编码器和变频器产品体系。" };

export default function ProductsPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <p className={styles.breadcrumb}><Link href="/lab/syans">首页</Link><span>/</span>产品中心</p>
        <p className={styles.kicker}>PRODUCT SYSTEM / 01—05</p>
        <h1>产品中心</h1>
        <p>按设备体系查找产品与相关技术支持。具体型号、库存和供货状态请联系公司确认。</p>
      </section>
      <section className={styles.pageBody}>
        <div className={styles.cardGrid}>
          {products.map((product) => (
            <Link className={styles.catalogCard} href={`/lab/syans/products/${product.slug}`} key={product.slug}>
              <span>{product.code}</span><p>{product.en}</p><h2>{product.name}</h2><small>{product.summary}</small><b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
        <div className={styles.notice}><strong>资料边界</strong><p>页面不显示未经公司确认的型号、价格或库存。请提供铭牌照片和实际需求后咨询。</p></div>
      </section>
    </>
  );
}
