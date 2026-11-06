import React, { useState } from 'react';
import { TSI_QUESTIONS, RISK_PROFILES, calculateTSIRisk } from '../data/tsiQuestions';
import { RiskProfile, RiskLevel } from '../types/investor';
import { Award, CheckCircle2, AlertCircle, ArrowRight, HelpCircle, BarChart3, Sparkles } from 'lucide-react';

interface TSITestSectionProps {
  answers: Record<number, number>;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const TSITestSection: React.FC<TSITestSectionProps> = ({
  answers,
  onSelectAnswer,
  onNavigateToTab,
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const { totalScore, riskProfile, answeredCount } = calculateTSIRisk(answers);
  const totalQuestions = TSI_QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;

  const handleQuickFill = (presetLevel: RiskLevel) => {
    // Preset mock answers based on target risk level
    const presets: Record<RiskLevel, number[]> = {
      1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // low scores (all 1)
      2: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // scores = 20
      3: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // scores = 30-ish (balanced)
      4: [3, 2, 3, 2, 3, 2, 2, 3, 2, 2], // scores = 32-35 (high risk)
      5: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // scores = 40 (max risk)
    };
    const targetAnswers = presets[presetLevel];
    targetAnswers.forEach((ansIdx, qIdx) => {
      onSelectAnswer(qIdx + 1, ansIdx);
    });
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 1:
        return 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800';
      case 2:
        return 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800';
      case 3:
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
      case 4:
        return 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
      case 5:
        return 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Clean Minimalist Header */}
      <div className="space-y-2 border-b border-stone-200/80 dark:border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 04</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-[11px] text-amber-800 dark:text-amber-300 tracking-wider">ประเมินความเสี่ยง</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>แบบประเมินความเหมาะสมในการลงทุน (TSI Suitability)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          แบบประเมินความเหมาะสมในการลงทุน (TSI Suitability Test)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          พัฒนาตามหลักเกณฑ์ของสถาบันกองทุนพัฒนาบุคลากรตลาดหลักทรัพย์ (TSI) และสำนักงาน ก.ล.ต. เพื่อวัดความรู้ ประสบการณ์ ฐานะทางการเงิน และจิตวิทยาต่อความเสี่ยงของท่านอย่างแม่นยำ
        </p>
      </div>

      {/* Interactive Result Card */}
      <div className={`p-6 rounded-xl border transition-all ${getRiskColor(riskProfile.level)}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                ผลการประเมินความเสี่ยงของคุณ
              </span>
              <span className="text-xs font-mono">({riskProfile.titleEn})</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              ระดับ {riskProfile.level}: {riskProfile.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              {riskProfile.description}
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-current/20 pt-4 md:pt-0 md:pl-6 shrink-0 gap-1">
            <span className="text-xs text-slate-600 dark:text-slate-400">คะแนนที่ได้รวม</span>
            <div className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {totalScore} <span className="text-sm font-normal text-slate-500">/ 40</span>
            </div>
            <span className="text-[11px] text-slate-500">
              ตอบแล้ว {answeredCount}/{totalQuestions} ข้อ
            </span>
          </div>
        </div>

        {/* Score Breakdown Gauge */}
        <div className="mt-6 pt-6 border-t border-current/20">
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
            <span>ระดับ 1 (&lt;15)</span>
            <span>ระดับ 2 (15-21)</span>
            <span>ระดับ 3 (22-29)</span>
            <span>ระดับ 4 (30-36)</span>
            <span>ระดับ 5 (&gt;36)</span>
          </div>
          <div className="relative w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(5, (totalScore / 40) * 100))}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-300">
            <span>
              💡 <strong>สัดส่วนหุ้นที่แนะนำสูงสุด:</strong> ไม่เกิน {riskProfile.maxStockRatio}% ของพอร์ต
            </span>
            <span>
              📈 <strong>ผลตอบแทนคาดหวังเฉลี่ย:</strong> {riskProfile.expectedAnnualReturn} ต่อปี
            </span>
            <span>
              📉 <strong>ความผันผวนสูงสุดในอดีต (Drawdown):</strong> {riskProfile.historicalMaxDrawdown}
            </span>
          </div>
        </div>
      </div>

      {/* Preset Fast-Pick for Convenience */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>ทดลองผลประเมินระดับต่างๆ ได้อย่างรวดเร็ว:</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleQuickFill(1)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            ระดับ 1 (เสี่ยงต่ำ)
          </button>
          <button
            onClick={() => handleQuickFill(2)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            ระดับ 2 (ปานกลางต่ำ)
          </button>
          <button
            onClick={() => handleQuickFill(3)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            ระดับ 3 (ปานกลางสูง)
          </button>
          <button
            onClick={() => handleQuickFill(4)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            ระดับ 4 (เสี่ยงสูง)
          </button>
          <button
            onClick={() => handleQuickFill(5)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            ระดับ 5 (เสี่ยงสูงมาก)
          </button>
        </div>
      </div>

      {/* 10 Questions Accordion / List */}
      <div className="space-y-4">
        {TSI_QUESTIONS.map((q) => {
          const selectedOptionIdx = answers[q.id];
          const isAnswered = selectedOptionIdx !== undefined;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                isAnswered
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  : 'border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug">
                  {q.question}
                </h4>
                {isAnswered && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>+{q.options[selectedOptionIdx].score} คะแนน</span>
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectAnswer(q.id, idx)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-1 ring-emerald-600 dark:ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs sm:text-sm font-medium leading-relaxed">
                          {opt.text}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 shrink-0">
                          ({opt.score} คะแนน)
                        </span>
                      </div>
                      {opt.subtext && (
                        <span className="block mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                          {opt.subtext}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Banner: Prev to Goals, Next to Assets */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-[#FCFCFD] dark:bg-[#131A24]">
        <button
          onClick={() => onNavigateToTab('goal')}
          className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <span>← ย้อนกลับ: 03. เป้าหมายการลงทุน</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-stone-400 font-mono hidden md:inline">STEP 05 · สินทรัพย์ลงทุน</span>
          <button
            onClick={() => onNavigateToTab('assets')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs border border-amber-300/40 hover:shadow-sm"
          >
            <span>ไปที่สำรวจสินทรัพย์ลงทุน</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
