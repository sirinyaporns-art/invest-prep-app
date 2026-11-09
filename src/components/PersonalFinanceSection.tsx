import React from 'react';
import { PersonalFinance } from '../types/investor';
import { Wallet, PiggyBank, CreditCard, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';

interface PersonalFinanceSectionProps {
  finance: PersonalFinance;
  onChange: (updated: PersonalFinance) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const PersonalFinanceSection: React.FC<PersonalFinanceSectionProps> = ({
  finance,
  onChange,
  onNavigateToTab,
}) => {
  const handleNumberChange = (field: keyof PersonalFinance, value: string) => {
    const num = Number(value.replace(/[^0-9.-]/g, '')) || 0;
    onChange({
      ...finance,
      [field]: Math.max(0, num),
    });
  };

  // Calculations
  const monthlyIncomeOrExpenses = finance.monthlyIncome > 0 || finance.monthlyExpenses > 0;
  const monthlyCashflow = finance.monthlyIncome - finance.monthlyExpenses - finance.monthlyDebtPayment;
  const savingsRate = finance.monthlyIncome > 0
    ? Math.max(0, Math.round((monthlyCashflow / finance.monthlyIncome) * 100))
    : 0;
  const dtiRatio = finance.monthlyIncome > 0
    ? Math.round((finance.monthlyDebtPayment / finance.monthlyIncome) * 100)
    : 0;
  const emergencyCoverageMonths = finance.monthlyExpenses > 0
    ? Number((finance.emergencyFund / finance.monthlyExpenses).toFixed(1))
    : 0;
  const targetEmergencyFund = finance.monthlyExpenses * 6;
  const emergencyGap = Math.max(0, targetEmergencyFund - finance.emergencyFund);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header (Green & Brown Earth Tone - No Japanese) */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-purple-700 dark:text-purple-400 font-bold font-semibold tracking-wider">STEP 01</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="font-medium text-fuchsia-700 dark:text-fuchsia-400 font-semibold">การเงินส่วนบุคคล</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>ตรวจสุขภาพการเงินและขีดความสามารถ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ข้อมูลส่วนตัวและสถานะทางการเงินปัจจุบัน
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          ความสามารถในการรับความเสี่ยงไม่ได้ขึ้นอยู่กับความกล้า แต่ขึ้นอยู่กับรากฐานทางการเงินจริง กรอกข้อมูลด้านล่างอย่างเรียบง่ายและตรงไปตรงมา เพื่อวินิจฉัยสภาพคล่องและเงินที่พร้อมลงทุนอย่างสบายใจ
        </p>
      </div>

      {/* Real-time Financial Health Diagnostic Cards (Green & Brown Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Monthly Cash Flow */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] transition-all hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">กระแสเงินสดคงเหลือ / เดือน</span>
            <div className="w-7 h-7 rounded-lg bg-purple-100/70 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
            {monthlyIncomeOrExpenses ? (monthlyCashflow >= 0 ? '+' : '') : ''}
            {monthlyCashflow.toLocaleString()} <span className="text-xs font-normal text-slate-500">บาท</span>
          </div>
          <div className="mt-3 text-[11px]">
            {monthlyIncomeOrExpenses ? (
              monthlyCashflow > 0 ? (
                <span className="inline-flex items-center gap-1 text-purple-800 dark:text-purple-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  เป็นบวก สามารถจัดสรรไปลงทุนได้
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  ตึงตัว ควรปรับสมดุลรายจ่ายก่อน
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                รอการกรอกรายรับ-รายจ่าย
              </span>
            )}
          </div>
        </div>

        {/* Savings Rate */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] transition-all hover:border-pink-300 dark:hover:border-fuchsia-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">อัตราการออม (Savings Rate)</span>
            <div className="w-7 h-7 rounded-lg bg-fuchsia-100/70 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300 flex items-center justify-center">
              <PiggyBank className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
            {savingsRate}%
          </div>
          <div className="mt-3 text-[11px]">
            {finance.monthlyIncome > 0 ? (
              savingsRate >= 20 ? (
                <span className="inline-flex items-center gap-1 text-fuchsia-800 dark:text-pink-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600" />
                  เกณฑ์มาตรฐานที่ดี (แนะนำ ≥ 20%)
                </span>
              ) : savingsRate > 0 ? (
                <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  น้อยกว่าเกณฑ์ 20% พยายามเก็บเพิ่ม
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  ไม่มีเงินออมเหลือในแต่ละเดือน
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                รอการกรอกรายได้
              </span>
            )}
          </div>
        </div>

        {/* Debt to Income Ratio */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] transition-all hover:border-purple-300 dark:hover:border-purple-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">ภาระหนี้ต่อรายได้ (DTI)</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
            {dtiRatio}%
          </div>
          <div className="mt-3 text-[11px]">
            {finance.monthlyIncome > 0 ? (
              dtiRatio <= 30 ? (
                <span className="inline-flex items-center gap-1 text-purple-800 dark:text-purple-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  ปลอดภัย (ต่ำกว่า 30%)
                </span>
              ) : dtiRatio <= 45 ? (
                <span className="inline-flex items-center gap-1 text-fuchsia-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  ปานกลาง (ระวังหนี้เพิ่ม)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  เสี่ยงสูง ควรเคลียร์หนี้ก่อน
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                รอการกรอกข้อมูลหนี้สิน
              </span>
            )}
          </div>
        </div>

        {/* Emergency Fund Coverage */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] transition-all hover:border-pink-300 dark:hover:border-fuchsia-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">เงินสำรองฉุกเฉิน</span>
            <div className="w-7 h-7 rounded-lg bg-fuchsia-100/70 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300 flex items-center justify-center">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
            {emergencyCoverageMonths} <span className="text-xs font-normal text-slate-500">เดือน</span>
          </div>
          <div className="mt-3 text-[11px]">
            {finance.monthlyExpenses > 0 ? (
              emergencyCoverageMonths >= 6 ? (
                <span className="inline-flex items-center gap-1 text-purple-800 dark:text-purple-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  เพียงพอดีมาก (≥ 6 เดือน)
                </span>
              ) : emergencyCoverageMonths >= 3 ? (
                <span className="inline-flex items-center gap-1 text-fuchsia-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  พอใช้ได้ (3-6 เดือน)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  ขาดอีก {emergencyGap.toLocaleString()} บาท
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                รอการกรอกเงินสำรอง
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Inputs Form in Warm Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-purple-700 rounded-full" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              1. ข้อมูลส่วนบุคคลพื้นฐาน
            </h3>
          </div>
          <p className="text-xs text-slate-500 ml-3.5">
            ช่วยประเมินระยะเวลาการลงทุนและช่วงวัยที่เหมาะสม
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
            {/* Age */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                อายุ (ปี)
              </label>
              <input
                type="number"
                min={15}
                max={100}
                value={finance.age || ''}
                onChange={(e) => handleNumberChange('age', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                placeholder="เช่น 28"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                เพศ
              </label>
              <select
                value={finance.gender}
                onChange={(e) => onChange({ ...finance, gender: e.target.value as PersonalFinance['gender'] })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
              >
                <option value="unspecified">-- ไม่ประสงค์ระบุ / ยังไม่เลือก --</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">เพศทางเลือก / อื่นๆ</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                อาชีพ / แหล่งที่มาของรายได้
              </label>
              <select
                value={finance.occupation}
                onChange={(e) => onChange({ ...finance, occupation: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
              >
                <option value="">-- เลือกอาชีพ / แหล่งรายได้ --</option>
                <option value="พนักงานบริษัทเอกชน (ประจำ)">พนักงานบริษัทเอกชน (ประจำ)</option>
                <option value="ข้าราชการ / รัฐวิสาหกิจ">ข้าราชการ / รัฐวิสาหกิจ</option>
                <option value="เจ้าของธุรกิจ / ผู้ประกอบการ">เจ้าของธุรกิจ / ผู้ประกอบการ</option>
                <option value="ฟรีแลนซ์ / ประกอบอาชีพอิสระ">ฟรีแลนซ์ / ประกอบอาชีพอิสระ</option>
                <option value="นักเรียน / นักศึกษา">นักเรียน / นักศึกษา</option>
                <option value="เกษียณอายุแล้ว">เกษียณอายุแล้ว</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-fuchsia-700 rounded-full" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              2. รายรับ รายจ่าย และภาระหนี้สินต่อเดือน
            </h3>
          </div>
          <p className="text-xs text-slate-500 ml-3.5">
            เพื่อคำนวณเงินลงทุนที่ปลอดภัย โดยไม่รบกวนการดำรงชีวิตประจำวัน
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
            {/* Monthly Income */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                รายได้รวมต่อเดือน (บาท)
              </label>
              <input
                type="text"
                value={finance.monthlyIncome ? finance.monthlyIncome.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('monthlyIncome', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                placeholder="เช่น 35,000"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">เงินเดือนประจำ + รายได้เสริมเฉลี่ย</span>
            </div>

            {/* Monthly Fixed Expenses */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                รายจ่ายประจำ & ดำรงชีพ/เดือน (บาท)
              </label>
              <input
                type="text"
                value={finance.monthlyExpenses ? finance.monthlyExpenses.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('monthlyExpenses', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                placeholder="เช่น 18,000"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">ค่ากิน ค่าเช่าห้อง ค่าสาธารณูปโภค</span>
            </div>

            {/* Monthly Debt Payment */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                ค่างวดผ่อนชำระหนี้/เดือน (บาท)
              </label>
              <input
                type="text"
                value={finance.monthlyDebtPayment ? finance.monthlyDebtPayment.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('monthlyDebtPayment', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                placeholder="เช่น 5,000 (หากไม่มีใส่ 0)"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">ผ่อนบ้าน รถ บัตรเครดิต</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-purple-700 rounded-full" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              3. สินทรัพย์สภาพคล่องและเงินออมปัจจุบัน
            </h3>
          </div>
          <p className="text-xs text-slate-500 ml-3.5">
            เงินกันชนฉุกเฉินและพอร์ตการลงทุนเดิมที่สะสมไว้
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
            {/* Emergency Fund */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                เงินสำรองฉุกเฉินปัจจุบัน (บาท)
              </label>
              <input
                type="text"
                value={finance.emergencyFund ? finance.emergencyFund.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('emergencyFund', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                placeholder="เช่น 100,000"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">เงินฝากออมทรัพย์ที่พร้อมถอนยามฉุกเฉิน</span>
            </div>

            {/* Total Debt Outstanding */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                ยอดหนี้สินคงค้างทั้งหมด (บาท)
              </label>
              <input
                type="text"
                value={finance.totalDebt ? finance.totalDebt.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('totalDebt', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                placeholder="เช่น 0 หรือ 350,000"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">ยอดหนี้คงเหลือรวมทุกประเภท</span>
            </div>

            {/* Current Investments */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                เงินที่ลงทุนอยู่แล้วในปัจจุบัน (บาท)
              </label>
              <input
                type="text"
                value={finance.currentInvestments ? finance.currentInvestments.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('currentInvestments', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
                placeholder="เช่น 50,000 (ถ้าเพิ่งเริ่มใส่ 0)"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">พอร์ตหุ้น กองทุนรวม ทองคำ ฯลฯ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Callout (Earth Green & Amber Tone) */}
      {finance.monthlyExpenses > 0 && emergencyCoverageMonths < 3 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-pink-300 dark:border-fuchsia-900/60 bg-fuchsia-50 dark:bg-fuchsia-950/20 text-xs text-fuchsia-900 dark:text-pink-200 leading-relaxed flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-fuchsia-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">ข้อแนะนำในการจัดระเบียบการเงิน:</strong>
            เงินสำรองฉุกเฉินปัจจุบันของคุณมี {emergencyCoverageMonths} เดือน ซึ่งยังต่ำกว่าเกณฑ์ความปลอดภัยขั้นต่ำ (3 เดือน = {(finance.monthlyExpenses * 3).toLocaleString()} บาท) แนะนำให้ทยอยสะสมเงินสำรองในบัญชี e-Savings ดอกเบี้ยสูงให้ครบก่อนเริ่มนำเงินไปเสี่ยงในตลาดหุ้น
          </div>
        </div>
      )}

      {/* Navigation Banner: Back to Home & Next to Checklist */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <button
          onClick={() => onNavigateToTab('home')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <span>← ย้อนกลับ: หน้าแรก (Welcome)</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-slate-400 font-mono hidden md:inline">STEP 02 · เช็กลิสต์มือใหม่</span>
          <button
            onClick={() => onNavigateToTab('checklist')}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-xl transition-all shadow-xs border border-fuchsia-600/40 hover:shadow-sm"
          >
            <span>ถัดไป: เช็กลิสต์มือใหม่</span>
            <ArrowRight className="w-3.5 h-3.5 text-pink-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
