"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

interface NavItem {
  name: string;
  href: string;
}

interface SocialItem {
  icon: IconType;
  href: string;
  label: string;
}

const exploreLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "Add Property", href: "/dashboard/properties/add" },
  { name: "Manage Property", href: "/dashboard/properties/manage" },
];

const companyLinks: NavItem[] = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Help & Support", href: "/help" },
];

const socialLinks: SocialItem[] = [
  { icon: FaFacebook, href: "https://www.facebook.com/hasan.m.zakaria.1", label: "Facebook" },
  { icon: FaTwitter, href: "https://x.com/Zakariak4Khan", label: "Twitter" },
  { icon: FaInstagram, href: "https://www.instagram.com/zakariak4/", label: "Instagram" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/hasanmdzakaria", label: "LinkedIn" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-accent transition-colors"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();


  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + About + Social */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="font-heading text-xl font-medium text-primary">
                Estate<span className="text-accent">Hub</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground mb-5">
              EstateHub helps you find, list, and manage properties with ease.
              Trusted by thousands of buyers, sellers, and renters across the
              country every day.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-card-foreground mb-4">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-card-foreground mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-card-foreground mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker size={18} className="shrink-0 mt-0.5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Level 4, House 1162, Road 10, Uttara-1208, Dhaka
                </span>
              </li>

              <li className="flex items-center gap-3">
                <HiOutlinePhone size={18} className="shrink-0 text-accent" />
                <a
                  href="tel:01739108253"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  01739108253
                </a>
              </li>

              <li className="flex items-center gap-3">
                <HiOutlineMail size={18} className="shrink-0 text-accent" />
                <a
                  href="mailto:admin@hub.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  admin@hub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EstateHub. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}