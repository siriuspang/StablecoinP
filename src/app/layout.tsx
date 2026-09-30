import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'StableIntel - 국내외 스테이블코인 뉴스 & 심층 논문 학습 플랫폼',
  description:
    '실시간 스테이블코인 페깅 모니터링, 가상자산 2단계 입법·글로벌 규제 속보, BIS·IMF·한국은행 심층 연구 논문 분석 및 AI 리서치 어시스턴트',
  keywords: [
    '스테이블코인',
    'Stablecoin',
    'USDT',
    'USDC',
    'USDe',
    '원화 스테이블코인',
    '가상자산이용자보호법',
    'MiCA',
    '디페깅',
    'BIS 논문',
    '한국은행 CBDC',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen selection:bg-blue-600 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
