import React, { useState } from 'react';
import { ChecklistItem } from '../types/investor';
import { CheckCircle2, Circle, AlertCircle, ArrowRight, ArrowLeft, Lightbulb, Shield, BookOpen, Rocket } from 'lucide-react';

interface ChecklistSectionProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  items,
  onToggleItem,
  onNavigateToTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'foundation' | 'knowledge' | 'execution'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('emergency-fund');

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progressPct = Math.round((completedCount / items.length) * 100);

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const getShortcutTab = (id: string): { tab: string; label: string } | null => {
    if (id === 'emergency-fund' || id === 'clear-high-interest-debt') {
      return { tab: 'finance', label: 'ดูข้อมูลการเงิน' };
    }
    if (id === 'clear-goal-horizon') {
      return { tab: 'goal', label: 'ระบุเป้าหมายลงทุน' };
    }
    if (id === 'tsi-suitability') {
      return { tab: 'tsi', label: 'เริ่มทำแบบทดสอบ TSI' };
    }
    if (id === 'regulated-broker') {
      return { tab: 'caution', label: 'อ่านวิธีเช็กโบรกเกอร์ถูกกฎหมาย' };
    }
    if (id === 'dca-discipline') {
      return { tab: 'budget', label: 'คำนวณเงิน DCA รายเดือน' };
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header (Green & Brown Earth Tone - No Japanese) */}
      <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 02</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-amber-800 dark:text-amber-400">เช็กลิสต์ความพร้อม</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>7 เสาหลักก่อนเริ่มลงทุน</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          เช็กลิสต์ความพร้อมสำหรับผู้เริ่มต้นลงทุน
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          ก่อนที่จะนำเงินก้อนแรกไปเสี่ยงในตลาดหุ้นหรือกองทุนรวม การวางรากฐานทางการเงินให้มั่นคงจะช่วยปกป้องคุณจากการขาดทุนจนหมดตัว ติ๊กเช็กแต่ละข้ออย่างรอบคอบเพื่อประเมินความพร้อมของคุณ
        </p>
      </div>

      {/* Progress & Status Card (Green & Brown Theme) */}
      <div className="p-6 sm:p-7 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                ระดับความพร้อมในการลงทุนของคุณ
              </span>
              <span className="text-xs text-stone-500 font-mono">
                (ผ่านแล้ว {completedCount}/{items.length} ข้อ)
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {progressPct === 100
                ? 'ยอดเยี่ยม! คุณมีเกราะป้องกันทางการเงินพร้อมก้าวสู่โลกการลงทุนอย่างมั่นใจ'
                : progressPct >= 60
                ? 'อยู่ในเกณฑ์ดี เตรียมพร้อมอีกเล็กน้อยเพื่อปิดรอยรั่วทางการเงิน'
                : 'ควรเร่งสร้างเกราะป้องกันพื้นฐาน (เงินฉุกเฉินและเคลียร์หนี้) ก่อนเริ่มลงเงินเสี่ยง'}
            </p>
          </div>

          <div className="flex items-baseline gap-2 shrink-0">
            <span className="text-3xl font-bold font-mono tabular-nums text-emerald-800 dark:text-emerald-300">
              {progressPct}%
            </span>
            <span className="text-xs text-amber-800 dark:text-amber-400 font-semibold">สำเร็จ</span>
          </div>
        </div>

        {/* Progress Bar (Forest Green + Amber Brown Glow) */}
        <div className="mt-4 w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs (Segmented Buttons in Earth Tones) */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-300 shadow-2xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            ทั้งหมด ({items.length})
          </button>
          <button
            onClick={() => setFilter('foundation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'foundation'
                ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-300 shadow-2xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>รากฐานการเงิน</span>
          </button>
          <button
            onClick={() => setFilter('knowledge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'knowledge'
                ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-300 shadow-2xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>ความรู้ & ความเสี่ยง</span>
          </button>
          <button
            onClick={() => setFilter('execution')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'execution'
                ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-300 shadow-2xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>การลงมือปฏิบัติ</span>
          </button>
        </div>

        <div className="text-xs text-stone-500">
          คลิกเพื่อติ๊กเครื่องหมาย หรือคลิกเพื่อดูคำแนะนำเชิงลึก
        </div>
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3.5">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const shortcut = getShortcutTab(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all ${
                item.isCompleted
                  ? 'border-emerald-300/80 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="p-5 flex items-start gap-4">
                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => onToggleItem(item.id)}
                  className="mt-0.5 shrink-0 text-stone-300 dark:text-stone-600 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors focus:outline-none"
                  aria-label={item.isCompleted ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
                >
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-6 h-6 hover:text-stone-400" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="text-left font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                    >
                      {item.title}
                    </button>

                    <div className="flex items-center gap-2">
                      {shortcut && (
                        <button
                          onClick={() => onNavigateToTab(shortcut.tab)}
                          className="flex items-center gap-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors"
                        >
                          <span>{shortcut.label}</span>
                          <ArrowRight className="w-3 h-3 text-amber-600" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expandable Why & Tip */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
                      <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                            ทำไมข้อนี้จึงสำคัญมาก?
                          </strong>
                          <span className="text-stone-600 dark:text-stone-400 leading-relaxed">
                            {item.whyImportant}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                        <Lightbulb className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                            คำแนะนำสำหรับก้าวต่อไป:
                          </strong>
                          <span className="text-stone-600 dark:text-stone-400 leading-relaxed">
                            {item.actionTip}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Banner: Prev to Finance, Next to Goals */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B]">
        <button
          onClick={() => onNavigateToTab('finance')}
          className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ย้อนกลับ: 01. ข้อมูลส่วนตัวและการเงิน</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-stone-400 font-mono hidden md:inline">STEP 03 · เป้าหมายลงทุน</span>
          <button
            onClick={() => onNavigateToTab('goal')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs border border-amber-600/40 hover:shadow-sm"
          >
            <span>ไปที่เป้าหมายการลงทุน</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
