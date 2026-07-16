import Link from "next/link";
import type { ReactNode } from "react";
import { company, footerGroups, navigation } from "./site-data";
import { SyansNavigation } from "./SyansNavigation";
import styles from "./syans.module.css";

export function SyansShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#syans-content">跳至正文</a>
      <div className={styles.topline}>
        <span>{company.address}</span>
        <a href={`tel:${company.phoneDial}`}>{company.phone}</a>
      </div>
      <header className={styles.header}>
        <Link className={styles.brand} href="/lab/syans" aria-label="沈阳安盛首页">
          <img src="/lab/syans/assets/logo/ansheng-logo.svg" alt="沈阳安盛公司标志" />
          <span>
            <strong>{company.name}</strong>
            <small>{company.englishName}</small>
          </span>
        </Link>
        <SyansNavigation items={navigation} />
      </header>
      <main id="syans-content">{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerDirectory} aria-label="页脚导航">
          {footerGroups.map((group) => (
            <section key={group.label}>
              <h2>{group.label}</h2>
              <div>
                {group.items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
              </div>
            </section>
          ))}
          <section>
            <h2>快捷联系</h2>
            <div>
              <a href={`tel:${company.phoneDial}`}>{company.phone}</a>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <span>微信请通过电话或邮箱获取</span>
            </div>
          </section>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} {company.englishName}</span>
          <span>辽ICP备15000218号-1</span>
        </div>
      </footer>
    </div>
  );
}
