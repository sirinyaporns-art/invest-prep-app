import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Moon,
  Sun,
  FileSpreadsheet,
  RotateCcw,
  ChevronDown,
  Check,
  SlidersHorizontal,
  Download,
  FolderGit2,
  Home,
  CheckCircle2,
  PieChart,
  AlertTriangle,
  Layers,
  Sparkles,
  BookOpen,
  UserCheck,
} from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenReport: () => void;
  onOpenGitHubModal: () => void;
  onResetData: () => void;
  onLoadDemoData?: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  readinessScore: number;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  items?: {
    id: string;
    stepNum: string;
    title: string;
    desc: string;
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  onOpenReport,
  onOpenGitHubModal,
  onResetData,
  onLoadDemoData,
  activeTab,
  onSelectTab,
  readinessScore,
}) => {
  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  // Grouped Navigation Structure (Consolidating into clean categories)
  const navGroups: NavGroup[] = [
    {
      id: 'home',
      label: 'หน้าแรก',
      icon: Home,
    },
    {
      id: 'self_assessment_group',
      label: 'สำรวจตนเองก่อนเริ่มลงทุน',
      icon: UserCheck,
      items: [
        {
          id: 'self_assessment',
          stepNum: '01',
          title: 'ภาพรวมสำรวจตนเอง (การเงิน & TSI)',
          desc: 'รวบรวมทั้งข้อมูลสุขภาพการเงินและแบบประเมินความเสี่ยงไว้ในที่เดียว',
        },
        {
          id: 'finance',
          stepNum: '01.1',
          title: 'ข้อมูลส่วนตัวและสถานะการเงิน',
          desc: 'ตรวจกระแสเงินสด ภาระหนี้ DTI และเงินสำรองฉุกเฉิน',
        },
        {
          id: 'tsi',
          stepNum: '01.2',
          title: 'แบบประเมินความเสี่ยง TSI',
          desc: 'แบบทดสอบ 10 ข้อมาตรฐาน ก.ล.ต. จัดระดับความเสี่ยง 1-5',
        },
      ],
    },
    {
      id: 'readiness_plan',
      label: 'เช็กลิสต์ & เป้าหมาย',
      icon: CheckCircle2,
      items: [
        {
          id: 'checklist',
          stepNum: '02',
          title: 'เช็กลิสต์ความพร้อม 7 เสาหลัก',
          desc: 'ตรวจเช็กความพร้อมรอบด้าน (ซิงค์อัตโนมัติจากข้อมูลจริง)',
        },
        {
          id: 'goal',
          stepNum: '03',
          title: 'กำหนดเป้าหมายการลงทุน',
          desc: 'กำหนดจำนวนเงินและกรอบเวลาเพื่อเกษียณหรือซื้อบ้าน',
        },
      ],
    },
    {
      id: 'portfolio_plan',
      label: 'สินทรัพย์ & จัดพอร์ต',
      icon: PieChart,
      items: [
        {
          id: 'assets',
          stepNum: '04',
          title: 'คลังสินทรัพย์การลงทุน',
          desc: 'ทำความเข้าใจผลตอบแทนและความเสี่ยงของสินทรัพย์แต่ละประเภท',
        },
        {
          id: 'portfolio',
          stepNum: '05',
          title: 'จัดสัดส่วนพอร์ตโฟลิโอ',
          desc: 'แผน Asset Allocation แนะนำเฉพาะบุคคลตามความเสี่ยง',
        },
        {
          id: 'budget',
          stepNum: '06',
          title: 'จัดสรรเงิน 50/30/20 & DCA',
          desc: 'วางแผนออมสม่ำเสมอและจำลองพลังดอกเบี้ยทบต้น',
        },
      ],
    },
    {
      id: 'glossary',
      label: 'คลังคำศัพท์การลงทุน',
      icon: BookOpen,
    },
    {
      id: 'caution',
      label: 'ข้อควรระวัง & มิจฉาชีพ',
      icon: AlertTriangle,
    },
  ];

  // Helper to determine active group and current step label
  const getActiveGroupInfo = () => {
    for (const group of navGroups) {
      if (group.id === activeTab) {
        return { groupId: group.id, currentItemTitle: group.label };
      }
      if (group.items) {
        const found = group.items.find((item) => item.id === activeTab);
        if (found) {
          return { groupId: group.id, currentItemTitle: `${found.stepNum}. ${found.title}` };
        }
      }
    }
    if (activeTab === 'self_assessment' || activeTab === 'finance' || activeTab === 'tsi') {
      return { groupId: 'self_assessment_group', currentItemTitle: 'สำรวจตนเองก่อนเริ่มลงทุน' };
    }
    return { groupId: 'home', currentItemTitle: 'หน้าแรก' };
  };

  const { groupId: currentGroupId } = getActiveGroupInfo();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navContainerRef.current && !navContainerRef.current.contains(target)) {
        setActiveDropdown(null);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(target)) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSubItem = (itemId: string) => {
    onSelectTab(itemId);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#131915]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Row: Brand, Summary, Tools Dropdown */}
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Brand Wordmark (Forest Green & Warm Earth Wood) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectTab('home');
                setActiveDropdown(null);
              }}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-800 hover:bg-emerald-900 flex items-center justify-center text-amber-200 font-bold shadow-xs border border-amber-600/40 transition-transform group-hover:scale-105">
                <ShieldCheck className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100 block leading-none">
                    InvestPrep
                  </span>
                  <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300/80 dark:border-stone-700">
                    คู่มือ ก.ล.ต. & ตลาดหลักทรัพย์ฯ
                  </span>
                </div>
                <span className="text-[11px] text-stone-600 dark:text-stone-400 font-normal">
                  ระบบประเมินความพร้อมและวางแผนพอร์ตการลงทุน
                </span>
              </div>
            </button>
          </div>

          {/* Zone 3: Actions, Tools Dropdown Menu, Report Modal */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Readiness Indicator (Forest Green & Warm Brown Styled) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-medium text-stone-700 dark:text-stone-300">
              <span className="text-stone-600 dark:text-stone-400 text-[11px]">ความพร้อม</span>
              <span className="font-mono tabular-nums font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <span>{readinessScore}%</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-2 ring-amber-400/50" />
              </span>
            </div>

            {/* Consolidated Tools & Options Dropdown Menu */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                onClick={() => setIsToolsOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isToolsOpen
                    ? 'bg-amber-100/80 dark:bg-stone-800 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200'
                    : 'bg-white dark:bg-stone-800/80 hover:bg-stone-50 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200'
                }`}
                title="เมนูเครื่องมือและตัวเลือกเพิ่มเติม"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                <span className="hidden sm:inline">เครื่องมือ</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isToolsOpen ? 'rotate-180 text-amber-800' : 'text-stone-400'
                  }`}
                />
              </button>

              {/* Tools Dropdown Menu Content */}
              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 py-2 z-50 animate-fadeIn text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 border-b border-stone-100 dark:border-stone-800">
                    ตัวเลือกและการจัดการ
                  </div>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => {
                      onToggleTheme();
                      setIsToolsOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {isDarkMode ? (
                        <Sun className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-emerald-700" />
                      )}
                      <span>ธีมการแสดงผล</span>
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      {isDarkMode ? 'โหมดมืด' : 'โหมดสว่าง'}
                    </span>
                  </button>

                  {/* Reset Data to Clean Slate */}
                  <button
                    onClick={() => {
                      onResetData();
                      setIsToolsOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-stone-500" />
                      <span>ล้างข้อมูลเป็นค่าเริ่มต้น (ว่าง)</span>
                    </span>
                  </button>

                  {/* Load Sample Demo Data */}
                  {onLoadDemoData && (
                    <button
                      onClick={() => {
                        onLoadDemoData();
                        setIsToolsOpen(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>โหลดข้อมูลตัวอย่างจำลอง</span>
                      </span>
                    </button>
                  )}

                  <div className="my-1 border-t border-stone-100 dark:border-stone-800" />

                  {/* Download HTML for Offline/GitHub */}
                  <a
                    href="/download/index.html"
                    download="index.html"
                    onClick={() => setIsToolsOpen(false)}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <span>ดาวน์โหลดไฟล์ index.html</span>
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                      Single File
                    </span>
                  </a>

                  {/* GitHub Pages Deployment Guide Modal */}
                  <button
                    onClick={() => {
                      onOpenGitHubModal();
                      setIsToolsOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <span>คู่มือนำขึ้น GitHub Pages</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button (Forest Green with Warm Brown Accent) */}
            <button
              onClick={onOpenReport}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all whitespace-nowrap shrink-0 shadow-2xs border border-amber-600/40 hover:shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-200" />
              <span>สรุปผลพอร์ตลงทุน</span>
            </button>
          </div>
        </div>

        {/* Grouped Workflow Bar with Category Dropdown Menus (Forest Green & Earth Brown) */}
        <div
          ref={navContainerRef}
          className="relative border-t border-stone-200 dark:border-stone-800 py-2.5 flex items-center justify-start overflow-visible"
        >
          <div className="flex items-center gap-2 flex-wrap">
            {navGroups.map((group) => {
              const hasSubItems = !!group.items && group.items.length > 0;
              const isGroupActive = currentGroupId === group.id;
              const isOpen = activeDropdown === group.id;
              const GroupIcon = group.icon;

              // Find active sub-item title if in this group
              const activeSubItem = group.items?.find((i) => i.id === activeTab);

              if (!hasSubItems) {
                // Direct Tab Button (Home or Caution)
                const isTabActive = activeTab === group.id;
                return (
                  <button
                    key={group.id}
                    onClick={() => {
                      onSelectTab(group.id);
                      setActiveDropdown(null);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                      isTabActive
                        ? 'bg-emerald-800 text-white shadow-xs border border-amber-300/40 ring-2 ring-amber-400/40'
                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <GroupIcon className={`w-3.5 h-3.5 ${isTabActive ? 'text-amber-300' : 'text-stone-400'}`} />
                    <span>{group.label}</span>
                  </button>
                );
              }

              // Group with Dropdown Menu
              return (
                <div key={group.id} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown((prev) => (prev === group.id ? null : group.id))
                    }
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      isGroupActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 dark:border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-2xs ring-2 ring-emerald-600/20'
                        : isOpen
                        ? 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <GroupIcon
                      className={`w-3.5 h-3.5 ${
                        isGroupActive
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-stone-400'
                      }`}
                    />
                    <span>{group.label}</span>

                    {/* Active sub-item chip badge */}
                    {isGroupActive && activeSubItem && (
                      <span className="hidden md:inline-flex items-center px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-[10px] font-mono font-bold border border-amber-300/80 dark:border-amber-700">
                        {activeSubItem.stepNum}
                      </span>
                    )}

                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-800 dark:text-emerald-300' : 'text-stone-400'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Container */}
                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 py-2 z-50 animate-fadeIn">
                      <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 border-b border-stone-100 dark:border-stone-800">
                        {group.label} · ขั้นตอนย่อย
                      </div>
                      <div className="p-1 space-y-1">
                        {group.items?.map((item) => {
                          const isSubActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelectSubItem(item.id)}
                              className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-colors ${
                                isSubActive
                                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/80 text-emerald-950 dark:text-emerald-100'
                                  : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-lg font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                  isSubActive
                                    ? 'bg-emerald-800 text-white'
                                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                                }`}
                              >
                                {item.stepNum}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs">{item.title}</span>
                                  {isSubActive && (
                                    <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                                  )}
                                </div>
                                <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
