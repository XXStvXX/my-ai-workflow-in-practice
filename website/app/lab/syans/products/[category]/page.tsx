import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../site-data";
import styles from "../../syans.module.css";

export function generateStaticParams() { return products.map((product) => ({ category: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const product = products.find((item) => item.slug === category);
  return product ? { title: product.name, description: product.summary } : {};
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const product = products.find((item) => item.slug === category);
  if (!product) notFound();
  return (
    <>
      <section className={styles.detailHero}>
        <p className={styles.breadcrumb}><Link href="/lab/syans">首页</Link><span>/</span><Link href="/lab/syans/products">产品中心</Link><span>/</span>{product.name}</p>
        <div><p className={styles.kicker}>{product.code} / {product.en}</p><h1>{product.name}</h1><p>{product.summary}</p></div>
        <span className={styles.detailCode}>{product.code}</span>
      </section>
      <section className={styles.detailGrid}>
        <div>
          <p className={styles.kicker}>SERVICE SCOPE</p><h2>支持范围</h2>
          <ul className={styles.scopeList}>{product.scope.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul>
        </div>
        <aside className={styles.inquiryPanel}>
          <p className={styles.kicker}>INQUIRY</p><h2>咨询前请准备</h2>
          <ul><li>设备完整型号或铭牌照片</li><li>当前报警代码和故障现象</li><li>设备所在城市及时间要求</li></ul>
          <Link className={styles.primaryButton} href="/lab/syans/contact">联系公司确认 <span aria-hidden="true">→</span></Link>
        </aside>
      </section>
      <nav className={styles.siblingNav} aria-label="其他产品分类">
        {products.filter((item) => item.slug !== product.slug).map((item) => <Link href={`/lab/syans/products/${item.slug}`} key={item.slug}><span>{item.code}</span>{item.name}</Link>)}
      </nav>
    </>
  );
}
