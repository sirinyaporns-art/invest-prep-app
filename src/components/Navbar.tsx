import React, { useRef, useState, useEffect } from 'react';
import { ShieldCheck, Moon, Sun, FileSpreadsheet, RotateCcw, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenReport: () => void;
  onResetData: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  readinessScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  onOpenReport,
  onResetData,
  activeTab,
  onSelectTab,
  readinessScore,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Pure Thai & English Nav Items (All Japanese removed entirely)
  const navItems = [
    { id: 'finance', label: 'ข้อมูลส่วนตัวและการเงิน', sub: 'Finance' },
    { id: 'checklist', label: 'เช็กลิสต์มือใหม่', sub: 'Checklist' },
    { id: 'goal', label: 'เป้าหมายการลงทุน', sub: 'Goals' },
    { id: 'tsi', label: 'แบบทดสอบ TSI', sub: 'TSI Test' },
    { id: 'assets', label: 'สินทรัพย์ลงทุน', sub: 'Assets' },
    { id: 'portfolio', label: 'จัดสัดส่วนพอร์ต', sub: 'Portfolio' },
    { id: 'budget', label: 'จัดสรรเงิน & จำลอง DCA', sub: 'DCA Plan' },
    { id: 'caution', label: 'ข้อควรระวัง & คำเตือน', sub: 'Cautions' },
  ];

  // Check scroll position to show/hide indicators
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Auto-scroll active item into center view smoothly
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const activeBtn = el.querySelector<HTMLButtonElement>(`[data-tab-id="${activeTab}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
      setTimeout(checkScroll, 300);
    }
  }, [activeTab]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = 260;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 250);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#131915]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Row: Brand, Summary, Tools (Green-Brown Earth Tone) */}
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Brand Wordmark (Forest Green & Warm Earth Wood) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('finance')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center text-amber-200 font-bold shadow-xs border border-amber-600/40 transition-transform group-hover:scale-105">
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

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Readiness Indicator (Forest Green & Warm Brown Styled) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-medium text-stone-700 dark:text-stone-300">
              <span className="text-stone-600 dark:text-stone-400 text-[11px]">ความพร้อม</span>
              <span className="font-mono tabular-nums font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <span>{readinessScore}%</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 ring-2 ring-amber-400/50" />
              </span>
            </div>

            {/* Download Standalone HTML Link */}
            <a
              href="/investprep-standalone.html"
              download="investprep-standalone.html"
              title="ดาวน์โหลดไฟล์ HTML เดี่ยว (ใช้งานออฟไลน์ได้ทุกอุปกรณ์)"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>ดาวน์โหลด HTML</span>
            </a>

            {/* Reset / Demo sample button */}
            <button
              onClick={onResetData}
              title="รีเซ็ตหรือโหลดข้อมูลตัวอย่างเริ่มต้น"
              className="p-2 text-stone-500 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-amber-300 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="โหลดข้อมูลตัวอย่าง / รีเซ็ต"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-stone-500 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-amber-300 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="เปลี่ยนธีม สว่าง/มืด"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-700" />}
            </button>

            {/* Primary Action Button (Forest Green with Warm Brown Accent) */}
            <button
              onClick={onOpenReport}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-2xs border border-amber-600/40 hover:shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-200" />
              <span>สรุปผลพอร์ตลงทุน</span>
            </button>
          </div>
        </div>

        {/* Dedicated Scrollable Ribbon in Forest Green & Earth Brown */}
        <div className="relative border-t border-stone-200 dark:border-stone-800 py-2 flex items-center">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="เลื่อนแถบเมนูไปทางซ้าย"
            className={`shrink-0 z-10 w-7 h-7 mr-1.5 rounded-lg flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'bg-white hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-300 shadow-2xs cursor-pointer'
                : 'opacity-25 text-stone-400 cursor-not-allowed border border-transparent'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Items Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex-1 flex items-center gap-2 overflow-x-auto py-1 scroll-smooth scrollbar-thin select-none"
            style={{ scrollbarWidth: 'thin' }}
          >
            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  data-tab-id={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`group relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all focus:outline-none ${
                    isActive
                      ? 'bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-100 font-bold border border-emerald-600/70 dark:border-emerald-500 shadow-2xs ring-2 ring-amber-700/60 dark:ring-amber-500/70'
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 border border-transparent hover:border-stone-200 dark:hover:border-stone-800'
                  }`}
                >
                  {/* Warm Earth Brown Accent Dot for Active Tab or Step Number */}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400 ring-2 ring-amber-500/40 shrink-0"
                    />
                  ) : (
                    <span className="text-[10px] text-stone-400 font-mono">
                      0{idx + 1}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="เลื่อนแถบเมนูไปทางขวา"
            className={`shrink-0 z-10 w-7 h-7 ml-1.5 rounded-lg flex items-center justify-center transition-all ${
              canScrollRight
                ? 'bg-white hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-300 shadow-2xs cursor-pointer'
                : 'opacity-25 text-stone-400 cursor-not-allowed border border-transparent'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
