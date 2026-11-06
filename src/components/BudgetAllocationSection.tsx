import React, { useState, useMemo } from 'react';
import { PersonalFinance, InvestmentGoal, RiskProfile } from '../types/investor';
import { Calculator, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface BudgetAllocationSectionProps {
  finance: PersonalFinance;
  goal: InvestmentGoal;
  riskProfile: RiskProfile;
  onNavigateToTab: (tabId: string) => void;
}

export const BudgetAllocationSection: React.FC<BudgetAllocationSectionProps> = ({
  finance,
  goal,
  riskProfile,
  onNavigateToTab,
}) => {
  // Budget 50/30/20 standard target calculation based on income
  const income = finance.monthlyIncome || 0;
  const standardNeeds = Math.round(income * 0.5);
  const standardWants = Math.round(income * 0.3);
  const standardSavings = Math.round(income * 0.2);

  // Actual values
  const actualNeeds = finance.monthlyExpenses + finance.monthlyDebtPayment;
  const actualCashflow = Math.max(0, income - actualNeeds);
  // Default recommend safe DCA: min between 20% of income and actual net cashflow
  const defaultDCA = Math.max(1000, Math.min(actualCashflow, standardSavings || 5000));

  // DCA Simulator interactive states
  const [initialCapital, setInitialCapital] = useState<number>(finance.currentInvestments || 10000);
  const [monthlyDCA, setMonthlyDCA] = useState<number>(defaultDCA);
  const [returnRate, setReturnRate] = useState<number>(
    riskProfile.level === 1 ? 3 : riskProfile.level === 2 ? 4.5 : riskProfile.level === 3 ? 7 : riskProfile.level === 4 ? 9 : 12
  );
  const [simulationYears, setSimulationYears] = useState<number>(goal.timeHorizonYears || 10);

  // Future value calculation with compound interest
  const simulationResults = useMemo(() => {
    const monthlyRate = returnRate / 100 / 12;
    const totalMonths = simulationYears * 12;

    const yearlyData: {
      year: number;
      principal: number;
      interestEarned: number;
      totalValue: number;
    }[] = [];

    let currentVal = initialCapital;
    let totalInvested = initialCapital;

    for (let month = 1; month <= totalMonths; month++) {
      currentVal = (currentVal + monthlyDCA) * (1 + monthlyRate);
      totalInvested += monthlyDCA;

      if (month % 12 === 0) {
        const year = month / 12;
        yearlyData.push({
          year,
          principal: Math.round(totalInvested),
          interestEarned: Math.max(0, Math.round(currentVal - totalInvested)),
          totalValue: Math.round(currentVal),
        });
      }
    }

    const finalValue = Math.round(currentVal);
    const totalPrincipal = Math.round(totalInvested);
    const totalGains = Math.max(0, finalValue - totalPrincipal);
    const isGoalReached = goal.targetAmount > 0 ? finalValue >= goal.targetAmount : false;
    const goalDiff = finalValue - goal.targetAmount;

    return {
      finalValue,
      totalPrincipal,
      totalGains,
      isGoalReached,
      goalDiff,
      yearlyData,
    };
  }, [initialCapital, monthlyDCA, returnRate, simulationYears, goal.targetAmount]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Clean Minimalist Header */}
      <div className="space-y-2 border-b border-stone-200/80 dark:border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 07</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-[11px] text-amber-800 dark:text-amber-300 tracking-wider">จัดสรรเงินออม</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>การจัดสรรรายได้ & เครื่องคิดเลข DCA ทบต้น</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          การประเมินเงินลงทุนและการจัดสรรรายได้
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          ความลับของความมั่งคั่งไม่ได้อยู่ที่เงินก้อนโตในวันแรก แต่อยู่ที่วินัยในการจัดสรรรายได้แบ่งเก็บลงทุนอย่างสม่ำเสมอทุกเดือน (DCA) ให้พลังของดอกเบี้ยทบต้น (Compound Interest) ทำงานแทนคุณ
        </p>
      </div>

      {/* 50/30/20 Budgeting Rule Card */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              การจัดสรรรายได้ตามกฎ 50 / 30 / 20
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            ฐานรายได้: {income.toLocaleString()} บาท/เดือน
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 50% Needs */}
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">50% ค่าใช้จ่ายจำเป็น (Needs)</span>
              <span>เป้าหมาย</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {standardNeeds.toLocaleString()} <span className="text-xs font-normal text-slate-500">บาท</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>ค่าใช้จ่ายจริงปัจจุบัน:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {actualNeeds.toLocaleString()} บาท
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {actualNeeds > standardNeeds
                  ? '⚠️ รายจ่ายจำเป็นสูงเกิน 50% อาจทำให้เหลือเงินออมน้อย'
                  : '✓ รายจ่ายจำเป็นอยู่ในเกณฑ์ดี มีความคล่องตัวสูง'}
              </p>
            </div>
          </div>

          {/* 30% Wants */}
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">30% ความสุขและรางวัลชีวิต (Wants)</span>
              <span>เป้าหมาย</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {standardWants.toLocaleString()} <span className="text-xs font-normal text-slate-500">บาท</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p className="text-[11px] text-slate-400 leading-tight">
                ช้อปปิ้ง ท่องเที่ยว ทานอาหารนอกบ้าน ดูหนัง พักผ่อนหย่อนใจ เป็นงบประมาณที่ช่วยให้ไม่เครียดกับการประหยัดจนเกินไป
              </p>
            </div>
          </div>

          {/* 20% Savings & Invest */}
          <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 mb-1">
              <span className="font-semibold">20% เงินออมและลงทุน (Save & Invest)</span>
              <span>เป้าหมาย</span>
            </div>
            <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {standardSavings.toLocaleString()} <span className="text-xs font-normal text-slate-500">บาท</span>
            </div>
            <div className="mt-2 text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
              <div className="flex justify-between">
                <span>กระแสเงินสดเหลือจริง:</span>
                <span className="font-mono font-semibold">
                  {actualCashflow.toLocaleString()} บาท
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-tight">
                นี่คือ "เงินลงทุนที่ปลอดภัยต่อเดือน" ที่ควรตั้งตัดบัญชีอัตโนมัติ (DCA) ทันทีในวันเงินเดือนออก
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive DCA & Compound Interest Simulator */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              เครื่องคิดเลขจำลองการลงทุน DCA & ดอกเบี้ยทบต้น (Compound Interest)
            </h3>
          </div>
          <span className="text-xs text-slate-500">ปรับเปลี่ยนตัวเลขได้อิสระ</span>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Initial Capital */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              เงินลงทุนตั้งต้น (บาท)
            </label>
            <input
              type="number"
              min={0}
              step={1000}
              value={initialCapital}
              onChange={(e) => setInitialCapital(Math.max(0, Number(e.target.value) || 0))}
              className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Monthly DCA */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              เงินลงทุน DCA รายเดือน (บาท/เดือน)
            </label>
            <input
              type="number"
              min={500}
              step={500}
              value={monthlyDCA}
              onChange={(e) => setMonthlyDCA(Math.max(0, Number(e.target.value) || 0))}
              className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Expected Return */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              ผลตอบแทนคาดหวัง (% ต่อปี)
            </label>
            <input
              type="number"
              min={1}
              max={25}
              step={0.5}
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Years */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              ระยะเวลาลงทุน (ปี)
            </label>
            <input
              type="number"
              min={1}
              max={40}
              value={simulationYears}
              onChange={(e) => setSimulationYears(Math.max(1, Number(e.target.value) || 1))}
              className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                มูลค่าพอร์ตในอีก {simulationYears} ปีข้างหน้า
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-indigo-700 dark:text-indigo-300">
                {simulationResults.finalValue.toLocaleString()} <span className="text-sm font-normal text-slate-500">บาท</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                เงินต้นที่ทยอยใส่เข้าไปจริง (Principal)
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                {simulationResults.totalPrincipal.toLocaleString()} <span className="text-sm font-normal text-slate-500">บาท</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                กำไรจากผลตอบแทนทบต้น (Gains)
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                +{simulationResults.totalGains.toLocaleString()} <span className="text-sm font-normal text-slate-500">บาท</span>
              </div>
            </div>
          </div>

          {/* Goal Comparison Indicator */}
          {goal.targetAmount > 0 && (
            <div className="mt-5 pt-4 border-t border-indigo-100 dark:border-indigo-900/40 flex items-start gap-3">
              {simulationResults.isGoalReached ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <span className="font-semibold text-slate-900 dark:text-white block">
                  {simulationResults.isGoalReached
                    ? `🎉 ยอดเยี่ยม! พอร์ตคาดการณ์บรรลุเป้าหมาย ${goal.targetAmount.toLocaleString()} บาท ที่ตั้งไว้ (เกินเป้า +${simulationResults.goalDiff.toLocaleString()} บาท)`
                    : `⚠️ ยังขาดอีก ${Math.abs(simulationResults.goalDiff).toLocaleString()} บาท จึงจะถึงเป้าหมาย ${goal.targetAmount.toLocaleString()} บาท`}
                </span>
                {!simulationResults.isGoalReached && (
                  <span className="text-slate-500 dark:text-slate-400 mt-0.5 block">
                    คำแนะนำ: เพิ่มเงิน DCA รายเดือน หรือขยายระยะเวลาลงทุนอีก 2-3 ปี หรือเลือกจัดพอร์ตที่มีอัตราผลตอบแทนเติบโตเพิ่มขึ้น
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Year-by-Year Growth Table */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">ตารางการเติบโตรายปี (Year-by-Year Compound Breakdown)</span>
            <span>แสดงตามอัตราผลตอบแทน {returnRate}% ต่อปี</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 sticky top-0 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">สิ้นปีที่</th>
                  <th className="py-2.5 px-3 text-right">เงินต้นสะสม (บาท)</th>
                  <th className="py-2.5 px-3 text-right">ดอกเบี้ย/กำไรสะสม (บาท)</th>
                  <th className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">มูลค่าพอร์ตรวม (บาท)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono tabular-nums">
                {simulationResults.yearlyData.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-sans font-medium text-slate-700 dark:text-slate-300">
                      ปีที่ {row.year}
                    </td>
                    <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">
                      {row.principal.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      +{row.interestEarned.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-slate-900 dark:text-white">
                      {row.totalValue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Navigation Banner: Prev to Portfolio, Next to Caution */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-[#FCFCFD] dark:bg-[#131A24]">
        <button
          onClick={() => onNavigateToTab('portfolio')}
          className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <span>← ย้อนกลับ: 06. จัดสัดส่วนพอร์ต</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-stone-400 font-mono hidden md:inline">STEP 08 · ข้อควรระวัง & คำเตือน</span>
          <button
            onClick={() => onNavigateToTab('caution')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs border border-amber-300/40 hover:shadow-sm"
          >
            <span>ไปที่ข้อควรระวัง & คำเตือน</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
