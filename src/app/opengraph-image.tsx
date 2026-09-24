import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { khatamPath } from "@/lib/geometry";

export const alt = "Ruhi IT Hub: apps that stay quiet while you pray, listen and remember.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fonts: Gloock and Manrope (SIL Open Font License), bundled in /assets/fonts for image generation.
const gloock = readFile(join(process.cwd(), "assets/fonts/Gloock.ttf"));
const manrope = readFile(join(process.cwd(), "assets/fonts/Manrope.ttf"));
const icon = (name: string) =>
  readFile(join(process.cwd(), `public/apps/${name}/icon.png`), "base64").then((d) => `data:image/png;base64,${d}`);

export default async function Image() {
  const [display, text, qalbify, ayyami] = await Promise.all([gloock, manrope, icon("qalbify"), icon("ayyami")]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f7f3ea",
        padding: 72,
        position: "relative",
      }}
    >
      <svg
        width="520"
        height="520"
        viewBox="0 0 32 32"
        style={{ position: "absolute", right: -80, top: 55, opacity: 0.18 }}
      >
        <path d={khatamPath(16, 16, 15)} fill="none" stroke="#7f6630" strokeWidth="0.25" />
        <path d={khatamPath(16, 16, 11, Math.PI / 8)} fill="none" stroke="#7f6630" strokeWidth="0.25" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 32 32">
            <path d={khatamPath(16, 16, 14.5)} fill="none" stroke="#1e1a11" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="16" cy="16" r="3.2" fill="#7f6630" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "Gloock", fontSize: 40, color: "#1e1a11" }}>Ruhi</span>
            <span style={{ fontFamily: "Manrope", fontSize: 20, letterSpacing: 3, color: "#5f574a" }}>IT HUB</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Gloock",
            fontSize: 84,
            lineHeight: 1.04,
            color: "#1e1a11",
          }}
        >
          <span>Apps that stay quiet</span>
          <span>while you pray, listen</span>
          <span>and remember.</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "Manrope",
            fontSize: 24,
            color: "#5f574a",
          }}
        >
          <img src={qalbify} alt="" width={52} height={52} style={{ borderRadius: 14 }} />
          <img src={ayyami} alt="" width={52} height={52} style={{ borderRadius: 14 }} />
          <span>Qalbify and Ayyami, live on Google Play. Built in Lahore.</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Gloock", data: display, style: "normal", weight: 400 },
        { name: "Manrope", data: text, style: "normal", weight: 600 },
      ],
    },
  );
}
