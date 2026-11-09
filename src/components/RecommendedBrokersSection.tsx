import React, { useState } from 'react';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Globe,
  Layers,
  FileCheck,
  HelpCircle,
  Search,
  PhoneCall,
  UserCheck,
} from 'lucide-react';

interface RecommendedBrokersSectionProps {
  onNavigateToTab?: (tabId: string) => void;
  onOpenReport?: () => void;
}

export const RecommendedBrokersSection: React.FC<RecommendedBrokersSectionProps> = ({
  onNavigateToTab,
  onOpenReport,
}) => {
  const [activeTab, setActiveTab] = useState<'trinity_overview' | 'services' | 'safety'>('trinity_overview');

  const trinityHighlights = [
    {
      title: 'ซื้อขายหุ้นไทย (SET / mai) & ตราสารอนุพันธ์ (TFEX)',
      desc: 'ระบบส่งคำสั่งซื้อขายที่เสถียร รวดเร็ว ผ่านโปรแกรม Streaming และ Trinity Smart Wealth รองรับทั้งนักลงทุนระยะสั้นและระยะยาว',
    },
    {
      title: 'กองทุนรวมแบบเปิด (Open Architecture)',
      desc: 'เปิดบัญชีเดียวสามารถซื้อขายกองทุนรวมจาก บลจ. ชั้นนำทั่วประเทศ พร้อมคำแนะนำคัดสรรกองทุนเด่นจากทีมนักวิเคราะห์',
    },
    {
      title: 'ตัวแทนจำหน่ายหุ้นกู้และตราสารหนี้คุณภาพสูง (Bond Trading)',
      desc: 'เข้าถึงการจองซื้อหุ้นกู้ภาคเอกชนและพันธบัตรรัฐบาล เพื่อสร้างกระแสเงินสดจากดอกเบี้ยที่สม่ำเสมอสำหรับผู้ต้องการความเสี่ยงต่ำ-ปานกลาง',
    },
    {
      title: 'บทวิเคราะห์คุณภาพระดับรางวัล (Trinity Research)',
      desc: 'ครอบคลุมทั้งปัจจัยพื้นฐาน (Fundamental) และเทคนิคอล (Technical) เจาะลึกอุตสาหกรรมและกลยุทธ์การจัดพอร์ตการลงทุน',
    },
    {
      title: 'บริการที่ปรึกษาการเงินส่วนบุคคล (Private Wealth Management)',
      desc: 'มีผู้แนะนำการลงทุน (Investment Consultant: IC) ที่ได้รับใบอนุญาต ก.ล.ต. คอยให้คำปรึกษา ไม่ต้องกังวลว่าจะลงทุนอย่างโดดเดี่ยว',
    },
    {
      title: 'เปิดบัญชีออนไลน์ e-Open Account สะดวก ปลอดภัย',
      desc: 'สมัครผ่านเว็บไซต์ www.trinitythai.com ยืนยันตัวตนผ่าน NDID สะดวกรวดเร็ว ไม่ต้องส่งเอกสารกระดาษ',
    },
  ];

  const safetySteps = [
    {
      step: '01',
      title: 'เช็กชื่อผู้ให้บริการใน SEC Check First เสมอ',
      desc: 'ตรวจสอบว่า บริษัทหลักทรัพย์ ทรีนีตี้ จำกัด และผู้แนะนำการลงทุน มีรายชื่อในฐานข้อมูลทางการของสำนักงาน ก.ล.ต. จริง ผ่านเว็บไซต์ sec.or.th',
    },
    {
      step: '02',
      title: 'โอนเงินเข้าบัญชี บล. ทรีนีตี้ เท่านั้น',
      desc: 'เงินลงทุนต้องโอนเข้าบัญชีชื่อ "บริษัทหลักทรัพย์ ทรีนีตี้ จำกัด" (Trinity Securities Co., Ltd.) เท่านั้น ห้ามโอนเข้าบัญชีบุคคลธรรมดาเด็ดขาด',
    },
    {
      step: '03',
      title: 'ไม่มีการการันตีผลตอบแทนเกินจริง',
      desc: 'บล. ทรีนีตี้ ดำเนินธุรกิจภายใต้กฎหมาย ก.ล.ต. จะไม่มีการโฆษณาการันตีผลตอบแทนสูงผิดปกติ หากพบการแอบอ้างในโซเชียลให้ระวังมิจฉาชีพ',
    },
    {
      step: '04',
      title: 'เข้าสู่เว็บไซต์ทางการ trinitythai.com โดยตรง',
      desc: 'พิมพ์ URL https://www.trinitythai.com/ ด้วยตนเองเสมอ อย่าคลิกลิงก์จาก SMS หรือโพสต์โฆษณาที่น่าสงสัย',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      {/* 1. Header Section */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="font-mono text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
            STEP 08
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-fuchsia-700 dark:text-fuchsia-400">ก้าวสู่การลงทุนจริง</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-600 dark:text-slate-300">ผู้ให้บริการที่ได้รับใบอนุญาต ก.ล.ต.</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              แนะนำผู้ให้บริการเกี่ยวกับการลงทุน
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mt-1">
              หลังจากที่คุณได้สำรวจสุขภาพการเงิน ทำแบบประเมินความเสี่ยง TSI และจัดสัดส่วนพอร์ตโฟลิโอเรียบร้อยแล้ว ก้าวสำคัญต่อไปคือการเปิดบัญชีลงทุนกับ <strong>บริษัทหลักทรัพย์ ทรีนีตี้ จำกัด (Trinity Securities)</strong> สถาบันการเงินชั้นนำที่ได้รับใบอนุญาตถูกต้องตามกฎหมายจากสำนักงาน ก.ล.ต. และตลาดหลักทรัพย์แห่งประเทศไทย (SET)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>ก.ล.ต. & SET Approved</span>
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-3 flex-wrap">
          <button
            onClick={() => setActiveTab('trinity_overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'trinity_overview'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>ภาพรวม บล. ทรีนีตี้ (Trinity)</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'services'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ผลิตภัณฑ์และบริการลงทุน</span>
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'safety'
                ? 'bg-fuchsia-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>เกราะความปลอดภัยและตรวจสอบ ก.ล.ต.</span>
          </button>
        </div>
      </div>

      {/* 2. Main Hero Card: Trinity Securities Sole Provider */}
      <div className="rounded-3xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-8">
        {/* Top Gradient Banner */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                ผู้ให้บริการการลงทุนที่แนะนำอย่างเป็นทางการ
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/40 px-3 py-1 rounded-full border border-fuchsia-200 dark:border-fuchsia-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-600" />
                <span>กำกับดูแลโดย ก.ล.ต. & ตลาดหลักทรัพย์แห่งประเทศไทย</span>
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                บริษัทหลักทรัพย์ ทรีนีตี้ จำกัด
              </h3>
              <div className="text-sm font-mono text-purple-700 dark:text-purple-400 font-semibold">
                Trinity Securities Company Limited (Member of SET No. 22)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                บริษัทหลักทรัพย์ชั้นนำที่ให้บริการทางการเงินและการลงทุนครบวงจร ก่อตั้งและดำเนินธุรกิจด้วยความมั่นคง ได้รับใบอนุญาตประกอบธุรกิจหลักทรัพย์แบบ ก จากกระทรวงการคลัง ภายใต้การกำกับดูแลของสำนักงาน ก.ล.ต. มีชื่อเสียงโดดเด่นด้านบทวิเคราะห์คุณภาพสูง การจัดพอร์ตการลงทุน และบริการที่ปรึกษาการเงินส่วนบุคคล
              </p>
            </div>

            {/* License & Credentials Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <FileCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>ข้อมูลการจดทะเบียนและใบอนุญาต:</span>
              </div>
              <p className="text-[11px] leading-relaxed pl-6">
                ใบอนุญาตประกอบธุรกิจหลักทรัพย์แบบ ก เลขที่ 0014/2544 ได้รับอนุญาตประกอบธุรกิจการเป็นนายหน้าซื้อขายหลักทรัพย์ การค้าหลักทรัพย์ การเป็นที่ปรึกษาการลงทุน การจัดจำหน่ายหลักทรัพย์ และการจัดการกองทุนส่วนบุคคล
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.trinitythai.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="px-6 py-3.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all group"
              >
                <span>เข้าสู่เว็บไซต์ทางการ บล. ทรีนีตี้ (trinitythai.com)</span>
                <ExternalLink className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://www.sec.or.th/TH/Pages/MarketData/SEC-Check-First.aspx"
                target="_blank"
                rel="noreferrer noopener"
                className="px-5 py-3.5 rounded-full bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>ตรวจสอบในระบบ SEC Check First</span>
              </a>
            </div>
          </div>

          {/* Right Highlights Column */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-fuchsia-50/60 dark:from-slate-800 dark:via-purple-950/30 dark:to-slate-800 p-5 border border-purple-200/80 dark:border-purple-800/60 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-fuchsia-600" />
              <span>ทำไมมือใหม่ควรเริ่มกับ บล. ทรีนีตี้?</span>
            </span>

            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span><strong>มีผู้เชี่ยวชาญดูแล:</strong> มีผู้แนะนำการลงทุน (IC) คอยให้คำปรึกษา ไม่ต้องเสี่ยงเทรดตามลำพัง</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Open Architecture:</strong> บัญชีเดียวซื้อกองทุนรวมได้หลากหลาย บลจ. จัดพอร์ตง่าย</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span><strong>ตลาดตราสารหนี้:</strong> โอกาสจองซื้อหุ้นกู้คุณภาพดี สร้างรายได้ดอกเบี้ยสม่ำเสมอ</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span><strong>บทวิเคราะห์แม่นยำ:</strong> รับรายงานวิเคราะห์หุ้นและกลยุทธ์รายวันจาก Trinity Research</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-purple-200/60 dark:border-purple-800/60 text-[11px] text-slate-500 dark:text-slate-400">
              📞 ศูนย์บริการลูกค้า: 02-343-9555 หรือติดต่อสาขาทั่วประเทศ
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Services Grid */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            บริการและผลิตภัณฑ์ทางการเงินของ บล. ทรีนีตี้
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ครอบคลุมทุกความต้องการในการสร้างความมั่งคั่งตามแผน Asset Allocation ของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trinityHighlights.map((hl, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-2xs hover:border-purple-400 dark:hover:border-purple-500 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono font-bold text-xs flex items-center justify-center">
                0{i + 1}
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {hl.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {hl.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Safety Shield Section (SEC Check First & Anti-Scam Guide) */}
      <div className="rounded-3xl border border-purple-200 dark:border-purple-800/80 bg-gradient-to-br from-purple-50/50 via-white to-fuchsia-50/40 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                4 กฎเหล็กป้องกันมิจฉาชีพแอบอ้าง บล. ทรีนีตี้ และหลอกลงทุน
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                มาตรฐานการคุ้มครองผู้ลงทุนจากสำนักงาน ก.ล.ต. และตลาดหลักทรัพย์แห่งประเทศไทย (SET)
              </p>
            </div>
          </div>

          <a
            href="https://www.sec.or.th/TH/Pages/MarketData/SEC-Check-First.aspx"
            target="_blank"
            rel="noreferrer noopener"
            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs self-start sm:self-auto shrink-0"
          >
            <span>เปิดระบบ SEC Check First</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetySteps.map((st) => (
            <div
              key={st.step}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-purple-100 dark:border-slate-700/80 space-y-2 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                {st.step}
              </div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                {st.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Next Step Summary CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-purple-500/20">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-xs font-mono font-bold text-fuchsia-300 uppercase tracking-wider">
            READY TO INVEST WITH CONFIDENCE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            เตรียมข้อมูลครบพร้อมพิมพ์รายงานสรุปเพื่อนำไปเปิดบัญชี
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            คุณสามารถพิมพ์รายงานสรุปความพร้อม ผลประเมิน TSI และสัดส่วนพอร์ตโฟลิโอ เพื่อใช้ประกอบการติดต่อเปิดบัญชีกับ บล. ทรีนีตี้ ได้ทันที
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onOpenReport && (
            <button
              onClick={onOpenReport}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 active:scale-95 rounded-full transition-all shadow-md flex items-center gap-2"
            >
              <span>พิมพ์รายงานสรุป (PDF)</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </button>
          )}

          <a
            href="https://www.trinitythai.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-full transition-all shadow-md flex items-center gap-2"
          >
            <span>เปิดบัญชีกับ บล. ทรีนีตี้</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
