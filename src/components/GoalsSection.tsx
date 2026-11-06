import React from 'react';
import { InvestmentGoal, InvestmentHorizon } from '../types/investor';
import { Target, Clock, AlertTriangle, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

interface GoalsSectionProps {
  goal: InvestmentGoal;
  onChange: (updated: InvestmentGoal) => void;
  onNavigateToTab: (tabId: string) => void;
}

const PRESET_GOALS = [
  { id: 'retirement', title: 'วางแผนเกษียณสุขใจ', desc: 'มีเงินก้อนไว้ใช้จ่ายหลังหยุดทำงานโดยไม่ต้องพึ่งพาใคร', defaultYears: 20 },
  { id: 'house', title: 'เงินดาวน์หรือซื้อบ้าน/คอนโด', desc: 'สร้างรากฐานครอบครัวและอสังหาริมทรัพย์ที่อยู่อาศัย', defaultYears: 5 },
  { id: 'financial_freedom', title: 'อิสรภาพทางการเงิน (FIRE)', desc: 'สะสมพอร์ตให้ผลตอบแทนครอบคลุมค่าใช้จ่ายตลอดชีวิต', defaultYears: 12 },
  { id: 'passive_income', title: 'สร้างกระแสเงินสดปันผล', desc: 'รับเงินปันผลสม่ำเสมอเข้าบัญชีทุกไตรมาส/ปี', defaultYears: 7 },
  { id: 'education', title: 'ทุนการศึกษาบุตร / เรียนต่อ', desc: 'เตรียมค่าเทอมและค่าใช้จ่ายการศึกษาระดับสูง', defaultYears: 10 },
  { id: 'milestone', title: 'แต่งงาน / ซื้อรถ / ซื้อของชิ้นใหญ่', desc: 'เป้าหมายสำคัญตามช่วงจังหวะชีวิต', defaultYears: 3 },
  { id: 'custom', title: 'เป้าหมายอื่นๆ (ระบุเอง)', desc: 'กำหนดวัตถุประสงค์เฉพาะบุคคล', defaultYears: 5 },
];

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  goal,
  onChange,
  onNavigateToTab,
}) => {
  const handleSelectPreset = (presetId: string, defaultYears: number) => {
    let horizonCat: InvestmentHorizon = 'medium';
    if (defaultYears <= 1) horizonCat = 'short';
    else if (defaultYears <= 3) horizonCat = 'medium';
    else if (defaultYears <= 7) horizonCat = 'long';
    else horizonCat = 'very_long';

    onChange({
      ...goal,
      purpose: presetId,
      timeHorizonYears: defaultYears,
      horizonCategory: horizonCat,
    });
  };

  const handleYearsChange = (years: number) => {
    let horizonCat: InvestmentHorizon = 'medium';
    if (years <= 1) horizonCat = 'short';
    else if (years <= 3) horizonCat = 'medium';
    else if (years <= 7) horizonCat = 'long';
    else horizonCat = 'very_long';

    onChange({
      ...goal,
      timeHorizonYears: years,
      horizonCategory: horizonCat,
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header (Green & Brown Earth Tone - No Japanese) */}
      <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 03</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-amber-800 dark:text-amber-400">เป้าหมายการลงทุน</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>เข็มทิศและกรอบเวลา</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          เป้าหมายการลงทุน (จะนำเงินไปใช้ทำอะไร?)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          การลงทุนที่ไร้เป้าหมายเปรียบเหมือนการแล่นเรือไร้หางเสือ ระยะเวลาและวัตถุประสงค์คือตัวกำหนดว่าคุณควรลงทุนในสินทรัพย์ใด หากต้องใช้เงินใน 1 ปีห้ามลงหุ้นเด็ดขาด แต่หากเป็นเงินเกษียณอีก 15 ปี หุ้นคือเพื่อนแท้
        </p>
      </div>

      {/* Goal Purpose Grid */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-stone-900 dark:text-stone-100">
          เลือกวัตถุประสงค์หลักของการลงทุนครั้งนี้
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PRESET_GOALS.map((preset) => {
            const isSelected = goal.purpose === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id, preset.defaultYears)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-700 dark:ring-emerald-500'
                    : 'border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-sm font-semibold ${isSelected ? 'text-emerald-900 dark:text-emerald-200' : 'text-stone-900 dark:text-stone-100'}`}>
                    {preset.title}
                  </span>
                  {isSelected && (
                    <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  )}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {preset.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom text if selected custom */}
        {goal.purpose === 'custom' && (
          <div className="mt-3">
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              ระบุเป้าหมายการลงทุนของคุณ
            </label>
            <input
              type="text"
              value={goal.customPurpose}
              onChange={(e) => onChange({ ...goal, customPurpose: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
              placeholder="เช่น เก็บเงินขยายสาขาร้านอาหาร หรือ ซ่อมแซมบ้านพ่อแม่"
            />
          </div>
        )}
      </div>

      {/* Target Amount & Horizon Parameters */}
      <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Target Amount */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
              จำนวนเงินเป้าหมายที่ต้องการ (บาท)
            </label>
            <div className="relative">
              <input
                type="text"
                value={goal.targetAmount ? goal.targetAmount.toLocaleString() : ''}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/[^0-9]/g, '')) || 0;
                  onChange({ ...goal, targetAmount: val });
                }}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 pr-12"
                placeholder="เช่น 1,000,000"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-stone-400">บาท</span>
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              ประเมินยอดเงินสุทธิที่อยากมีไว้ครอบครองเมื่อถึงเป้าหมาย
            </span>
          </div>

          {/* Time Horizon Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                ระยะเวลาที่ต้องการใช้เงิน (Time Horizon)
              </label>
              <span className="text-sm font-bold font-mono text-emerald-800 dark:text-emerald-300">
                {goal.timeHorizonYears} ปี
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={goal.timeHorizonYears}
              onChange={(e) => handleYearsChange(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>1 ปี (สั้นมาก)</span>
              <span>5 ปี (ปานกลาง)</span>
              <span>15 ปี (ยาว)</span>
              <span>30 ปี (เกษียณ)</span>
            </div>
          </div>
        </div>

        {/* Horizon Category Explainer */}
        <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-semibold text-stone-900 dark:text-stone-100 block">
              การจัดหมวดหมู่กรอบเวลา: {goal.timeHorizonYears <= 1 ? 'ระยะสั้นมาก (ไม่เกิน 1 ปี)' : goal.timeHorizonYears <= 3 ? 'ระยะสั้นถึงปานกลาง (1-3 ปี)' : goal.timeHorizonYears <= 7 ? 'ระยะปานกลาง (3-7 ปี)' : 'ระยะยาวมาก (7 ปีขึ้นไป)'}
            </span>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              {goal.timeHorizonYears <= 1
                ? 'คำเตือนสำคัญ: กรอบเวลา 1 ปี ห้ามนำไปลงทุนในหุ้น กองทุนหุ้น หรือคริปโทฯ เด็ดขาด เพราะความผันผวนระยะสั้นอาจทำให้เงินต้นสูญเสียช่วงที่จะต้องใช้ ควรใช้เงินฝากดอกเบี้ยสูงหรือกองทุนตราสารหนี้ระยะสั้นเท่านั้น'
                : goal.timeHorizonYears <= 3
                ? 'กรอบเวลา 1-3 ปี ควรเน้นตราสารหนี้ พันธบัตรรัฐบาล และอาจผสมกองทุนหุ้นได้เล็กน้อยไม่เกิน 10-20%'
                : goal.timeHorizonYears <= 7
                ? 'กรอบเวลา 3-7 ปี เป็นระยะเวลาที่สมดุล สามารถจัดพอร์ตแบบผสมผสาน (Balanced) หุ้น 40-50% และตราสารหนี้ 50%'
                : 'กรอบเวลายาวนานกว่า 7 ปีขึ้นไป ตลาดหุ้นในอดีตให้ผลตอบแทนชนะเงินเฟ้อเสมอ คุณสามารถเพิ่มสัดส่วนหุ้นและ ETF ต่างประเทศได้สูงถึง 70-80%'}
            </p>
          </div>
        </div>

        {/* Priority & Flexibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
              ความสำคัญของเงินก้อนนี้ (ถ้าพลาดเป้าจะกระทบชีวิตอย่างไร?)
            </label>
            <select
              value={goal.importanceLevel}
              onChange={(e) => onChange({ ...goal, importanceLevel: e.target.value as InvestmentGoal['importanceLevel'] })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            >
              <option value="essential">จำเป็นสูงสุด (ห้ามเงินต้นลดเด็ดขาด เช่น ค่าเทอม ค่าผ่าตัด)</option>
              <option value="important">สำคัญมาก (ต้องพยายามทำให้ถึง เช่น เงินดาวน์บ้าน)</option>
              <option value="flexible">ยืดหยุ่นได้ (เลื่อนกำหนดได้หากตลาดปรับฐาน เช่น เงินซื้อของขวัญ)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
              ระดับการยอมรับการแกว่งตัวของเงินต้น (Downside Tolerance)
            </label>
            <select
              value={goal.downsideTolerance}
              onChange={(e) => onChange({ ...goal, downsideTolerance: e.target.value as InvestmentGoal['downsideTolerance'] })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            >
              <option value="none">ยอมรับไม่ได้เลย (เงินต้นต้องอยู่ครบ 100%)</option>
              <option value="low">ยอมรับได้เล็กน้อย (ติดลบชั่วคราวไม่เกิน 5%)</option>
              <option value="moderate">ยอมรับได้ปานกลาง (ติดลบชั่วคราว 10-15% เพื่อผลตอบแทนที่ดีกว่า)</option>
              <option value="high">ยอมรับได้สูง (ติดลบชั่วคราว 20-30% ได้ ขอให้ผลตอบแทนโตแรง)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Banner: Prev to Checklist, Next to TSI */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B]">
        <button
          onClick={() => onNavigateToTab('checklist')}
          className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ย้อนกลับ: 02. เช็กลิสต์ความพร้อม</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-stone-400 font-mono hidden md:inline">STEP 04 · แบบทดสอบ TSI</span>
          <button
            onClick={() => onNavigateToTab('tsi')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs border border-amber-600/40 hover:shadow-sm"
          >
            <span>เริ่มแบบทดสอบ TSI</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
