import React, { useState } from 'react';
import { ChecklistItem, PersonalFinance, InvestmentGoal } from '../types/investor';
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Shield,
  BookOpen,
  Rocket,
  Link2,
  Edit3,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ChecklistSectionProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onNavigateToTab: (tabId: string) => void;
  finance: PersonalFinance;
  goal: InvestmentGoal;
  tsiAnswers: Record<number, number>;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  items,
  onToggleItem,
  onNavigateToTab,
  finance,
  goal,
  tsiAnswers,
}) => {
  const [filter, setFilter] = useState<'all' | 'foundation' | 'knowledge' | 'execution'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('emergency-fund');
  const [autoSyncTipId, setAutoSyncTipId] = useState<string | null>(null);

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progressPct = Math.round((completedCount / items.length) * 100);

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const getItemSyncInfo = (id: string) => {
    switch (id) {
      case 'emergency-fund': {
        const ratio = finance.monthlyExpenses > 0 ? finance.emergencyFund / finance.monthlyExpenses : 0;
        const isPassed = finance.monthlyExpenses > 0 && ratio >= 3;
        let detail = 'รอการกรอกรายจ่ายใน 01. ข้อมูลการเงิน';
        if (finance.monthlyExpenses > 0) {
          detail = `ปัจจุบันมีสำรอง ${ratio.toFixed(1)} / 3.0 เดือน (${finance.emergencyFund.toLocaleString()} / ${(finance.monthlyExpenses * 3).toLocaleString()} บาท)`;
        }
        return {
          isAuto: true,
          isPassed,
          sourceName: 'ข้อมูลการเงิน (Step 01)',
          detail,
          targetTab: 'finance',
          conditionText: 'เงินสำรองเผื่อฉุกเฉินต้องมีอย่างน้อย 3 เท่าของรายจ่ายต่อเดือน',
        };
      }
      case 'clear-high-interest-debt': {
        const hasData = finance.monthlyIncome > 0 || finance.monthlyExpenses > 0;
        const isPassed = hasData && finance.totalDebt === 0 && finance.monthlyDebtPayment === 0;
        let detail = 'รอการกรอกข้อมูลหนี้สินใน 01. ข้อมูลการเงิน';
        if (hasData) {
          detail =
            finance.totalDebt > 0
              ? `มียอดหนี้คงค้าง ฿${finance.totalDebt.toLocaleString()} (ผ่อน ฿${finance.monthlyDebtPayment.toLocaleString()}/ด.)`
              : 'ปลอดหนี้สินคงค้าง (0 บาท)';
        }
        return {
          isAuto: true,
          isPassed,
          sourceName: 'ข้อมูลการเงิน (Step 01)',
          detail,
          targetTab: 'finance',
          conditionText: 'ปลอดหนี้ดอกเบี้ยสูงหรือยอดหนี้สินคงค้างเป็น 0 บาท',
        };
      }
      case 'clear-goal-horizon': {
        const isPassed = Boolean(goal.purpose && goal.targetAmount > 0 && goal.timeHorizonYears > 0);
        let detail = 'รอการระบุเป้าหมายและยอดเงินใน 03. เป้าหมายลงทุน';
        if (isPassed) {
          detail = `เป้าหมาย ฿${goal.targetAmount.toLocaleString()} (${goal.timeHorizonYears} ปี)`;
        } else if (goal.purpose) {
          detail = `เลือกวัตถุประสงค์แล้ว แต่ยังไม่ระบุจำนวนเงินเป้าหมาย`;
        }
        return {
          isAuto: true,
          isPassed,
          sourceName: 'เป้าหมายลงทุน (Step 03)',
          detail,
          targetTab: 'goal',
          conditionText: 'เลือกวัตถุประสงค์และระบุจำนวนเงินเป้าหมายการลงทุน',
        };
      }
      case 'tsi-suitability': {
        const answeredCount = Object.keys(tsiAnswers).length;
        const isPassed = answeredCount === 10;
        let detail = `ทำแบบทดสอบแล้ว ${answeredCount} / 10 ข้อ`;
        if (isPassed) {
          detail = `ทำแบบทดสอบครบ 10 ข้อแล้ว`;
        }
        return {
          isAuto: true,
          isPassed,
          sourceName: 'แบบทดสอบ TSI (Step 04)',
          detail,
          targetTab: 'tsi',
          conditionText: 'ตอบแบบประเมินความเหมาะสมในการลงทุนครบทั้ง 10 ข้อ',
        };
      }
      default:
        return {
          isAuto: false,
          isPassed: false,
          sourceName: 'ประเมินตนเอง',
          detail: 'สามารถกดคลิกติ๊กเช็กด้วยตนเองได้เมื่อเตรียมพร้อมแล้ว',
          targetTab: null,
          conditionText: 'ตรวจสอบความพร้อมและคลิกเพื่อติ๊กยืนยันด้วยตนเอง',
        };
    }
  };

  const getShortcutTab = (id: string): { tab: string; label: string } | null => {
    if (id === 'emergency-fund' || id === 'clear-high-interest-debt') {
      return { tab: 'finance', label: 'ไปกรอกข้อมูลการเงิน' };
    }
    if (id === 'clear-goal-horizon') {
      return { tab: 'goal', label: 'ไประบุเป้าหมายลงทุน' };
    }
    if (id === 'tsi-suitability') {
      return { tab: 'tsi', label: 'ไปทำแบบทดสอบ TSI' };
    }
    if (id === 'regulated-broker') {
      return { tab: 'caution', label: 'วิธีเช็กโบรกเกอร์ถูกกฎหมาย' };
    }
    if (id === 'dca-discipline') {
      return { tab: 'budget', label: 'ไปวางแผนจัดสรรเงิน DCA' };
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header (Green & Brown Earth Tone - No Japanese) */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-purple-700 dark:text-purple-400 font-bold font-semibold tracking-wider">STEP 02</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="font-medium text-fuchsia-700 dark:text-fuchsia-400 font-semibold">เช็กลิสต์ความพร้อม</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>7 เสาหลักก่อนเริ่มลงทุน</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          เช็กลิสต์ความพร้อมสำหรับผู้เริ่มต้นลงทุน
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          ก่อนที่จะนำเงินก้อนแรกไปเสี่ยงในตลาดหุ้นหรือกองทุนรวม การวางรากฐานทางการเงินให้มั่นคงจะช่วยปกป้องคุณจากการขาดทุนจนหมดตัว ติ๊กเช็กแต่ละข้ออย่างรอบคอบเพื่อประเมินความพร้อมของคุณ
        </p>
      </div>

      {/* Progress & Status Card (Green & Brown Theme) */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                ระดับความพร้อมในการลงทุนของคุณ
              </span>
              <span className="text-xs text-slate-500 font-mono">
                (ผ่านแล้ว {completedCount}/{items.length} ข้อ)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {progressPct === 100
                ? 'ยอดเยี่ยม! คุณมีเกราะป้องกันทางการเงินพร้อมก้าวสู่โลกการลงทุนอย่างมั่นใจ'
                : progressPct >= 60
                ? 'อยู่ในเกณฑ์ดี เตรียมพร้อมอีกเล็กน้อยเพื่อปิดรอยรั่วทางการเงิน'
                : 'ควรเร่งสร้างเกราะป้องกันพื้นฐาน (เงินฉุกเฉินและเคลียร์หนี้) ก่อนเริ่มลงเงินเสี่ยง'}
            </p>
          </div>

          <div className="flex items-baseline gap-2 shrink-0">
            <span className="text-3xl font-bold font-mono tabular-nums text-purple-800 dark:text-purple-300">
              {progressPct}%
            </span>
            <span className="text-xs text-fuchsia-700 dark:text-fuchsia-400 font-semibold font-semibold">สำเร็จ</span>
          </div>
        </div>

        {/* Progress Bar (Forest Green + Amber Brown Glow) */}
        <div className="mt-4 w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 dark:from-purple-500 dark:to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs (Segmented Buttons in Earth Tones) */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-800 text-purple-900 dark:text-purple-300 shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ทั้งหมด ({items.length})
          </button>
          <button
            onClick={() => setFilter('foundation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'foundation'
                ? 'bg-white dark:bg-slate-800 text-purple-900 dark:text-purple-300 shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
            <span>รากฐานการเงิน</span>
          </button>
          <button
            onClick={() => setFilter('knowledge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'knowledge'
                ? 'bg-white dark:bg-slate-800 text-purple-900 dark:text-purple-300 shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-fuchsia-700 dark:text-fuchsia-400 font-semibold" />
            <span>ความรู้ & ความเสี่ยง</span>
          </button>
          <button
            onClick={() => setFilter('execution')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'execution'
                ? 'bg-white dark:bg-slate-800 text-purple-900 dark:text-purple-300 shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
            <span>การลงมือปฏิบัติ</span>
          </button>
        </div>

        <div className="text-xs text-slate-500">
          คลิกเพื่อติ๊กเครื่องหมาย หรือคลิกเพื่อดูคำแนะนำเชิงลึก
        </div>
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3.5">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const shortcut = getShortcutTab(item.id);
          const syncInfo = getItemSyncInfo(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all ${
                item.isCompleted
                  ? 'border-purple-300/80 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="p-5 flex items-start gap-4">
                {/* Toggle Button / Auto-Sync Indicator */}
                <div className="flex flex-col items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (syncInfo.isAuto) {
                        setAutoSyncTipId((prev) => (prev === item.id ? null : item.id));
                        return;
                      }
                      onToggleItem(item.id);
                    }}
                    className={`mt-0.5 transition-colors focus:outline-none ${
                      syncInfo.isAuto
                        ? item.isCompleted
                          ? 'text-purple-700 dark:text-purple-400'
                          : 'text-slate-300 dark:text-slate-600 hover:text-fuchsia-700'
                        : 'text-slate-300 dark:text-slate-600 hover:text-purple-700 dark:hover:text-purple-400 cursor-pointer'
                    }`}
                    title={
                      syncInfo.isAuto
                        ? 'ข้อนี้ซิงค์และตรวจสอบอัตโนมัติจากข้อมูลที่กรอก (ไม่ต้องกดติ๊กเอง)'
                        : 'คลิกเพื่อติ๊กยืนยันด้วยตนเอง'
                    }
                  >
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-purple-700 dark:text-purple-400 fill-purple-100 dark:fill-purple-950" />
                    ) : (
                      <Circle className="w-6 h-6 hover:text-slate-400" />
                    )}
                  </button>
                  {syncInfo.isAuto ? (
                    <span className="text-[10px] text-purple-800 dark:text-purple-400 font-mono mt-1 font-semibold">
                      AUTO
                    </span>
                  ) : (
                    <span className="text-[10px] text-fuchsia-700 dark:text-fuchsia-400 font-semibold font-mono mt-1">
                      MANUAL
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="text-left font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-purple-800 dark:hover:text-purple-400 transition-colors"
                      >
                        {item.title}
                      </button>

                      {/* Type Pill Badge */}
                      {syncInfo.isAuto ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          <Link2 className="w-3 h-3 text-purple-700 dark:text-purple-400" />
                          ซิงค์อัตโนมัติ ({syncInfo.sourceName})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-800 dark:text-pink-300 border border-pink-200 dark:border-fuchsia-800">
                          <Edit3 className="w-3 h-3 text-fuchsia-700" />
                          กดเช็กเองได้เลย
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {shortcut && (
                        <button
                          onClick={() => onNavigateToTab(shortcut.tab)}
                          className="flex items-center gap-1 text-xs font-medium text-purple-800 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 transition-colors"
                        >
                          <span>{shortcut.label}</span>
                          <ArrowRight className="w-3 h-3 text-fuchsia-600" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Auto-sync Notification Helper on Click */}
                  {autoSyncTipId === item.id && syncInfo.isAuto && (
                    <div className="mt-2.5 p-3 rounded-xl bg-fuchsia-50/90 dark:bg-fuchsia-950/50 border border-pink-200 dark:border-fuchsia-800 text-xs text-fuchsia-900 dark:text-pink-200 flex items-start justify-between gap-3 animate-fadeIn">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-fuchsia-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>ข้อนี้เชื่อมต่อกับข้อมูลจริงโดยอัตโนมัติ:</strong>{' '}
                          เกณฑ์การผ่าน: {syncInfo.conditionText} (ไม่ต้องกดติ๊กเอง)
                        </div>
                      </div>
                      {syncInfo.targetTab && (
                        <button
                          onClick={() => syncInfo.targetTab && onNavigateToTab(syncInfo.targetTab)}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs font-semibold text-[11px] shrink-0 hover:bg-purple-800 transition-colors"
                        >
                          ไปกรอกข้อมูล
                        </button>
                      )}
                    </div>
                  )}

                  {/* Real-time Status Card */}
                  {syncInfo.isAuto ? (
                    item.isCompleted ? (
                      <div className="mt-2.5 text-xs flex items-center gap-2 text-purple-800 dark:text-purple-300 font-medium bg-purple-100/70 dark:bg-purple-950/60 px-3 py-2 rounded-xl border border-purple-300/80 dark:border-purple-800">
                        <CheckCircle2 className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0" />
                        <span>ผ่านเกณฑ์เรียบร้อย: {syncInfo.detail}</span>
                      </div>
                    ) : (
                      <div className="mt-2.5 text-xs flex items-center justify-between flex-wrap gap-2 text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-fuchsia-600 shrink-0" />
                          <span>สถานะปัจจุบัน: {syncInfo.detail}</span>
                        </div>
                        {syncInfo.targetTab && (
                          <button
                            onClick={() => syncInfo.targetTab && onNavigateToTab(syncInfo.targetTab)}
                            className="text-purple-800 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1 text-[11px]"
                          >
                            <span>ไปกรอกข้อมูลเพื่อให้ผ่านเกณฑ์</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )
                  ) : item.isCompleted ? (
                    <div className="mt-2.5 text-xs flex items-center justify-between gap-2 text-purple-800 dark:text-purple-300 font-medium bg-purple-100/70 dark:bg-purple-950/60 px-3 py-2 rounded-xl border border-purple-300/80 dark:border-purple-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0" />
                        <span>คุณได้ตรวจสอบและติ๊กยืนยันความพร้อมเรียบร้อยแล้ว</span>
                      </div>
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-700 underline"
                      >
                        ยกเลิกการติ๊ก
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2.5 text-xs flex items-center justify-between gap-2 text-slate-600 dark:text-slate-400 bg-slate-100/60 dark:bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-fuchsia-600 shrink-0" />
                        <span>ข้อนี้สามารถกดคลิกติ๊กเครื่องหมายได้ด้วยตนเองเมื่อพร้อม</span>
                      </div>
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs font-semibold text-[11px] shrink-0 hover:bg-purple-800 transition-colors"
                      >
                        กดติ๊กข้อนี้
                      </button>
                    </div>
                  )}

                  {/* Expandable Why & Tip */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <AlertCircle className="w-4 h-4 text-fuchsia-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">
                            ทำไมข้อนี้จึงสำคัญมาก?
                          </strong>
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.whyImportant}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <Lightbulb className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">
                            คำแนะนำสำหรับก้าวต่อไป:
                          </strong>
                          <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <button
          onClick={() => onNavigateToTab('finance')}
          className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ย้อนกลับ: 01. ข้อมูลส่วนตัวและการเงิน</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-slate-400 font-mono hidden md:inline">STEP 03 · เป้าหมายลงทุน</span>
          <button
            onClick={() => onNavigateToTab('goal')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-xl transition-all shadow-xs border border-fuchsia-600/40 hover:shadow-sm"
          >
            <span>ไปที่เป้าหมายการลงทุน</span>
            <ArrowRight className="w-3.5 h-3.5 text-pink-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
