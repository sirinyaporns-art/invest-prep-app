import React from 'react';
import { ChecklistItem, PersonalFinance, InvestmentGoal, RiskProfile, AssetClassItem } from '../types/investor';
import { X, Printer, CheckCircle2, ShieldCheck, Award, Target, Wallet, Layers, AlertCircle, FileText } from 'lucide-react';

interface SummaryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: ChecklistItem[];
  finance: PersonalFinance;
  goal: InvestmentGoal;
  riskProfile: RiskProfile;
  tsiScore: number;
  assets: AssetClassItem[];
}

export const SummaryReportModal: React.FC<SummaryReportModalProps> = ({
  isOpen,
  onClose,
  checklist,
  finance,
  goal,
  riskProfile,
  tsiScore,
  assets,
}) => {
  if (!isOpen) return null;

  const completedChecklistCount = checklist.filter((c) => c.isCompleted).length;
  const readinessPct = Math.round((completedChecklistCount / checklist.length) * 100);
  const monthlyCashflow = finance.monthlyIncome - finance.monthlyExpenses - finance.monthlyDebtPayment;
  const savingsRate = finance.monthlyIncome > 0
    ? Math.max(0, Math.round((monthlyCashflow / finance.monthlyIncome) * 100))
    : 0;
  const emergencyCoverage = finance.monthlyExpenses > 0
    ? (finance.emergencyFund / finance.monthlyExpenses).toFixed(1)
    : '0';

  const interestedAssets = assets.filter((a) => a.interestLevel === 'high' || a.interestLevel === 'medium');

  const handlePrint = () => {
    window.print();
  };

  const getGoalTitle = () => {
    if (!goal.purpose && !goal.customPurpose) {
      return 'ยังไม่ได้ระบุเป้าหมาย (ค่าเริ่มต้น)';
    }
    switch (goal.purpose) {
      case 'retirement':
        return 'วางแผนเกษียณสุขใจ (Retirement)';
      case 'house':
        return 'ดาวน์หรือซื้อบ้าน / คอนโด (Real Estate)';
      case 'financial_freedom':
        return 'อิสรภาพทางการเงิน (FIRE Movement)';
      case 'passive_income':
        return 'สร้างกระแสเงินสดปันผล (Passive Income)';
      case 'education':
        return 'ทุนการศึกษาตนเองหรือบุตรหลาน (Education)';
      case 'milestone':
        return 'กองทุนเป้าหมายสำคัญตามช่วงวัย (Life Milestone)';
      case 'custom':
        return goal.customPurpose || 'เป้าหมายเฉพาะบุคคล';
      default:
        return goal.customPurpose || goal.purpose || 'เป้าหมายเฉพาะบุคคล';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 bg-[#FCFCFD] dark:bg-[#111827]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-700 flex items-center justify-center text-pink-300 shadow-xs border border-pink-300/50">
              <FileText className="w-4 h-4 text-pink-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  รายงานสรุปความพร้อมและแผนพอร์ตการลงทุน
                </h3>
                <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  SUMMARY REPORT
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Personalized Investment Readiness & Portfolio Plan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm print:p-0">
          {/* Executive Overview Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[11px] text-slate-500 block">คะแนนความพร้อมพื้นฐาน</span>
              <span className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">
                {readinessPct}% ({completedChecklistCount}/{checklist.length})
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">ระดับความเสี่ยง TSI</span>
              <span className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">
                ระดับ {riskProfile.level} ({tsiScore}/40)
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">กรอบเวลาเป้าหมาย</span>
              <span className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
                {goal.timeHorizonYears} ปี
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">เงินสำรองฉุกเฉินปัจจุบัน</span>
              <span className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
                {emergencyCoverage} เดือน
              </span>
            </div>
          </div>

          {/* Section 1: Personal & Financial Profile */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-purple-600" />
              <span>1. สรุปข้อมูลส่วนตัวและสุขภาพการเงิน</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">อายุ / เพศ / อาชีพ</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {finance.age > 0 ? `${finance.age} ปี` : 'ไม่ระบุ'} · {finance.gender === 'male' ? 'ชาย' : finance.gender === 'female' ? 'หญิง' : 'อื่นๆ'} · {finance.occupation || 'ไม่ระบุ'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">รายได้ / เดือน</span>
                <span className="font-semibold font-mono tabular-nums text-slate-900 dark:text-white">
                  {finance.monthlyIncome.toLocaleString()} บาท
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">รายจ่ายประจำ + หนี้สิน</span>
                <span className="font-semibold font-mono tabular-nums text-slate-900 dark:text-white">
                  {(finance.monthlyExpenses + finance.monthlyDebtPayment).toLocaleString()} บาท
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">กระแสเงินสดคงเหลือสุทธิ</span>
                <span className="font-semibold font-mono tabular-nums text-purple-600 dark:text-purple-400">
                  {monthlyCashflow >= 0 ? '+' : ''}{monthlyCashflow.toLocaleString()} บาท/เดือน
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Investment Goals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-purple-600" />
              <span>2. วัตถุประสงค์และเป้าหมายการลงทุนที่เลือก</span>
            </h4>
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">วัตถุประสงค์ที่เลือก:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {getGoalTitle()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">จำนวนเงินเป้าหมาย:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {goal.targetAmount.toLocaleString()} บาท (ภายใน {goal.timeHorizonYears} ปี)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">ระดับความสำคัญ / ความทนทานต่อการแกว่งตัว:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {goal.importanceLevel === 'essential' ? 'จำเป็นสูงสุด' : goal.importanceLevel === 'important' ? 'สำคัญมาก' : 'ยืดหยุ่นได้'} · รับการแกว่งตัวได้ระดับ {goal.downsideTolerance}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: TSI Profile & Portfolio Blueprint */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-pink-500" />
              <span>3. ผลการประเมิน TSI และสัดส่วนพอร์ตที่แนะนำ</span>
            </h4>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    ระดับ {riskProfile.level}: {riskProfile.title}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    สัดส่วนหุ้นแนะนำไม่เกิน {riskProfile.maxStockRatio}% · ผลตอบแทนคาดหวัง {riskProfile.expectedAnnualReturn} ต่อปี
                  </span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold">
                  คะแนน TSI: {tsiScore} / 40
                </span>
              </div>

              {/* Asset Slices List */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-500">สัดส่วนสินทรัพย์แนะนำในพอร์ต:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {riskProfile.suggestedAllocation.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {item.asset}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Interested Assets */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-700" />
              <span>4. สินทรัพย์ที่ผู้ลงทุนให้ความสนใจ</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {interestedAssets.map((asset) => (
                <span
                  key={asset.id}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {asset.name} ({asset.interestLevel === 'high' ? 'สนใจมาก' : 'น่าศึกษา'})
                </span>
              ))}
            </div>
          </div>

          {/* Section 5: Statutory Disclaimer */}
          <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-[11px] text-rose-900 dark:text-rose-300 leading-relaxed">
            <strong>คำเตือน ก.ล.ต.:</strong> การลงทุนมีความเสี่ยง ผู้ลงทุนควรทำความเข้าใจลักษณะสินค้า เงื่อนไขผลตอบแทน และความเสี่ยงก่อนตัดสินใจลงทุน ผลการดำเนินงานในอดีตมิได้เป็นสิ่งยืนยันถึงผลการดำเนินงานในอนาคต แพลตฟอร์มนี้จัดทำขึ้นเพื่อเป็นเครื่องมือประเมินความพร้อมและวางแผนเบื้องต้นเท่านั้น มิได้เป็นการชี้ชวนหรือให้คำแนะนำการลงทุนเฉพาะเจาะจง
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-slate-50 dark:bg-slate-800/60 text-xs">
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span>แหล่งข้อมูลอ้างอิงทางการ:</span>
            <a
              href="https://www.set.or.th"
              target="_blank"
              rel="noreferrer noopener"
              className="text-purple-700 dark:text-purple-400 hover:underline font-medium"
            >
              ตลาดหลักทรัพย์แห่งประเทศไทย (SET)
            </a>
            <span>•</span>
            <a
              href="https://www.sec.or.th"
              target="_blank"
              rel="noreferrer noopener"
              className="text-purple-700 dark:text-purple-400 hover:underline font-medium"
            >
              สำนักงาน ก.ล.ต.
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
