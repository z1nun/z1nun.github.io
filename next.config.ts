import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages 유저 사이트(root 도메인): https://z1nun.github.io/
  // → /taiwan, /admin 등 루트 엔드포인트로 서비스
  basePath: "",
  // trailingSlash: false → /taiwan 라우트가 out/taiwan.html로 export되어
  // GitHub Pages의 확장자 생략 URL(/taiwan)로 접근 가능
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
