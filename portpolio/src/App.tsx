import './App.css'

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui' }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>김경숙 포트폴리오</h1>
        <p style={{ marginTop: 8, color: '#555' }}>
          한국어 강사 · 일본어(JLPT N1) · 오디오북 낭독
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
          <a href="https://github.com/ilsanintel0602-collab/mime.github.io" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#" target="_blank" rel="noreferrer">이력서(링크)</a>
          <a href="#" target="_blank" rel="noreferrer">연락처(메일)</a>
        </div>
      </header>

      <section style={{ marginBottom: 24 }}>
        <h2>소개</h2>
        <p style={{ lineHeight: 1.7 }}>
          안녕하세요. 교육과 언어, 콘텐츠 제작 경험을 바탕으로 사람들에게 도움이 되는 서비스를 만들고 싶습니다.
          강의·학습 콘텐츠·오디오북 낭독 등 다양한 형태로 전달해온 경험이 있습니다.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>프로젝트</h2>
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <h3 style={{ marginTop: 0 }}>포트폴리오 웹</h3>
          <p style={{ margin: '8px 0', color: '#555' }}>
            React + TypeScript + Vite로 만든 개인 포트폴리오 사이트
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://ilsanintel0602-collab.github.io/mime.github.io/" target="_blank" rel="noreferrer">Live Demo</a>
            <a href="https://github.com/ilsanintel0602-collab/mime.github.io" target="_blank" rel="noreferrer">Repo</a>
          </div>
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>다음 프로젝트(예정)</h3>
          <p style={{ margin: '8px 0', color: '#555' }}>
            4W 기반 기획 도우미 / 학습·회고 도우미 등 아이디어를 앱으로 구현 중
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>경력/역량</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>강의/교육: 한국어 강사, 중학 수학 강사 경험</li>
          <li>언어: JLPT N1</li>
          <li>콘텐츠: 오디오북 낭독/녹음 경험</li>
        </ul>
      </section>

      <footer style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #eee', color: '#777' }}>
        © {new Date().getFullYear()} 김경숙
      </footer>
    </div>
  )
}
