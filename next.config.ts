import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages 프로젝트 사이트: https://z1nun.github.io/plan/
  basePath: "/plan",
  // trailingSlash: false → /taiwan 라우트가 out/taiwan.html로 export되어
  // 기존 공유 링크(/plan/taiwan.html)가 그대로 동작한다
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
