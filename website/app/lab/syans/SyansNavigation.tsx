"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./syans.module.css";

type NavigationChild = { label: string; href: string };
type NavigationItem = { label: string; href: string; children?: NavigationChild[] };

export function SyansNavigation({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleOpen = (index: number) => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpenIndex(index), 120);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpenIndex(null), 240);
  };

  const focusDropdown = (index: number, position: "first" | "last" = "first") => {
    requestAnimationFrame(() => {
      const links = navRef.current?.querySelectorAll<HTMLAnchorElement>(`[data-submenu="${index}"] a`);
      links?.[position === "first" ? 0 : links.length - 1]?.focus();
    });
  };

  const handleToggleKey = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpenIndex(index);
      focusDropdown(index, event.key === "ArrowDown" ? "first" : "last");
    }
    if (event.key === "Escape") {
      setOpenIndex(null);
    }
  };

  const handleDropdownKey = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      links[(current + step + links.length) % links.length]?.focus();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpenIndex(null);
      navRef.current?.querySelector<HTMLAnchorElement>(`[data-toggle="${index}"]`)?.focus();
    }
  };

  useEffect(() => {
    const handleOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setOpenIndex(null);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      clearTimers();
    };
  }, []);

  return (
    <>
      <button
        className={styles.menuToggle}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="syans-primary-navigation"
        onClick={() => {
          setMenuOpen((current) => !current);
          setOpenIndex(null);
        }}
      >
        <span>菜单</span><i aria-hidden="true">{menuOpen ? "×" : "＋"}</i>
      </button>
      <nav
        ref={navRef}
        id="syans-primary-navigation"
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        aria-label="主要导航"
      >
        {items.map((item, index) => {
          const hasChildren = Boolean(item.children?.length && item.children.length >= 2);
          const isOpen = openIndex === index;
          const isCurrent = item.href === "/lab/syans" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <div
              className={styles.navItem}
              key={item.href}
              onPointerEnter={() => hasChildren && scheduleOpen(index)}
              onPointerLeave={() => hasChildren && scheduleClose()}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose();
              }}
            >
              <Link
                className={`${styles.navLink} ${isCurrent ? styles.navLinkCurrent : ""}`}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                aria-haspopup={hasChildren ? "menu" : undefined}
                aria-expanded={hasChildren ? isOpen : undefined}
                data-toggle={hasChildren ? index : undefined}
                onFocus={() => hasChildren && scheduleOpen(index)}
                onKeyDown={(event) => hasChildren && handleToggleKey(event, index)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {hasChildren ? (
                <button
                  className={styles.submenuToggle}
                  type="button"
                  aria-label={`${isOpen ? "收起" : "展开"}${item.label}子菜单`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span aria-hidden="true">{isOpen ? "−" : "＋"}</span>
                </button>
              ) : null}
              {hasChildren ? (
                <div
                  className={`${styles.navDropdown} ${isOpen ? styles.navDropdownOpen : ""}`}
                  data-submenu={index}
                  role="menu"
                  onKeyDown={(event) => handleDropdownKey(event, index)}
                >
                  <div className={styles.navDropdownInner}>
                    {item.children?.map((child, childIndex) => (
                      <Link role="menuitem" href={child.href} key={child.href} onClick={() => { setMenuOpen(false); setOpenIndex(null); }}>
                        <span>{String(childIndex + 1).padStart(2, "0")}</span>
                        <strong>{child.label}</strong>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </>
  );
}
