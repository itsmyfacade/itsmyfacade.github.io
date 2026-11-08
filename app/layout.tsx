import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oneidy Constanza-Garcia | AI Application & Automation Engineer",
  description: "Engineering intelligent applications and reliable systems with Python, APIs, SQL, automation, and applied AI.",
  icons: { icon: "/icon.svg" },
  openGraph: { title: "Oneidy Constanza-Garcia | AI Application & Automation Engineer", description: "Software engineering, AI applications, integrations, and automation." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
