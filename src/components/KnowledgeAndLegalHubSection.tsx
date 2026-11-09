import React, { useState, useEffect } from 'react';
import { InvestmentGlossarySection } from './InvestmentGlossarySection';
import { LegalAndTaxSection } from './LegalAndTaxSection';
import { CautionSection } from './CautionSection';
import { BookOpen, Scale, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface KnowledgeAndLegalHubSectionProps {
  initialSubTab?: 'glossary' | 'tax_legal' | 'caution';
  onOpenReport: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export const KnowledgeAndLegalHubSection: React.FC<KnowledgeAndLegalHubSectionProps> = ({
  initialSubTab = 'glossary',
  onOpenReport,
  onNavigateToTab,
}) => {
  const [subTab, setSubTab] = useState<'glossary' | 'tax_legal' | 'caution'>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overarching Hub Header */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-purple-700 dark:text-purple-400 font-bold font-semibold tracking-wider">
            KNOWLEDGE & REGULATORY HUB
          </span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="font-medium text-fuchsia-700 dark:text-fuchsia-400 font-semibold">ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>มาตรฐาน 3 หน่วยงานกำกับดูแลไทย</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mt-1">
              รวบรวมคลังคำศัพท์ กฎหมายคุ้มครองสิทธิผู้ลงทุน เกณฑ์ภาษีพร้อมเครื่องคิดเลขคำนวณภาษี และเกราะป้องกันมิจฉาชีพ ตามมาตรฐาน <strong>สำนักงาน ก.ล.ต.</strong>, <strong>ธนาคารแห่งประเทศไทย (ธปท.)</strong> และ <strong>ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</strong> ไว้ครบถ้วนในหมวดเดียว
            </p>
          </div>
        </div>

        {/* 3 Main Categories Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <button
            onClick={() => setSubTab('glossary')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
              subTab === 'glossary'
                ? 'bg-purple-50/90 dark:bg-purple-950/50 border-purple-600 dark:border-purple-500 shadow-2xs ring-2 ring-purple-600/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  subTab === 'glossary'
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  1. คลังคำศัพท์การลงทุน
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  18 คำศัพท์มาตรฐาน ค้นหา & ตัวกรอง
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSubTab('tax_legal')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
              subTab === 'tax_legal'
                ? 'bg-purple-50/90 dark:bg-purple-950/50 border-purple-600 dark:border-purple-500 shadow-2xs ring-2 ring-purple-600/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  subTab === 'tax_legal'
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  2. กฎหมาย & ภาษีการลงทุน
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  เกณฑ์ภาษีทุกสินทรัพย์ + เครื่องคิดเลขภาษี
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSubTab('caution')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
              subTab === 'caution'
                ? 'bg-purple-50/90 dark:bg-purple-950/50 border-purple-600 dark:border-purple-500 shadow-2xs ring-2 ring-purple-600/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  subTab === 'caution'
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-pink-500" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  3. ข้อควรระวัง & มิจฉาชีพ
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Scam Red-Flag Detector & สายด่วน 1207
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Sub-Tab Content Rendering */}
      <div>
        {subTab === 'glossary' && (
          <InvestmentGlossarySection onNavigateToTab={onNavigateToTab} />
        )}

        {subTab === 'tax_legal' && (
          <LegalAndTaxSection onNavigateToTab={onNavigateToTab} />
        )}

        {subTab === 'caution' && (
          <CautionSection onOpenReport={onOpenReport} />
        )}
      </div>
    </div>
  );
};
