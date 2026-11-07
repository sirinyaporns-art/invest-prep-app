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
  Download,
  FolderGit2,
  UserCheck,
} from 'lucide-react';
import { PersonalFinance, RiskProfile } from '../types/investor';

interface WelcomeSectionProps {
  onStart: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenGitHubModal?: () => void;
  finance: PersonalFinance;
  completedChecklistCount: number;
  totalChecklistCount: number;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onStart,
  onNavigateToTab,
  onOpenGitHubModal,
  finance,
  completedChecklistCount,
  totalChecklistCount,
}) => {
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
      id: 'glossary',
      title: 'คลังคำศัพท์การลงทุน',
      desc: 'รวบรวมคำศัพท์มาตรฐานอ้างอิง ก.ล.ต., ธปท. และตลาดหลักทรัพย์ฯ',
      icon: BookOpen,
      tag: 'มาตรฐาน 3 หน่วยงาน',
    },
    {
      num: '08',
      id: 'caution',
      title: 'ข้อควรระวัง & มิจฉาชีพ',
      desc: 'เกราะป้องกันมิจฉาชีพ Scam Red-Flag Detector เช็กสัญญาณหลอกลวง',
      icon: AlertTriangle,
      tag: 'ความปลอดภัย',
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
    <div className="space-y-12 animate-fadeIn pb-6">
      {/* 1. HERO BANNER: Welcome to InvestPrep */}
      <div className="rounded-3xl border border-amber-900/15 dark:border-emerald-900/40 overflow-hidden bg-white dark:bg-[#131915] grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-xs">
        <div className="p-6 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span className="font-mono text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
              INVESTPREP
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="font-medium text-amber-800 dark:text-amber-300">
              ระบบประเมินความพร้อมและวางแผนพอร์ตการลงทุน
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              Welcome to <span className="text-emerald-800 dark:text-emerald-400">InvestPrep</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-amber-800 dark:text-amber-300">
              ตัวช่วยและแหล่งความรู้การลงทุนสำหรับคนทั่วไป
            </p>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
            ออกแบบขึ้นเพื่อเป็นเครื่องมือประเมินสุขภาพการเงิน ค้นหาระดับความเสี่ยงตามมาตรฐานสถาบัน TSI ตลาดหลักทรัพย์แห่งประเทศไทย และสำนักงาน ก.ล.ต. พร้อมจำลองพอร์ตและคำนวณการจัดสรรรายได้อย่างเป็นรูปธรรม ช่วยให้คนทั่วไปเริ่มต้นลงทุนได้อย่างมั่นใจ ไม่หลงทาง และไม่ตกเป็นเหยื่อมิจฉาชีพ
          </p>

          {/* Action Buttons Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Primary Action Button: Proceed to Personal Finance */}
            <button
              onClick={onStart}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl transition-all flex items-center gap-2.5 shadow-md border border-amber-300/40 hover:shadow-lg group"
            >
              <span>เริ่มต้นใช้งาน (ถัดไป)</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Explore 8 steps button */}
            <button
              onClick={() => {
                const el = document.getElementById('workflow-overview');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-3 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-[#FAF8F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-xl transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>ดูภาพรวม 8 ขั้นตอน</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>เกณฑ์ประเมินสถาบัน TSI</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>มาตรฐานสำนักงาน ก.ล.ต.</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>ใช้งานได้ออฟไลน์ 100%</span>
            </span>
          </div>
        </div>

        {/* High-Res Hero Image Container */}
        <div className="relative min-h-[260px] lg:min-h-full lg:col-span-5 bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <img
            src="/src/assets/images/investor_workspace_hero_1793800673443.jpg"
            alt="InvestPrep วางแผนการเงินสไตล์มินิมอล"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-xs drop-shadow-sm font-semibold lg:hidden">
            ตัวช่วยและแหล่งความรู้การลงทุนสำหรับคนทั่วไป
          </div>
        </div>
      </div>

      {/* 2. THE 8 STEPS WORKFLOW (ตัวช่วยและแหล่งความรู้ 8 ขั้นตอน) */}
      <div id="workflow-overview" className="space-y-6 scroll-mt-24">
        <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold">WORKFLOW OVERVIEW</span>
            <span>/</span>
            <span className="text-amber-800 dark:text-amber-300 font-medium">8 ขั้นตอนสู่การลงทุนอย่างยั่งยืน</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            ระบบจะพาคุณเตรียมความพร้อมอย่างไรบ้าง?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
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
                className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-500/60 transition-all shadow-2xs group flex flex-col justify-between cursor-pointer hover:shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      STEP {st.num}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                      {st.tag}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center border border-amber-200 dark:border-amber-800/60 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 font-medium">
                  <span>คลิกเพื่อดูขั้นตอนนี้</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CORE PRINCIPLES FOR GENERAL PUBLIC (3 กฎเหล็กสำหรับคนทั่วไปก่อนลงทุน) */}
      <div className="p-6 sm:p-8 rounded-3xl border border-amber-900/15 dark:border-emerald-900/40 bg-[#FAF8F5] dark:bg-[#151D18] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-amber-200 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                3 หลักคิดสำคัญสำหรับคนทั่วไปก่อนเริ่มต้นลงทุน
              </h3>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                กฎทองเพื่อการปกป้องเงินเก็บและสร้างความมั่งคั่งอย่างปลอดภัย
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
            คำแนะนำพื้นฐาน
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 shadow-2xs"
            >
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 text-emerald-800 dark:text-emerald-300">
                {pr.title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. READY TO START CTA BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-900 to-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-amber-300/30">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
            STEP 01 AWAITS YOU
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            พร้อมเริ่มต้นตรวจสุขภาพการเงินก้าวแรกของคุณแล้วหรือยัง?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            เพียงไม่กี่นาทีในการสำรวจรายได้ รายจ่าย และหนี้สิน เพื่อให้ระบบช่วยวางกรอบการลงทุนที่ปลอดภัยที่สุดสำหรับคุณ
          </p>
        </div>

        <button
          onClick={onStart}
          className="px-7 py-3.5 text-xs sm:text-sm font-bold text-emerald-950 bg-amber-300 hover:bg-amber-400 active:scale-95 rounded-2xl transition-all shadow-md flex items-center gap-2.5 shrink-0"
        >
          <span>ถัดไป: กรอกข้อมูลส่วนตัวและการเงิน</span>
          <ArrowRight className="w-4 h-4 text-emerald-950" />
        </button>
      </div>
    </div>
  );
};
