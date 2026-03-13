import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Utensils, Globe, Database, CheckCircle, AlertTriangle, 
  ChefHat, Cpu, ShoppingBag,
  AlertCircle, Settings, 
  Wind, Plus, Layers, Star, ArrowRight, Sliders
} from 'lucide-react';

// --- 共通コンポーネント（Appの外側に定義することで、スクロール位置のリセットを防止） ---

// 1. 工程カード（Node）
const Node = ({ title, content, icon: Icon, type = 'normal', width = 'w-[380px]' }) => {
  const themes = {
    normal: "bg-white border-[#E5E1D8] text-[#4A443C] shadow-2xl",
    alert: "bg-[#FEFCE8] border-[#FACC15] text-[#5C4010] shadow-2xl ring-4 ring-[#FACC15]/30",
    error: "bg-[#D9534F] border-[#A94442] text-white shadow-2xl",
    header: "bg-[#423D37] border-[#2D2D2D] text-[#FAF9F6] shadow-xl",
    user: "bg-[#F5F1E9] border-[#D6C7B1] text-[#7A6B5D] shadow-xl"
  };

  return (
    <div className={`relative flex flex-col ${width} flex-shrink-0 rounded-[48px] border-[6px] transition-all hover:scale-105 ${themes[type]}`}>
      <div className={`px-8 py-6 text-[26px] font-black uppercase tracking-tight flex items-center gap-4 rounded-t-[42px] border-b-[6px] border-inherit ${
        type === 'header' || type === 'error' ? 'bg-black/10' : 'bg-[#FAF9F6]'
      }`}>
        {Icon && <Icon size={32} className={type === 'normal' || type === 'user' ? 'text-[#E67E22]' : ''} strokeWidth={3} />}
        <span className="flex-1 leading-none">{title}</span>
      </div>
      <div className="p-10 text-[22px] font-black leading-snug min-h-[160px] flex items-center justify-center text-center break-words">
        {content}
      </div>
    </div>
  );
};

// 2. お鍋アニメーション
const CookingPot = ({ status, cookingItems }) => (
  <div className="relative flex flex-col items-center flex-shrink-0 mb-6">
    <div className="relative w-48 h-36">
      {cookingItems.map(item => (
        <div 
          key={item.id}
          className={`absolute top-0 left-1/2 w-4 h-4 rounded-full animate-fall-into-pot shadow-sm ${status === 'alert' ? 'bg-[#FACC15]' : 'bg-[#E67E22]'}`}
          style={{ marginLeft: `${item.x}px` }}
        />
      ))}
      <div className="absolute bottom-0 w-full h-28 bg-[#F2F0EB] border-x-4 border-b-8 border-[#D6D1C7] rounded-b-[50px] shadow-inner flex items-center justify-center overflow-hidden">
        <div className={`absolute top-0 w-full h-4 animate-pulse ${status === 'alert' ? 'bg-yellow-500/20' : 'bg-orange-500/20'}`}></div>
        <Cpu className={status === 'alert' ? 'text-[#FACC15]' : 'text-[#8A9A5B]'} size={64} />
      </div>
      <div className="absolute top-10 w-full h-8 rounded-full border-4 bg-[#FAF9F6] border-[#D6D1C7] shadow-sm" />
    </div>
  </div>
);

// 3. 仕上げキラキラ
const FinishAnimation = () => (
  <div className="relative w-24 h-16 flex items-center justify-center mb-4">
    <div className="relative animate-bounce">
      <Utensils className="text-[#E67E22]" size={40} />
      <Star className="absolute -top-3 -right-3 text-[#FACC15] fill-[#FACC15] animate-ping" size={18} />
      <Star className="absolute -bottom-2 -left-3 text-[#E67E22] fill-[#E67E22] animate-pulse" size={16} />
    </div>
  </div>
);

// 4. 下準備（包丁）
const ChoppingAnimation = () => (
  <div className="relative w-32 h-24 mb-4 flex items-center justify-center flex-shrink-0">
    <div className="animate-chopping-knife origin-bottom-right">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5 2.5C20.433 2.5 22 4.067 22 6C22 7.933 20.433 9.5 18.5 9.5H7L3 13.5L2 12.5L6 8.5V6C6 4.067 7.567 2.5 9.5 2.5H18.5Z" fill="#D6D1C7" stroke="#423D37" strokeWidth="1.5"/>
        <rect x="2" y="16" width="20" height="4" rx="2" fill="#E5E1D8" stroke="#423D37" strokeWidth="1" />
      </svg>
    </div>
  </div>
);

// 5. 連続搬送ベルト本体
const ContinuousConveyor = ({ isIrregular = false, children }) => (
  <div className="relative flex items-center py-32">
    <div className={`absolute left-0 right-0 h-20 top-1/2 -translate-y-1/2 z-0 shadow-inner ${
      isIrregular ? 'bg-[#FEFCE8] border-y-4 border-[#FACC15]' : 'bg-[#F2F0EB] border-y-4 border-[#D6D1C7]'
    }`}>
      <div 
        className="absolute inset-0 opacity-25"
        style={{ 
          animation: `moveBeltLTR 2s linear infinite`,
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, #000 40px, #000 45px)`,
          backgroundSize: '90px 100%',
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ 
              animation: `flowFullLength 18s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              left: '-150px',
            }}
          >
            <div className={`w-16 h-4 rounded-full shadow-md ${isIrregular ? 'bg-[#FACC15]' : 'bg-[#8A9A5B]'}`} />
          </div>
        ))}
      </div>
    </div>
    
    <div className="relative z-10 flex items-center gap-16 pr-10">
      {children}
      <div className="w-[1500px] flex-shrink-0" aria-hidden="true"></div>
    </div>
  </div>
);

// --- フローティング・リモコン ---
const FloatingScrollController = ({ containerRef }) => {
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const percent = (el.scrollLeft / max) * 100;
      setScrollValue(percent || 0);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setScrollValue(val);
    const el = containerRef.current;
    if (el) {
      const max = el.scrollWidth - el.clientWidth;
      el.scrollLeft = (val / 100) * max;
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] bg-[#2D2D2D]/90 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border-4 border-[#E67E22] flex items-center gap-8">
      <div className="bg-[#E67E22] p-4 rounded-full text-white shadow-lg">
        <Sliders size={28} strokeWidth={3} />
      </div>
      <div className="flex flex-col gap-2 min-w-[300px]">
        <div className="flex justify-between items-center text-white font-black text-[15px] tracking-widest uppercase opacity-70">
           <span>Start</span>
           <span>Production Line Monitor</span>
           <span>Finish</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="0.1"
          value={scrollValue}
          onChange={handleChange}
          className="w-full h-8 bg-[#423D37] rounded-full appearance-none cursor-pointer accent-[#E67E22] outline-none"
        />
      </div>
    </div>
  );
};

// --- メインアプリ ---

const App = () => {
  const [activeTab, setActiveTab] = useState('restaurant');
  const [cookingItems, setCookingItems] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookingItems(prev => {
        const newItem = { id: Date.now(), x: Math.random() * 40 - 20 };
        return [...prev.slice(-10), newItem];
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-[#423D37] selection:bg-[#E67E22]/10 overflow-x-hidden">
      <header className="bg-[#2D2D2D] text-white shadow-2xl sticky top-0 z-50 border-b-[15px] border-[#E67E22]">
        <div className="max-w-[3200px] mx-auto px-16 py-12 flex flex-col xl:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-12 group cursor-default">
            <div className="bg-[#E67E22] p-10 rounded-[64px] shadow-2xl shadow-[#E67E22]/20 transition-all group-hover:scale-110">
              <ChefHat size={90} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[88px] font-black tracking-tighter leading-none">AI MECHANISM <span className="text-[#FACC15]">EXPLAINER</span></h1>
              <p className="text-[33px] text-slate-400 font-black uppercase tracking-[0.5em] mt-8 opacity-80">Visual Educational System</p>
            </div>
          </div>
          <nav className="flex bg-white/5 backdrop-blur-xl p-8 rounded-[100px] border border-white/10 shadow-inner">
            {[
              { id: 'restaurant', label: '① AIレストラン', icon: Utensils, activeColor: 'bg-[#E67E22]' },
              { id: 'basic', label: '② 通常ライン', icon: Settings, activeColor: 'bg-[#5D574E]' },
              { id: 'external', label: '③ 外部調達ライン', icon: Globe, activeColor: 'bg-[#8A9A5B]' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-10 px-18 py-12 rounded-[80px] text-[40px] font-black transition-all duration-500 ${
                  activeTab === tab.id 
                  ? `${tab.activeColor} text-white shadow-[0_40px_100px_rgba(0,0,0,0.5)] scale-105` 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={50} strokeWidth={4} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      <FloatingScrollController containerRef={scrollContainerRef} />

      <main>
        {activeTab === 'restaurant' && (
          <div ref={scrollContainerRef} className="w-full overflow-x-auto scrollbar-premium touch-pan-x bg-[#FAF9F6] pb-32 overscroll-none">
            <div className="p-20 inline-block min-w-max">
              <div className="flex flex-col gap-32">
                <h1 className="text-[106px] font-black text-[#423D37] flex items-center gap-10 tracking-tighter drop-shadow-lg leading-none">
                   <ChefHat className="text-[#E67E22]" size={110} strokeWidth={3} /> ＜AIレストラン＞
                </h1>
                
                <div className="flex flex-col gap-10">
                  <div className="ml-16 inline-block self-start bg-[#8A9A5B] text-white px-14 py-5 rounded-full font-black text-[53px] shadow-xl">通常搬送ライン</div>
                  <ContinuousConveyor>
                    <Node title="ユーザー" content="質問内容をオーダー" icon={User} type="user" width="w-[360px]" />
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <Node title="ウェイター" content="正常にオーダー" icon={Utensils} width="w-[360px]" />
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 flex-shrink-0">
                      <Node title="オーダー種類" content="外部データ（WEB）必要" width="w-[380px]" />
                      <Node title="オーダー種類" content="工場内材料のみで生成可" width="w-[380px]" />
                    </div>
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 flex-shrink-0">
                      <Node title="発注工場名" content="外部調達ライン" width="w-[380px]" />
                      <Node title="発注工場名" content="基本生成ライン" width="w-[380px]" />
                    </div>
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 items-center relative flex-shrink-0">
                      <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} width="w-[450px]" />
                      <div className="bg-[#E67E22]/20 text-[#E67E22] p-8 rounded-full border-4 border-[#E67E22]/30 z-20 shadow-xl my-2">
                        <Plus size={64} strokeWidth={8} />
                      </div>
                      <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-[22px] opacity-80 mt-2 block">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} width="w-[450px]" />
                    </div>
                  </ContinuousConveyor>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="ml-16 inline-block self-start bg-[#FACC15] text-[#5C4010] px-14 py-5 rounded-full font-black text-[53px] shadow-xl border-4 border-white animate-pulse">イレギュラーライン</div>
                  <ContinuousConveyor isIrregular>
                    <Node title="ユーザー" content="質問内容をオーダー" icon={User} type="user" width="w-[360px]" />
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="relative flex-shrink-0">
                      <Node title="ウェイター" content="ユーザーのオーダーが正しく伝わらない" icon={AlertTriangle} type="alert" width="w-[420px]" />
                      <div className="absolute -top-48 left-1/2 -translate-x-1/2 bg-[#FACC15] text-[#5C4010] px-12 py-6 rounded-full font-black text-[35px] shadow-[0_30px_60px_rgba(250,204,21,0.5)] animate-bounce flex items-center gap-6 border-[12px] border-white whitespace-nowrap z-50">
                        <AlertCircle size={64} strokeWidth={5} /> ここでズレが発生！
                      </div>
                    </div>
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 flex-shrink-0">
                      <Node title="オーダー種類" content="外部データ（WEB）必要" width="w-[380px]" />
                      <Node title="オーダー種類" content="工場内材料のみで生成可" width="w-[380px]" />
                    </div>
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 flex-shrink-0">
                      <Node title="発注工場名" content="外部調達ライン" width="w-[380px]" />
                      <Node title="発注工場名" content="基本生成ライン" width="w-[380px]" />
                    </div>
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 items-center relative flex-shrink-0">
                      <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} width="w-[450px]" />
                      <div className="bg-[#FACC15]/40 text-[#5C4010] p-8 rounded-full border-4 border-[#FACC15]/50 z-20 shadow-xl my-2">
                        <Plus size={64} strokeWidth={8} />
                      </div>
                      <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-[22px] opacity-80 mt-2 block">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} width="w-[450px]" />
                    </div>
                  </ContinuousConveyor>
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'basic' || activeTab === 'external') && (
          <div ref={scrollContainerRef} className="w-full overflow-x-auto scrollbar-premium touch-pan-x bg-[#FAF9F6] pb-32 overscroll-none">
            <div className="p-20 inline-block min-w-max">
              <h2 className="text-[106px] font-black text-[#423D37] flex items-center gap-10 mb-28 tracking-tighter drop-shadow-lg leading-none">
                <Settings className="text-[#8A9A5B] animate-spin-slow" size={110} /> ＜AI生産工場（{activeTab === 'basic' ? '通常ライン' : '外部調達ライン'}）＞
              </h2>
              <div className="flex flex-col gap-40">
                <div className="flex flex-col gap-10">
                  <div className="ml-16 inline-block self-start bg-[#8A9A5B] text-white px-14 py-5 rounded-full font-black text-[53px] shadow-xl">通常ライン</div>
                  <ContinuousConveyor>
                    <Node title="レストラン発注" content="発注書" type="header" width="w-[320px]" />
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 items-center flex-shrink-0">
                      <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-[20px] opacity-70 mt-2 block">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} width="w-[450px]" />
                      {activeTab === 'external' && (
                        <>
                          <div className="bg-[#8A9A5B]/20 text-[#8A9A5B] p-4 rounded-full border-4 border-[#8A9A5B]/30 z-20 shadow-sm"><Plus size={48} strokeWidth={8} /></div>
                          <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} width="w-[450px]" />
                        </>
                      )}
                    </div>
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col items-center flex-shrink-0">
                      <ChoppingAnimation />
                      <Node title="調理前下処理" content="材料カット・下洗い" icon={Wind} width="w-[380px]" />
                    </div>
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col items-center flex-shrink-0">
                      <CookingPot status="normal" cookingItems={cookingItems} />
                      <Node title="調理（生成）" content="大鍋に材料をいれて生成（大規模言語モデル）" width="w-[480px]" />
                    </div>
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <Node title="料理提供準備" content={<span>1皿ごとに作成<br/>（1トークンごとに生成）</span>} icon={Layers} width="w-[380px]" />
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col items-center flex-shrink-0">
                      <FinishAnimation />
                      <Node title="仕上げ（温度調整）" content={<div className="text-left text-[20px] font-black leading-relaxed">ユーザーの嗜好に合わせて仕上げ<br/>・基本 / 冷製 / 温製 / シェフ特製</div>} width="w-[420px]" />
                    </div>
                    <ArrowRight className="text-[#D6D1C7] flex-shrink-0" size={80} strokeWidth={4} />
                    <Node title="料理提供" content={<span>1皿ごとに提供<br/>（1トークンごとに生成）</span>} icon={ShoppingBag} width="w-[380px]" />
                    <div className="w-48 h-48 bg-[#F4F6F0] rounded-full flex items-center justify-center border-[20px] border-[#8A9A5B] shadow-2xl animate-bounce ml-24 flex-shrink-0">
                       <CheckCircle className="text-[#8A9A5B]" size={120} strokeWidth={3} />
                    </div>
                  </ContinuousConveyor>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="ml-16 inline-block self-start bg-[#FACC15] text-[#5C4010] px-14 py-5 rounded-full font-black text-[53px] shadow-xl border-6 border-white animate-pulse">イレギュラーライン</div>
                  <ContinuousConveyor isIrregular>
                    <Node title="レストラン発注" content="ズレた発注書" type="alert" width="w-[320px]" />
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col gap-10 relative items-center flex-shrink-0">
                       <div className="absolute -top-40 bg-[#FACC15] text-[#5C4010] text-[31px] font-black px-16 py-8 rounded-full shadow-[0_30px_60px_rgba(250,204,21,0.4)] border-[10px] border-white whitespace-nowrap z-50 animate-pulse">
                         材料不足 ＋ オーダーのズレ
                       </div>
                       <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-[20px] opacity-70 mt-2 block">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} type="alert" width="w-[450px]" />
                       {activeTab === 'external' && (
                         <>
                           <div className="bg-[#FACC15]/40 text-[#5C4010] p-8 rounded-full border-6 border-[#FACC15]/50 z-20 shadow-sm"><Plus size={56} strokeWidth={10} /></div>
                           <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} type="alert" width="w-[450px]" />
                         </>
                       )}
                    </div>
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col items-center flex-shrink-0">
                      <ChoppingAnimation />
                      <Node title="調理前下処理" content="材料カット・下洗い" width="w-[380px]" />
                    </div>
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col items-center flex-shrink-0">
                      <CookingPot status="alert" cookingItems={cookingItems} />
                      <Node title="調理（生成）" content="大鍋に材料をいれて生成（大規模言語モデル）" width="w-[480px]" />
                    </div>
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <Node title="料理提供準備" content={<span>1皿ごとに作成<br/>（1トークンごとに生成）</span>} width="w-[380px]" />
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <div className="flex flex-col items-center flex-shrink-0">
                      <FinishAnimation />
                      <Node title="仕上げ（温度調整）" content={<div className="text-left text-[20px] font-black leading-relaxed">ユーザーの嗜好に合わせて仕上げ<br/>・基本 / 冷製 / 温製 / シェフ特製</div>} width="w-[420px]" />
                    </div>
                    <ArrowRight className="text-[#FACC15]/40 flex-shrink-0" size={80} strokeWidth={4} />
                    <Node title="料理提供" content={<span>1皿ごとに提供<br/>（1トークンごとに生成）</span>} width="w-[380px]" />
                    <div className="relative group flex items-center min-w-max ml-32 flex-shrink-0">
                      <div className="absolute -top-60 left-1/2 -translate-x-1/2 bg-[#D9534F] text-white px-16 py-8 rounded-full font-black text-[46px] shadow-[0_40px_80px_rgba(217,83,79,0.7)] animate-bounce border-[15px] border-white z-50 whitespace-nowrap">
                        <AlertCircle size={80} strokeWidth={5} /> ハルシネーション発生！
                      </div>
                      <div className="absolute -inset-24 bg-[#D9534F] blur-[180px] opacity-40 animate-pulse rounded-full"></div>
                      <Node title="ハルシネーション発生" content="オーダーと違う！！（ユーザー要求とのズレ）" icon={AlertCircle} type="error" width="w-[650px]" />
                    </div>
                  </ContinuousConveyor>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes moveBeltLTR {
          from { background-position: -90px 0; }
          to { background-position: 0 0; }
        }
        @keyframes flowFullLength {
          0% { left: -300px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes chopping-knife {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(30px) rotate(-30deg); }
        }
        .animate-chopping-knife {
          animation: chopping-knife 0.4s ease-in-out infinite;
        }
        @keyframes fall-into-pot {
          0% { transform: translateY(-80px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(40px); opacity: 0; }
        }
        .animate-fall-into-pot {
          animation: fall-into-pot 1.2s ease-in infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        
        .scrollbar-premium::-webkit-scrollbar {
          height: 12px;
        }
        .scrollbar-premium::-webkit-scrollbar-track {
          background: #E5E1D8;
          border-radius: 6px;
        }
        .scrollbar-premium::-webkit-scrollbar-thumb {
          background: #BCB4A4;
          border-radius: 6px;
        }
        .scrollbar-premium {
          overscroll-behavior-x: none;
          scroll-snap-type: none;
          -webkit-overflow-scrolling: touch;
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          background: #E67E22;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default App;
