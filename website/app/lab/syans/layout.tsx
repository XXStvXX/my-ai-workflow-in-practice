import type { Metadata } from "next";
import { Noto_Sans_SC, Roboto_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import { SyansShell } from "./SyansShell";
import { company } from "./site-data";

const notoSansSc = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  variable: "--font-syans-cn",
  preload: false,
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-syans-en",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "沈阳安盛自动控制有限公司", template: "%s｜沈阳安盛" },
  description: "安川相关数控系统、伺服驱动、变频器、电机与机床主轴的产品支持、维修及调试服务。",
  keywords: ["沈阳安盛", "工业自动化", "数控系统", "伺服驱动", "变频器维修", "机床主轴维修"],
  authors: [{ name: "沈阳安盛自动控制有限公司" }],
  alternates: { canonical: "/lab/syans" },
  openGraph: {
    type: "website",
    url: "/lab/syans",
    title: "沈阳安盛自动控制有限公司",
    description: "数控、驱动与维修服务。",
    siteName: "Shenyang Ansheng Automation Control Co., Ltd.",
  },
  twitter: {
    card: "summary",
    title: "沈阳安盛自动控制有限公司",
    description: "数控、驱动与维修服务。",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/lab/syans/assets/logo/ansheng-logo.svg",
    shortcut: "/lab/syans/assets/logo/ansheng-logo.svg",
  },
};

export default function SyansLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${notoSansSc.variable} ${robotoCondensed.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            alternateName: company.englishName,
            url: "https://stevewei.ca/lab/syans",
            logo: "https://stevewei.ca/lab/syans/assets/logo/ansheng-logo.svg",
            telephone: company.phone,
            email: company.email,
          }),
        }}
      />
      <SyansShell>{children}</SyansShell>
    </div>
  );
}
