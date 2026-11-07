import React, { useState, useEffect } from 'react';
import { PersonalFinance } from '../types/investor';
import { PersonalFinanceSection } from './PersonalFinanceSection';
import { TSITestSection } from './TSITestSection';
import { calculateTSIRisk } from '../data/tsiQuestions';
import {
  UserCheck,
  Wallet,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  PieChart,
} from 'lucide-react';

interface SelfAssessmentSectionProps {
  initialSubTab?: 'finance' | 'tsi';
  finance: PersonalFinance;
  onFinanceChange: (updated: PersonalFinance) => void;
  tsiAnswers: Record<number, number>;
  onSelectTsiAnswer: (questionId: number, optionIndex: number) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const SelfAssessmentSection: React.FC<SelfAssessmentSectionProps> = ({
  initialSubTab = 'finance',
  finance,
  onFinanceChange,
  tsiAnswers,
  onSelectTsiAnswer,
  onNavigateToTab,
}) => {
  const [subTab, setSubTab] = useState<'finance' | 'tsi'>(initialSubTab);

  // Sync if initialSubTab changes from parent navigation
  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Derived statuses
  const { totalScore: tsiScore, riskProfile, answeredCount } = calculateTSIRisk(tsiAnswers);
  const isTsiComplete = answeredCount === 10;

  const hasFinanceData = finance.monthlyIncome > 0 || finance.monthlyExpenses > 0;
  const emergencyCoverageMonths =
    finance.monthlyExpenses > 0
      ? Number((finance.emergencyFund / finance.monthlyExpenses).toFixed(1))
      : 0;
  const isEmergencyPassed = emergencyCoverageMonths >= 3;
  const isDebtSafe = finance.monthlyIncome > 0 ? (finance.monthlyDebtPayment / finance.monthlyIncome) <= 0.3 : true;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overarching Section Header (Green & Warm Brown Earth Tone - No Japanese) */}
      <div className="space-y-3 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">
            STEP 01
          </span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-amber-800 dark:text-amber-400">สำรวจตนเองก่อนเริ่มลงทุน</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>ความพร้อมทางการเงิน & ขีดความสามารถรับความเสี่ยง</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              สำรวจตนเองก่อนเริ่มลงทุน
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed mt-1">
              การลงทุนที่ประสบความสำเร็จต้องเริ่มจากการรู้จักตนเองใน 2 มิติหลัก:
              <strong> 1. สุขภาพทางการเงินจริง</strong> (สภาพคล่อง หนี้สิน และเงินสำรองฉุกเฉิน) และ
              <strong> 2. ขีดความสามารถในการรับความเสี่ยง</strong> ตามแบบประเมิน TSI (10 ข้อมาตรฐาน ก.ล.ต.)
            </p>
          </div>
          {/* Completion Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                hasFinanceData && isTsiComplete
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700'
              }`}
            >
              {hasFinanceData && isTsiComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>สำรวจครบทั้ง 2 ส่วนแล้ว</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>
                    ความคืบหน้า: {(hasFinanceData ? 1 : 0) + (isTsiComplete ? 1 : 0)}/2 ส่วน
                  </span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Combined Dual Status Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
          {/* Part 1 Summary Card */}
          <div
            onClick={() => setSubTab('finance')}
            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
              subTab === 'finance'
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-2xs'
                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  hasFinanceData
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                }`}
              >
                1
              </div>
              <div>
                <div className="font-semibold text-stone-900 dark:text-stone-100">
                  ข้อมูลส่วนตัวและสถานะการเงิน
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  {hasFinanceData ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                      เงินสำรอง {emergencyCoverageMonths} เดือน · หนี้คงค้าง {finance.totalDebt.toLocaleString()} บาท
                    </span>
                  ) : (
                    <span>คลิกเพื่อกรอกรายได้ รายจ่าย และเงินสำรอง</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5">
              <span>{subTab === 'finance' ? 'กำลังดู' : 'ดูส่วนนี้'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Part 2 Summary Card */}
          <div
            onClick={() => setSubTab('tsi')}
            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
              subTab === 'tsi'
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-2xs'
                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isTsiComplete
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                }`}
              >
                2
              </div>
              <div>
                <div className="font-semibold text-stone-900 dark:text-stone-100">
                  แบบประเมินความเสี่ยง TSI (10 ข้อ)
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  {isTsiComplete ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                      ระดับ {riskProfile.level}: {riskProfile.title} ({tsiScore} คะแนน)
                    </span>
                  ) : (
                    <span>ตอบแล้ว {answeredCount}/10 ข้อมาตรฐาน ก.ล.ต.</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5">
              <span>{subTab === 'tsi' ? 'กำลังดู' : 'ดูส่วนนี้'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Switcher Bar */}
      <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <button
          onClick={() => setSubTab('finance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            subTab === 'finance'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>ส่วนที่ 1: ข้อมูลส่วนตัวและการเงิน</span>
          {hasFinanceData && <span className="w-2 h-2 rounded-full bg-emerald-300 ml-1" />}
        </button>

        <button
          onClick={() => setSubTab('tsi')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            subTab === 'tsi'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>ส่วนที่ 2: แบบประเมินความเสี่ยง TSI</span>
          {isTsiComplete && <span className="w-2 h-2 rounded-full bg-emerald-300 ml-1" />}
        </button>
      </div>

      {/* Sub-Tab Content Rendering */}
      {subTab === 'finance' && (
        <div className="space-y-6">
          <PersonalFinanceSection
            finance={finance}
            onChange={onFinanceChange}
            onNavigateToTab={(tab) => {
              if (tab === 'tsi') {
                setSubTab('tsi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onNavigateToTab(tab);
              }
            }}
          />

          {/* Quick Step Switcher to Part 2 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                กรอกข้อมูลการเงินเรียบร้อยแล้ว? ขั้นต่อไปคือทำแบบประเมินความเสี่ยง TSI 10 ข้อ
              </span>
            </div>
            <button
              onClick={() => {
                setSubTab('tsi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors self-end sm:self-auto shrink-0 shadow-xs"
            >
              <span>ไปทำแบบประเมินความเสี่ยง TSI (ส่วนที่ 2)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {subTab === 'tsi' && (
        <div className="space-y-6">
          <TSITestSection
            answers={tsiAnswers}
            onSelectAnswer={onSelectTsiAnswer}
            onNavigateToTab={(tab) => {
              if (tab === 'finance') {
                setSubTab('finance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onNavigateToTab(tab);
              }
            }}
          />

          {/* Quick Step Switcher after TSI */}
          <div className="p-4 rounded-2xl bg-[#FCFAF7] dark:bg-[#18201B] border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <button
              onClick={() => {
                setSubTab('finance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white font-semibold transition-colors"
            >
              <span>← ย้อนกลับไปตรวจข้อมูลการเงิน</span>
            </button>
            <button
              onClick={() => {
                onNavigateToTab('checklist');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>ถัดไป: ตรวจเช็กลิสต์ความพร้อม 7 เสาหลัก</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
