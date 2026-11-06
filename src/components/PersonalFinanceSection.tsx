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
      <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 01</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-amber-800 dark:text-amber-400">การเงินส่วนบุคคล</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>ตรวจสุขภาพการเงินและขีดความสามารถ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          ข้อมูลส่วนตัวและสถานะทางการเงินปัจจุบัน
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          ความสามารถในการรับความเสี่ยงไม่ได้ขึ้นอยู่กับความกล้า แต่ขึ้นอยู่กับรากฐานทางการเงินจริง กรอกข้อมูลด้านล่างอย่างเรียบง่ายและตรงไปตรงมา เพื่อวินิจฉัยสภาพคล่องและเงินที่พร้อมลงทุนอย่างสบายใจ
        </p>
      </div>

      {/* Real-time Financial Health Diagnostic Cards (Green & Brown Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Monthly Cash Flow */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] transition-all hover:border-emerald-300 dark:hover:border-emerald-800 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-medium">กระแสเงินสดคงเหลือ / เดือน</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
            {monthlyCashflow >= 0 ? '+' : ''}
            {monthlyCashflow.toLocaleString()} <span className="text-xs font-normal text-stone-500">บาท</span>
          </div>
          <div className="mt-3 text-[11px]">
            {monthlyCashflow > 0 ? (
              <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                เป็นบวก สามารถจัดสรรไปลงทุนได้
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                ตึงตัว ควรปรับสมดุลรายจ่ายก่อน
              </span>
            )}
          </div>
        </div>

        {/* Savings Rate */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] transition-all hover:border-amber-300 dark:hover:border-amber-800 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-medium">อัตราการออม (Savings Rate)</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <PiggyBank className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
            {savingsRate}%
          </div>
          <div className="mt-3 text-[11px]">
            {savingsRate >= 20 ? (
              <span className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                เกณฑ์มาตรฐานที่ดี (แนะนำ $\ge$ 20%)
              </span>
            ) : savingsRate > 0 ? (
              <span className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                น้อยกว่าเกณฑ์ 20% พยายามเก็บเพิ่ม
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                ไม่มีเงินออมเหลือในแต่ละเดือน
              </span>
            )}
          </div>
        </div>

        {/* Debt to Income Ratio */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] transition-all hover:border-emerald-300 dark:hover:border-emerald-800 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-medium">ภาระหนี้ต่อรายได้ (DTI)</span>
            <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
            {dtiRatio}%
          </div>
          <div className="mt-3 text-[11px]">
            {dtiRatio <= 30 ? (
              <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                ปลอดภัย (ต่ำกว่า 30%)
              </span>
            ) : dtiRatio <= 45 ? (
              <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                ปานกลาง (ระวังหนี้เพิ่ม)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                เสี่ยงสูง ควรเคลียร์หนี้ก่อน
              </span>
            )}
          </div>
        </div>

        {/* Emergency Fund Coverage */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] transition-all hover:border-amber-300 dark:hover:border-amber-800 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-xs font-medium">เงินสำรองฉุกเฉิน</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
            {emergencyCoverageMonths} <span className="text-xs font-normal text-stone-500">เดือน</span>
          </div>
          <div className="mt-3 text-[11px]">
            {emergencyCoverageMonths >= 6 ? (
              <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                เพียงพอดีมาก ($\ge$ 6 เดือน)
              </span>
            ) : emergencyCoverageMonths >= 3 ? (
              <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                พอใช้ได้ (3-6 เดือน)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                ขาดอีก {emergencyGap.toLocaleString()} บาท
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Inputs Form in Warm Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-emerald-700 rounded-full" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              1. ข้อมูลส่วนบุคคลพื้นฐาน
            </h3>
          </div>
          <p className="text-xs text-stone-500 ml-3.5">
            ช่วยประเมินระยะเวลาการลงทุนและช่วงวัยที่เหมาะสม
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
            {/* Age */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                อายุ (ปี)
              </label>
              <input
                type="number"
                min={15}
                max={100}
                value={finance.age || ''}
                onChange={(e) => handleNumberChange('age', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                placeholder="เช่น 28"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                เพศ
              </label>
              <select
                value={finance.gender}
                onChange={(e) => onChange({ ...finance, gender: e.target.value as PersonalFinance['gender'] })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
              >
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">เพศทางเลือก / อื่นๆ</option>
                <option value="unspecified">ไม่ประสงค์ระบุ</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                อาชีพ / แหล่งที่มาของรายได้
              </label>
              <select
                value={finance.occupation}
                onChange={(e) => onChange({ ...finance, occupation: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
              >
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

        <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-amber-700 rounded-full" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              2. รายรับ รายจ่าย และภาระหนี้สินต่อเดือน
            </h3>
          </div>
          <p className="text-xs text-stone-500 ml-3.5">
            เพื่อคำนวณเงินลงทุนที่ปลอดภัย โดยไม่รบกวนการดำรงชีวิตประจำวัน
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
            {/* Monthly Income */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                รายได้รวมต่อเดือน (บาท)
              </label>
              <input
                type="text"
                value={finance.monthlyIncome ? finance.monthlyIncome.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('monthlyIncome', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                placeholder="เช่น 35,000"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">เงินเดือนประจำ + รายได้เสริมเฉลี่ย</span>
            </div>

            {/* Monthly Fixed Expenses */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                รายจ่ายประจำ & ดำรงชีพ/เดือน (บาท)
              </label>
              <input
                type="text"
                value={finance.monthlyExpenses ? finance.monthlyExpenses.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('monthlyExpenses', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                placeholder="เช่น 18,000"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">ค่ากิน ค่าเช่าห้อง ค่าสาธารณูปโภค</span>
            </div>

            {/* Monthly Debt Payment */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                ค่างวดผ่อนชำระหนี้/เดือน (บาท)
              </label>
              <input
                type="text"
                value={finance.monthlyDebtPayment ? finance.monthlyDebtPayment.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('monthlyDebtPayment', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                placeholder="เช่น 5,000 (หากไม่มีใส่ 0)"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">ผ่อนบ้าน รถ บัตรเครดิต</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-4 bg-emerald-700 rounded-full" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              3. สินทรัพย์สภาพคล่องและเงินออมปัจจุบัน
            </h3>
          </div>
          <p className="text-xs text-stone-500 ml-3.5">
            เงินกันชนฉุกเฉินและพอร์ตการลงทุนเดิมที่สะสมไว้
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
            {/* Emergency Fund */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                เงินสำรองฉุกเฉินปัจจุบัน (บาท)
              </label>
              <input
                type="text"
                value={finance.emergencyFund ? finance.emergencyFund.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('emergencyFund', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                placeholder="เช่น 100,000"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">เงินฝากออมทรัพย์ที่พร้อมถอนยามฉุกเฉิน</span>
            </div>

            {/* Total Debt Outstanding */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                ยอดหนี้สินคงค้างทั้งหมด (บาท)
              </label>
              <input
                type="text"
                value={finance.totalDebt ? finance.totalDebt.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('totalDebt', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                placeholder="เช่น 0 หรือ 350,000"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">ยอดหนี้คงเหลือรวมทุกประเภท</span>
            </div>

            {/* Current Investments */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                เงินที่ลงทุนอยู่แล้วในปัจจุบัน (บาท)
              </label>
              <input
                type="text"
                value={finance.currentInvestments ? finance.currentInvestments.toLocaleString() : ''}
                onChange={(e) => handleNumberChange('currentInvestments', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                placeholder="เช่น 50,000 (ถ้าเพิ่งเริ่มใส่ 0)"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">พอร์ตหุ้น กองทุนรวม ทองคำ ฯลฯ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Callout (Earth Green & Amber Tone) */}
      {emergencyCoverageMonths < 3 && (
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-300 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">ข้อแนะนำในการจัดระเบียบการเงิน:</strong>
            เงินสำรองฉุกเฉินปัจจุบันของคุณมี {emergencyCoverageMonths} เดือน ซึ่งยังต่ำกว่าเกณฑ์ความปลอดภัยขั้นต่ำ (3 เดือน = {(finance.monthlyExpenses * 3).toLocaleString()} บาท) แนะนำให้ทยอยสะสมเงินสำรองในบัญชี e-Savings ดอกเบี้ยสูงให้ครบก่อนเริ่มนำเงินไปเสี่ยงในตลาดหุ้น
          </div>
        </div>
      )}

      {/* Next Step Banner (Green-Brown Earth Tone) */}
      <div className="flex items-center justify-between p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B]">
        <div>
          <span className="text-xs text-stone-400 font-mono block">STEP 02</span>
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            ไปที่ขั้นตอนถัดไป: เช็กลิสต์ความพร้อมสำหรับมือใหม่ 7 เสาหลัก
          </span>
        </div>
        <button
          onClick={() => onNavigateToTab('checklist')}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs border border-amber-600/40 hover:shadow-sm"
        >
          <span>ไปที่เช็กลิสต์มือใหม่</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
        </button>
      </div>
    </div>
  );
};
