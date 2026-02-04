
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, ChevronRight, MessageSquare, 
  BookOpen, Mic, Globe, Users, 
  Award, Search, CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  Layers,
  FileText
} from 'lucide-react';
import { 
  TIMELINE_DATA, 
  CATEGORIES, 
  WORKS_DATA, 
  FINDER_QUESTIONS, 
  FAQ_DATA 
} from './constants';
import { Category, TimelineItem, WorkItem, FinderResult } from './types';

// --- Sub Components ---

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-20 text-center animate-fade-in">
    <div className={`text-xs font-black tracking-[0.4em] uppercase mb-4 ${light ? 'text-indigo-400' : 'text-indigo-600'}`}>Portfolio & Insight</div>
    <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {subtitle && <p className={`text-lg md:text-xl max-w-2xl mx-auto font-medium ${light ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>}
    <div className={`w-12 h-1 mx-auto mt-10 rounded-full ${light ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'outline' | 'indigo' }) => {
  const styles = {
    default: 'bg-stone-100 text-stone-600',
    outline: 'border border-stone-200 text-stone-500',
    indigo: 'bg-indigo-50 text-indigo-700 font-bold'
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-xs transition-all tracking-wide ${styles[variant]}`}>
      {children}
    </span>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('전체');
  const [selectedWorkTab, setSelectedWorkTab] = useState<'오디오북' | '봉사' | '진행'>('진행');
  const [finderStep, setFinderStep] = useState(0);
  const [finderAnswers, setFinderAnswers] = useState<string[]>([]);
  const [finderResult, setFinderResult] = useState<FinderResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [modalItem, setModalItem] = useState<TimelineItem | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalItem || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalItem, isMenuOpen]);

  // Filtered Timeline
  const filteredTimeline = useMemo(() => {
    return activeCategory === '전체' 
      ? TIMELINE_DATA 
      : TIMELINE_DATA.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Fit Finder Logic
  const handleFinderSelect = (value: string) => {
    const newAnswers = [...finderAnswers, value];
    setFinderAnswers(newAnswers);
    if (finderStep < FINDER_QUESTIONS.length - 1) {
      setFinderStep(finderStep + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        calculateResult(newAnswers);
        setIsCalculating(false);
      }, 1500);
    }
  };

  const calculateResult = (answers: string[]) => {
    const [purpose, target, tone] = answers;
    let result: FinderResult = { title: "", reason: "", matchScore: 98 };

    if (purpose === 'education') {
      result.title = target === 'global' ? "다문화 및 외국인 대상 한국어·발음 전문 코칭" : "일본어 학습자 대상 비즈니스 일본어 집중 코칭";
      result.reason = "10년 이상의 교육 경력에서 얻은 교수법과 한국어교원 자격의 전문성이 만나 가장 효율적인 학습 경로를 제시합니다.";
    } else if (purpose === 'voice') {
      result.title = target === 'public' ? "작품의 결을 살리는 오디오북 낭독 및 제작" : "사회적 가치를 담은 신뢰 중심의 음성 콘텐츠 제작";
      result.reason = "정교한 발성 훈련과 실제 출간된 오디오북 제작 경험을 바탕으로, 단순한 소리 그 이상의 신뢰와 감동을 담아냅니다.";
    } else {
      result.title = "격조 있는 문화 예술 공연 및 정기음악회 진행";
      result.reason = "다수의 음악회 사회 경험과 따뜻한 음색을 통해 관객과 출연자가 하나 되는 품격 있는 시간을 완성합니다.";
    }
    setFinderResult(result);
  };

  const resetFinder = () => {
    setFinderStep(0);
    setFinderAnswers([]);
    setFinderResult(null);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors shadow-lg">
              <Mic className="text-white" size={20} />
            </div>
            <div className="text-xl font-black tracking-tight text-slate-800">
              언어와 <span className="text-indigo-600">소리의 울림</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-bold text-slate-500">
            {['about', 'strength', 'timeline', 'works', 'finder'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                onClick={(e) => handleNavClick(e, item)} 
                className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[11px]"
              >
                {item === 'about' ? 'Introduction' : item === 'strength' ? 'Core' : item === 'timeline' ? 'Archive' : item === 'works' ? 'Featured' : 'Matching'}
              </a>
            ))}
          </div>

          <button className="hidden md:flex items-center space-x-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-xs font-black hover:bg-indigo-600 transition-all shadow-xl active:scale-95 tracking-widest">
            <span>CONTACT</span>
            <ArrowRight size={14} />
          </button>

          <button className="md:hidden p-2 text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-10 md:hidden animate-fade-in">
          <div className="flex justify-between items-center mb-16">
            <div className="text-xl font-black tracking-tight text-slate-800">언어와 소리의 울림</div>
            <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col space-y-8 text-3xl font-black text-slate-800">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>소개</a>
            <a href="#strength" onClick={(e) => handleNavClick(e, 'strength')}>핵심 역량</a>
            <a href="#timeline" onClick={(e) => handleNavClick(e, 'timeline')}>활동 기록</a>
            <a href="#works" onClick={(e) => handleNavClick(e, 'works')}>포트폴리오</a>
            <a href="#finder" onClick={(e) => handleNavClick(e, 'finder')}>맞춤 제안</a>
          </div>
          <div className="mt-auto">
            <button className="w-full bg-indigo-600 text-white py-5 rounded-3xl text-xl font-black shadow-2xl">상담 문의하기</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="about" className="relative pt-60 pb-40 px-6 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-50/50 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-3 bg-indigo-50 text-indigo-700 px-6 py-2 rounded-full text-xs font-black mb-12 animate-fade-in tracking-widest uppercase">
            <Sparkles size={14} />
            <span>Voice Artist & Educator</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1] mb-12 animate-fade-in tracking-tighter">
            마음을 움직이는 언어, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-400">결이 깊은 소리의 기록</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-20 leading-relaxed font-medium animate-fade-in" style={{animationDelay: '0.2s'}}>
            교육자로 보낸 10년의 온기와 울림을 담았습니다.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
            {['교육 전문가', '낭독 전문가', '보이스 아티스트', '다문화 코칭'].map(tag => (
              <div key={tag} className="bg-stone-50 border border-stone-200 px-10 py-4 rounded-3xl text-sm font-black text-slate-700 shadow-sm hover:border-indigo-300 hover:shadow-xl transition-all cursor-default">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strength Section */}
      <section id="strength" className="py-40 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Core Expertise" subtitle="경험이 빚어낸 독보적인 전문성" light />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: BookOpen, title: "교육 디자인", color: "text-blue-400", desc: "10년 이상 수학 강사 경력으로 검증된 명확한 지식 전달과 논리적 설명력" },
              { icon: Globe, title: "다문화 역량", color: "text-emerald-400", desc: "도쿄 거주 경험과 JLPT N1, 한국어교원 자격이 결합된 고도의 언어 소통력" },
              { icon: Mic, title: "낭독의 미학", color: "text-rose-400", desc: "정석 발성 교육과 실제 오디오북 제작 경험이 전하는 깊이 있는 신뢰감" },
              { icon: Users, title: "공간의 진행", color: "text-amber-400", desc: "음악회 사회 등 품격 있는 무대 진행으로 행사 전체의 정서적 가치 완성" }
            ].map((strength, i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 p-12 rounded-[3rem] hover:bg-slate-800 transition-all group">
                <div className={`mb-10 group-hover:scale-110 transition-transform ${strength.color}`}>
                  <strength.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{strength.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{strength.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section - Typography Focus Layout */}
      <section id="works" className="py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Selected Works" subtitle="이미지를 넘어 목소리와 진정성으로 채운 기록들" />
          
          <div className="flex justify-center mb-24">
            <div className="flex p-2 bg-stone-50 rounded-[2rem] border border-stone-200">
              {(['진행', '오디오북', '봉사'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedWorkTab(tab)}
                  className={`px-12 py-4 rounded-[1.5rem] text-xs font-black transition-all tracking-widest ${
                    selectedWorkTab === tab ? 'bg-white text-indigo-600 shadow-xl border border-indigo-100' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {WORKS_DATA.filter(work => work.type === selectedWorkTab).map((work, idx) => (
              <div 
                key={work.id} 
                className="group relative bg-stone-50 rounded-[4rem] p-12 md:p-20 overflow-hidden border border-stone-100 hover:border-indigo-200 transition-all hover:shadow-2xl flex flex-col md:flex-row items-center gap-16"
              >
                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-100/50 transition-all"></div>
                
                <div className="flex-shrink-0 w-32 h-32 rounded-[2.5rem] bg-white border border-stone-200 flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {work.type === '오디오북' ? <FileText size={48} strokeWidth={1.5} /> : work.type === '진행' ? <Layers size={48} strokeWidth={1.5} /> : <HeartIcon size={48} />}
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <Badge variant="indigo">{work.subtitle}</Badge>
                    <span className="text-slate-400 font-mono text-xs tracking-widest">{work.date}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-3xl">
                    {work.desc}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button className="w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:translate-x-4">
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-40 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader title="Expertise Archive" subtitle="차곡차곡 쌓아온 신뢰의 기록입니다." />
          
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[11px] font-black tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200' 
                    : 'bg-white text-slate-400 border border-stone-200 hover:text-slate-600'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredTimeline.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setModalItem(item)}
                className="group flex flex-col md:flex-row items-center bg-white border border-stone-200 p-10 rounded-[3rem] hover:border-indigo-400 hover:shadow-2xl transition-all cursor-pointer animate-fade-in"
              >
                <div className="md:w-56 mb-6 md:mb-0 shrink-0">
                  <span className="text-indigo-600 font-black text-sm tracking-tighter">{item.year}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="indigo">{item.category}</Badge>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-8 md:mt-0 md:ml-12">
                  <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Info size={24} strokeWidth={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fit Finder Section */}
      <section id="finder" className="py-40 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-950 p-16 md:p-28 rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_#4f46e5_0%,_transparent_50%)]"></div>
            </div>
            
            {!finderResult ? (
              <div className="relative z-10">
                {isCalculating ? (
                  <div className="py-24 text-center flex flex-col items-center">
                    <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-10"></div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">당신에게 필요한 최적의 결을 찾는 중</h3>
                    <p className="text-slate-500 font-medium">10년의 경력과 소리의 전문성을 조합하고 있습니다.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-20">
                      <div className="text-indigo-500 font-black text-xs uppercase tracking-[0.5em] mb-6">Expert Matching</div>
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">함께 만들어갈 가치를 선택해주세요</h2>
                      <div className="flex items-center space-x-3 mt-10">
                        {[0, 1, 2].map(i => (
                          <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${i <= finderStep ? 'w-16 bg-indigo-500' : 'w-8 bg-slate-800'}`}></div>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-12 tracking-tight">{FINDER_QUESTIONS[finderStep].question}</h3>
                    <div className="grid grid-cols-1 gap-5">
                      {FINDER_QUESTIONS[finderStep].options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => handleFinderSelect(opt.value)}
                          className="flex items-center justify-between p-10 rounded-[2.5rem] bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 hover:border-indigo-500 transition-all text-left active:scale-[0.98] group"
                        >
                          <span className="text-xl font-bold group-hover:translate-x-2 transition-transform">{opt.label}</span>
                          <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                            <ChevronRight size={24} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="relative z-10 text-center animate-fade-in">
                <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-indigo-600/40">
                  <CheckCircle2 size={48} className="text-white" />
                </div>
                <div className="text-indigo-400 font-black tracking-widest text-sm mb-6 uppercase">Matched Strategy: {finderResult.matchScore}%</div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight max-w-3xl mx-auto">
                  {finderResult.title}
                </h2>
                <div className="bg-slate-900 border border-slate-800 p-12 rounded-[3.5rem] text-slate-300 text-lg md:text-xl font-medium leading-relaxed mb-16 max-w-3xl mx-auto">
                  "{finderResult.reason}"
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="bg-white text-slate-950 px-16 py-6 rounded-3xl font-black text-lg hover:bg-indigo-50 transition-all shadow-2xl active:scale-95 tracking-tight">
                    협업 및 상담 제안하기
                  </button>
                  <button 
                    onClick={resetFinder}
                    className="text-slate-500 font-black px-12 py-6 border border-slate-800 rounded-3xl hover:bg-slate-900 transition-all active:scale-95 text-sm tracking-widest uppercase"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title="F.A.Q" subtitle="더 자세한 이야기가 궁금하신가요?" />
          <div className="space-y-6">
            {FAQ_DATA.map((faq, i) => (
              <details key={i} className="group border border-stone-200 bg-white rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl">
                <summary className="flex items-center justify-between p-10 cursor-pointer font-black text-slate-900 text-xl md:text-2xl tracking-tight">
                  {faq.q}
                  <div className="bg-stone-50 p-3 rounded-full group-open:bg-indigo-600 group-open:text-white transition-all">
                    <ChevronRight size={28} className="group-open:rotate-90 transition-transform" />
                  </div>
                </summary>
                <div className="p-10 pt-0 text-slate-500 leading-relaxed font-medium text-lg border-t border-stone-50">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-32 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
            <div>
              <div className="flex items-center space-x-3 text-white text-3xl font-black mb-10 tracking-tighter">
                <Mic className="text-indigo-500" size={32} />
                <span>언어와 소리의 울림</span>
              </div>
              <p className="max-w-md text-slate-500 text-lg leading-relaxed font-medium mb-12">
                교육의 명료함과 소리의 따뜻함을 통해 <br />
                사람과 사람 사이의 신뢰를 잇는 기록입니다. <br />
                모든 프로젝트에 정성과 진심을 담습니다.
              </p>
            </div>
            <div className="flex flex-col md:items-end justify-between">
              <div className="text-left md:text-right">
                <h4 className="text-white text-xs font-black mb-8 uppercase tracking-[0.4em]">Inquiry & Partnership</h4>
                <p className="text-slate-500 text-lg mb-12 font-medium">
                  새로운 협업 제안이나 상세한 문의는 <br />
                  언제든 열려있습니다.
                </p>
                <button className="bg-indigo-600 text-white px-16 py-6 rounded-[2rem] font-black text-lg hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 tracking-tight">
                  상담 신청하기
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] uppercase tracking-[0.6em] text-slate-700 font-black">© 2025 LANGUAGE & VOICE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* Modal - Timeline Detail */}
      {modalItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setModalItem(null)} // 배경 클릭 시 닫기
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 버블링 방지
          >
            <div className="p-10 md:p-16 overflow-y-auto">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <Badge variant="indigo">{modalItem.category}</Badge>
                  <h3 className="text-4xl font-black text-slate-900 mt-6 tracking-tighter leading-tight">{modalItem.title}</h3>
                  <div className="text-indigo-600 font-black mt-3 tracking-widest text-xs uppercase">{modalItem.year}</div>
                </div>
                <button 
                  onClick={() => setModalItem(null)} 
                  className="p-5 hover:bg-stone-100 rounded-full transition-all border border-stone-100 shrink-0"
                >
                  <X size={28} />
                </button>
              </div>
              <div className="space-y-12">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-8">Key Achievements</h4>
                  <ul className="space-y-5">
                    {modalItem.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start bg-stone-50 p-6 rounded-3xl border border-stone-100 group">
                        <CheckCircle2 size={24} className="text-indigo-600 mr-5 mt-1 shrink-0" />
                        <span className="text-slate-800 text-lg leading-relaxed font-bold">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-indigo-50/50 p-10 rounded-[3rem] text-indigo-800 italic font-black text-xl border border-indigo-100 leading-relaxed text-center">
                  "{modalItem.description}"
                </div>
              </div>
              <button 
                onClick={() => setModalItem(null)}
                className="w-full mt-16 bg-slate-950 text-white py-6 rounded-3xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl tracking-tight"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HeartIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default App;
