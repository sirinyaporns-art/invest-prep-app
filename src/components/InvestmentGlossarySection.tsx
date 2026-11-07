import React, { useState, useMemo } from 'react';
import {
  INVESTMENT_GLOSSARY,
  GLOSSARY_CATEGORIES,
  GLOSSARY_SOURCES,
  GlossaryTerm,
  GlossarySource,
  GlossaryCategory,
} from '../data/investmentGlossary';
import {
  Search,
  BookOpen,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Landmark,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  X,
} from 'lucide-react';

interface InvestmentGlossarySectionProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const InvestmentGlossarySection: React.FC<InvestmentGlossarySectionProps> = ({
  onNavigateToTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<GlossarySource | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return INVESTMENT_GLOSSARY.filter((term) => {
      // Source filter
      if (selectedSource !== 'all' && term.source !== selectedSource) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && term.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTh = term.termTh.toLowerCase().includes(query);
        const matchEn = term.termEn.toLowerCase().includes(query);
        const matchDef = term.shortDefinition.toLowerCase().includes(query);
        const matchExp = term.fullExplanation.toLowerCase().includes(query);
        const matchRelated = term.relatedTerms.some((r) => r.toLowerCase().includes(query));
        return matchTh || matchEn || matchDef || matchExp || matchRelated;
      }
      return true;
    });
  }, [searchQuery, selectedSource, selectedCategory]);

  const handleCopyDefinition = (term: GlossaryTerm) => {
    const text = `${term.termTh} (${term.termEn})\n${term.shortDefinition}\n\nคำอธิบาย: ${term.fullExplanation}\n(อ้างอิง: ${term.sourceName})`;
    navigator.clipboard?.writeText(text);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSourceBadge = (source: GlossarySource) => {
    switch (source) {
      case 'sec':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>ก.ล.ต. (SEC)</span>
          </span>
        );
      case 'bot':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Landmark className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>ธปท. (BOT)</span>
          </span>
        );
      case 'set':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-teal-100 text-teal-900 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
            <TrendingUp className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>ตลาดหลักทรัพย์ฯ (SET)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header (Green & Warm Brown Earth Tone - No Japanese) */}
      <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">KNOWLEDGE HUB</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="font-medium text-amber-800 dark:text-amber-400">คลังความรู้การลงทุน</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>มาตรฐาน 3 หน่วยงานกำกับดูแลไทย</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              คลังคำศัพท์ที่ควรรู้เกี่ยวกับการลงทุน
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed mt-1">
              รวบรวมและเรียบเรียงนิยามคำศัพท์สำคัญที่ผู้เริ่มต้นลงทุนต้องเข้าใจ โดยอ้างอิงมาตรฐานจาก{' '}
              <strong>สำนักงาน ก.ล.ต.</strong>, <strong>ธนาคารแห่งประเทศไทย (ธปท.)</strong> และ{' '}
              <strong>ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</strong> เพื่อสร้างรากฐานความรู้ที่ถูกต้อง ป้องกันการถูกหลอกลวง
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {INVESTMENT_GLOSSARY.length} คำศัพท์มาตรฐาน
            </span>
          </div>
        </div>
      </div>

      {/* Official Sources Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {GLOSSARY_SOURCES.map((source) => (
          <div
            key={source.id}
            onClick={() => setSelectedSource(selectedSource === source.id ? 'all' : source.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
              selectedSource === source.id
                ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                : 'bg-[#FCFAF7] dark:bg-[#18201B] border-stone-200 dark:border-stone-800 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {source.id === 'sec' && <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />}
                {source.id === 'bot' && <Landmark className="w-5 h-5 text-amber-700 dark:text-amber-400" />}
                {source.id === 'set' && <TrendingUp className="w-5 h-5 text-teal-700 dark:text-teal-400" />}
                <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">{source.name}</h3>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                {INVESTMENT_GLOSSARY.filter((t) => t.source === source.id).length} คำ
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2">
              {source.orgTh}
            </p>
            <div className="mt-3 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>{selectedSource === source.id ? 'กำลังแสดงเฉพาะหมวดนี้' : 'คลิกเพื่อกรองคำศัพท์'}</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคำศัพท์ภาษาไทย หรือภาษาอังกฤษ เช่น DCA, NAV, ก.ล.ต., เงินเฟ้อ, P/E, บัญชีม้า..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-800/60 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-stone-500 dark:text-stone-400 mr-1">หมวดหมู่:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              ทั้งหมด
            </button>
            {GLOSSARY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          {(selectedSource !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSource('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 self-start sm:self-auto"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
        <span>
          พบ <strong>{filteredTerms.length}</strong> คำศัพท์ที่ตรงกับการค้นหา
        </span>
        <span className="hidden sm:inline">คลิกที่การ์ดเพื่อดูตัวอย่างและคำแนะนำสำหรับมือใหม่</span>
      </div>

      {/* Glossary Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] hover:border-emerald-500/60 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                      {term.termTh}
                    </h3>
                    <p className="font-mono text-xs text-amber-800 dark:text-amber-400">
                      {term.termEn}
                    </p>
                  </div>
                  {getSourceBadge(term.source)}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {term.shortDefinition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  หมวด: {term.categoryLabel}
                </span>
                <span className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>อ่านรายละเอียด</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
          <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
            ไม่พบคำศัพท์ที่ตรงกับคำค้นหา
          </h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            ลองเปลี่ยนคำค้นหา หรือกดล้างตัวกรองเพื่อดูรายการคำศัพท์ทั้งหมด
          </p>
          <button
            onClick={() => {
              setSelectedSource('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors"
          >
            แสดงคำศัพท์ทั้งหมด
          </button>
        </div>
      )}

      {/* Beginner Spotlight Tips Banner */}
      <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <h3 className="font-bold text-sm text-amber-900 dark:text-amber-200">
            ข้อแนะนำสำหรับมือใหม่ในการทำความเข้าใจคำศัพท์การลงทุน
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-stone-900/50 border border-amber-200/60 dark:border-amber-800/40">
            <strong className="block text-amber-950 dark:text-amber-100 mb-1">1. เริ่มจากความเสี่ยงเสมอ</strong>
            ก่อนจะถามว่าได้กำไรกี่เปอร์เซ็นต์ ให้เข้าใจระดับความเสี่ยง (Risk Level) และสภาพคล่องของสินทรัพย์นั้นๆ ก่อน
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-stone-900/50 border border-amber-200/60 dark:border-amber-800/40">
            <strong className="block text-amber-950 dark:text-amber-100 mb-1">2. ตรวจสอบใบอนุญาตก่อนโอน</strong>
            ใช้ระบบ SEC Check First ของ ก.ล.ต. ทุกครั้ง และห้ามโอนเงินเข้าบัญชีบุคคลธรรมดาเด็ดขาด
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-stone-900/50 border border-amber-200/60 dark:border-amber-800/40">
            <strong className="block text-amber-950 dark:text-amber-100 mb-1">3. พลังของ DCA และเวลา</strong>
            การลงทุนสม่ำเสมอในกองทุนดัชนีพร้อมให้เวลาดอกเบี้ยทบต้นทำงาน คือหัวใจสำคัญของความสำเร็จ
          </div>
        </div>
      </div>

      {/* Term Detail Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getSourceBadge(selectedTerm.source)}
                  <span className="text-[11px] font-mono text-stone-500">
                    หมวด: {selectedTerm.categoryLabel}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {selectedTerm.termTh}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-400">
                  {selectedTerm.termEn}
                </p>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-stone-800 dark:text-stone-200 text-sm">
              {/* Short Definition */}
              <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>นิยามสรุปอย่างสั้น</span>
                </div>
                <p className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm leading-relaxed">
                  {selectedTerm.shortDefinition}
                </p>
              </div>

              {/* Full Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  คำอธิบายเชิงลึก
                </h4>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs sm:text-sm">
                  {selectedTerm.fullExplanation}
                </p>
              </div>

              {/* Real World Example */}
              <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>ตัวอย่างสถานการณ์จริงสำหรับผู้เริ่มต้น</span>
                </div>
                <p className="text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm leading-relaxed">
                  {selectedTerm.example}
                </p>
              </div>

              {/* Beginner Tip */}
              <div className="space-y-2 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>ข้อคิด & เคล็ดลับสำหรับนักลงทุน</span>
                </div>
                <p className="text-amber-950 dark:text-amber-200 text-xs sm:text-sm leading-relaxed">
                  {selectedTerm.beginnerTip}
                </p>
              </div>

              {/* Related Terms */}
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs text-stone-500 mr-2">คำศัพท์ที่เกี่ยวข้อง:</span>
                  <div className="inline-flex gap-1.5 flex-wrap mt-1">
                    {selectedTerm.relatedTerms.map((rel, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-[#FCFAF7] dark:bg-[#18201B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyDefinition(selectedTerm)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === selectedTerm.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกนิยาม</span>
                    </>
                  )}
                </button>
                <a
                  href={selectedTerm.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 flex items-center gap-1.5 transition-colors"
                >
                  <span>แหล่งข้อมูลทางการ ({selectedTerm.sourceName})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="px-4 py-1.5 rounded-xl bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900 text-xs font-semibold hover:bg-stone-900 transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
