import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Senix — fullstack & flutter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#070809",
          color: "#e7ece9",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(95,255,176,0.18), transparent 40%), radial-gradient(circle at 20% 80%, rgba(122,215,255,0.12), transparent 40%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#5fffb0",
            fontFamily: "monospace",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#5fffb0" }} />
          ~/senix.dev
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "baseline",
          }}
        >
          senix<span style={{ color: "#5fffb0" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#8a8fa3",
            marginTop: 20,
            fontFamily: "monospace",
          }}
        >
          // fullstack · flutter · tashkent
        </div>
      </div>
    ),
    size,
  );
}
