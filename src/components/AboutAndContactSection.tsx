import React, { useState, useEffect } from 'react';
import {
  Info,
  Users,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Target,
  PieChart,
  Layers,
  FileText,
  Calculator,
  Building2,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Heart,
  Code2,
  Palette,
  Briefcase,
} from 'lucide-react';

interface AboutAndContactSectionProps {
  initialSubTab?: 'about' | 'contact';
  onNavigateToTab?: (tabId: string) => void;
}

export const AboutAndContactSection: React.FC<AboutAndContactSectionProps> = ({
  initialSubTab = 'about',
  onNavigateToTab,
}) => {
  const [subTab, setSubTab] = useState<'about' | 'contact'>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const teamMembers = [
    {
      name: 'Sirinyaporn SRASRIPHO',
      role: 'Business Research & Product Developer',
      icon: Briefcase,
      color: 'from-purple-600 to-fuchsia-600',
      desc: 'วิเคราะห์โมเดลธุรกิจ งานวิจัยความต้องการผู้ใช้ เกณฑ์มาตรฐานทางการเงิน ก.ล.ต./SET/TSI และออกแบบฟังก์ชันผลิตภัณฑ์',
    },
    {
      name: 'Natthapong YIMYUEAN',
      role: 'Developer',
      icon: Code2,
      color: 'from-fuchsia-600 to-pink-600',
      desc: 'พัฒนาสถาปัตยกรรมระบบเว็บแอปพลิเคชัน Frontend Logic ระบบคำนวณภาษี และระบบวิเคราะห์พอร์ตโฟลิโออัตโนมัติ',
    },
    {
      name: 'Ratirom YENMADAN',
      role: 'Designer',
      icon: Palette,
      color: 'from-pink-600 to-purple-600',
      desc: 'ออกแบบประสบการณ์ผู้ใช้ (UX) ส่วนต่อประสาน (UI) กราฟฟิกข้อมูลเวกเตอร์ และระบบธีมสีม่วง-ชมพูที่เข้าถึงง่ายสำหรับคนทั่วไป',
    },
  ];

  const sixFeatures = [
    {
      num: '01',
      title: 'การวางแผนและกำหนดเป้าหมาย',
      desc: 'ช่วยผู้ใช้กำหนดเป้าหมายการลงทุน ระยะเวลา และประเมินสภาพคล่องด้วยการคำนวณเงินสำรองฉุกเฉินที่เหมาะสมก่อนเริ่มลงทุนจริง',
      icon: Target,
    },
    {
      num: '02',
      title: 'การวิเคราะห์และวางแผนตามสัดส่วนรายได้',
      desc: 'วางแผนสัดส่วนการลงทุนให้เหมาะสมกับฐานะทางการเงินและระดับความเสี่ยงที่ยอมรับได้ของผู้ลงทุนแต่ละบุคคล (Risk Profile ตามมาตรฐาน TSI)',
      icon: PieChart,
    },
    {
      num: '03',
      title: 'การประเมินความเหมาะสมของสินทรัพย์',
      desc: 'แนะนำสัดส่วนสินทรัพย์หลากหลายประเภทอย่างมีหลักการ เพื่อลดความเสี่ยงจากการทุ่มลงทุนในอุตสาหกรรมใดอุตสาหกรรมหนึ่งเพียงอย่างเดียว',
      icon: Layers,
    },
    {
      num: '04',
      title: 'การสรุปผลและรายงานการวางแผน',
      desc: 'แสดงภาพรวมแผนการลงทุนในรูปแบบที่เข้าใจง่าย พร้อมระบบพิมพ์รายงานสรุปเพื่อช่วยให้ผู้ใช้ติดตามและปรับแผนได้ตามสถานการณ์',
      icon: FileText,
    },
    {
      num: '05',
      title: 'การเชื่อมต่อกับพันธมิตรที่น่าเชื่อถือ',
      desc: 'สร้างความมั่นใจด้วยการเชื่อมโยงข้อมูลไปยังบริษัทที่ปรึกษาการลงทุนและสถาบันการเงินที่ได้รับใบอนุญาต ก.ล.ต. อย่างถูกต้อง (บล. ทรีนีตี้)',
      icon: Building2,
    },
    {
      num: '06',
      title: 'การคำนวณเงินได้จากการลงทุนและกฎหมายภาษี',
      desc: 'สรุปภาระการจ่ายภาษีแยกตามประเภทสินทรัพย์ พร้อมระบบช่วยคำนวณภาษีจริงในเว็บ (เครดิตภาษีเงินปันผล, กองทุนลดหย่อน, ภาษีต่างประเทศ)',
      icon: Calculator,
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      {/* 1. Header Section */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="font-mono text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
            ABOUT & CONTACT
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-fuchsia-700 dark:text-fuchsia-400">เมนูอื่น ๆ</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-600 dark:text-slate-300">
            {subTab === 'about' ? 'เกี่ยวกับโครงการ (Trinity Hackathon)' : 'ติดต่อพวกเราและจุดประสงค์การพัฒนา'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {subTab === 'about' ? 'เกี่ยวกับโครงการ InvestPrep' : 'ติดต่อพวกเรา & จุดประสงค์ในการพัฒนา'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mt-1">
              {subTab === 'about'
                ? 'จุดเริ่มต้นของแนวคิดนวัตกรรมการเงินจากเวทีการแข่งขัน Trinity Hackathon สู่ Web Application เพื่อคนไทยทุกคน'
                : 'ทีมงานผู้พัฒนา จุดประสงค์ในการสร้างแพลตฟอร์มเพื่อแก้ไขปัญหาการลงทุนของคนทั่วไป และ 6 จุดเด่นหลักของ InvestPrep'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Trinity Hackathon Project</span>
            </span>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-2 pt-3 flex-wrap">
          <button
            onClick={() => setSubTab('about')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'about'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>เกี่ยวกับโครงการ (Trinity Hackathon)</span>
          </button>
          <button
            onClick={() => setSubTab('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'contact'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ติดต่อพวกเรา & ทีมผู้พัฒนา</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: เกี่ยวกับ (About Project) */}
      {subTab === 'about' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Hackathon Hero Card */}
          <div className="rounded-3xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-6">
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500" />

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                PROJECT ORIGIN & INSPIRATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                "ไอเดียของคุณ อาจเป็นจุดเริ่มต้นของนวัตกรรมการเงินครั้งใหม่!"
              </h3>
              <p className="text-sm sm:text-base font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                โครงการแข่งขัน Trinity Hackathon โดยกลุ่มบริษัทหลักทรัพย์ ทรีนีตี้ (Trinity Securities Group)
              </p>
            </div>

            {/* Summarized Project Background */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-600" />
                <span>สรุปที่มาและความสำคัญของโครงการ (โดยย่อ):</span>
              </h4>
              <p>
                โครงการ <strong>Trinity Hackathon</strong> เป็นเวทีแข่งขันประชันไอเดียและพัฒนานวัตกรรมทางการเงิน (FinTech Innovation) ที่จัดขึ้นโดยกลุ่มบริษัทหลักทรัพย์ ทรีนีตี้ เพื่อเปิดโอกาสให้นิสิต นักศึกษา และบุคคลทั่วไปที่มีความมุ่งมั่น มาร่วมระดมสมองและสร้างสรรค์โซลูชันแก้ไขปัญหาการเงินการลงทุนจริงในสังคมไทย
              </p>
              <p>
                จากโจทย์ความท้าทายดังกล่าว ทีมงานได้นำแนวคิดมาต่อยอดเป็น <strong>"InvestPrep" (Smart Investor Readiness Platform)</strong> เว็บแอปพลิเคชันที่ทำหน้าที่เป็นทั้งเครื่องมือสำรวจตนเองและคู่มือความรู้การลงทุนเบื้องต้น โดยเชื่อมโยงข้อมูลทางวิชาการและเกณฑ์กำกับดูแลของ <strong>ก.ล.ต., ธปท. และตลาดหลักทรัพย์ฯ</strong> มาสรุปเป็นขั้นตอนง่ายๆ 8 ขั้นตอน เพื่อให้คนทั่วไปสามารถเริ่มต้นลงทุนได้อย่างมีภูมิคุ้มกัน ปลอดภัย และไม่ตกเป็นเหยื่อมิจฉาชีพ
              </p>
            </div>

            {/* Official Source Citation Card */}
            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-purple-900 dark:text-purple-200 block">
                  แหล่งข้อมูลอ้างอิงทางการของโครงการ:
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 block break-all">
                  Facebook Post: Trinity Securities Group - Trinity Hackathon
                </span>
              </div>

              <a
                href="https://www.facebook.com/Trinitysecuritiesgroup/posts/-%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93-%E0%B8%AD%E0%B8%B2%E0%B8%88%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%88%E0%B8%B8%E0%B8%94%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%95%E0%B9%89%E0%B8%99%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%95%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88trinity-hackathon-202/1614385950727654/"
                target="_blank"
                rel="noreferrer noopener"
                className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all shrink-0"
              >
                <span>เปิดดูโพสต์โครงการบน Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 text-fuchsia-400" />
              </a>
            </div>

            {/* Quick Link to Trinity Securities */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500">พันธมิตรผู้สนับสนุนโครงการ:</span>
              <a
                href="https://www.trinitythai.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <span>บล. ทรีนีตี้ จำกัด (trinitythai.com)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ติดต่อพวกเรา (Contact Us & Team & Objectives) */}
      {subTab === 'contact' && (
        <div className="space-y-10 animate-fadeIn">
          {/* 1. Team Members Grid */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                ทีมผู้พัฒนา (Project Developers)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                คณะผู้จัดทำโครงการ InvestPrep ในการแข่งขันนวัตกรรมการเงิน
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {teamMembers.map((member, i) => {
                const Icon = member.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${member.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold block">
                          DEVELOPER 0{i + 1}
                        </span>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                          {member.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-semibold text-xs border border-purple-200/60 dark:border-purple-800/60">
                      {member.role}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Development Objectives: Problem vs Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* The Problem */}
            <div className="p-6 sm:p-8 rounded-3xl border border-pink-200 dark:border-pink-900/60 bg-gradient-to-br from-pink-50/50 via-white to-pink-50/30 dark:from-slate-900 dark:via-pink-950/20 dark:to-slate-900 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-600 text-white flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-pink-700 dark:text-pink-400 tracking-wider">
                    PROBLEM STATEMENT
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    ปัญหาในปัจจุบัน (ทำไมคนทั่วไปจึงล้มเหลวจากการลงทุน?)
                  </h4>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  ในภาวะเศรษฐกิจปัจจุบันที่ค่าครองชีพปรับตัวสูงขึ้น ส่งผลให้ประชาชนจำนวนมากประสบปัญหาขาดสภาพคล่องทางการเงิน การแสวงหารายได้เสริมผ่านการลงทุนในสินทรัพย์ประเภทต่างๆ เช่น <strong>หุ้น, กองทุนรวม, ตราสารหนี้ และ ETF</strong> จึงได้รับความนิยมอย่างแพร่หลายจนเกิดกระแสการลงทุนในวงกว้าง
                </p>
                <p>
                  อย่างไรก็ตาม นักลงทุนมือใหม่จำนวนมากเริ่มลงทุนจากภาวะ <strong>กลัวตกกระแส (FOMO: Fear of Missing Out)</strong> หรือเลือกลงทุนตามคำบอกเล่าในโซเชียลโดยขาดความรู้ความเข้าใจในตัวสินทรัพย์ ปัจจัยพื้นฐานของธุรกิจ และระดับความเสี่ยงที่สัมพันธ์กับสภาวะเศรษฐกิจ
                </p>
                <p>
                  รวมทั้งเรื่อง <strong>ภาษีจากการลงทุน</strong> ซึ่งมีความซับซ้อนและเข้าใจยากในเวลาอันสั้น ตลอดจนการกระจายความเสี่ยงที่ไม่เหมาะสม เลือกลงทุนในสินทรัพย์ราคาสูงเกินสัดส่วนรายได้ ส่งผลให้เกิดความสูญเสียทางการเงินอย่างรุนแรงเมื่อตลาดมีความผันผวน
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="p-6 sm:p-8 rounded-3xl border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/60 via-white to-fuchsia-50/40 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-700 dark:text-purple-400 tracking-wider">
                    OUR SOLUTION: INVESTPREP
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    ทางออกและจุดประสงค์การพัฒนา "InvestPrep"
                  </h4>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  จากปัญหาดังกล่าว ทีมงานจึงได้พัฒนา <strong>Web Application "InvestPrep"</strong> แพลตฟอร์มที่มุ่งเน้นการเตรียมความพร้อมเบื้องต้นและเสริมสร้างความรู้ด้านการลงทุนที่ถูกต้อง น่าเชื่อถือ ในรูปแบบที่เข้าใจง่าย
                </p>
                <p>
                  ออกแบบโดยอิงตามมาตรฐานและเกณฑ์การประเมินขององค์กรกำกับดูแลชั้นนำระดับประเทศ ได้แก่:
                </p>
                <ul className="space-y-1.5 pl-2 font-medium">
                  <li className="flex items-center gap-1.5 text-purple-800 dark:text-purple-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>สำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ (ก.ล.ต.)</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-purple-800 dark:text-purple-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>ธนาคารแห่งประเทศไทย (ธปท.)</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-purple-800 dark:text-purple-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>ตลาดหลักทรัพย์แห่งประเทศไทย (SET) และสถาบัน TSI</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. 6 Core Functions and Highlights */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                6 ฟังก์ชันและจุดเด่นหลักของ InvestPrep (สรุปย่อเข้าใจง่าย)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                โครงสร้างระบบที่ถูกออกแบบมาเพื่อสร้างภูมิคุ้มกันและวินัยทางการเงินอย่างยั่งยืน
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sixFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.num}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-2xs hover:border-purple-300 dark:hover:border-purple-700 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                          {feat.num}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Footer CTA Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-purple-500/20">
            <div className="space-y-1.5 text-center md:text-left max-w-xl">
              <span className="text-xs font-mono font-bold text-fuchsia-300 uppercase tracking-wider">
                COMMITTED TO FINANCIAL LITERACY
              </span>
              <h4 className="text-xl sm:text-2xl font-bold">
                เริ่มต้นวางแผนและสำรวจความพร้อมทางการเงินของคุณวันนี้
              </h4>
              <p className="text-xs sm:text-sm text-purple-200">
                ร่วมเป็นส่วนหนึ่งของการสร้างสุขภาวะทางการเงินที่แข็งแกร่งด้วยมาตรฐานความรู้การลงทุนที่ถูกต้อง
              </p>
            </div>

            <button
              onClick={() => {
                if (onNavigateToTab) {
                  onNavigateToTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 active:scale-95 rounded-full transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              <span>กลับสู่หน้าแรก (Home)</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
