import React, { useMemo } from 'react';
import { RiskProfile, InvestmentGoal, PersonalFinance, AssetClassItem } from '../types/investor';
import { PieChart, TrendingUp, Layers, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface PortfolioAllocationSectionProps {
  riskProfile: RiskProfile;
  goal: InvestmentGoal;
  finance: PersonalFinance;
  assets: AssetClassItem[];
  onNavigateToTab: (tabId: string) => void;
}

interface AllocationSlice {
  assetName: string;
  category: string;
  percentage: number;
  color: string;
  suggestedInstruments: string;
  rationale: string;
}

export const PortfolioAllocationSection: React.FC<PortfolioAllocationSectionProps> = ({
  riskProfile,
  goal,
  finance,
  assets,
  onNavigateToTab,
}) => {
  // Compute customized portfolio allocation based on TSI level + horizon + interests
  const allocation = useMemo<AllocationSlice[]>(() => {
    const horizon = goal.timeHorizonYears;
    const level = riskProfile.level;

    // Special rule: if horizon <= 1 year, capital preservation is mandatory regardless of TSI
    if (horizon <= 1) {
      return [
        {
          assetName: 'เงินฝากดอกเบี้ยสูง (e-Savings)',
          category: 'สภาพคล่อง',
          percentage: 60,
          color: '#0ea5e9',
          suggestedInstruments: 'Dime! Save, KKP Start Saving, LHB You',
          rationale: 'เงินที่ต้องใช้ใน 1 ปีห้ามขาดทุนเด็ดขาด ต้องเก็บในบัญชีที่คุ้มครองเงินต้นและถอนได้ทันที',
        },
        {
          assetName: 'กองทุนรวมตลาดเงิน / พันธบัตรระยะสั้น',
          category: 'ตราสารหนี้สั้น',
          percentage: 40,
          color: '#3b82f6',
          suggestedInstruments: 'K-MONEY, SCBTMF, T-CASH',
          rationale: 'สร้างผลตอบแทนชนะเงินฝากทั่วไปเล็กน้อยโดยแทบไม่มีความเสี่ยงต่อเงินต้น',
        },
      ];
    }

    // Special rule: horizon 2-3 years (moderate constraints)
    if (horizon <= 3 && level >= 3) {
      return [
        {
          assetName: 'เงินฝาก / กองทุนตลาดเงิน',
          category: 'สภาพคล่อง',
          percentage: 20,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, Money Market Fund',
          rationale: 'รักษาสภาพคล่องเผื่อความจำเป็นเร่งด่วน',
        },
        {
          assetName: 'ตราสารหนี้ระยะกลาง / พันธบัตรรัฐบาล',
          category: 'ตราสารหนี้',
          percentage: 55,
          color: '#3b82f6',
          suggestedInstruments: 'K-FIXED, SCBFST, พันธบัตรวอลเล็ต สบม.',
          rationale: 'รับดอกเบี้ยสม่ำเสมอ ผันผวนต่ำ เหมาะกับเงิน 2-3 ปี',
        },
        {
          assetName: 'กองทุนดัชนีหุ้น / หุ้นปันผล',
          category: 'ตราสารทุน',
          percentage: 20,
          color: '#10b981',
          suggestedInstruments: 'TISCOHD, SCBDV, B-INNOTECH (สัดส่วนน้อย)',
          rationale: 'จำกัดสัดส่วนหุ้นไม่เกิน 20% เพื่อไม่ให้กระทบเป้าหมาย 3 ปี',
        },
        {
          assetName: 'ทองคำแท่ง / กองทุนทองคำ',
          category: 'ทางเลือก',
          percentage: 5,
          color: '#f59e0b',
          suggestedInstruments: 'K-GOLD, SCBGOLD',
          rationale: 'ป้องกันเงินเฟ้อและการอ่อนค่าของค่าเงิน',
        },
      ];
    }

    // Standard Allocation based on TSI Risk Level 1 to 5
    if (level === 1) {
      return [
        {
          assetName: 'เงินฝากออมทรัพย์ดอกเบี้ยสูง',
          category: 'สภาพคล่อง',
          percentage: 50,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings ธนาคารพาณิชย์',
          rationale: 'ความเสี่ยงศูนย์ เงินต้นอยู่ครบ 100%',
        },
        {
          assetName: 'พันธบัตรรัฐบาลและตราสารหนี้ระยะสั้น',
          category: 'ตราสารหนี้',
          percentage: 45,
          color: '#3b82f6',
          suggestedInstruments: 'กองทุนรวมตราสารหนี้ภาครัฐ (K-TREASURY, SCBFP)',
          rationale: 'รับดอกเบี้ยสม่ำเสมอ ความน่าเชื่อถือสูงสุด',
        },
        {
          assetName: 'กองทุนรวมผสมความเสี่ยงต่ำ',
          category: 'ผสม',
          percentage: 5,
          color: '#10b981',
          suggestedInstruments: 'กองทุน Conservative Allocation',
          rationale: 'กระจายลงทุนเล็กน้อยเพื่อเรียนรู้ตลาด',
        },
      ];
    }

    if (level === 2) {
      return [
        {
          assetName: 'เงินฝากและกองทุนตลาดเงิน',
          category: 'สภาพคล่อง',
          percentage: 20,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, K-MONEY',
          rationale: 'รักษาสภาพคล่องสำรองยามจำเป็น',
        },
        {
          assetName: 'ตราสารหนี้และพันธบัตรคุณภาพดี',
          category: 'ตราสารหนี้',
          percentage: 60,
          color: '#3b82f6',
          suggestedInstruments: 'K-FIXED, SCBFIXED, พันธบัตรออมทรัพย์',
          rationale: 'แกนหลักในการสร้างกระแสผลตอบแทนสม่ำเสมอ',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นไทยปันผลสูง',
          category: 'ตราสารทุน',
          percentage: 15,
          color: '#10b981',
          suggestedInstruments: 'TISCOHD, SCBSETEQ',
          rationale: 'รับเงินปันผลและโอกาสเติบโตชนะเงินเฟ้อ',
        },
        {
          assetName: 'กองทรัสต์อสังหาริมทรัพย์ (REITs)',
          category: 'ทางเลือก',
          percentage: 5,
          color: '#f59e0b',
          suggestedInstruments: 'CPNREIT, WHART, กองทุน K-GPROP',
          rationale: 'กระจายความเสี่ยงไปในสินทรัพย์ที่สร้างค่าเช่า',
        },
      ];
    }

    if (level === 3) {
      return [
        {
          assetName: 'เงินสดและตราสารหนี้สภาพคล่อง',
          category: 'สภาพคล่อง',
          percentage: 15,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, กองทุนรวมตลาดเงิน',
          rationale: 'กันชนลดความผันผวนและรอจังหวะซื้อเมื่อตลาดปรับฐาน',
        },
        {
          assetName: 'ตราสารหนี้และพันธบัตรรัฐบาล',
          category: 'ตราสารหนี้',
          percentage: 35,
          color: '#3b82f6',
          suggestedInstruments: 'K-CBOND, SCBFP',
          rationale: 'สร้างสมดุลความมั่นคงให้กับพอร์ตโฟลิโอ',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นไทย (SET50 / SET100)',
          category: 'หุ้นไทย',
          percentage: 20,
          color: '#10b981',
          suggestedInstruments: 'SCBSET50, TDEX, B-FUTURE',
          rationale: 'หุ้นผู้นำกลุ่มธุรกิจหลักในประเทศ',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นโลก / ETF สหรัฐฯ (S&P 500)',
          category: 'หุ้นโลก',
          percentage: 20,
          color: '#6366f1',
          suggestedInstruments: 'SCBS&P500, K-WORLDX, B-BHARAT',
          rationale: 'เกาะกระแสเศรษฐกิจและเทคโนโลยีชั้นนำของโลก',
        },
        {
          assetName: 'ทองคำแท่ง / REITs',
          category: 'ทางเลือก',
          percentage: 10,
          color: '#f59e0b',
          suggestedInstruments: 'K-GOLD, กองทุนรวมอสังหาริมทรัพย์',
          rationale: 'ลดความผันผวนของพอร์ตและป้องกันเงินเฟ้อ',
        },
      ];
    }

    if (level === 4) {
      return [
        {
          assetName: 'เงินสด / กองทุนตลาดเงิน',
          category: 'สภาพคล่อง',
          percentage: 10,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, กองทุนตลาดเงิน',
          rationale: 'สำรองสภาพคล่องเพื่อรอจังหวะสะสมหุ้นราคาถูก',
        },
        {
          assetName: 'ตราสารหนี้ / พันธบัตร',
          category: 'ตราสารหนี้',
          percentage: 15,
          color: '#3b82f6',
          suggestedInstruments: 'K-FIXED, SCBFIXED',
          rationale: 'ตัวดูดซับแรงกระแทกเมื่อเกิดวิกฤตเศรษฐกิจ',
        },
        {
          assetName: 'กองทุน ETF สหรัฐฯ & หุ้นโลก (S&P500 / All-World)',
          category: 'หุ้นโลก',
          percentage: 40,
          color: '#6366f1',
          suggestedInstruments: 'SCBS&P500, ONE-UGG, K-USA, DR NDX01',
          rationale: 'เครื่องยนต์หลักในการเร่งการเติบโตของเงินทุนระยะยาว',
        },
        {
          assetName: 'หุ้นไทยเติบโตและปันผล',
          category: 'หุ้นไทย',
          percentage: 20,
          color: '#10b981',
          suggestedInstruments: 'SCBSET50, กองทุนหุ้นไทยเติบโต, TISCOHD',
          rationale: 'โอกาสรับปันผลสม่ำเสมอและสิทธิประโยชน์ทางภาษี',
        },
        {
          assetName: 'ทองคำ / REITs อสังหาริมทรัพย์',
          category: 'ทางเลือก',
          percentage: 15,
          color: '#f59e0b',
          suggestedInstruments: 'K-GOLD, CPNREIT, WHART',
          rationale: 'กระจายความเสี่ยงข้ามกลุ่มสินทรัพย์',
        },
      ];
    }

    // Level 5
    return [
      {
        assetName: 'เงินสดสำรองรอซื้อ',
        category: 'สภาพคล่อง',
        percentage: 5,
        color: '#0ea5e9',
        suggestedInstruments: 'e-Savings',
        rationale: 'กระสุนสำรองเพื่อช้อนซื้อเวลาตลาดตื่นตระหนก',
      },
      {
        assetName: 'หุ้นต่างประเทศ & เมกะเทรนด์โลก (AI, Cloud, Semis)',
        category: 'หุ้นโลก',
        percentage: 50,
        color: '#6366f1',
        suggestedInstruments: 'SCBS&P500, K-CLOUDN, ONE-UGG, DRx AAPL80X',
        rationale: 'มุ่งเน้นผลตอบแทนสูงสุดจากนวัตกรรมพลิกโลก',
      },
      {
        assetName: 'หุ้นไทยเติบโต & บลูชิพ',
        category: 'หุ้นไทย',
        percentage: 20,
        color: '#10b981',
        suggestedInstruments: 'SCBSET50, หุ้นรายตัวพื้นฐานแกร่ง',
        rationale: 'สร้างสมดุลด้วยธุรกิจที่มีกระแสเงินสดในประเทศ',
      },
      {
        assetName: 'ทองคำและสินค้าโภคภัณฑ์',
        category: 'ทางเลือก',
        percentage: 15,
        color: '#f59e0b',
        suggestedInstruments: 'K-GOLD, SCBGOLD',
        rationale: 'สร้างภูมิคุ้มกันต่อวิกฤตการเงินและภูมิรัฐศาสตร์',
      },
      {
        assetName: 'สินทรัพย์ดิจิทัล / Alternative High-Growth',
        category: 'คริปโทฯ',
        percentage: 10,
        color: '#ec4899',
        suggestedInstruments: 'Bitcoin, Ethereum (ผ่านศูนย์ซื้อขาย ก.ล.ต.)',
        rationale: 'เงินเสี่ยงสูงเพื่อโอกาสผลตอบแทนก้าวกระโดด',
      },
    ];
  }, [riskProfile.level, goal.timeHorizonYears]);

  const strategyTitle = useMemo(() => {
    if (goal.timeHorizonYears <= 1) return 'กลยุทธ์รักษาเงินต้นเข้มงวด (Short-term Capital Preservation)';
    if (riskProfile.level <= 2) return 'กลยุทธ์เน้นรายได้และกระแสเงินสดสม่ำเสมอ (Income & Yield Focus)';
    if (riskProfile.level === 3) return 'กลยุทธ์สมดุลแบบ Core-Satellite (Balanced Core-Satellite)';
    if (riskProfile.level === 4) return 'กลยุทธ์พอร์ตเติบโตระยะยาวทั่วโลก (Global Long-term Wealth Compounder)';
    return 'กลยุทธ์เชิงรุกผลตอบแทนก้าวกระโดด (High-Beta Growth & Innovation)';
  }, [riskProfile.level, goal.timeHorizonYears]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Clean Minimalist Header */}
      <div className="space-y-2 border-b border-stone-200/80 dark:border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 06</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-[11px] text-amber-800 dark:text-amber-300 tracking-wider">จัดสรรพอร์ต</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>จัดสรรพอร์ตตามปัจจัยส่วนบุคคล</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          พอร์ตการลงทุนที่เหมาะสมสำหรับคุณ
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          วิเคราะห์สังเคราะห์จากผลการประเมินความเสี่ยง TSI (ระดับ {riskProfile.level}), กรอบเวลาเป้าหมาย ({goal.timeHorizonYears} ปี), และสถานะทางการเงินจริง เพื่อให้คุณเริ่มต้นลงทุนได้อย่างถูกต้อง ปลอดภัย และมีวินัย
        </p>
      </div>

      {/* Strategy Blueprint Banner (Green-Brown Earth Accent) */}
      <div className="p-6 sm:p-7 rounded-2xl border border-amber-900/15 dark:border-emerald-900/40 bg-amber-50/40 dark:bg-emerald-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>พิมพ์เขียวกลยุทธ์ที่แนะนำสำหรับคุณ</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              {strategyTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              พอร์ตนี้เน้นกระจายความเสี่ยงหลายสินทรัพย์เพื่อลดความผันผวน โดยมีสัดส่วนหุ้นและสินทรัพย์เสี่ยงรวมกันไม่เกิน {riskProfile.maxStockRatio}% ตามเกณฑ์ความปลอดภัย
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0 border-t sm:border-t-0 sm:border-l border-emerald-200 dark:border-emerald-900/60 pt-3 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">ผลตอบแทนเฉลี่ยคาดหวัง</span>
              <span className="text-lg font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                {riskProfile.expectedAnnualReturn}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">ความผันผวนสูงสุดในอดีต</span>
              <span className="text-lg font-bold font-mono tabular-nums text-slate-700 dark:text-slate-300">
                {riskProfile.historicalMaxDrawdown}
              </span>
            </div>
          </div>
        </div>

        {/* Stacked Visual Bar */}
        <div className="mt-6">
          <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner">
            {allocation.map((item, idx) => (
              <div
                key={idx}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full transition-all duration-300 relative group"
                title={`${item.assetName}: ${item.percentage}%`}
              />
            ))}
          </div>

          {/* Legend Items */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {allocation.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {item.assetName}
                </span>
                <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400 font-bold">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Allocation Breakdown Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              สัดส่วนสินทรัพย์และเครื่องมือลงทุนแนะนำ (Sample Instruments)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">รวม 100%</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                <th className="py-3 px-4">ประเภทสินทรัพย์</th>
                <th className="py-3 px-3 text-right">สัดส่วน (%)</th>
                <th className="py-3 px-4">กองทุน / ตราสารตัวอย่างที่นิยมในไทย</th>
                <th className="py-3 px-4">บทบาทและเหตุผลในพอร์ต</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {allocation.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.assetName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold tabular-nums text-slate-900 dark:text-white">
                    {item.percentage}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {item.suggestedInstruments}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.rationale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Beginner Advice Checklist */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          คำแนะนำในการบริหารพอร์ตสำหรับมือใหม่
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Rebalancing ปีละ 1 ครั้ง:</strong> ตรวจสอบสัดส่วนพอร์ตปีละครั้ง หากหุ้นขึ้นจนเกินสัดส่วน ให้ขายส่วนกำไรมาซื้อตราสารหนี้เพื่อคงระดับความเสี่ยงเดิม</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>เน้น DCA รายเดือน:</strong> ทยอยซื้อในวันเดียวกันของทุกเดือน (เช่น วันเงินเดือนออก) ไม่ต้องจับจังหวะตลาด</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>ไม่ตื่นตระหนกยามตลาดตก:</strong> ในอดีตตลาดหุ้นมีช่วงวิกฤตเสมอ แต่ระยะยาวมากกว่า 5-10 ปี ดัชนีโลกสามารถทำจุดสูงสุดใหม่ได้เสมอ</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>ตรวจสอบค่าธรรมเนียม:</strong> เลือกลงทุนในกองทุนดัชนีที่มีค่าธรรมเนียมการจัดการต่ำ (Total Expense Ratio ไม่เกิน 0.5 - 1.0% ต่อปี)</span>
          </div>
        </div>
      </div>

      {/* Navigation Banner: Prev to Assets, Next to Budget & DCA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-[#FCFCFD] dark:bg-[#131A24]">
        <button
          onClick={() => onNavigateToTab('assets')}
          className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <span>← ย้อนกลับ: 05. สินทรัพย์ลงทุน</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-stone-400 font-mono hidden md:inline">STEP 07 · จัดสรรรายได้ & DCA</span>
          <button
            onClick={() => onNavigateToTab('budget')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs border border-amber-300/40 hover:shadow-sm"
          >
            <span>ไปที่จัดสรรรายได้ & DCA</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
