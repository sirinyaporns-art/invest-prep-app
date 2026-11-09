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
  Home,
  CheckCircle2,
  PieChart,
  AlertTriangle,
  Layers,
  Sparkles,
  BookOpen,
  UserCheck,
  Building2,
  MoreHorizontal,
  Info,
  Users,
} from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenReport: () => void;
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
      id: 'knowledge_hub_group',
      label: 'ความรู้ กฎหมาย & ภาษี',
      icon: BookOpen,
      items: [
        {
          id: 'knowledge_hub',
          stepNum: '07',
          title: 'ศูนย์ความรู้ กฎหมาย & ภาษี (รวมทุกหมวด)',
          desc: 'รวบรวมคำศัพท์ กฎหมาย ก.ล.ต. เกณฑ์ภาษี และข้อควรระวัง',
        },
        {
          id: 'glossary',
          stepNum: '07.1',
          title: 'คลังคำศัพท์การลงทุน',
          desc: '18 คำศัพท์มาตรฐานอ้างอิง ก.ล.ต., ธปท. และตลาดหลักทรัพย์ฯ',
        },
        {
          id: 'tax_legal',
          stepNum: '07.2',
          title: 'กฎหมาย & คำนวณภาษีลงทุน',
          desc: 'เกณฑ์ภาษี 6 สินทรัพย์ สิทธิลดหย่อน และระบบคำนวณภาษี',
        },
        {
          id: 'caution',
          stepNum: '07.3',
          title: 'ข้อควรระวัง & มิจฉาชีพ',
          desc: 'Scam Red-Flag Detector และช่องทางตรวจสอบทางการ',
        },
      ],
    },
    {
      id: 'providers_group',
      label: 'ผู้ให้บริการการลงทุน',
      icon: Building2,
      items: [
        {
          id: 'providers',
          stepNum: '08',
          title: 'แนะนำ บล. ทรีนีตี้ (Trinity)',
          desc: 'บริษัทหลักทรัพย์ชั้นนำที่ได้รับใบอนุญาต ก.ล.ต. ถูกต้องตามกฎหมาย',
        },
      ],
    },
    {
      id: 'more_group',
      label: 'อื่น ๆ',
      icon: MoreHorizontal,
      items: [
        {
          id: 'about',
          stepNum: 'INFO',
          title: 'เกี่ยวกับโครงการ (Trinity Hackathon)',
          desc: 'ที่มาและแรงบันดาลใจจากโครงการแข่งขัน Trinity Hackathon 2024',
        },
        {
          id: 'contact',
          stepNum: 'TEAM',
          title: 'ติดต่อพวกเรา & จุดประสงค์การพัฒนา',
          desc: 'ทีมผู้พัฒนา 3 คน ปัญหาที่พบ และ 6 จุดเด่นหลักของ InvestPrep',
        },
      ],
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
    if (activeTab === 'knowledge_hub' || activeTab === 'glossary' || activeTab === 'tax_legal' || activeTab === 'caution') {
      return { groupId: 'knowledge_hub_group', currentItemTitle: 'ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน' };
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Row: Brand, Summary, Tools Dropdown */}
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Brand Wordmark (matching "Thynk Unlimited" vibrant purple modern style) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectTab('home');
                setActiveDropdown(null);
              }}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-fuchsia-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-xs transition-transform group-hover:scale-105">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent block leading-none">
                    InvestPrep
                  </span>
                  <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    SET & ก.ล.ต.
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                  Smart Wealth Technology · วางแผนพอร์ตการลงทุน
                </span>
              </div>
            </button>
          </div>

          {/* Zone 3: Actions, Tools Dropdown Menu, Report Modal */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Readiness Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">ความพร้อม</span>
              <span className="font-mono tabular-nums font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <span>{readinessScore}%</span>
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
              </span>
            </div>

            {/* Consolidated Tools & Options Dropdown Menu */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                onClick={() => setIsToolsOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isToolsOpen
                    ? 'bg-purple-100/80 dark:bg-slate-800 border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-200'
                    : 'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                }`}
                title="เมนูเครื่องมือและตัวเลือกเพิ่มเติม"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline">เครื่องมือ</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isToolsOpen ? 'rotate-180 text-purple-700 dark:text-purple-300' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Tools Dropdown Menu Content */}
              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fadeIn text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                    ตัวเลือกและการจัดการ
                  </div>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => {
                      onToggleTheme();
                      setIsToolsOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {isDarkMode ? (
                        <Sun className="w-4 h-4 text-pink-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-purple-600" />
                      )}
                      <span>ธีมการแสดงผล</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {isDarkMode ? 'โหมดมืด' : 'โหมดสว่าง'}
                    </span>
                  </button>

                  {/* Reset Data to Clean Slate */}
                  <button
                    onClick={() => {
                      onResetData();
                      setIsToolsOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-slate-500" />
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
                      className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-fuchsia-600" />
                        <span>โหลดข้อมูลตัวอย่างจำลอง</span>
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Primary Action Button (Sleek Black Pill like "Morgan Maxwell" in reference photo) */}
            <button
              onClick={onOpenReport}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-black active:scale-[0.98] rounded-full transition-all whitespace-nowrap shrink-0 shadow-xs hover:shadow"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>สรุปผลพอร์ตลงทุน</span>
            </button>
          </div>
        </div>

        {/* Grouped Workflow Bar with Category Dropdown Menus */}
        <div
          ref={navContainerRef}
          className="relative border-t border-slate-200/80 dark:border-slate-800 py-2.5 flex items-center justify-start overflow-visible"
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
                        ? 'bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white shadow-xs ring-2 ring-purple-400/40'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <GroupIcon className={`w-3.5 h-3.5 ${isTabActive ? 'text-white' : 'text-slate-400'}`} />
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
                        ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 dark:border-purple-400 text-purple-950 dark:text-purple-100 shadow-2xs ring-2 ring-purple-500/20'
                        : isOpen
                        ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <GroupIcon
                      className={`w-3.5 h-3.5 ${
                        isGroupActive
                          ? 'text-purple-700 dark:text-purple-400'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>{group.label}</span>

                    {/* Active sub-item chip badge */}
                    {isGroupActive && activeSubItem && (
                      <span className="hidden md:inline-flex items-center px-1.5 py-0.2 rounded-md bg-purple-100 dark:bg-purple-900/80 text-purple-900 dark:text-purple-200 text-[10px] font-mono font-bold border border-purple-300 dark:border-purple-700">
                        {activeSubItem.stepNum}
                      </span>
                    )}

                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-purple-700 dark:text-purple-300' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Container */}
                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fadeIn">
                      <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
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
                                  ? 'bg-purple-50 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-700/80 text-purple-950 dark:text-purple-100'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-lg font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                  isSubActive
                                    ? 'bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {item.stepNum}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs">{item.title}</span>
                                  {isSubActive && (
                                    <Check className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400 shrink-0" />
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
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
