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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
            <span>ก.ล.ต. (SEC)</span>
          </span>
        );
      case 'bot':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-950/80 dark:text-pink-300 border border-pink-300 dark:border-fuchsia-800">
            <Landmark className="w-3.5 h-3.5 text-fuchsia-700 dark:text-fuchsia-400 font-semibold" />
            <span>ธปท. (BOT)</span>
          </span>
        );
      case 'set':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-950/80 dark:text-fuchsia-300 border border-fuchsia-300 dark:border-fuchsia-800">
            <TrendingUp className="w-3.5 h-3.5 text-fuchsia-700 dark:text-fuchsia-400" />
            <span>ตลาดหลักทรัพย์ฯ (SET)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header (Green & Warm Brown Earth Tone - No Japanese) */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-purple-700 dark:text-purple-400 font-bold font-semibold tracking-wider">KNOWLEDGE HUB</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="font-medium text-fuchsia-700 dark:text-fuchsia-400 font-semibold">คลังความรู้การลงทุน</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>มาตรฐาน 3 หน่วยงานกำกับดูแลไทย</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              คลังคำศัพท์ที่ควรรู้เกี่ยวกับการลงทุน
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mt-1">
              รวบรวมและเรียบเรียงนิยามคำศัพท์สำคัญที่ผู้เริ่มต้นลงทุนต้องเข้าใจ โดยอ้างอิงมาตรฐานจาก{' '}
              <strong>สำนักงาน ก.ล.ต.</strong>, <strong>ธนาคารแห่งประเทศไทย (ธปท.)</strong> และ{' '}
              <strong>ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</strong> เพื่อสร้างรากฐานความรู้ที่ถูกต้อง ป้องกันการถูกหลอกลวง
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
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
                ? 'bg-purple-50/80 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20 shadow-sm'
                : 'bg-[#F8FAFC] dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 hover:border-purple-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {source.id === 'sec' && <ShieldCheck className="w-5 h-5 text-purple-700 dark:text-purple-400" />}
                {source.id === 'bot' && <Landmark className="w-5 h-5 text-fuchsia-700 dark:text-fuchsia-400 font-semibold" />}
                {source.id === 'set' && <TrendingUp className="w-5 h-5 text-fuchsia-700 dark:text-fuchsia-400" />}
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{source.name}</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {INVESTMENT_GLOSSARY.filter((t) => t.source === source.id).length} คำ
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
              {source.orgTh}
            </p>
            <div className="mt-3 text-[11px] font-medium text-purple-700 dark:text-purple-400 flex items-center gap-1">
              <span>{selectedSource === source.id ? 'กำลังแสดงเฉพาะหมวดนี้' : 'คลิกเพื่อกรองคำศัพท์'}</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคำศัพท์ภาษาไทย หรือภาษาอังกฤษ เช่น DCA, NAV, ก.ล.ต., เงินเฟ้อ, P/E, บัญชีม้า..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">หมวดหมู่:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
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
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
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
              className="text-xs text-slate-500 hover:text-purple-700 dark:hover:text-purple-400 self-start sm:self-auto"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
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
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] hover:border-purple-500/60 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-purple-800 dark:group-hover:text-purple-400 transition-colors">
                      {term.termTh}
                    </h3>
                    <p className="font-mono text-xs text-fuchsia-700 dark:text-fuchsia-400 font-semibold">
                      {term.termEn}
                    </p>
                  </div>
                  {getSourceBadge(term.source)}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {term.shortDefinition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  หมวด: {term.categoryLabel}
                </span>
                <span className="font-semibold text-purple-800 dark:text-purple-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>อ่านรายละเอียด</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
            ไม่พบคำศัพท์ที่ตรงกับคำค้นหา
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            ลองเปลี่ยนคำค้นหา หรือกดล้างตัวกรองเพื่อดูรายการคำศัพท์ทั้งหมด
          </p>
          <button
            onClick={() => {
              setSelectedSource('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs text-xs font-semibold hover:bg-purple-900 transition-colors"
          >
            แสดงคำศัพท์ทั้งหมด
          </button>
        </div>
      )}

      {/* Beginner Spotlight Tips Banner */}
      <div className="p-6 rounded-2xl border border-pink-200 dark:border-fuchsia-900/60 bg-fuchsia-50/60 dark:bg-fuchsia-950/30 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-fuchsia-700 dark:text-fuchsia-400 font-semibold shrink-0" />
          <h3 className="font-bold text-sm text-fuchsia-900 dark:text-pink-200">
            ข้อแนะนำสำหรับมือใหม่ในการทำความเข้าใจคำศัพท์การลงทุน
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-fuchsia-900/90 dark:text-pink-200/90 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-pink-200/60 dark:border-fuchsia-800/40">
            <strong className="block text-fuchsia-950 dark:text-fuchsia-100 mb-1">1. เริ่มจากความเสี่ยงเสมอ</strong>
            ก่อนจะถามว่าได้กำไรกี่เปอร์เซ็นต์ ให้เข้าใจระดับความเสี่ยง (Risk Level) และสภาพคล่องของสินทรัพย์นั้นๆ ก่อน
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-pink-200/60 dark:border-fuchsia-800/40">
            <strong className="block text-fuchsia-950 dark:text-fuchsia-100 mb-1">2. ตรวจสอบใบอนุญาตก่อนโอน</strong>
            ใช้ระบบ SEC Check First ของ ก.ล.ต. ทุกครั้ง และห้ามโอนเงินเข้าบัญชีบุคคลธรรมดาเด็ดขาด
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-pink-200/60 dark:border-fuchsia-800/40">
            <strong className="block text-fuchsia-950 dark:text-fuchsia-100 mb-1">3. พลังของ DCA และเวลา</strong>
            การลงทุนสม่ำเสมอในกองทุนดัชนีพร้อมให้เวลาดอกเบี้ยทบต้นทำงาน คือหัวใจสำคัญของความสำเร็จ
          </div>
        </div>
      </div>

      {/* Term Detail Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getSourceBadge(selectedTerm.source)}
                  <span className="text-[11px] font-mono text-slate-500">
                    หมวด: {selectedTerm.categoryLabel}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {selectedTerm.termTh}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-fuchsia-700 dark:text-fuchsia-400 font-semibold">
                  {selectedTerm.termEn}
                </p>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200 text-sm">
              {/* Short Definition */}
              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-800 dark:text-purple-400 mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>นิยามสรุปอย่างสั้น</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
                  {selectedTerm.shortDefinition}
                </p>
              </div>

              {/* Full Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  คำอธิบายเชิงลึก
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {selectedTerm.fullExplanation}
                </p>
              </div>

              {/* Real World Example */}
              <div className="space-y-2 p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-300">
                  <Sparkles className="w-4 h-4 text-purple-700 dark:text-purple-400" />
                  <span>ตัวอย่างสถานการณ์จริงสำหรับผู้เริ่มต้น</span>
                </div>
                <p className="text-purple-950 dark:text-purple-200 text-xs sm:text-sm leading-relaxed">
                  {selectedTerm.example}
                </p>
              </div>

              {/* Beginner Tip */}
              <div className="space-y-2 p-4 rounded-2xl bg-fuchsia-50/70 dark:bg-fuchsia-950/30 border border-pink-200 dark:border-fuchsia-800/60">
                <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-900 dark:text-pink-300">
                  <Lightbulb className="w-4 h-4 text-fuchsia-700 dark:text-fuchsia-400 font-semibold" />
                  <span>ข้อคิด & เคล็ดลับสำหรับนักลงทุน</span>
                </div>
                <p className="text-fuchsia-950 dark:text-pink-200 text-xs sm:text-sm leading-relaxed">
                  {selectedTerm.beginnerTip}
                </p>
              </div>

              {/* Related Terms */}
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs text-slate-500 mr-2">คำศัพท์ที่เกี่ยวข้อง:</span>
                  <div className="inline-flex gap-1.5 flex-wrap mt-1">
                    {selectedTerm.relatedTerms.map((rel, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyDefinition(selectedTerm)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === selectedTerm.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-purple-600" />
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
                  className="px-3 py-1.5 rounded-xl border border-purple-300 dark:border-purple-800 text-xs font-semibold text-purple-800 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950 flex items-center gap-1.5 transition-colors"
                >
                  <span>แหล่งข้อมูลทางการ ({selectedTerm.sourceName})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 text-xs font-semibold hover:bg-slate-900 transition-colors"
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
