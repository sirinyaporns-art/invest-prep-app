import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ChecklistSection } from './components/ChecklistSection';
import { PersonalFinanceSection } from './components/PersonalFinanceSection';
import { GoalsSection } from './components/GoalsSection';
import { TSITestSection } from './components/TSITestSection';
import { AssetInterestsSection } from './components/AssetInterestsSection';
import { PortfolioAllocationSection } from './components/PortfolioAllocationSection';
import { BudgetAllocationSection } from './components/BudgetAllocationSection';
import { CautionSection } from './components/CautionSection';
import { SummaryReportModal } from './components/SummaryReportModal';

import { INITIAL_CHECKLIST } from './data/starterChecklist';
import { TSI_QUESTIONS, calculateTSIRisk } from './data/tsiQuestions';
import { ASSET_CLASSES } from './data/assetClasses';
import { ChecklistItem, PersonalFinance, InvestmentGoal, AssetClassItem } from './types/investor';
import { ShieldCheck, ArrowRight, BookOpen, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

const DEFAULT_FINANCE: PersonalFinance = {
  age: 28,
  gender: 'female',
  occupation: 'พนักงานบริษัทเอกชน (ประจำ)',
  monthlyIncome: 38000,
  monthlyExpenses: 19000,
  monthlyDebtPayment: 4000,
  totalDebt: 35000,
  emergencyFund: 85000,
  currentInvestments: 30000,
};

const DEFAULT_GOAL: InvestmentGoal = {
  purpose: 'retirement',
  customPurpose: '',
  targetAmount: 3000000,
  timeHorizonYears: 15,
  horizonCategory: 'very_long',
  importanceLevel: 'important',
  downsideTolerance: 'moderate',
};

// Default TSI answers (Balanced - Level 3)
const DEFAULT_TSI_ANSWERS: Record<number, number> = {
  1: 3, // < 35 yrs (4 pts)
  2: 2, // 25-50% (3 pts)
  3: 2, // Assets > Debt (3 pts)
  4: 2, // Stocks / Mutual funds (3 pts)
  5: 3, // > 5 yrs (4 pts)
  6: 2, // Capital growth (3 pts)
  7: 2, // Hold and wait (3 pts)
  8: 2, // 15% gain / 5% loss (3 pts)
  9: 2, // 10-20% downside (3 pts)
  10: 2, // Hedged FX (3 pts)
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('finance');
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Core App State
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [finance, setFinance] = useState<PersonalFinance>(DEFAULT_FINANCE);
  const [goal, setGoal] = useState<InvestmentGoal>(DEFAULT_GOAL);
  const [tsiAnswers, setTsiAnswers] = useState<Record<number, number>>(DEFAULT_TSI_ANSWERS);
  const [assets, setAssets] = useState<AssetClassItem[]>(ASSET_CLASSES);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handlers
  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const handleSelectTsiAnswer = (questionId: number, optionIndex: number) => {
    setTsiAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleToggleAssetInterest = (id: string, level: AssetClassItem['interestLevel']) => {
    setAssets((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              interestLevel: level,
              isInterested: level !== 'none',
            }
          : item
      )
    );
  };

  const handleResetData = () => {
    if (window.confirm('คุณต้องการโหลดข้อมูลตัวอย่างเริ่มต้นใช่หรือไม่?')) {
      setChecklist(INITIAL_CHECKLIST);
      setFinance(DEFAULT_FINANCE);
      setGoal(DEFAULT_GOAL);
      setTsiAnswers(DEFAULT_TSI_ANSWERS);
      setAssets(ASSET_CLASSES);
    }
  };

  // Derived values
  const { totalScore: tsiScore, riskProfile } = useMemo(
    () => calculateTSIRisk(tsiAnswers),
    [tsiAnswers]
  );

  const completedChecklistCount = checklist.filter((i) => i.isCompleted).length;
  const readinessScore = Math.round((completedChecklistCount / checklist.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. Header (Navbar adhering to 3-Zone contract) */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        onOpenReport={() => setIsReportOpen(true)}
        onResetData={handleResetData}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        readinessScore={readinessScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Context Banner (Shown on finance step with Japanese Zen Minimalist Elegance) */}
        {/* Hero Context Banner (Green-Brown Earth Tone) */}
        {activeTab === 'finance' && (
          <div className="rounded-2xl border border-amber-900/15 dark:border-emerald-900/40 overflow-hidden bg-[#FAF8F5] dark:bg-[#131915] grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-xs">
            <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 01</span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">/</span>
                <span className="font-medium text-[11px] text-amber-800 dark:text-amber-300 tracking-wider">จุดเริ่มต้นการวางแผนการเงิน</span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">/</span>
                <span className="text-stone-600 dark:text-stone-300">แบบประเมินและวางแผนการลงทุน</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                เริ่มต้นวางแผนการเงินส่วนบุคคล และประเมินความพร้อมก่อนลงทุน
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                ออกแบบด้วยความเรียบง่ายและเป็นระบบ เพื่อช่วยคุณสำรวจสุขภาพทางการเงิน ตรวจสอบเช็กลิสต์ความพร้อม 7 เสาหลัก และประเมินระดับความเสี่ยงตามมาตรฐานสถาบัน TSI ตลาดหลักทรัพย์แห่งประเทศไทย
              </p>

              {/* Micro-Metrics Ribbon */}
              <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>01. ตรวจสุขภาพการเงิน</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>02. เช็กลิสต์ความพร้อม 7 ข้อ</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>03. TSI แบบทดสอบ 10 ข้อ</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                  <span>04. จัดพอร์ต & จำลอง DCA</span>
                </span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('main-flow');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all flex items-center gap-2 shadow-xs border border-amber-300/40 hover:shadow-sm"
                >
                  <span>เริ่มกรอกข้อมูลการเงิน (STEP 01)</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="px-4 py-2.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-xl transition-colors"
                >
                  <span>ดูตัวอย่างสรุปพอร์ต</span>
                </button>
              </div>
            </div>

            {/* High-Res Photo Container */}
            <div className="relative min-h-[240px] lg:min-h-full lg:col-span-5 bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <img
                src="/src/assets/images/investor_workspace_hero_1793800673443.jpg"
                alt="โต๊ะทำงานวางแผนการเงินสไตล์มินิมอล"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs drop-shadow-sm font-medium lg:hidden">
                จัดสรรเงินอย่างสมดุล มั่นใจในทุกการเติบโต
              </div>
            </div>
          </div>
        )}

        {/* Section Workflow Router (Reordered: PersonalFinance is #1, Checklist is #2) */}
        <div id="main-flow" className="scroll-mt-24">
          {activeTab === 'finance' && (
            <PersonalFinanceSection
              finance={finance}
              onChange={setFinance}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'checklist' && (
            <ChecklistSection
              items={checklist}
              onToggleItem={handleToggleChecklistItem}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'goal' && (
            <GoalsSection
              goal={goal}
              onChange={setGoal}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'tsi' && (
            <TSITestSection
              answers={tsiAnswers}
              onSelectAnswer={handleSelectTsiAnswer}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'assets' && (
            <AssetInterestsSection
              assets={assets}
              onToggleInterest={handleToggleAssetInterest}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioAllocationSection
              riskProfile={riskProfile}
              goal={goal}
              finance={finance}
              assets={assets}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'budget' && (
            <BudgetAllocationSection
              finance={finance}
              goal={goal}
              riskProfile={riskProfile}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'caution' && (
            <CautionSection onOpenReport={() => setIsReportOpen(true)} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">
                InvestPrep · ระบบประเมินความพร้อมการลงทุนสำหรับมือใหม่
              </span>
              <p className="mt-0.5">
                ออกแบบตามมาตรฐานเกณฑ์ประเมิน TSI และสำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ (ก.ล.ต.)
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://www.set.or.th/th/education-research/education/tsi"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-emerald-600 transition-colors"
              >
                สถาบัน TSI ตลาดหลักทรัพย์ฯ
              </a>
              <a
                href="https://www.sec.or.th"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-emerald-600 transition-colors"
              >
                สำนักงาน ก.ล.ต. (SEC)
              </a>
              <button
                onClick={() => setIsReportOpen(true)}
                className="hover:text-emerald-600 transition-colors"
              >
                พิมพ์รายงานสรุป
              </button>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            ข้อจำกัดความรับผิดชอบ (Disclaimer): ข้อมูลและผลการประเมินในเว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและการเตรียมความพร้อมเบื้องต้นสำหรับผู้เริ่มต้นลงทุนเท่านั้น มิได้ถือเป็นคำชี้ชวน คำแนะนำ หรือการเสนอขายหลักทรัพย์ใดๆ ทั้งสิ้น การลงทุนมีความเสี่ยง ผู้ลงทุนควรศึกษาข้อมูลและหนังสือชี้ชวนอย่างละเอียดก่อนตัดสินใจลงทุนทุกครั้ง
          </div>
        </div>
      </footer>

      {/* Summary Report Modal */}
      <SummaryReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        checklist={checklist}
        finance={finance}
        goal={goal}
        riskProfile={riskProfile}
        tsiScore={tsiScore}
        assets={assets}
      />
    </div>
  );
}
