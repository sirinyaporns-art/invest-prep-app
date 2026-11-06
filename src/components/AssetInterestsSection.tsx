import React, { useState } from 'react';
import { AssetClassItem } from '../types/investor';
import { Check, Star, Info, ArrowRight, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';

interface AssetInterestsSectionProps {
  assets: AssetClassItem[];
  onToggleInterest: (id: string, level: AssetClassItem['interestLevel']) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const AssetInterestsSection: React.FC<AssetInterestsSectionProps> = ({
  assets,
  onToggleInterest,
  onNavigateToTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeInfoAssetId, setActiveInfoAssetId] = useState<string | null>(null);

  const filteredAssets = assets.filter((asset) => {
    if (selectedCategory === 'all') return true;
    return asset.category === selectedCategory;
  });

  const interestedCount = assets.filter((a) => a.interestLevel === 'high' || a.interestLevel === 'medium').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Clean Minimalist Header */}
      <div className="space-y-2 border-b border-stone-200/80 dark:border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 05</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-[11px] text-amber-800 dark:text-amber-300 tracking-wider">สินทรัพย์ลงทุน</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>คลังสินทรัพย์การลงทุน</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          สำรวจสินทรัพย์ลงทุนที่คุณสนใจ
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          ในตลาดการเงินมีสินทรัพย์หลากหลายประเภทที่มีระดับความเสี่ยง ผลตอบแทน และความยากง่ายต่างกัน เลือกระดับความสนใจของคุณในแต่ละสินทรัพย์ เพื่อให้ระบบจัดสรรพอร์ตโฟลิโอเริ่มต้นที่ตรงใจและเหมาะสมกับคุณที่สุด
        </p>
      </div>

      {/* Summary Box & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-white">
            สินทรัพย์ที่คุณสนใจ: {interestedCount} จาก {assets.length} ประเภท
          </span>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setSelectedCategory('fund')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'fund'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            กองทุนรวม & ETF
          </button>
          <button
            onClick={() => setSelectedCategory('equity')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'equity'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            หุ้นรายตัว
          </button>
          <button
            onClick={() => setSelectedCategory('fixed_income')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'fixed_income'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ตราสารหนี้
          </button>
          <button
            onClick={() => setSelectedCategory('alternative')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'alternative'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ทางเลือก / ทอง / คริปโท
          </button>
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssets.map((asset) => {
          const isHigh = asset.interestLevel === 'high';
          const isMedium = asset.interestLevel === 'medium';
          const isNone = asset.interestLevel === 'none';

          return (
            <div
              key={asset.id}
              className={`rounded-xl border transition-all ${
                isHigh
                  ? 'border-emerald-600 dark:border-emerald-500 bg-white dark:bg-slate-900 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {asset.name}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {asset.nameEn}
                    </span>
                  </div>

                  {/* Risk Badge */}
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono tabular-nums px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      ความเสี่ยงระดับ {asset.riskScore}/8
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {asset.description}
                </p>

                {/* Quick Spec Metrics */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-400 block">ผลตอบแทนคาดหวัง</span>
                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                      {asset.expectedReturn}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">เงินเริ่มต้น</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {asset.minimumCapital}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">สภาพคล่อง</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {asset.liquidity === 'high' ? 'สูง (ถอนง่าย)' : asset.liquidity === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                    </span>
                  </div>
                </div>

                {/* Beginner Recommendation Note */}
                <div className="text-xs text-slate-700 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                  {asset.beginnerRecommendation}
                </div>

                {/* Pros and Cons bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                      ข้อดีเด่น:
                    </span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                      {asset.pros.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                      ข้อควรระวัง:
                    </span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                      {asset.cons.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-600">!</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interest Level Selector Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ความสนใจของคุณ:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onToggleInterest(asset.id, 'high')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        isHigh
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      สนใจมาก
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleInterest(asset.id, 'medium')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        isMedium
                          ? 'bg-amber-600 text-white font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      น่าศึกษา
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleInterest(asset.id, 'none')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        isNone
                          ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      ยังไม่สนใจ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Banner: Prev to TSI, Next to Portfolio */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-[#FCFCFD] dark:bg-[#131A24]">
        <button
          onClick={() => onNavigateToTab('tsi')}
          className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <span>← ย้อนกลับ: 04. แบบทดสอบ TSI</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-stone-400 font-mono hidden md:inline">STEP 06 · จัดสัดส่วนพอร์ต</span>
          <button
            onClick={() => onNavigateToTab('portfolio')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs border border-amber-300/40 hover:shadow-sm"
          >
            <span>ไปที่จัดสัดส่วนพอร์ต</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
