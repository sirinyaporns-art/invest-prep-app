import React, { useState } from 'react';
import { INVESTMENT_LAWS, INVESTMENT_TAX_RULES, InvestmentLawItem, TaxRuleItem } from '../data/investmentLawsAndTaxes';
import { InvestmentTaxCalculator } from './InvestmentTaxCalculator';
import {
  Scale,
  ShieldCheck,
  Landmark,
  TrendingUp,
  FileText,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  BookOpen,
} from 'lucide-react';

interface LegalAndTaxSectionProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const LegalAndTaxSection: React.FC<LegalAndTaxSectionProps> = ({ onNavigateToTab }) => {
  const [activeSubView, setActiveSubView] = useState<'tax_rules' | 'calculator' | 'laws'>('tax_rules');
  const [selectedLaw, setSelectedLaw] = useState<InvestmentLawItem | null>(null);

  const getAgencyBadge = (agency: 'sec' | 'bot' | 'set') => {
    switch (agency) {
      case 'sec':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
            <span>ก.ล.ต. (SEC)</span>
          </span>
        );
      case 'bot':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-950/80 dark:text-pink-300 border border-pink-300 dark:border-fuchsia-800">
            <Landmark className="w-3.5 h-3.5 text-fuchsia-700 dark:text-fuchsia-400 font-semibold" />
            <span>ธปท. (BOT)</span>
          </span>
        );
      case 'set':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-950/80 dark:text-fuchsia-300 border border-fuchsia-300 dark:border-fuchsia-800">
            <TrendingUp className="w-3.5 h-3.5 text-fuchsia-700 dark:text-fuchsia-400" />
            <span>ตลาดหลักทรัพย์ฯ (SET)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-purple-700 dark:text-purple-400 font-bold font-semibold tracking-wider">
            LEGAL & TAXATION
          </span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="font-medium text-fuchsia-700 dark:text-fuchsia-400 font-semibold">กฎหมายและภาษีการลงทุน</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>มาตรฐาน 3 หน่วยงานกำกับดูแลไทย</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              กฎหมายการลงทุนและคู่มือภาษีสินทรัพย์ทุกประเภท
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mt-1">
              ทำความเข้าใจสิทธิผู้ลงทุน เกณฑ์กำกับดูแลของ <strong>สำนักงาน ก.ล.ต.</strong>, <strong>ธนาคารแห่งประเทศไทย (ธปท.)</strong> และ <strong>ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</strong> พร้อมหลักเกณฑ์การเสียภาษีและระบบจำลองคำนวณภาษี
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              อัปเดตเกณฑ์ภาษีล่าสุด
            </span>
          </div>
        </div>
      </div>

      {/* Sub-View Switcher Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
        <button
          onClick={() => setActiveSubView('tax_rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubView === 'tax_rules'
              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>เกณฑ์ภาษีแยกตามสินทรัพย์</span>
        </button>

        <button
          onClick={() => setActiveSubView('calculator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubView === 'calculator'
              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>ระบบคำนวณภาษีการลงทุน</span>
        </button>

        <button
          onClick={() => setActiveSubView('laws')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubView === 'laws'
              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>กฎหมายและการคุ้มครองผู้ลงทุน</span>
        </button>
      </div>

      {/* View 1: Tax Rules Table / Cards */}
      {activeSubView === 'tax_rules' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 gap-4">
            {INVESTMENT_TAX_RULES.map((rule) => (
              <div
                key={rule.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {rule.assetType}
                  </h3>
                  {getAgencyBadge(rule.agency)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                      กำไรจากส่วนต่างราคา (Capital Gain)
                    </span>
                    <span className="font-bold text-purple-800 dark:text-purple-300 text-sm">
                      {rule.capitalGainTax}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                      เงินปันผลหรือดอกเบี้ยรับ (Dividend / Interest)
                    </span>
                    <span className="font-bold text-fuchsia-800 dark:text-pink-300 text-sm">
                      {rule.dividendOrInterestTax}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-200">เงื่อนไขทางกฎหมาย:</strong>{' '}
                    {rule.specialConditions}
                  </div>
                  <div className="p-3 rounded-xl bg-fuchsia-50/70 dark:bg-fuchsia-950/30 border border-pink-200/70 dark:border-fuchsia-800/50 text-fuchsia-900 dark:text-pink-200 leading-relaxed">
                    <strong>💡 เคล็ดลับภาษีสำหรับมือใหม่:</strong> {rule.taxTips}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick link to Tax Calculator */}
          <div className="p-5 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base">ต้องการจำลองคำนวณภาษีจริงหรือไม่?</h4>
              <p className="text-xs text-purple-100 mt-0.5">
                คลิกเพื่อใช้ระบบคำนวณเครดิตภาษีเงินปันผล หรือคำนวณเงินประหยัดภาษีจากกองทุนลดหย่อน
              </p>
            </div>
            <button
              onClick={() => setActiveSubView('calculator')}
              className="px-4 py-2.5 rounded-xl bg-pink-300 hover:bg-pink-400 text-purple-950 font-bold text-xs shrink-0 transition-colors"
            >
              เปิดเครื่องคำนวณภาษี →
            </button>
          </div>
        </div>
      )}

      {/* View 2: Interactive Tax Calculator */}
      {activeSubView === 'calculator' && (
        <div className="space-y-6 animate-fadeIn">
          <InvestmentTaxCalculator />
        </div>
      )}

      {/* View 3: Laws and Investor Protections */}
      {activeSubView === 'laws' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 gap-5">
            {INVESTMENT_LAWS.map((law) => (
              <div
                key={law.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                      {law.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{law.lawName}</span>
                  </div>
                  {getAgencyBadge(law.agency)}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {law.summary}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    มาตรการคุ้มครองผู้ลงทุนที่สำคัญ:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {law.keyProtections.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
                  <strong>สิทธิและการคุ้มครองของคุณ:</strong> {law.investorRights}
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href={law.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <span>อ่านตัวบทกฎหมายทางการ ({law.agencyName})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
