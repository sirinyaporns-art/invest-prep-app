import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomeSection } from './components/WelcomeSection';
import { SelfAssessmentSection } from './components/SelfAssessmentSection';
import { ChecklistSection } from './components/ChecklistSection';
import { PersonalFinanceSection } from './components/PersonalFinanceSection';
import { GoalsSection } from './components/GoalsSection';
import { TSITestSection } from './components/TSITestSection';
import { AssetInterestsSection } from './components/AssetInterestsSection';
import { PortfolioAllocationSection } from './components/PortfolioAllocationSection';
import { BudgetAllocationSection } from './components/BudgetAllocationSection';
import { InvestmentGlossarySection } from './components/InvestmentGlossarySection';
import { CautionSection } from './components/CautionSection';
import { KnowledgeAndLegalHubSection } from './components/KnowledgeAndLegalHubSection';
import { RecommendedBrokersSection } from './components/RecommendedBrokersSection';
import { SummaryReportModal } from './components/SummaryReportModal';
import { AboutAndContactSection } from './components/AboutAndContactSection';

import { INITIAL_CHECKLIST } from './data/starterChecklist';
import { TSI_QUESTIONS, calculateTSIRisk } from './data/tsiQuestions';
import { ASSET_CLASSES } from './data/assetClasses';
import { ChecklistItem, PersonalFinance, InvestmentGoal, AssetClassItem } from './types/investor';
import { ShieldCheck, ArrowRight, BookOpen, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

const INITIAL_FINANCE: PersonalFinance = {
  age: 0,
  gender: 'unspecified',
  occupation: '',
  monthlyIncome: 0,
  monthlyExpenses: 0,
  monthlyDebtPayment: 0,
  totalDebt: 0,
  emergencyFund: 0,
  currentInvestments: 0,
};

const INITIAL_GOAL: InvestmentGoal = {
  purpose: '',
  customPurpose: '',
  targetAmount: 0,
  timeHorizonYears: 5,
  horizonCategory: 'medium',
  importanceLevel: 'important',
  downsideTolerance: 'moderate',
};

const INITIAL_TSI_ANSWERS: Record<number, number> = {};

// Optional demo preset for users wanting to preview filled data
const DEMO_SAMPLE_FINANCE: PersonalFinance = {
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

const DEMO_SAMPLE_GOAL: InvestmentGoal = {
  purpose: 'retirement',
  customPurpose: '',
  targetAmount: 3000000,
  timeHorizonYears: 15,
  horizonCategory: 'very_long',
  importanceLevel: 'important',
  downsideTolerance: 'moderate',
};

const DEMO_SAMPLE_TSI_ANSWERS: Record<number, number> = {
  1: 3, 2: 2, 3: 2, 4: 2, 5: 3, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2,
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Core App State: Clean slate with zero pre-filled values
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [finance, setFinance] = useState<PersonalFinance>(INITIAL_FINANCE);
  const [goal, setGoal] = useState<InvestmentGoal>(INITIAL_GOAL);
  const [tsiAnswers, setTsiAnswers] = useState<Record<number, number>>(INITIAL_TSI_ANSWERS);
  const [assets, setAssets] = useState<AssetClassItem[]>(ASSET_CLASSES);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-sync Checklist items connected with Finance, Goal, and TSI
  useEffect(() => {
    setChecklist((prev) =>
      prev.map((item) => {
        // 1. Emergency Fund: auto-syncs with finance (≥ 3 months of expenses)
        if (item.id === 'emergency-fund') {
          const isPassed = finance.monthlyExpenses > 0 && (finance.emergencyFund / finance.monthlyExpenses) >= 3;
          return { ...item, isCompleted: isPassed };
        }

        // 2. Clear High-Interest Debt: auto-syncs with finance (debts === 0 and has entered finance)
        if (item.id === 'clear-high-interest-debt') {
          const hasEnteredFinance = finance.monthlyIncome > 0 || finance.monthlyExpenses > 0;
          const isPassed = hasEnteredFinance && finance.totalDebt === 0 && finance.monthlyDebtPayment === 0;
          return { ...item, isCompleted: isPassed };
        }

        // 4. Clear Goal & Horizon: auto-syncs with goal selection
        if (item.id === 'clear-goal-horizon') {
          const isPassed = Boolean(goal.purpose && goal.targetAmount > 0 && goal.timeHorizonYears > 0);
          return { ...item, isCompleted: isPassed };
        }

        // 5. TSI Suitability: auto-syncs with TSI answers (answered all 10 questions)
        if (item.id === 'tsi-suitability') {
          const answeredCount = Object.keys(tsiAnswers).length;
          const isPassed = answeredCount === 10;
          return { ...item, isCompleted: isPassed };
        }

        // Manual items: keep their user-toggled status
        return item;
      })
    );
  }, [finance, goal, tsiAnswers]);

  // Handlers
  const handleToggleChecklistItem = (id: string) => {
    const targetItem = checklist.find((i) => i.id === id);
    if (targetItem?.isAutoSynced) {
      // Auto-synced items are evaluated from actual input data
      return;
    }
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
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น (ล้างค่าที่กรอกทั้งหมด) ใช่หรือไม่?')) {
      setChecklist(INITIAL_CHECKLIST.map((item) => ({ ...item, isCompleted: false })));
      setFinance(INITIAL_FINANCE);
      setGoal(INITIAL_GOAL);
      setTsiAnswers(INITIAL_TSI_ANSWERS);
      setAssets(ASSET_CLASSES.map((item) => ({ ...item, isInterested: false, interestLevel: 'none' })));
    }
  };

  const handleLoadDemoData = () => {
    if (window.confirm('คุณต้องการโหลดข้อมูลตัวอย่างจำลองเพื่อทดสอบการคำนวณใช่หรือไม่?')) {
      setFinance(DEMO_SAMPLE_FINANCE);
      setGoal(DEMO_SAMPLE_GOAL);
      setTsiAnswers(DEMO_SAMPLE_TSI_ANSWERS);
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
        onLoadDemoData={handleLoadDemoData}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        readinessScore={readinessScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Section Workflow Router */}
        <div id="main-flow" className="scroll-mt-24">
          {activeTab === 'home' && (
            <WelcomeSection
              onStart={() => {
                setActiveTab('self_assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToTab={setActiveTab}
              finance={finance}
              completedChecklistCount={completedChecklistCount}
              totalChecklistCount={checklist.length}
            />
          )}

          {(activeTab === 'self_assessment' || activeTab === 'finance' || activeTab === 'tsi') && (
            <SelfAssessmentSection
              initialSubTab={activeTab === 'tsi' ? 'tsi' : 'finance'}
              finance={finance}
              onFinanceChange={setFinance}
              tsiAnswers={tsiAnswers}
              onSelectTsiAnswer={handleSelectTsiAnswer}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'checklist' && (
            <ChecklistSection
              items={checklist}
              onToggleItem={handleToggleChecklistItem}
              onNavigateToTab={setActiveTab}
              finance={finance}
              goal={goal}
              tsiAnswers={tsiAnswers}
            />
          )}

          {activeTab === 'goal' && (
            <GoalsSection
              goal={goal}
              onChange={setGoal}
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
              checklist={checklist}
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

          {(activeTab === 'knowledge_hub' || activeTab === 'glossary' || activeTab === 'tax_legal' || activeTab === 'caution') && (
            <KnowledgeAndLegalHubSection
              initialSubTab={activeTab === 'tax_legal' ? 'tax_legal' : activeTab === 'caution' ? 'caution' : 'glossary'}
              onOpenReport={() => setIsReportOpen(true)}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'providers' && (
            <RecommendedBrokersSection
              onNavigateToTab={setActiveTab}
              onOpenReport={() => setIsReportOpen(true)}
            />
          )}

          {(activeTab === 'about' || activeTab === 'contact') && (
            <AboutAndContactSection
              initialSubTab={activeTab === 'contact' ? 'contact' : 'about'}
              onNavigateToTab={setActiveTab}
            />
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
              <button
                onClick={() => {
                  setActiveTab('providers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-purple-600 transition-colors font-semibold text-fuchsia-600 dark:text-fuchsia-400"
              >
                ผู้ให้บริการที่แนะนำ (บล. ทรีนีตี้)
              </button>
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-purple-600 transition-colors font-medium text-slate-600 dark:text-slate-300"
              >
                เกี่ยวกับโครงการ
              </button>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-purple-600 transition-colors font-medium text-slate-600 dark:text-slate-300"
              >
                ติดต่อพวกเรา
              </button>
              <a
                href="https://www.set.or.th"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-purple-600 transition-colors"
              >
                ตลาดหลักทรัพย์แห่งประเทศไทย (SET)
              </a>
              <a
                href="https://www.sec.or.th"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-purple-600 transition-colors"
              >
                สำนักงาน ก.ล.ต. (SEC)
              </a>
              <button
                onClick={() => setIsReportOpen(true)}
                className="hover:text-purple-600 transition-colors font-medium"
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

      {/* Vibrant Magenta-Purple Bottom Accent Bar (matching reference photo bottom strip) */}
      <div className="w-full h-3 sm:h-3.5 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 shrink-0" />

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
