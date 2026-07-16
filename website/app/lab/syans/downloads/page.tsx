import type { Metadata } from "next";
import Link from "next/link";
import styles from "../syans.module.css";

export const metadata: Metadata = { title: "资料下载", description: "产品样本、使用说明书和软件资料目录。" };

const groups = [
  { code: "D-01", title: "产品样本", en: "CATALOGUES", note: "等待补充经过版本和发布权限确认的正式文件。" },
  { code: "D-02", title: "使用说明书", en: "MANUALS", note: "等待按产品系列建立可核验的说明书目录。" },
  { code: "D-03", title: "软件与工具", en: "SOFTWARE", note: "仅在授权、版本和安全性确认后提供。" },
] as const;

export default function DownloadsPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <p className={styles.breadcrumb}><Link href="/lab/syans">首页</Link><span>/</span>资料下载</p>
        <p className={styles.kicker}>DOCUMENT CENTER</p><h1>资料下载</h1>
        <p>只有版本、来源和发布权限均已确认的文件才会开放下载。</p>
      </section>
      <section className={styles.pageBody}>
        <div className={styles.downloadDirectory}>
          {groups.map((group) => <article key={group.code}><span>{group.code}</span><div><p>{group.en}</p><h2>{group.title}</h2></div><small>{group.note}</small><b>资料整理中</b></article>)}
        </div>
        <div className={styles.notice}><strong>需要特定资料？</strong><p>请将产品完整型号发送至公司邮箱，我们会根据实际情况回复。</p><a href="mailto:ansheng@syans.com.cn">发送邮件 →</a></div>
      </section>
    </>
  );
}
