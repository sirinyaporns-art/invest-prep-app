import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Target,
  Award,
  Layers,
  PieChart,
  Calculator,
  AlertTriangle,
  Sparkles,
  BookOpen,
  UserCheck,
  Building2,
} from 'lucide-react';
import { PersonalFinance, RiskProfile } from '../types/investor';
import { InvestmentGraphBackground } from './InvestmentGraphBackground';

interface WelcomeSectionProps {
  onStart: () => void;
  onNavigateToTab?: (tabId: string) => void;
  finance: PersonalFinance;
  completedChecklistCount: number;
  totalChecklistCount: number;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onStart,
  onNavigateToTab,
  finance,
  completedChecklistCount,
  totalChecklistCount,
}) => {
  // 4 Core Process Stages matching the exact [01 Process : ...], [02 Input : ...], [03 AI Task : ...], [04 Output : ...] style
  const heroWorkflowBlocks = [
    {
      num: '01',
      id: 'self_assessment',
      label: 'สำรวจตนเอง',
      detail: 'การเงินจริง & TSI 10 ข้อ',
      sub: 'ตรวจกระแสเงินสดและระดับความเสี่ยง',
    },
    {
      num: '02',
      id: 'checklist',
      label: 'เช็กลิสต์ความพร้อม',
      detail: '7 เสาหลักก่อนลงทุน',
      sub: 'ตรวจเงินสำรองฉุกเฉินและภาระหนี้',
    },
    {
      num: '03',
      id: 'portfolio',
      label: 'จัดสรรพอร์ต',
      detail: 'Asset Allocation & DCA',
      sub: 'ปรับสัดส่วนตามสุขภาพการเงินจริง',
    },
    {
      num: '04',
      id: 'knowledge_hub',
      label: 'ความรู้ & ภาษี',
      detail: 'ก.ล.ต. / ธปท. / SET',
      sub: 'คลังคำศัพท์และคำนวณภาษีลงทุน',
    },
  ];

  const steps = [
    {
      num: '01',
      id: 'self_assessment',
      title: 'สำรวจตนเองก่อนเริ่มลงทุน',
      desc: 'รวมข้อมูลส่วนตัว สุขภาพการเงินจริง และแบบประเมินความเสี่ยง TSI 10 ข้อ',
      icon: UserCheck,
      tag: 'จุดเริ่มต้นสำคัญ',
    },
    {
      num: '02',
      id: 'checklist',
      title: 'เช็กลิสต์ความพร้อม 7 เสาหลัก',
      desc: 'ระบบตรวจสอบสถานะอัตโนมัติ เชื่อมโยงกับข้อมูลจริงและประเมินตนเอง',
      icon: CheckCircle2,
      tag: 'ซิงค์อัตโนมัติ',
    },
    {
      num: '03',
      id: 'goal',
      title: 'เป้าหมายการลงทุน',
      desc: 'กำหนดเป้าหมายเพื่อเกษียณ ซื้อบ้าน หรือสร้างกระแสเงินสดปันผล',
      icon: Target,
      tag: 'ทิศทาง',
    },
    {
      num: '04',
      id: 'assets',
      title: 'คลังสินทรัพย์การลงทุน',
      desc: 'ทำความเข้าใจสินทรัพย์ เงินฝาก พันธบัตร หุ้น กองทุนรวม ถึงทองคำ',
      icon: Layers,
      tag: 'ความรู้สินทรัพย์',
    },
    {
      num: '05',
      id: 'portfolio',
      title: 'จัดสรรสัดส่วนพอร์ตโฟลิโอ',
      desc: 'พอร์ต Asset Allocation แนะนำตามระดับความเสี่ยงและกรอบเวลาของคุณ',
      icon: PieChart,
      tag: 'กลยุทธ์พอร์ต',
    },
    {
      num: '06',
      id: 'budget',
      title: 'จัดสรรเงิน 50/30/20 & DCA',
      desc: 'วางแผนออมสม่ำเสมอทุกเดือน จำลองพลังดอกเบี้ยทบต้น (Compound Interest)',
      icon: Calculator,
      tag: 'วินัยการออม',
    },
    {
      num: '07',
      id: 'knowledge_hub',
      title: 'ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน',
      desc: 'คลังคำศัพท์ ข้อควรระวัง กฎหมาย ก.ล.ต./ธปท. และโปรแกรมคำนวณภาษีลงทุน',
      icon: BookOpen,
      tag: 'ก.ล.ต. / ธปท. / SET',
    },
    {
      num: '08',
      id: 'providers',
      title: 'แนะนำผู้ให้บริการการลงทุน',
      desc: 'บริษัทหลักทรัพย์ ทรีนีตี้ จำกัด (Trinity) สถาบันการเงินที่ได้รับใบอนุญาต ก.ล.ต. ถูกต้องตามกฎหมาย',
      icon: Building2,
      tag: 'ก้าวสู่การลงทุนจริง',
    },
  ];

  const principles = [
    {
      title: '1. อย่าลงทุนในสิ่งที่คุณไม่เข้าใจ',
      desc: 'ก่อนซื้อหุ้นหรือกองทุนใดๆ ต้องรู้ว่ากิจการทำมาหากินอะไร มีความเสี่ยงแบบไหน ไม่ซื้อตามคำบอกเล่าหรือกระแสโซเชียล',
    },
    {
      title: '2. ลงทุนด้วย "เงินเย็น" เท่านั้น',
      desc: 'เงินเย็นคือเงินที่ไม่มีความจำเป็นต้องใช้ใน 3-5 ปีขึ้นไป และมีเงินสำรองฉุกเฉินแยกต่างหากแล้ว เพื่อไม่ต้องขายขาดทุนยามตลาดผันผวน',
    },
    {
      title: '3. ไม่มีผลตอบแทนสูงที่ไร้ความเสี่ยง',
      desc: 'ข้อเสนอใดที่บอกว่า "การันตีได้เดือนละ 10-20% ไม่มีวันขาดทุน" ให้สันนิษฐานว่าเป็นมิจฉาชีพ 100% ตรวจสอบผ่าน SEC Check First เสมอ',
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      {/* 1. HERO SECTION: Recreated in the exact visual style of the reference image */}
      <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 sm:p-10 lg:p-12 shadow-xs overflow-hidden">
        {/* Native SVG Investment Graph Background (Flowing waves, trend lines, technical grid) */}
        <InvestmentGraphBackground className="absolute inset-0 z-0" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-400">
            <span className="font-mono tracking-wider px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
              INVESTPREP
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-slate-600 dark:text-slate-300">
              ระบบประเมินความพร้อมและวางแผนพอร์ตการลงทุน
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Welcome to <span className="text-slate-900 dark:text-white">InvestPrep</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                ตัวช่วยและแหล่งความรู้การลงทุนสำหรับคนทั่วไป
              </span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            ออกแบบขึ้นเพื่อเป็นเครื่องมือประเมินพฤติกรรมการเงิน ค้นหาระดับความเสี่ยงตามมาตรฐานสถาบัน TSI ตลาดหลักทรัพย์แห่งประเทศไทย และสำนักงาน ก.ล.ต. พร้อมจำลองพอร์ตและคำนวณการจัดสรรรายได้อย่างเป็นรูปธรรมเบื้องต้น ช่วยให้คนทั่วไปเริ่มต้นลงทุนได้อย่างมั่นใจ ไม่หลงทาง และไม่ตกเป็นเหยื่อมิจฉาชีพ อีกทั้งยังมีคลังความรู้เกี่ยวกับภาษีที่เหมาะสมกับผู้เริ่มต้น
          </p>

          {/* Action Buttons: Sleek Black Pill Button + Modern Secondary Outline */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStart}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-slate-950 hover:bg-black active:scale-[0.98] rounded-full transition-all flex items-center gap-2.5 shadow-md hover:shadow-lg group"
            >
              <span>เริ่มต้นใช้งาน (ถัดไป)</span>
              <ArrowRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('workflow-overview');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full transition-colors flex items-center gap-2 shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>ดูภาพรวม 8 ขั้นตอน</span>
            </button>
          </div>

          {/* Quiet Unboxed Metadata Separation (Zero-Pill Discipline) */}
          <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
            <span className="font-medium">เกณฑ์ประเมินสถาบัน TSI</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="font-medium">มาตรฐานสำนักงาน ก.ล.ต.</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="font-medium">ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="font-medium text-fuchsia-600 dark:text-fuchsia-400">แนะนำ บล. ทรีนีตี้ (Trinity)</span>
          </div>
        </div>

        {/* Bottom 4 Workflow Horizontal Cards: Directly Matching [01 Process : ...], [02 Input : ...], [03 AI Task : ...], [04 Output : ...] */}
        <div className="relative z-10 mt-10 pt-8 border-t border-slate-200/70 dark:border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {heroWorkflowBlocks.map((blk) => (
              <div
                key={blk.num}
                onClick={() => {
                  if (onNavigateToTab) {
                    onNavigateToTab(blk.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#F3F4F6] dark:bg-slate-800/80 hover:bg-purple-50/60 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700/60 hover:border-purple-400 dark:hover:border-purple-500/80 transition-all cursor-pointer flex items-center gap-3.5 shadow-2xs group"
              >
                {/* Magenta-to-purple square badge with bold number */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  {blk.num}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors truncate">
                    {blk.label} : <span className="font-normal text-slate-700 dark:text-slate-300">{blk.detail}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {blk.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE 7 STEPS WORKFLOW OVERVIEW (7 ขั้นตอนสู่การลงทุนอย่างยั่งยืน) */}
      <div id="workflow-overview" className="space-y-6 scroll-mt-24">
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-mono text-purple-700 dark:text-purple-400 font-bold">WORKFLOW OVERVIEW</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-fuchsia-700 dark:text-fuchsia-400 font-medium">7 ขั้นตอนสู่การลงทุนอย่างยั่งยืน</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            ระบบจะพาคุณเตรียมความพร้อมอย่างไรบ้าง?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            คุณสามารถกดปุ่ม "เริ่มต้นใช้งาน (ถัดไป)" เพื่อเริ่มตั้งแต่ขั้นตอนที่ 1 หรือคลิกดูแต่ละขั้นตอนได้ทันที
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.id}
                onClick={() => {
                  if (onNavigateToTab) {
                    onNavigateToTab(st.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-400 dark:hover:border-purple-500 transition-all shadow-2xs group flex flex-col justify-between cursor-pointer hover:shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                      STEP {st.num}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {st.tag}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center border border-purple-200 dark:border-purple-800/60 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-purple-700 dark:group-hover:text-purple-400 font-medium">
                  <span>คลิกเพื่อดูขั้นตอนนี้</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CORE PRINCIPLES (3 กฎเหล็กสำหรับคนทั่วไปก่อนลงทุน) */}
      <div className="p-6 sm:p-8 rounded-3xl border border-purple-200/70 dark:border-purple-900/40 bg-[#F8FAFC] dark:bg-[#0F172A] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                3 หลักคิดสำคัญสำหรับคนทั่วไปก่อนเริ่มต้นลงทุน
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                กฎทองเพื่อการปกป้องเงินเก็บและสร้างความมั่งคั่งอย่างปลอดภัย
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800 self-start sm:self-auto">
            คำแนะนำพื้นฐาน
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs"
            >
              <h4 className="font-bold text-xs sm:text-sm text-purple-800 dark:text-purple-300">
                {pr.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. READY TO START CTA BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-slate-900 to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-purple-500/20">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-xs font-mono font-bold text-fuchsia-300 uppercase tracking-wider">
            STEP 01 AWAITS YOU
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            พร้อมเริ่มต้นตรวจสุขภาพการเงินก้าวแรกของคุณแล้วหรือยัง?
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            เพียงไม่กี่นาทีในการสำรวจรายได้ รายจ่าย และหนี้สิน เพื่อให้ระบบช่วยวางกรอบการลงทุนที่ปลอดภัยที่สุดสำหรับคุณ
          </p>
        </div>

        <button
          onClick={onStart}
          className="px-7 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 active:scale-95 rounded-full transition-all shadow-md flex items-center gap-2.5 shrink-0"
        >
          <span>ถัดไป: กรอกข้อมูลส่วนตัวและการเงิน</span>
          <ArrowRight className="w-4 h-4 text-purple-600" />
        </button>
      </div>
    </div>
  );
};
