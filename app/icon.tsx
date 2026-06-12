import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          color: "#faf7ef",
          fontSize: 300,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 96,
        }}
      >
        h
      </div>
    ),
    { ...size },
  )
}
