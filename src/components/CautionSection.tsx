import React, { useState } from 'react';
import { INVESTMENT_CAUTIONS, SCAM_RED_FLAGS } from '../data/cautionRules';
import { ShieldAlert, AlertTriangle, AlertOctagon, CheckCircle2, BadgeAlert, FileCheck, ExternalLink, HelpCircle } from 'lucide-react';

interface CautionSectionProps {
  onOpenReport: () => void;
}

export const CautionSection: React.FC<CautionSectionProps> = ({ onOpenReport }) => {
  const [selectedScamId, setSelectedScamId] = useState<string | null>(null);
  const [checkedFlags, setCheckedFlags] = useState<Record<string, boolean>>({});

  const toggleFlag = (id: string) => {
    setCheckedFlags((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flagsCheckedCount = Object.values(checkedFlags).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Clean Minimalist Header */}
      <div className="space-y-2 border-b border-stone-200/80 dark:border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">STEP 08</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-[11px] text-amber-800 dark:text-amber-300 tracking-wider">ข้อควรระวัง</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>เกราะป้องกันความเสี่ยง & คำเตือน ก.ล.ต.</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          ข้อควรระวังและคำเตือนสำคัญสำหรับการลงทุน (Investment Cautions)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          ความเสี่ยงที่น่ากลัวที่สุดไม่ใช่ราคาหุ้นตกชั่วคราว แต่คือ "การสูญเสียเงินต้นทั้งหมด" จากการหลงเชื่อผลตอบแทนการันตีสูง หรือการลงทุนด้วยเงินร้อนที่ไม่พร้อมเสีย โปรดอ่านและทำความเข้าใจข้อควรระวังเหล่านี้
        </p>
      </div>

      {/* Official SEC Banner */}
      <div className="p-6 rounded-xl border border-rose-300 dark:border-rose-900/80 bg-rose-50/40 dark:bg-rose-950/20 text-rose-950 dark:text-rose-200">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Official Regulatory Notice
              </span>
              <span className="text-xs text-rose-600 dark:text-rose-400">· สำนักงาน ก.ล.ต.</span>
            </div>
            <h3 className="text-lg font-bold text-rose-900 dark:text-white">
              การลงทุนมีความเสี่ยง ผู้ลงทุนควรทำความเข้าใจลักษณะสินค้า เงื่อนไขผลตอบแทน และความเสี่ยงก่อนตัดสินใจลงทุน
            </h3>
            <p className="text-xs sm:text-sm text-rose-900/80 dark:text-rose-300 leading-relaxed">
              ผลการดำเนินงานในอดีตมิได้เป็นสิ่งยืนยันถึงผลการดำเนินงานในอนาคต การลงทุนในตราสารทุน ตราสารหนี้ และสินทรัพย์อื่น ไม่ใช่เงินฝากธนาคาร จึงไม่มีการคุ้มครองเงินต้น ผู้ลงทุนอาจได้รับเงินคืนมากกว่าหรือน้อยกว่าเงินลงทุนเริ่มแรก และควรลงทุนในสินทรัพย์ที่เหมาะสมกับระดับความเสี่ยงของตนเองเท่านั้น
            </p>
          </div>
        </div>
      </div>

      {/* Core Cautions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INVESTMENT_CAUTIONS.slice(1).map((caution) => (
          <div
            key={caution.id}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                {caution.title}
              </h4>
              <span
                className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded font-semibold shrink-0 ${
                  caution.level === 'critical'
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                    : caution.level === 'warning'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                }`}
              >
                {caution.level}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {caution.summary}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {caution.detail}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{caution.checklistVerification}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Scam Red-Flags Detector */}
      <div className="p-6 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              เครื่องมือตรวจจับสัญญาณอันตราย: "แชร์ลูกโซ่ & มิจฉาชีพหลอกลงทุน"
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            ติ๊กสัญญาณที่คุณเคยพบเจอ
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          หากมีผู้ใดมาชักชวนคุณลงทุนและมีพฤติกรรมเข้าข่ายข้อใดข้อหนึ่งด้านล่างนี้ ให้สันนิษฐานไว้ก่อนว่าเป็นมิจฉาชีพ อย่าโอนเงินเด็ดขาด!
        </p>

        <div className="space-y-3">
          {SCAM_RED_FLAGS.map((flag) => {
            const isChecked = !!checkedFlags[flag.id];
            return (
              <div
                key={flag.id}
                onClick={() => toggleFlag(flag.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isChecked
                    ? 'border-rose-300 dark:border-rose-900/80 bg-rose-50/50 dark:bg-rose-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 accent-rose-600 rounded cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {flag.signal}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">
                        {flag.riskFactor}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      💡 <strong>ความจริง:</strong> {flag.truthExplainer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {flagsCheckedCount > 0 && (
          <div className="p-3 rounded-lg bg-rose-100 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 font-medium">
            🚨 <strong>คำเตือนฉุกเฉิน:</strong> คุณพบสัญญาณอันตรายถึง {flagsCheckedCount} ข้อ! ห้ามโอนเงินหรือให้ข้อมูลบัตรประชาชน/รหัสผ่านเด็ดขาด และแจ้งเบาะแสได้ที่ศูนย์รับแจ้งความออนไลน์ หรือสายด่วน ก.ล.ต. 1207
          </div>
        )}
      </div>

      {/* Official Verification Checklist Box */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-slate-900 dark:text-white">
            ตรวจสอบรายชื่อผู้ประกอบธุรกิจที่ได้รับอนุญาตก่อนลงทุนทุกครั้ง
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            เช็กให้ชัวร์ก่อนโอนเงินผ่านแอปพลิเคชัน "SEC Check First" หรือโทรสายด่วนสำนักงาน ก.ล.ต. 1207
          </p>
        </div>

        <button
          onClick={onOpenReport}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shrink-0 shadow-xs border border-amber-300/40 hover:shadow-sm"
        >
          <FileCheck className="w-4 h-4 text-amber-300" />
          <span>ดูสรุปรายงานความพร้อมฉบับเต็ม</span>
        </button>
      </div>
    </div>
  );
};
