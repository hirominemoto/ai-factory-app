import React, { useState } from 'react';
import { 
  User, Utensils, Globe, Database, CheckCircle, AlertTriangle, 
  ChefHat, Cpu, ShoppingBag, MessageSquare, 
  Zap, RotateCw, Search, AlertCircle, Settings, 
  Wind, Plus, Layers, Star
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('restaurant');

  // --- Components ---

  // 工程全体を貫通する連続したコンベア搬送ライン
  const ContinuousConveyor = ({ isIrregular = false, children }) => (
    <div className="relative w-full overflow-visible py-40 px-10">
      {/* 連続した一本のベルト土台 */}
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
        
        {/* 流れていく搬送用プレート */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ 
                animation: `flowFullLength 12s linear infinite`,
                animationDelay: `${i * 1.5}s`,
                left: '-150px',
              }}
            >
              <div className={`w-18 h-4 rounded-full shadow-md ${isIrregular ? 'bg-[#FACC15]' : 'bg-[#8A9A5B]'}`} />
            </div>
          ))}
        </div>
      </div>
      
      {/* 上に乗る工程ノード */}
      <div className="relative z-10 flex items-center justify-between gap-16 w-full">
        {children}
      </div>
    </div>
  );

  const Node = ({ title, content, icon: Icon, type = 'normal', width = 'w-80' }) => {
    const themes = {
      normal: "bg-white border-[#E5E1D8] text-[#4A443C] shadow-2xl",
      alert: "bg-[#FEFCE8] border-[#FACC15] text-[#5C4010] shadow-2xl ring-4 ring-[#FACC15]/30",
      error: "bg-[#D9534F] border-[#A94442] text-white shadow-2xl",
      header: "bg-[#423D37] border-[#2D2D2D] text-[#FAF9F6] shadow-xl",
      user: "bg-[#F5F1E9] border-[#D6C7B1] text-[#7A6B5D] shadow-xl"
    };

    return (
      <div className={`relative flex flex-col ${width} rounded-[56px] border-[6px] transition-all hover:scale-105 ${themes[type]}`}>
        <div className={`px-10 py-8 text-[34px] font-black uppercase tracking-tight flex items-center gap-5 rounded-t-[50px] border-b-[6px] border-inherit ${
          type === 'header' || type === 'error' ? 'bg-black/10' : 'bg-[#FAF9F6]'
        }`}>
          {Icon && <Icon size={44} className={type === 'normal' || type === 'user' ? 'text-[#E67E22]' : ''} strokeWidth={3} />}
          <span className="flex-1 leading-none">{title}</span>
        </div>
        <div className="p-12 text-[26px] font-black leading-tight min-h-[180px] flex items-center justify-center text-center break-words">
          {content}
        </div>
      </div>
    );
  };

  const CookingPot = ({ status }) => (
    <div className="relative flex flex-col items-center">
      <div className="relative w-56 h-40">
         <div className="absolute bottom-0 w-full h-32 bg-[#F2F0EB] border-x-4 border-b-8 border-[#D6D1C7] rounded-b-[70px] shadow-inner flex items-center justify-center overflow-hidden">
          <Cpu className={status === 'alert' ? 'text-[#F5A623]' : 'text-[#8A9A5B]'} size={80} />
        </div>
        <div className="absolute top-12 w-full h-10 rounded-full border-4 bg-[#FAF9F6] border-[#D6D1C7]" />
      </div>
    </div>
  );

  const ChoppingAnimation = () => (
    <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
      <div className="animate-chopping-knife origin-bottom-right">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 2.5C20.433 2.5 22 4.067 22 6C22 7.933 20.433 9.5 18.5 9.5H7L3 13.5L2 12.5L6 8.5V6C6 4.067 7.567 2.5 9.5 2.5H18.5Z" fill="#D6D1C7" stroke="#423D37" strokeWidth="1.5"/>
          <rect x="2" y="16" width="20" height="4" rx="2" fill="#E5E1D8" stroke="#423D37" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );

  const RestaurantView = () => (
    <div className="p-16 max-w-[3200px] mx-auto overflow-x-auto pr-[600px]">
      <div className="flex flex-col gap-48">
        <h1 className="text-[130px] font-black text-[#423D37] flex items-center gap-12 tracking-tighter drop-shadow-lg leading-none">
           <ChefHat className="text-[#E67E22]" size={150} strokeWidth={3} /> ＜AIレストラン＞
        </h1>

        {/* 通常搬送ライン */}
        <div className="flex flex-col gap-10">
          <div className="ml-12 inline-block self-start bg-[#8A9A5B] text-white px-14 py-5 rounded-full font-black text-5xl shadow-2xl">
            通常搬送ライン
          </div>
          <ContinuousConveyor>
            <Node title="ユーザー" content="質問内容をオーダー" icon={User} type="user" width="w-[450px]" />
            <Node title="ウェイター" content="正常にオーダー" icon={Utensils} width="w-[450px]" />
            <div className="flex flex-col gap-10 scale-95">
              <Node title="オーダー種類" content="外部データ（WEB）必要" width="w-[480px]" />
              <Node title="オーダー種類" content="工場内材料のみで生成可" width="w-[480px]" />
            </div>
            <div className="flex flex-col gap-10 scale-95">
              <Node title="発注工場名" content="外部調達ライン" width="w-[480px]" />
              <Node title="発注工場名" content="基本生成ライン" width="w-[480px]" />
            </div>
            <div className="flex flex-col gap-12 items-center relative">
              <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} width="w-[520px]" />
              <div className="bg-[#E67E22]/20 text-[#E67E22] p-8 rounded-full border-4 border-[#E67E22]/30 z-20 shadow-xl my-4">
                <Plus size={60} strokeWidth={8} />
              </div>
              <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-xl">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} width="w-[520px]" />
            </div>
          </ContinuousConveyor>
        </div>

        {/* イレギュラーライン */}
        <div className="flex flex-col gap-10">
          <div className="ml-12 inline-block self-start bg-[#FACC15] text-[#5C4010] px-14 py-5 rounded-full font-black text-5xl shadow-2xl border-4 border-white animate-pulse">
            イレギュラーライン
          </div>
          <ContinuousConveyor isIrregular>
            <Node title="ユーザー" content="質問内容をオーダー" icon={User} type="user" width="w-[450px]" />
            <div className="relative">
              <Node title="ウェイター" content="ユーザーのオーダーが正しく伝わらない" icon={AlertTriangle} type="alert" width="w-[520px]" />
              {/* 修正：アラートを完全に左側のウェイター真上に固定 */}
              <div className="absolute -top-48 left-0 right-0 mx-auto w-max bg-[#FACC15] text-[#5C4010] px-12 py-6 rounded-full font-black text-[38px] shadow-[0_30px_60px_rgba(250,204,21,0.5)] animate-bounce flex items-center gap-8 border-[10px] border-white z-50">
                <AlertCircle size={60} strokeWidth={4} /> ここでズレが発生！
              </div>
            </div>
            <div className="flex flex-col gap-10 scale-95">
              <Node title="オーダー種類" content="外部データ（WEB）必要" width="w-[480px]" />
              <Node title="オーダー種類" content="工場内材料のみで生成可" width="w-[480px]" />
            </div>
            <div className="flex flex-col gap-10 scale-95">
              <Node title="発注工場名" content="外部調達ライン" width="w-[480px]" />
              <Node title="発注工場名" content="基本生成ライン" width="w-[480px]" />
            </div>
            <div className="flex flex-col gap-12 items-center relative">
              <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} width="w-[520px]" />
              <div className="bg-[#FACC15]/40 text-[#5C4010] p-8 rounded-full border-4 border-[#FACC15]/50 z-20 shadow-xl my-4">
                <Plus size={60} strokeWidth={8} />
              </div>
              <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-xl">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} width="w-[520px]" />
            </div>
          </ContinuousConveyor>
        </div>
      </div>
    </div>
  );

  const FactoryLineView = ({ lineName, hasWeb = false }) => (
    <div className="p-16 max-w-full mx-auto overflow-x-auto pr-[800px]">
      <h2 className="text-[110px] font-black text-[#423D37] flex items-center gap-12 mb-32 tracking-tighter drop-shadow-lg leading-none">
        <Settings className="text-[#8A9A5B] animate-spin-slow" size={130} /> ＜AI生産工場（{lineName}）＞
      </h2>
      
      <div className="flex flex-col gap-60">
        {/* 通常ライン */}
        <div className="flex flex-col gap-10">
          <div className="ml-12 inline-block self-start bg-[#8A9A5B] text-white px-14 py-5 rounded-full font-black text-5xl shadow-xl">
            通常ライン
          </div>
          <ContinuousConveyor>
            <Node title="レストラン発注" content="発注書" type="header" width="w-72" />
            <div className="flex flex-col gap-10 items-center">
              <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-sm">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} width="w-[480px]" />
              {hasWeb && (
                <>
                  <div className="bg-[#8A9A5B]/20 text-[#8A9A5B] p-6 rounded-full border-4 border-[#8A9A5B]/30 z-20 shadow-sm"><Plus size={44} strokeWidth={8} /></div>
                  <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} width="w-[480px]" />
                </>
              )}
            </div>
            <div className="flex flex-col items-center">
              <ChoppingAnimation />
              <Node title="調理前下処理" content="材料カット・下洗い" icon={Wind} width="w-[420px]" />
            </div>
            <div className="flex flex-col items-center">
              <CookingPot status="normal" />
              <Node title="調理（生成）" content="大鍋に材料をいれて生成（大規模言語モデル）" width="w-[520px]" />
            </div>
            <Node title="料理提供準備" content={<span>1皿ごとに作成<br/>（1トークンごとに生成）</span>} icon={Layers} width="w-[420px]" />
            <Node title="仕上げ（温度調整）" content={<div className="text-left text-lg font-black">ユーザーの嗜好に合わせて仕上げ<br/>・基本/冷製/温製/シェフ特製</div>} width="w-[450px]" />
            <Node title="料理提供" content={<span>1皿ごとに提供<br/>（1トークンごとに生成）</span>} icon={ShoppingBag} width="w-[420px]" />
            <div className="w-40 h-40 bg-[#F4F6F0] rounded-full flex items-center justify-center border-[16px] border-[#8A9A5B] shadow-2xl animate-bounce ml-20">
               <CheckCircle className="text-[#8A9A5B]" size={100} strokeWidth={3} />
            </div>
          </ContinuousConveyor>
        </div>

        {/* イレギュラーライン */}
        <div className="flex flex-col gap-10">
          <div className="ml-12 inline-block self-start bg-[#FACC15] text-[#5C4010] px-14 py-5 rounded-full font-black text-5xl shadow-xl border-4 border-white animate-pulse">
            イレギュラーライン
          </div>
          <ContinuousConveyor isIrregular>
            <Node title="レストラン発注" content="ズレた発注書" type="alert" width="w-72" />
            <div className="flex flex-col gap-10 relative items-center">
               <div className="absolute -top-40 bg-[#FACC15] text-[#5C4010] text-[28px] font-black px-14 py-7 rounded-full shadow-[0_25px_50px_rgba(250,204,21,0.4)] border-[8px] border-white whitespace-nowrap z-50 animate-pulse">
                 材料不足 ＋ オーダーのズレ
               </div>
               <Node title="材料調達方法" content={<span>AI材料倉庫<br/><span className="text-sm">学習データ/文脈/ログ/メモリ</span></span>} icon={Database} type="alert" width="w-[480px]" />
               {hasWeb && (
                 <>
                   <div className="bg-[#FACC15]/40 text-[#5C4010] p-6 rounded-full border-4 border-[#FACC15]/50 z-20 shadow-sm"><Plus size={44} strokeWidth={8} /></div>
                   <Node title="材料調達方法" content="外部市場（WEB）仕入れ" icon={Globe} type="alert" width="w-[480px]" />
                 </>
               )}
            </div>
            <div className="flex flex-col items-center">
              <ChoppingAnimation />
              <Node title="調理前下処理" content="材料カット・下洗い" width="w-[420px]" />
            </div>
            <div className="flex flex-col items-center">
              <CookingPot status="alert" />
              <Node title="調理（生成）" content="大鍋に材料をいれて生成（大規模言語モデル）" width="w-[520px]" />
            </div>
            <Node title="料理提供準備" content={<span>1皿ごとに作成<br/>（1トークンごとに生成）</span>} width="w-[420px]" />
            <Node title="仕上げ（温度調整）" content={<div className="text-left text-lg font-black">ユーザーの嗜好に合わせて仕上げ<br/>・基本/冷製/温製/シェフ特製</div>} width="w-[450px]" />
            <Node title="料理提供" content={<span>1皿ごとに提供<br/>（1トークンごとに生成）</span>} width="w-[420px]" />
            
            <div className="relative group flex items-center min-w-max">
              <div className="absolute -top-48 left-1/2 -translate-x-1/2 bg-[#D9534F] text-white px-16 py-8 rounded-full font-black text-[42px] shadow-[0_30px_70px_rgba(217,83,79,0.7)] animate-bounce border-[12px] border-white z-50 whitespace-nowrap">
                <AlertCircle size={64} strokeWidth={4} /> ハルシネーション発生！
              </div>
              <div className="absolute -inset-20 bg-[#D9534F] blur-[150px] opacity-40 animate-pulse rounded-full"></div>
              <Node title="ハルシネーション発生" content="オーダーと違う！！（ユーザー要求とのズレ）" icon={AlertCircle} type="error" width="w-[620px]" />
            </div>
          </ContinuousConveyor>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-[#423D37] pb-64 selection:bg-[#E67E22]/10 overflow-x-hidden">
      <header className="bg-[#2D2D2D] text-white shadow-2xl sticky top-0 z-50 border-b-[15px] border-[#E67E22]">
        <div className="max-w-[3000px] mx-auto px-16 py-14 flex flex-col xl:flex-row justify-between items-center gap-14">
          <div className="flex items-center gap-14 group cursor-default">
            <div className="bg-[#E67E22] p-12 rounded-[72px] shadow-2xl shadow-[#E67E22]/20 transition-all group-hover:scale-110">
              <ChefHat size={100} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[90px] font-black tracking-tighter leading-none">AI MECHANISM <span className="text-[#FACC15]">EXPLAINER</span></h1>
              <p className="text-3xl text-slate-400 font-black uppercase tracking-[0.5em] mt-8 opacity-80">Visual Educational System</p>
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
                className={`flex items-center gap-12 px-24 py-14 rounded-[90px] text-5xl font-black transition-all duration-500 ${
                  activeTab === tab.id 
                  ? `${tab.activeColor} text-white shadow-[0_40px_100px_rgba(0,0,0,0.6)] scale-105` 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={64} strokeWidth={4} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      <main className="animate-in fade-in zoom-in-95 duration-1000">
        {activeTab === 'restaurant' && <RestaurantView />}
        {activeTab === 'basic' && <FactoryLineView lineName="通常ライン" hasWeb={false} />}
        {activeTab === 'external' && <FactoryLineView lineName="外部調達ライン" hasWeb={true} />}
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
          50% { transform: translateY(60px) rotate(-35deg); }
        }
        .animate-chopping-knife {
          animation: chopping-knife 0.4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;