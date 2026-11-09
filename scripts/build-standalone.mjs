import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('public/investprep-standalone.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Remove "100% ออฟไลน์โดยไม่ต้องใช้เซิร์ฟเวอร์" and similar
html = html.replace(
  'ออกแบบตามเกณฑ์ประเมิน TSI และสำนักงาน ก.ล.ต. ไฟล์นี้ทำงานได้ 100% ออฟไลน์โดยไม่ต้องใช้เซิร์ฟเวอร์',
  'ออกแบบตามเกณฑ์ประเมิน TSI และสำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์ (ก.ล.ต.)'
);

// 2. Change TSI institute link to central SET website
html = html.replace(
  'href="https://www.set.or.th/th/education-research/education/tsi"',
  'href="https://www.set.or.th"'
);
html = html.replace(
  'สถาบัน TSI ตลาดหลักทรัพย์ฯ\n          </a>',
  'ตลาดหลักทรัพย์แห่งประเทศไทย (SET)\n          </a>'
);
html = html.replace(
  'สถาบัน TSI ตลาดหลักทรัพย์ฯ</a>',
  'ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</a>'
);

// 3. Update Navbar Navigation: Combine Glossary and Caution into Knowledge, Legal & Tax Hub
const oldNavButtons = `          <!-- 5. Investment Glossary (New Dedicated Tab) -->
          <button onclick="switchTab('glossary')" id="tab-btn-glossary" class="tab-btn shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all text-stone-700 hover:bg-stone-100 border border-stone-200 bg-white">
            <span>📖 คลังคำศัพท์การลงทุน</span>
          </button>

          <!-- 6. Cautions -->
          <button onclick="switchTab('caution')" id="tab-btn-caution" class="tab-btn shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all text-stone-700 hover:bg-stone-100 border border-stone-200 bg-white">
            <span>🛡️ ข้อควรระวัง & มิจฉาชีพ</span>
          </button>`;

const newNavButtons = `          <!-- 5. Knowledge, Legal & Tax Hub Group Dropdown -->
          <div class="relative">
            <button onclick="toggleGroupMenu('knowledge_hub')" id="group-btn-knowledge_hub" class="group-btn shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all text-stone-700 hover:bg-stone-100 border border-stone-200 bg-white">
              <span>📚 ความรู้ กฎหมาย & ภาษี</span>
              <svg class="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div id="group-menu-knowledge_hub" class="group-dropdown-menu hidden absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 text-xs">
              <button onclick="switchTab('knowledge_hub'); setKnowledgeSubTab('glossary'); closeAllMenus()" class="w-full px-3.5 py-2 text-left hover:bg-stone-50 flex items-center gap-2">
                <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center justify-center">07.1</span>
                <div>
                  <div class="font-semibold text-stone-900">คลังคำศัพท์การลงทุน</div>
                  <div class="text-[10px] text-stone-500">18 คำศัพท์มาตรฐาน ก.ล.ต./ธปท./SET</div>
                </div>
              </button>
              <button onclick="switchTab('knowledge_hub'); setKnowledgeSubTab('tax_legal'); closeAllMenus()" class="w-full px-3.5 py-2 text-left hover:bg-stone-50 flex items-center gap-2">
                <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center justify-center">07.2</span>
                <div>
                  <div class="font-semibold text-stone-900">กฎหมาย & คำนวณภาษีลงทุน</div>
                  <div class="text-[10px] text-stone-500">เกณฑ์ภาษี 6 สินทรัพย์ & เครื่องคิดเลขภาษี</div>
                </div>
              </button>
              <button onclick="switchTab('knowledge_hub'); setKnowledgeSubTab('caution'); closeAllMenus()" class="w-full px-3.5 py-2 text-left hover:bg-stone-50 flex items-center gap-2">
                <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center justify-center">07.3</span>
                <div>
                  <div class="font-semibold text-stone-900">ข้อควรระวัง & มิจฉาชีพ</div>
                  <div class="text-[10px] text-stone-500">Scam Red-Flags & สายด่วน 1207</div>
                </div>
              </button>
            </div>
          </div>`;

if (html.includes(oldNavButtons)) {
  html = html.replace(oldNavButtons, newNavButtons);
}

// 4. Update the Welcome Step 7 & 8 card in Welcome section if present
html = html.replace(
  `<span>ถัดไป: คลังคำศัพท์การลงทุน (ก.ล.ต./ธปท./SET)</span>`,
  `<span>ถัดไป: ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน</span>`
);
html = html.replace(
  `switchTab('glossary')`,
  `switchTab('knowledge_hub')`
);

// 5. Replace separate glossary and caution sections with the unified Knowledge, Legal & Tax Hub section
const startGlossaryIdx = html.indexOf('<!-- TAB: INVESTMENT GLOSSARY SECTION (คลังคำศัพท์การลงทุน) -->');
const endCautionIdx = html.indexOf('<!-- Finish & Open Report Banner -->');

if (startGlossaryIdx !== -1 && endCautionIdx !== -1) {
  const endSectionIdx = html.indexOf('</section>', endCautionIdx);
  const endIdx = endSectionIdx + '</section>'.length;

  const unifiedHubSection = `<!-- TAB 07: KNOWLEDGE, LEGAL & TAXATION HUB (ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน) -->
    <section id="tab-content-knowledge_hub" class="tab-panel hidden space-y-8">
      <!-- Hub Overarching Header -->
      <div class="border-b border-stone-200 pb-5">
        <div class="flex items-center gap-2 text-xs text-stone-500 mb-1">
          <span class="font-mono text-emerald-800 font-bold">KNOWLEDGE & REGULATORY HUB</span>
          <span>/</span>
          <span class="text-amber-800 font-medium">ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน</span>
          <span>/</span>
          <span>มาตรฐาน 3 หน่วยงานกำกับดูแลไทย</span>
        </div>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              ศูนย์ความรู้ กฎหมาย & ภาษีการลงทุน
            </h2>
            <p class="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
              รวบรวมคลังคำศัพท์ กฎหมายคุ้มครองสิทธิผู้ลงทุน เกณฑ์ภาษีพร้อมเครื่องคิดเลขคำนวณภาษี และเกราะป้องกันมิจฉาชีพ ตามมาตรฐาน <strong>สำนักงาน ก.ล.ต.</strong>, <strong>ธนาคารแห่งประเทศไทย (ธปท.)</strong> และ <strong>ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</strong> ไว้ครบถ้วนในหมวดเดียว
            </p>
          </div>
        </div>

        <!-- 3 Category Sub-Tab Switcher -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <button onclick="setKnowledgeSubTab('glossary')" id="k-tab-btn-glossary" class="p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between bg-emerald-50 border-emerald-600 shadow-2xs ring-2 ring-emerald-600/20">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold bg-emerald-800 text-white">
                📖
              </div>
              <div>
                <div class="font-bold text-xs sm:text-sm text-stone-900">1. คลังคำศัพท์การลงทุน</div>
                <div class="text-[11px] text-stone-500">18 คำศัพท์มาตรฐาน ค้นหา & ตัวกรอง</div>
              </div>
            </div>
          </button>

          <button onclick="setKnowledgeSubTab('tax_legal')" id="k-tab-btn-tax_legal" class="p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between bg-white border-stone-200 hover:border-emerald-300">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold bg-stone-100 text-stone-700">
                ⚖️
              </div>
              <div>
                <div class="font-bold text-xs sm:text-sm text-stone-900">2. กฎหมาย & คำนวณภาษีลงทุน</div>
                <div class="text-[11px] text-stone-500">เกณฑ์ภาษี 6 สินทรัพย์ + เครื่องคิดเลขภาษี</div>
              </div>
            </div>
          </button>

          <button onclick="setKnowledgeSubTab('caution')" id="k-tab-btn-caution" class="p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between bg-white border-stone-200 hover:border-emerald-300">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold bg-stone-100 text-stone-700">
                🛡️
              </div>
              <div>
                <div class="font-bold text-xs sm:text-sm text-stone-900">3. ข้อควรระวัง & มิจฉาชีพ</div>
                <div class="text-[11px] text-stone-500">Scam Red-Flag Detector & สายด่วน 1207</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- SUB-VIEW 1: GLOSSARY -->
      <div id="k-subview-glossary" class="space-y-6">
        <!-- 3 Authority Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div onclick="filterGlossarySource('sec')" class="glossary-source-card p-4 rounded-xl border border-stone-200 bg-white hover:border-emerald-500 cursor-pointer space-y-1.5 transition-all">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-900 text-sm">สำนักงาน ก.ล.ต.</span>
              <span class="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">SEC Thailand</span>
            </div>
            <p class="text-stone-500">กำกับดูแลตลาดทุน ปกป้องสิทธิผู้ลงทุน และปราบปรามมิจฉาชีพหลอกลงทุน</p>
          </div>
          <div onclick="filterGlossarySource('bot')" class="glossary-source-card p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-500 cursor-pointer space-y-1.5 transition-all">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-900 text-sm">ธนาคารแห่งประเทศไทย</span>
              <span class="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Bank of Thailand</span>
            </div>
            <p class="text-stone-500">ดูแลเสถียรภาพระบบการเงิน อัตราดอกเบี้ยนโยบาย เงินเฟ้อ และภาระหนี้ DTI</p>
          </div>
          <div onclick="filterGlossarySource('set')" class="glossary-source-card p-4 rounded-xl border border-stone-200 bg-white hover:border-teal-500 cursor-pointer space-y-1.5 transition-all">
            <div class="flex items-center justify-between">
              <span class="font-bold text-teal-900 text-sm">ตลาดหลักทรัพย์แห่งประเทศไทย</span>
              <span class="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded">SET Thailand</span>
            </div>
            <p class="text-stone-500">ศูนย์กลางซื้อขายหุ้น กองทุนรวม ETF ดัชนีตลาด และหลักสูตรสถาบัน TSI</p>
          </div>
        </div>

        <!-- Search & Filters Bar -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div class="relative">
            <input type="text" id="glossary-search-input" oninput="handleGlossarySearch()" placeholder="ค้นหาคำศัพท์ภาษาไทย หรือภาษาอังกฤษ เช่น DCA, NAV, เงินเฟ้อ, P/E, ก.ล.ต., DTI, บัญชีม้า..." class="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700">
          </div>
          <div class="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span class="text-stone-400 font-medium">หน่วยงาน:</span>
            <button onclick="filterGlossarySource('all')" id="g-src-all" class="g-src-btn px-2.5 py-1 rounded-lg font-semibold bg-emerald-800 text-white">ทั้งหมด</button>
            <button onclick="filterGlossarySource('sec')" id="g-src-sec" class="g-src-btn px-2.5 py-1 rounded-lg text-stone-600 hover:bg-stone-100 bg-stone-50 border border-stone-200">สำนักงาน ก.ล.ต.</button>
            <button onclick="filterGlossarySource('bot')" id="g-src-bot" class="g-src-btn px-2.5 py-1 rounded-lg text-stone-600 hover:bg-stone-100 bg-stone-50 border border-stone-200">ธนาคารแห่งประเทศไทย</button>
            <button onclick="filterGlossarySource('set')" id="g-src-set" class="g-src-btn px-2.5 py-1 rounded-lg text-stone-600 hover:bg-stone-100 bg-stone-50 border border-stone-200">ตลาดหลักทรัพย์ฯ</button>
          </div>
        </div>

        <!-- Glossary Terms Grid Container -->
        <div id="glossary-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Rendered via JS -->
        </div>
      </div>

      <!-- SUB-VIEW 2: TAX & LEGAL -->
      <div id="k-subview-tax_legal" class="hidden space-y-8">
        <!-- Asset Tax Rules Grid (6 Asset Classes) -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>เกณฑ์ภาษีการลงทุนตามประเภทสินทรัพย์ (อ้างอิงกรมสรรพากร & ก.ล.ต.)</span>
            </h3>
            <span class="text-xs text-stone-500 font-mono">6 หมวดสินทรัพย์</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <!-- 1. Thai Stocks -->
            <div class="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-stone-900">1. หุ้นไทยในตลาดหลักทรัพย์ (SET/mai)</span>
                <span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">SET</span>
              </div>
              <div class="space-y-1 text-stone-600">
                <p>• <strong>กำไรส่วนต่างราคา (Capital Gain):</strong> ได้รับการยกเว้นภาษีเงินได้บุคคลธรรมดา 100%</p>
                <p>• <strong>เงินปันผล (Dividend):</strong> ถูกหักภาษี ณ ที่จ่าย 10% สามารถเลือกเป็น Final Tax หรือนำมารวมคำนวณเพื่อขอ <strong>เครดิตภาษีเงินปันผล (ม.47 ทวิ)</strong> ได้</p>
              </div>
            </div>

            <!-- 2. Mutual Funds & Tax Savers -->
            <div class="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-stone-900">2. กองทุนรวมทั่วไป & กองทุนลดหย่อน</span>
                <span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">SSF/RMF/Thai ESG</span>
              </div>
              <div class="space-y-1 text-stone-600">
                <p>• <strong>กำไรขายคืนหน่วยลงทุน:</strong> ยกเว้นภาษี</p>
                <p>• <strong>กองทุนลดหย่อนภาษี:</strong> Thai ESG ลดหย่อนได้สูงสุด 300,000 บาท (ถือ 5 ปีวันชนวัน), SSF ลดหย่อนได้ 30% ไม่เกิน 200,000 บาท (ถือ 10 ปี), RMF ไม่เกิน 500,000 บาท (ถือถึงอายุ 55 ปี)</p>
              </div>
            </div>

            <!-- 3. Bonds -->
            <div class="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-stone-900">3. หุ้นกู้เอกชน & พันธบัตรรัฐบาล</span>
                <span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Bonds</span>
              </div>
              <div class="space-y-1 text-stone-600">
                <p>• <strong>ดอกเบี้ยและคูปอง:</strong> หักภาษี ณ ที่จ่าย 15% สามารถเลือกเป็น Final Tax ได้โดยไม่ต้องยื่นรวมปลายปี</p>
                <p>• <strong>Capital Gain จากการขายในตลาดรอง:</strong> เสียภาษีหัก ณ ที่จ่าย 15%</p>
              </div>
            </div>

            <!-- 4. Foreign Stocks (Por 161/2566) -->
            <div class="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-stone-900">4. หุ้นและ ETF ต่างประเทศ (ป.161/2566)</span>
                <span class="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">คำสั่ง ป.161</span>
              </div>
              <div class="space-y-1 text-stone-600">
                <p>• <strong>ผู้อยู่ในไทยเกิน 180 วัน:</strong> หากมีเงินได้จากสินทรัพย์ในต่างประเทศ และนำเงินได้นั้นกลับเข้าประเทศไทยในปีภาษีใด ต้องนำมารวมคำนวณภาษีเงินได้บุคคลธรรมดาในปีนั้น</p>
                <p>• <strong>อนุสัญญาภาษีซ้อน (DTA):</strong> สามารถนำภาษีที่จ่ายในต่างประเทศมาเคลมเครดิตภาษีในไทยได้ตามเงื่อนไขอนุสัญญา</p>
              </div>
            </div>

            <!-- 5. Crypto -->
            <div class="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-stone-900">5. สินทรัพย์ดิจิทัล (Crypto / Token)</span>
                <span class="px-1.5 py-0.5 rounded bg-pink-100 text-pink-800 text-[10px] font-bold">พ.ร.ก. 2561</span>
              </div>
              <div class="space-y-1 text-stone-600">
                <p>• <strong>กำไรจากการซื้อขาย:</strong> หักภาษี ณ ที่จ่าย 15% และต้องนำมารวมคำนวณภาษีเงินได้ประจำปี</p>
                <p>• <strong>สิทธิหักกลบผลขาดทุน:</strong> สามารถนำผลขาดทุนมาหักกลบกำไรได้เฉพาะการซื้อขายผ่านศูนย์ซื้อขายที่ได้รับใบอนุญาต ก.ล.ต. (Licensed Exchanges) ในปีภาษีเดียวกัน</p>
              </div>
            </div>

            <!-- 6. REITs -->
            <div class="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-stone-900">6. กองทรัสต์อสังหาริมทรัพย์ (REITs / IFF)</span>
                <span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Property</span>
              </div>
              <div class="space-y-1 text-stone-600">
                <p>• <strong>เงินปันผลจากค่าเช่า:</strong> หัก ณ ที่จ่าย 10% สามารถเลือกเป็น Final Tax ได้</p>
                <p>• <strong>กำไรส่วนต่างราคาในตลาดหลักทรัพย์:</strong> ได้รับการยกเว้นภาษีเงินได้บุคคลธรรมดา</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3 Interactive Investment Tax Calculators -->
        <div class="space-y-6 pt-4 border-t border-stone-200">
          <div>
            <h3 class="text-lg font-bold text-stone-900">ระบบจำลองคำนวณภาษีจากการลงทุน (Interactive Tax Calculators)</h3>
            <p class="text-xs text-stone-500">เลือกโปรแกรมคำนวณที่ตรงกับความต้องการของคุณเพื่อวางแผนประหยัดภาษีอย่างถูกต้องตามกฎหมาย</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Calculator 1: Dividend Tax Credit -->
            <div class="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-2xs flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-emerald-800">1. เครดิตภาษีเงินปันผล (ม.47 ทวิ)</span>
                  <span class="text-[10px] font-mono text-stone-400">หุ้นไทย</span>
                </div>
                <div class="space-y-2 text-xs">
                  <div>
                    <label class="block text-stone-500 mb-1">เงินปันผลสุทธิที่ได้รับ (บาท)</label>
                    <input type="number" id="calc-div-amount" value="50000" oninput="calculateDivTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono">
                  </div>
                  <div>
                    <label class="block text-stone-500 mb-1">อัตราภาษีนิติบุคคลของบริษัท (ทั่วไป 20%)</label>
                    <select id="calc-div-corp" onchange="calculateDivTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300">
                      <option value="0.20">20% (บริษัททั่วไปใน SET)</option>
                      <option value="0.25">25% (บางกลุ่มธุรกิจ)</option>
                      <option value="0.15">15% (SMEs)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-stone-500 mb-1">ฐานภาษีบุคคลธรรมดาของคุณ</label>
                    <select id="calc-div-personal" onchange="calculateDivTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300">
                      <option value="0">0% (รายได้สุทธิไม่เกิน 150,000)</option>
                      <option value="0.05">5% (150,001 - 300,000)</option>
                      <option value="0.10" selected>10% (300,001 - 500,000)</option>
                      <option value="0.15">15% (500,001 - 750,000)</option>
                      <option value="0.20">20% (750,001 - 1,000,000)</option>
                      <option value="0.25">25% (1,000,001 - 2,000,000)</option>
                      <option value="0.30">30% (2,000,001 - 5,000,000)</option>
                      <option value="0.35">35% (มากกว่า 5,000,000)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5 mt-2">
                <div class="flex justify-between">
                  <span class="text-stone-600">เครดิตภาษีที่ได้รับ:</span>
                  <span id="calc-div-credit" class="font-bold font-mono text-emerald-800">+฿12,500</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-600">ภาษีหัก ณ ที่จ่าย 10%:</span>
                  <span id="calc-div-withheld" class="font-mono text-stone-700">฿5,000</span>
                </div>
                <div class="flex justify-between border-t border-emerald-200 pt-1.5 font-bold">
                  <span id="calc-div-result-label" class="text-emerald-900">ขอคืนภาษีได้สุทธิ:</span>
                  <span id="calc-div-result-val" class="font-mono text-emerald-800 text-sm">+฿11,250</span>
                </div>
              </div>
            </div>

            <!-- Calculator 2: Tax Saving Funds (SSF/RMF/Thai ESG) -->
            <div class="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-2xs flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-amber-800">2. สิทธิลดหย่อนกองทุนภาษี</span>
                  <span class="text-[10px] font-mono text-stone-400">SSF/RMF/Thai ESG</span>
                </div>
                <div class="space-y-2 text-xs">
                  <div>
                    <label class="block text-stone-500 mb-1">ประเภทกองทุน</label>
                    <select id="calc-fund-type" onchange="calculateFundTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300">
                      <option value="thaiesg">Thai ESG (ลดหย่อนได้สูงสุด 300,000)</option>
                      <option value="ssf">SSF (สูงสุด 30% ไม่เกิน 200,000)</option>
                      <option value="rmf">RMF (สูงสุด 30% รวมไม่เกิน 500,000)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-stone-500 mb-1">จำนวนเงินที่ลงทุน (บาท)</label>
                    <input type="number" id="calc-fund-amount" value="100000" oninput="calculateFundTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono">
                  </div>
                  <div>
                    <label class="block text-stone-500 mb-1">ฐานภาษีสูงสุดของคุณ</label>
                    <select id="calc-fund-bracket" onchange="calculateFundTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300">
                      <option value="0.05">5% (เงินได้สุทธิ 150,001 - 300,000)</option>
                      <option value="0.10">10% (เงินได้สุทธิ 300,001 - 500,000)</option>
                      <option value="0.15" selected>15% (เงินได้สุทธิ 500,001 - 750,000)</option>
                      <option value="0.20">20% (เงินได้สุทธิ 750,001 - 1,000,000)</option>
                      <option value="0.25">25% (เงินได้สุทธิ 1,000,001 - 2,000,000)</option>
                      <option value="0.30">30% (เงินได้สุทธิ 2,000,001 - 5,000,000)</option>
                      <option value="0.35">35% (มากกว่า 5,000,000)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5 mt-2">
                <div class="flex justify-between">
                  <span class="text-stone-600">ภาษีที่ประหยัดได้:</span>
                  <span id="calc-fund-saved" class="font-bold font-mono text-amber-800 text-sm">฿15,000</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-600">ต้นทุนเงินลงทุนจริง:</span>
                  <span id="calc-fund-netcost" class="font-mono text-stone-700">฿85,000</span>
                </div>
                <div class="flex justify-between border-t border-amber-200 pt-1.5 font-bold">
                  <span class="text-amber-900">ผลตอบแทนทันทีจากภาษี:</span>
                  <span id="calc-fund-yield" class="font-mono text-amber-800">+15.0%</span>
                </div>
              </div>
            </div>

            <!-- Calculator 3: Foreign Investment Tax (Por 161/2566) -->
            <div class="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-2xs flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-indigo-800">3. ประมาณการภาษีหุ้นนอก (ป.161)</span>
                  <span class="text-[10px] font-mono text-stone-400">ป.161/2566</span>
                </div>
                <div class="space-y-2 text-xs">
                  <div>
                    <label class="block text-stone-500 mb-1">กำไรที่นำกลับเข้าไทยในปีนี้ (บาท)</label>
                    <input type="number" id="calc-foreign-gain" value="100000" oninput="calculateForeignTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono">
                  </div>
                  <div>
                    <label class="block text-stone-500 mb-1">ฐานภาษีเงินได้บุคคลธรรมดาในไทย</label>
                    <select id="calc-foreign-bracket" onchange="calculateForeignTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300">
                      <option value="0.05">5%</option>
                      <option value="0.10">10%</option>
                      <option value="0.15">15%</option>
                      <option value="0.20" selected>20%</option>
                      <option value="0.25">25%</option>
                      <option value="0.30">30%</option>
                      <option value="0.35">35%</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-stone-500 mb-1">ภาษีที่จ่ายในต่างประเทศแล้ว (เครดิต DTA)</label>
                    <input type="number" id="calc-foreign-credit" value="0" oninput="calculateForeignTax()" class="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono">
                  </div>
                </div>
              </div>

              <div class="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs space-y-1.5 mt-2">
                <div class="flex justify-between">
                  <span class="text-stone-600">ภาษีในไทยก่อนเครดิต:</span>
                  <span id="calc-foreign-thai-tax" class="font-mono text-stone-700">฿20,000</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-600">หักเครดิตภาษีต่างประเทศ:</span>
                  <span id="calc-foreign-dta-credit" class="font-mono text-stone-700">-฿0</span>
                </div>
                <div class="flex justify-between border-t border-indigo-200 pt-1.5 font-bold">
                  <span class="text-indigo-900">ภาษีที่ต้องชำระเพิ่มเติมในไทย:</span>
                  <span id="calc-foreign-net-payable" class="font-mono text-indigo-800 text-sm">฿20,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 Key Statutory Protections -->
        <div class="space-y-3 pt-4 border-t border-stone-200">
          <h3 class="text-lg font-bold text-stone-900">5 กฎหมายสำคัญคุ้มครองผู้ลงทุนในประเทศไทย</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <span class="font-bold text-emerald-900 block">1. พ.ร.บ. หลักทรัพย์และตลาดหลักทรัพย์ พ.ศ. 2535</span>
              <p class="text-stone-600">กฎหมายแม่บทกำกับตลาดทุน บังคับให้บริษัทจดทะเบียนเปิดเผยข้อมูลอย่างโปร่งใส และลงโทษการใช้ข้อมูลภายใน (Insider Trading)</p>
            </div>
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <span class="font-bold text-amber-900 block">2. พ.ร.บ. สถาบันคุ้มครองเงินฝาก พ.ศ. 2551 (DPA)</span>
              <p class="text-stone-600">คุ้มครองเงินฝากในสถาบันการเงินที่อยู่ภายใต้การกำกับดูแล วงเงิน 1 ล้านบาท ต่อ 1 รายผู้ฝาก ต่อ 1 สถาบันการเงิน</p>
            </div>
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <span class="font-bold text-teal-900 block">3. กฎหมายควบคุมการแลกเปลี่ยนเงิน ธปท.</span>
              <p class="text-stone-600">กำกับการโอนเงินตราต่างประเทศเพื่อการลงทุนผ่านตัวแทนที่ได้รับอนุญาต เพื่อรักษาเสถียรภาพค่าเงินบาท</p>
            </div>
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <span class="font-bold text-rose-900 block">4. พ.ร.ก. มาตรการป้องกันและปราบปรามอาชญากรรมทางเทคโนโลยี พ.ศ. 2566</span>
              <p class="text-stone-600">ลงโทษผู้เปิดหรือยินยอมให้ใช้ "บัญชีม้า" และ "ซิมม้า" โทษจำคุกสูงสุด 3 ปี หรือปรับสูงสุด 300,000 บาท หรือทั้งจำทั้งปรับ</p>
            </div>
          </div>
        </div>
      </div>

      <!-- SUB-VIEW 3: CAUTION & WARNINGS -->
      <div id="k-subview-caution" class="hidden space-y-8">
        <!-- Regulatory Notice -->
        <div class="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
          <div class="flex items-center gap-2 font-bold text-rose-900 text-xs uppercase tracking-wide">
            <span>คำเตือนสำคัญจากสำนักงาน ก.ล.ต. (SEC Thailand)</span>
          </div>
          <p class="text-xs leading-relaxed text-rose-900/90">
            "การลงทุนมีความเสี่ยง ผู้ลงทุนควรทำความเข้าใจลักษณะสินค้า เงื่อนไขผลตอบแทน และความเสี่ยงก่อนตัดสินใจลงทุน"
            อย่าหลงเชื่อบุคคลหรือเพจที่การันตีผลตอบแทนสูงผิดปกติ หรือชักชวนให้โอนเงินเข้าบัญชีส่วนบุคคล ตรวจสอบรายชื่อผู้ประกอบธุรกิจที่ได้รับอนุญาตผ่านแอป SEC Check First เสมอ
          </p>
        </div>

        <!-- Scam Red-Flag Inspector -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 class="text-base font-bold text-stone-900">ระบบตรวจสอบสัญญาณอันตรายมิจฉาชีพ (Scam Red-Flag Detector)</h3>
          <p class="text-xs text-stone-500">ติ๊กข้อความที่คุณพบบ่อยในข้อเสนอการลงทุน หากมีแม้แต่ข้อเดียว ให้สันนิษฐานว่าเป็นมิจฉาชีพ 100%</p>
          
          <div class="space-y-2.5 text-xs">
            <label class="flex items-start gap-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
              <input type="checkbox" onchange="checkScamFlags()" class="scam-flag-input mt-0.5 rounded text-rose-600 focus:ring-rose-500">
              <span>การันตีผลตอบแทนแน่นอน 10-30% ต่อเดือน ไม่มีวันขาดทุน</span>
            </label>
            <label class="flex items-start gap-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
              <input type="checkbox" onchange="checkScamFlags()" class="scam-flag-input mt-0.5 rounded text-rose-600 focus:ring-rose-500">
              <span>ให้โอนเงินเข้า "บัญชีบุคคลธรรมดา" อ้างว่าเป็นตัวแทนบริษัทหรือแอดมิน</span>
            </label>
            <label class="flex items-start gap-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
              <input type="checkbox" onchange="checkScamFlags()" class="scam-flag-input mt-0.5 rounded text-rose-600 focus:ring-rose-500">
              <span>มีโปรโมชันแนะนำเพื่อนแล้วได้ค่าคอมมิชชันเป็นทอดๆ คล้ายแชร์ลูกโซ่</span>
            </label>
            <label class="flex items-start gap-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
              <input type="checkbox" onchange="checkScamFlags()" class="scam-flag-input mt-0.5 rounded text-rose-600 focus:ring-rose-500">
              <span>เมื่อต้องการถอนเงิน จะมีเงื่อนไขให้โอนเงินเพิ่มเป็นค่าธรรมเนียมหรือภาษีก่อนเสมอ</span>
            </label>
          </div>

          <div id="scam-alert-box" class="hidden p-4 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-semibold">
            ⚠️ ตรวจพบสัญญาณอันตราย! ข้อเสนอที่มีลักษณะดังกล่าวเข้าข่ายหลอกลวง ห้ามโอนเงินโดยเด็ดขาด และตรวจสอบผ่านแอป SEC Check First หรือโทรสายด่วน 1207 ทันที
          </div>
        </div>

        <!-- Hotlines and Official Channels -->
        <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
          <span class="font-bold text-stone-800">ช่องทางติดต่อและตรวจสอบทางการ:</span>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div class="p-3 rounded-xl bg-white border border-stone-200">
              <span class="font-bold text-emerald-800 block">สายด่วน ก.ล.ต. 1207</span>
              <span class="text-stone-500 text-[11px]">แจ้งเบาะแสมิจฉาชีพและหลอกลงทุน</span>
            </div>
            <div class="p-3 rounded-xl bg-white border border-stone-200">
              <span class="font-bold text-amber-800 block">ศูนย์คุ้มครองผู้ใช้บริการทางการเงิน (ศคง. 1213)</span>
              <span class="text-stone-500 text-[11px]">ธนาคารแห่งประเทศไทย</span>
            </div>
            <div class="p-3 rounded-xl bg-white border border-stone-200">
              <span class="font-bold text-teal-800 block">SET Contact Center 02-009-9999</span>
              <span class="text-stone-500 text-[11px]">ตลาดหลักทรัพย์แห่งประเทศไทย</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Finish & Open Report Banner -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="text-base sm:text-lg font-bold">คุณได้ประเมินและสำรวจข้อมูลครบทุกหมวดแล้ว</h3>
          <p class="text-xs text-emerald-200 mt-0.5">เปิดดูรายงานฉบับเต็มเพื่อสรุปพอร์ตและพิมพ์เป็นเอกสาร PDF สำหรับใช้วางแผนการเงินจริง</p>
        </div>
        <button onclick="openReportModal()" class="px-5 py-3 text-xs font-bold text-emerald-950 bg-amber-300 hover:bg-amber-400 rounded-xl shadow-md transition-all shrink-0">
          เปิดดูและพิมพ์รายงานสรุปฉบับเต็ม
        </button>
      </div>
    </section>`;

  html = html.substring(0, startGlossaryIdx) + unifiedHubSection + html.substring(endIdx);
}

// 6. Update Report Modal HTML to have dynamic allocation container and SET link
html = html.replace(
  `<div class="space-y-2">\n            <div class="flex justify-between items-center py-1 border-b border-stone-100">\n              <span class="font-medium text-stone-800">หุ้นกู้เอกชน / กองทุนตราสารหนี้</span>\n              <span class="font-bold text-stone-900">40%</span>\n            </div>\n            <div class="flex justify-between items-center py-1 border-b border-stone-100">\n              <span class="font-medium text-stone-800">กองทุนดัชนีหุ้นต่างประเทศ (Global Equity ETFs)</span>\n              <span class="font-bold text-stone-900">30%</span>\n            </div>\n            <div class="flex justify-between items-center py-1 border-b border-stone-100">\n              <span class="font-medium text-stone-800">หุ้นไทยขนาดใหญ่ / SET50 Index</span>\n              <span class="font-bold text-stone-900">15%</span>\n            </div>\n            <div class="flex justify-between items-center py-1 border-b border-stone-100">\n              <span class="font-medium text-stone-800">กองทุนอสังหาริมทรัพย์และรีทส์ (REITs)</span>\n              <span class="font-bold text-stone-900">10%</span>\n            </div>\n            <div class="flex justify-between items-center py-1">\n              <span class="font-medium text-stone-800">ทองคำแท่ง / กองทุนรวมทองคำ (Gold)</span>\n              <span class="font-bold text-stone-900">5%</span>\n            </div>\n          </div>`,
  `<div id="rep-allocation-list" class="space-y-2">
            <!-- Dynamic slices populated via JS -->
          </div>`
);

// Add SET and SEC references inside report modal
html = html.replace(
  `<!-- Section 4: Regulatory Disclaimer -->\n        <div class="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-900 leading-relaxed">\n          <strong>คำเตือน ก.ล.ต.:</strong> การลงทุนมีความเสี่ยง ผู้ลงทุนควรทำความเข้าใจลักษณะสินค้า เงื่อนไขผลตอบแทน และความเสี่ยงก่อนตัดสินใจลงทุน ผลการดำเนินงานในอดีตมิได้เป็นสิ่งยืนยันถึงผลการดำเนินงานในอนาคต เอกสารนี้จัดทำขึ้นเพื่อการวางแผนเบื้องต้นเท่านั้น\n        </div>`,
  `<!-- Section 4: Regulatory Disclaimer & Official Links -->
        <div class="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-900 leading-relaxed space-y-1">
          <div><strong>คำเตือน ก.ล.ต.:</strong> การลงทุนมีความเสี่ยง ผู้ลงทุนควรทำความเข้าใจลักษณะสินค้า เงื่อนไขผลตอบแทน และความเสี่ยงก่อนตัดสินใจลงทุน ผลการดำเนินงานในอดีตมิได้เป็นสิ่งยืนยันถึงผลการดำเนินงานในอนาคต เอกสารนี้จัดทำขึ้นเพื่อการวางแผนเบื้องต้นเท่านั้น</div>
          <div class="text-[10px] text-stone-500 pt-1 border-t border-rose-200 flex gap-3">
            <span>แหล่งข้อมูลทางการ:</span>
            <a href="https://www.set.or.th" target="_blank" class="text-emerald-800 hover:underline">ตลาดหลักทรัพย์แห่งประเทศไทย (SET)</a>
            <span>•</span>
            <a href="https://www.sec.or.th" target="_blank" class="text-emerald-800 hover:underline">สำนักงาน ก.ล.ต.</a>
          </div>
        </div>`
);

// 7. Update JavaScript Functions:
// Replace updatePortfolioRecommendation & openReportModal & add tax calculators & sub-tabs controller
const oldJsBlock = `    function updatePortfolioRecommendation() {
      const bar = document.getElementById('portfolio-stacked-bar');
      const table = document.getElementById('portfolio-table-body');
      
      const allocations = [
        { name: 'ตราสารหนี้ & พันธบัตร', pct: 40, color: 'bg-emerald-800', tools: 'หุ้นกู้เอกชน A+, กองทุนตราสารหนี้', role: 'สร้างกระแสเงินสดและลดความผันผวน' },
        { name: 'หุ้นต่างประเทศ (Global ETFs)', pct: 30, color: 'bg-emerald-600', tools: 'S&P 500, MSCI World, All-Country World', role: 'สร้างการเติบโตระยะยาวทั่วโลก' },
        { name: 'หุ้นไทยขนาดใหญ่ (SET50)', pct: 15, color: 'bg-amber-700', tools: 'กองทุนดัชนี SET50, หุ้นปันผลชั้นนำ', role: 'รับเงินปันผลสม่ำเสมอ' },
        { name: 'อสังหาริมทรัพย์และรีทส์ (REITs)', pct: 10, color: 'bg-amber-500', tools: 'กองทุนรวม CPNREIT, IMPACT, กองทุน Global REITs', role: 'กระแสเงินสดค่าเช่า ชนะเงินเฟ้อ' },
        { name: 'ทองคำแท่ง (Gold)', pct: 5, color: 'bg-yellow-400', tools: 'กองทุนรวมทองคำ, ทองคำแท่งแท้ 96.5%', role: 'เกราะป้องกันวิกฤตและค่าเงิน' },
      ];

      bar.innerHTML = '';
      table.innerHTML = '';

      allocations.forEach(item => {
        // Stack Bar segment
        const segment = document.createElement('div');
        segment.className = \`\${item.color} h-full text-white text-[10px] font-bold flex items-center justify-center transition-all\`;
        segment.style.width = item.pct + '%';
        segment.title = \`\${item.name}: \${item.pct}%\`;
        if (item.pct >= 10) segment.innerText = \`\${item.pct}%\`;
        bar.appendChild(segment);

        // Table row
        const row = document.createElement('tr');
        row.innerHTML = \`
          <td class="py-2.5 px-3 font-semibold text-stone-900">\${item.name}</td>
          <td class="py-2.5 px-3 font-bold text-emerald-800">\${item.pct}%</td>
          <td class="py-2.5 px-3 text-stone-600">\${item.tools}</td>
          <td class="py-2.5 px-3 text-stone-500">\${item.role}</td>
        \`;
        table.appendChild(row);
      });
    }`;

const newJsBlock = `    // DYNAMIC MULTI-FACTOR PORTFOLIO ENGINE (TSI + Goal + Finance + Checklist)
    function calculateDynamicAllocation() {
      // 1. TSI Risk Level
      let level = 3;
      if (state.tsiScore) {
        if (state.tsiScore <= 15) level = 1;
        else if (state.tsiScore <= 21) level = 2;
        else if (state.tsiScore <= 29) level = 3;
        else if (state.tsiScore <= 36) level = 4;
        else level = 5;
      }

      const horizon = Number(state.goal.timeHorizonYears) || 5;
      const purpose = state.goal.purpose || '';
      
      const monthlyOutflow = state.finance.monthlyExpenses + state.finance.monthlyDebtPayment;
      const emergencyMonths = monthlyOutflow > 0 ? (state.finance.emergencyFund / monthlyOutflow) : 0;
      const dti = state.finance.monthlyIncome > 0 ? (state.finance.monthlyDebtPayment / state.finance.monthlyIncome) * 100 : 0;
      
      const hasEmergencyDeficit = state.finance.monthlyExpenses > 0 && emergencyMonths < 3;
      const hasHighDti = dti > 35;

      // Rule A: Ultra short horizon <= 1 year
      if (horizon <= 1 && horizon > 0) {
        return [
          { name: 'เงินฝากดอกเบี้ยสูง (e-Savings)', pct: 60, color: 'bg-sky-500', tools: 'Dime! Save, KKP Start Saving, LHB You', role: 'เงินที่ต้องใช้ใน 1 ปีห้ามขาดทุนเด็ดขาด ต้องเก็บในบัญชีคุ้มครองเงินต้น' },
          { name: 'กองทุนรวมตลาดเงิน / ตราสารหนี้ระยะสั้น', pct: 40, color: 'bg-blue-600', tools: 'K-MONEY, SCBTMF, T-CASH', role: 'สร้างผลตอบแทนชนะเงินฝากทั่วไปโดยแทบไม่มีความเสี่ยงต่อเงินต้น' }
        ];
      }

      // Rule B: Emergency Deficit or High Debt -> Transition Buffer Portfolio
      if (hasEmergencyDeficit || hasHighDti) {
        if (level <= 2) {
          return [
            { name: 'เงินฝากสภาพคล่องพิเศษ (Emergency Reserve Buffer)', pct: 45, color: 'bg-sky-500', tools: 'e-Savings ธนาคารพาณิชย์ (1.5 - 3.0%)', role: 'เพิ่มสภาพคล่องฉุกเฉินเป็นอันดับแรกเนื่องจากเงินสำรองต่ำกว่า 3 เดือน' },
            { name: 'พันธบัตรรัฐบาล & กองทุนตราสารหนี้ระยะสั้น', pct: 45, color: 'bg-blue-600', tools: 'K-TREASURY, SCBFP, วอลเล็ต สบม.', role: 'รักษาเงินต้นและรับผลตอบแทนสม่ำเสมอ ลดความตึงตัวของกระแสเงินสด' },
            { name: 'กองทุนดัชนีหุ้นไทยปันผลสูง', pct: 10, color: 'bg-emerald-600', tools: 'TISCOHD, SCBSETEQ', role: 'คงสัดส่วนหุ้นเพียง 10% เพื่อไม่ให้กระทบสภาพคล่อง' }
          ];
        } else {
          return [
            { name: 'เงินฝากสภาพคล่องเสริม (Emergency Buffer)', pct: 30, color: 'bg-sky-500', tools: 'e-Savings, กองทุนตลาดเงิน', role: 'ปรับเพิ่มสภาพคล่องพิเศษเพื่อชดเชยเงินสำรองที่ยังต่ำกว่าเกณฑ์ความปลอดภัย' },
            { name: 'ตราสารหนี้ระยะกลางและพันธบัตร', pct: 40, color: 'bg-blue-600', tools: 'K-FIXED, SCBFIXED', role: 'ลดความผันผวนโดยรวม และเป็นเสาค้ำจุนพอร์ตในช่วงที่ยังมีภาระหนี้' },
            { name: 'กองทุนดัชนีหุ้นโลก (S&P 500 / All-World)', pct: 20, color: 'bg-indigo-600', tools: 'SCBS&P500, K-WORLDX', role: 'ลดสัดส่วนหุ้นลงจากเกณฑ์ TSI เพื่อป้องกันการถูกบีบให้ขายหุ้นขาดทุนยามฉุกเฉิน' },
            { name: 'ทองคำแท่ง / สินทรัพย์ทางเลือก', pct: 10, color: 'bg-amber-500', tools: 'K-GOLD, SCBGOLD', role: 'กระจายความเสี่ยงข้ามสินทรัพย์และป้องกันเงินเฟ้อ' }
          ];
        }
      }

      // Rule C: House purchase goal (horizon <= 5 years)
      if (purpose === 'house' && horizon <= 5) {
        return [
          { name: 'เงินฝากดอกเบี้ยสูงและกองทุนตลาดเงิน', pct: 25, color: 'bg-sky-500', tools: 'e-Savings, K-MONEY', role: 'เตรียมพร้อมสำหรับค่าธรรมเนียมการโอนและเงินดาวน์บ้าน' },
          { name: 'ตราสารหนี้ระยะกลางและพันธบัตรคุณภาพสูง', pct: 55, color: 'bg-blue-600', tools: 'K-FIXED, พันธบัตรออมทรัพย์รัฐบาล', role: 'ผลตอบแทนมั่นคง เงินต้นไม่ผันผวน เหมาะกับเป้าหมายซื้อบ้านใน 3-5 ปี' },
          { name: 'กองทุนดัชนีหุ้นไทยปันผลสูง / หุ้นโลกเสี่ยงต่ำ', pct: 15, color: 'bg-emerald-600', tools: 'TISCOHD, SCBDV', role: 'จำกัดสัดส่วนหุ้นไม่เกิน 15% เพื่อไม่ให้เงินดาวน์บ้านลดลงหากเกิดวิกฤต' },
          { name: 'ทองคำแท่ง / กองทุนทองคำ', pct: 5, color: 'bg-amber-500', tools: 'K-GOLD', role: 'ป้องกันความเสี่ยงค่าเงินและเงินเฟ้อ' }
        ];
      }

      // Rule D: Passive income goal
      if (purpose === 'passive_income') {
        return [
          { name: 'เงินฝากและกองทุนตลาดเงิน', pct: 10, color: 'bg-sky-500', tools: 'e-Savings, SCBTMF', role: 'สภาพคล่องหมุนเวียนรับกระแสเงินสด' },
          { name: 'ตราสารหนี้ภาคเอกชนคุณภาพดี & พันธบัตร', pct: 30, color: 'bg-blue-600', tools: 'K-CBOND, SCBFIXED, พันธบัตรออมทรัพย์', role: 'รับคูปองดอกเบี้ยสม่ำเสมอเข้าบัญชี' },
          { name: 'กองทรัสต์อสังหาริมทรัพย์และโครงสร้างพื้นฐาน (REITs)', pct: 25, color: 'bg-amber-500', tools: 'CPNREIT, WHART, DIF, 3BBIF', role: 'จ่ายเงินปันผลจากค่าเช่าศูนย์การค้า คลังสินค้า เสาโทรคมนาคม (เฉลี่ย 6-9% ต่อปี)' },
          { name: 'กองทุนดัชนีหุ้นไทยปันผลสูง (High Dividend)', pct: 20, color: 'bg-emerald-600', tools: 'TISCOHD, SCBSETEQ', role: 'คัดหุ้น 30 ตัวที่มีประวัติจ่ายปันผลต่อเนื่องสม่ำเสมอ ได้สิทธิเครดิตภาษีเงินปันผล' },
          { name: 'กองทุนหุ้นโลกปันผล / Global Dividend', pct: 15, color: 'bg-indigo-600', tools: 'KF-GDIV, PRINCIPAL VNEQ', role: 'รับกระแสเงินสดปันผลในรูปสกุลเงินสากล' }
        ];
      }

      // Rule E: Default TSI Allocations
      if (level === 1) {
        return [
          { name: 'เงินฝากออมทรัพย์ดอกเบี้ยสูง (e-Savings)', pct: 50, color: 'bg-sky-500', tools: 'Dime! Save, KKP Start Saving, LHB You', role: 'ความเสี่ยงต่ำที่สุด คุ้มครองเงินต้น 100% ภายใต้สถาบันคุ้มครองเงินฝาก' },
          { name: 'พันธบัตรรัฐบาล & กองทุนตราสารหนี้ภาครัฐ', pct: 45, color: 'bg-blue-600', tools: 'K-TREASURY, SCBFP, วอลเล็ต สบม.', role: 'รับดอกเบี้ยสม่ำเสมอ ความน่าเชื่อถือสูงสุดระดับ AAA' },
          { name: 'กองทุนรวมผสมความเสี่ยงต่ำ', pct: 5, color: 'bg-emerald-600', tools: 'กองทุนรวม Conservative Allocation', role: 'กระจายลงทุนเล็กน้อยเพื่อเรียนรู้จังหวะตลาด' }
        ];
      }
      if (level === 2) {
        return [
          { name: 'เงินฝากและกองทุนตลาดเงิน', pct: 20, color: 'bg-sky-500', tools: 'e-Savings, K-MONEY, SCBTMF', role: 'รักษาสภาพคล่องสำรองยามจำเป็น ถอนได้ T+1' },
          { name: 'ตราสารหนี้และพันธบัตรคุณภาพดี', pct: 60, color: 'bg-blue-600', tools: 'K-FIXED, SCBFIXED, พันธบัตรออมทรัพย์รัฐบาล', role: 'แกนหลักสร้างกระแสผลตอบแทนสม่ำเสมอ ผันผวนต่ำ' },
          { name: 'กองทุนดัชนีหุ้นไทยปันผลสูง', pct: 15, color: 'bg-emerald-600', tools: 'TISCOHD, SCBSETEQ', role: 'รับเงินปันผลต่อเนื่องและโอกาสเติบโตชนะเงินเฟ้อ' },
          { name: 'กองทรัสต์อสังหาริมทรัพย์ (REITs)', pct: 5, color: 'bg-amber-500', tools: 'CPNREIT, WHART, กองทุน K-GPROP', role: 'กระจายความเสี่ยงไปในสินทรัพย์ที่สร้างค่าเช่า' }
        ];
      }
      if (level === 4) {
        return [
          { name: 'เงินสด / กองทุนตลาดเงิน', pct: 10, color: 'bg-sky-500', tools: 'e-Savings, กองทุนตลาดเงิน', role: 'สำรองสภาพคล่องเพื่อรอจังหวะสะสมหุ้นราคาถูก' },
          { name: 'ตราสารหนี้ / พันธบัตร', pct: 15, color: 'bg-blue-600', tools: 'K-FIXED, SCBFIXED', role: 'ตัวดูดซับแรงกระแทกเมื่อเกิดวิกฤตเศรษฐกิจ' },
          { name: 'กองทุน ETF สหรัฐฯ & หุ้นโลก (S&P500 / All-World)', pct: 40, color: 'bg-indigo-600', tools: 'SCBS&P500, ONE-UGG, K-USA, DR NDX01', role: 'เครื่องยนต์หลักในการเร่งการเติบโตของเงินทุนระยะยาว' },
          { name: 'หุ้นไทยเติบโตและปันผล', pct: 20, color: 'bg-emerald-600', tools: 'SCBSET50, กองทุนหุ้นไทยเติบโต, TISCOHD', role: 'โอกาสรับปันผลสม่ำเสมอและสิทธิประโยชน์ทางภาษี' },
          { name: 'ทองคำ / REITs อสังหาริมทรัพย์', pct: 15, color: 'bg-amber-500', tools: 'K-GOLD, CPNREIT, WHART', role: 'กระจายความเสี่ยงข้ามกลุ่มสินทรัพย์' }
        ];
      }
      if (level === 5) {
        return [
          { name: 'เงินสดสำรองรอซื้อ', pct: 5, color: 'bg-sky-500', tools: 'e-Savings, บัญชีออมทรัพย์ดอกเบี้ยสูง', role: 'กระสุนสำรองเพื่อช้อนซื้อเวลาตลาดตื่นตระหนก' },
          { name: 'หุ้นต่างประเทศ & เมกะเทรนด์โลก (AI, Cloud, Semis)', pct: 50, color: 'bg-indigo-600', tools: 'SCBS&P500, K-CLOUDN, ONE-UGG, DRx AAPL80X', role: 'มุ่งเน้นผลตอบแทนสูงสุดจากนวัตกรรมพลิกโลก' },
          { name: 'หุ้นไทยเติบโต & บลูชิพ', pct: 20, color: 'bg-emerald-600', tools: 'SCBSET50, หุ้นรายตัวพื้นฐานแกร่ง', role: 'สร้างสมดุลด้วยธุรกิจที่มีกระแสเงินสดในประเทศ' },
          { name: 'ทองคำและสินค้าโภคภัณฑ์', pct: 15, color: 'bg-amber-500', tools: 'K-GOLD, SCBGOLD', role: 'สร้างภูมิคุ้มกันต่อวิกฤตการเงินและภูมิรัฐศาสตร์' },
          { name: 'สินทรัพย์ดิจิทัล / ทางเลือก', pct: 10, color: 'bg-pink-500', tools: 'Bitcoin, Ethereum (ผ่านศูนย์ซื้อขาย ก.ล.ต.)', role: 'เงินเสี่ยงสูงเพื่อโอกาสผลตอบแทนก้าวกระโดด' }
        ];
      }

      // Level 3 Balanced
      return [
        { name: 'เงินสดและตราสารหนี้สภาพคล่อง', pct: 15, color: 'bg-sky-500', tools: 'e-Savings, กองทุนรวมตลาดเงิน', role: 'กันชนลดความผันผวนและรอจังหวะซื้อเมื่อตลาดปรับฐาน' },
        { name: 'ตราสารหนี้และพันธบัตรรัฐบาล', pct: 35, color: 'bg-blue-600', tools: 'K-CBOND, SCBFP, กองทุนตราสารหนี้ระยะกลาง', role: 'สร้างสมดุลความมั่นคงให้กับพอร์ตโฟลิโอ' },
        { name: 'กองทุนดัชนีหุ้นไทย (SET50 / SET100)', pct: 20, color: 'bg-emerald-600', tools: 'SCBSET50, TDEX, B-FUTURE', role: 'หุ้นผู้นำกลุ่มธุรกิจหลักในประเทศ' },
        { name: 'กองทุนดัชนีหุ้นโลก / S&P 500', pct: 20, color: 'bg-indigo-600', tools: 'SCBS&P500, K-WORLDX, B-BHARAT', role: 'เกาะกระแสเศรษฐกิจและเทคโนโลยีชั้นนำของโลก' },
        { name: 'ทองคำแท่ง / REITs', pct: 10, color: 'bg-amber-500', tools: 'K-GOLD, CPNREIT', role: 'ลดความผันผวนของพอร์ตและป้องกันเงินเฟ้อ' }
      ];
    }

    function updatePortfolioRecommendation() {
      const bar = document.getElementById('portfolio-stacked-bar');
      const table = document.getElementById('portfolio-table-body');
      if (!bar || !table) return;

      const allocations = calculateDynamicAllocation();

      bar.innerHTML = '';
      table.innerHTML = '';

      allocations.forEach(item => {
        // Stack Bar segment
        const segment = document.createElement('div');
        segment.className = \`\${item.color} h-full text-white text-[10px] font-bold flex items-center justify-center transition-all\`;
        segment.style.width = item.pct + '%';
        segment.title = \`\${item.name}: \${item.pct}%\`;
        if (item.pct >= 10) segment.innerText = \`\${item.pct}%\`;
        bar.appendChild(segment);

        // Table row
        const row = document.createElement('tr');
        row.innerHTML = \`
          <td class="py-2.5 px-3 font-semibold text-stone-900">\${item.name}</td>
          <td class="py-2.5 px-3 font-bold text-emerald-800">\${item.pct}%</td>
          <td class="py-2.5 px-3 text-stone-600">\${item.tools}</td>
          <td class="py-2.5 px-3 text-stone-500">\${item.role}</td>
        \`;
        table.appendChild(row);
      });
    }`;

if (html.includes(oldJsBlock)) {
  html = html.replace(oldJsBlock, newJsBlock);
}

// Update openReportModal to fix goal title and dynamic allocation
const oldReportModalJs = `    // REPORT MODAL CONTROLLER
    function openReportModal() {
      // Sync latest values
      document.getElementById('rep-profile').innerText = \`\${state.finance.age} ปี (\${state.finance.occupation})\`;
      document.getElementById('rep-income').innerText = '฿' + state.finance.monthlyIncome.toLocaleString();
      
      const totalOutflow = state.finance.monthlyExpenses + state.finance.monthlyDebtPayment;
      const emergencyMonths = totalOutflow > 0 ? (state.finance.emergencyFund / totalOutflow).toFixed(1) : '0';
      document.getElementById('rep-emergency').innerText = \`฿\${state.finance.emergencyFund.toLocaleString()} (\${emergencyMonths} เดือน)\`;

      const dti = state.finance.monthlyIncome > 0 ? Math.round((state.finance.monthlyDebtPayment / state.finance.monthlyIncome) * 100) : 0;
      document.getElementById('rep-dti').innerText = \`\${dti}% (\${dti <= 35 ? 'ปลอดภัย' : 'ระวังภาระหนี้'})\`;

      document.getElementById('rep-goal-desc').innerText = \`เป้าหมาย ฿\${state.goal.targetAmount.toLocaleString()} ภายในระยะเวลา \${state.goal.timeHorizonYears} ปี\`;

      document.getElementById('report-modal').classList.remove('hidden');
    }`;

const newReportModalJs = `    // REPORT MODAL CONTROLLER
    function openReportModal() {
      // Sync latest profile & finance values
      const ageStr = state.finance.age > 0 ? \`\${state.finance.age} ปี\` : 'ไม่ระบุอายุ';
      const occStr = state.finance.occupation || 'ไม่ระบุอาชีพ';
      document.getElementById('rep-profile').innerText = \`\${ageStr} (\${occStr})\`;
      document.getElementById('rep-income').innerText = '฿' + (state.finance.monthlyIncome || 0).toLocaleString();
      
      const totalOutflow = (state.finance.monthlyExpenses || 0) + (state.finance.monthlyDebtPayment || 0);
      const emergencyMonths = totalOutflow > 0 ? (state.finance.emergencyFund / totalOutflow).toFixed(1) : '0';
      document.getElementById('rep-emergency').innerText = \`฿\${(state.finance.emergencyFund || 0).toLocaleString()} (\${emergencyMonths} เดือน)\`;

      const dti = state.finance.monthlyIncome > 0 ? Math.round((state.finance.monthlyDebtPayment / state.finance.monthlyIncome) * 100) : 0;
      document.getElementById('rep-dti').innerText = \`\${dti}% (\${dti <= 35 ? 'ปลอดภัย' : 'ระวังภาระหนี้'})\`;

      // 4. FIX GOAL MATCHING: Sync goal title & description accurately
      const goalTitles = {
        retirement: 'วางแผนเกษียณสุขใจ (Retirement)',
        house: 'ดาวน์หรือซื้อบ้าน / คอนโด (Real Estate)',
        financial_freedom: 'อิสรภาพทางการเงิน (FIRE Movement)',
        passive_income: 'สร้างกระแสเงินสดปันผล (Passive Income)',
        education: 'ทุนการศึกษาตนเองหรือบุตรหลาน (Education)',
        milestone: 'กองทุนเป้าหมายสำคัญตามช่วงวัย (Life Milestone)',
        custom: state.goal.customPurpose || 'เป้าหมายเฉพาะบุคคล'
      };
      const resolvedGoalTitle = goalTitles[state.goal.purpose] || state.goal.customPurpose || (state.goal.targetAmount > 0 ? 'เป้าหมายทางการเงิน' : 'ยังไม่ได้ระบุเป้าหมาย');
      document.getElementById('rep-goal-title').innerText = resolvedGoalTitle;
      document.getElementById('rep-goal-desc').innerText = \`เป้าหมาย ฿\${(state.goal.targetAmount || 0).toLocaleString()} ภายในระยะเวลา \${state.goal.timeHorizonYears || 5} ปี\`;

      // Sync TSI Profile in Report
      let tsiLevel = 3;
      let tsiLevelTitle = 'ระดับ 3: เสี่ยงปานกลางค่อนข้างสูง';
      let tsiDesc = 'สัดส่วนหุ้นไม่เกิน 50% กระจายในตราสารหนี้และกองทุนรวม';
      if (state.tsiScore) {
        if (state.tsiScore <= 15) { tsiLevel = 1; tsiLevelTitle = 'ระดับ 1: เสี่ยงต่ำ'; tsiDesc = 'เน้นรักษาเงินต้น พันธบัตรและเงินฝากเป็นหลัก'; }
        else if (state.tsiScore <= 21) { tsiLevel = 2; tsiLevelTitle = 'ระดับ 2: เสี่ยงปานกลางค่อนข้างต่ำ'; tsiDesc = 'เน้นตราสารหนี้ หุ้นกู้คุณภาพดี หุ้นไม่เกิน 20%'; }
        else if (state.tsiScore <= 29) { tsiLevel = 3; tsiLevelTitle = 'ระดับ 3: เสี่ยงปานกลางค่อนข้างสูง'; tsiDesc = 'สัดส่วนหุ้นไม่เกิน 50% กระจายในตราสารหนี้และกองทุนรวม'; }
        else if (state.tsiScore <= 36) { tsiLevel = 4; tsiLevelTitle = 'ระดับ 4: เสี่ยงสูง'; tsiDesc = 'สัดส่วนหุ้นไม่เกิน 70% เน้นการเติบโตของเงินทุนระยะยาว'; }
        else { tsiLevel = 5; tsiLevelTitle = 'ระดับ 5: เสี่ยงสูงมาก'; tsiDesc = 'สัดส่วนหุ้นเกิน 70% และสินทรัพย์ทางเลือกเพื่อผลตอบแทนสูงสุด'; }
      }
      document.getElementById('rep-tsi-title').innerText = \`\${tsiLevelTitle} (\${state.tsiScore || 28}/40)\`;
      document.getElementById('rep-tsi-desc').innerText = tsiDesc;

      // Populate Dynamic Recommended Allocation in Report Modal
      const repList = document.getElementById('rep-allocation-list');
      if (repList) {
        const allocs = calculateDynamicAllocation();
        repList.innerHTML = '';
        allocs.forEach(item => {
          const div = document.createElement('div');
          div.className = 'flex justify-between items-center py-1.5 border-b border-stone-100 last:border-b-0 text-xs';
          div.innerHTML = \`
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full \${item.color}"></span>
              <span class="font-medium text-stone-800">\${item.name}</span>
            </div>
            <span class="font-bold font-mono text-stone-900">\${item.pct}%</span>
          \`;
          repList.appendChild(div);
        });
      }

      document.getElementById('report-modal').classList.remove('hidden');
    }`;

if (html.includes(oldReportModalJs)) {
  html = html.replace(oldReportModalJs, newReportModalJs);
}

// 8. Add JavaScript for Sub-Tabs switcher & Tax Calculators
const additionalJs = `
    // KNOWLEDGE HUB SUB-TAB SWITCHER
    function setKnowledgeSubTab(subTab) {
      const tabs = ['glossary', 'tax_legal', 'caution'];
      tabs.forEach(t => {
        const view = document.getElementById('k-subview-' + t);
        const btn = document.getElementById('k-tab-btn-' + t);
        if (view) {
          if (t === subTab) {
            view.classList.remove('hidden');
          } else {
            view.classList.add('hidden');
          }
        }
        if (btn) {
          if (t === subTab) {
            btn.classList.add('bg-emerald-50', 'border-emerald-600', 'shadow-2xs', 'ring-2', 'ring-emerald-600/20');
            btn.classList.remove('bg-white', 'border-stone-200');
          } else {
            btn.classList.remove('bg-emerald-50', 'border-emerald-600', 'shadow-2xs', 'ring-2', 'ring-emerald-600/20');
            btn.classList.add('bg-white', 'border-stone-200');
          }
        }
      });
    }

    // TAX CALCULATOR 1: DIVIDEND TAX CREDIT (ม.47 ทวิ)
    function calculateDivTax() {
      const divAmount = Number(document.getElementById('calc-div-amount').value) || 0;
      const corpRate = Number(document.getElementById('calc-div-corp').value) || 0.20;
      const personalRate = Number(document.getElementById('calc-div-personal').value) || 0.10;

      const grossDiv = corpRate < 1 ? divAmount / (1 - corpRate) : divAmount;
      const taxCredit = grossDiv * corpRate;
      const taxBeforeCredit = grossDiv * personalRate;
      const taxWithheld = divAmount * 0.10; // 10% withheld
      const finalTaxDue = taxBeforeCredit - taxCredit;
      const netBenefit = taxWithheld - finalTaxDue;

      document.getElementById('calc-div-credit').innerText = '+฿' + Math.round(taxCredit).toLocaleString();
      document.getElementById('calc-div-withheld').innerText = '฿' + Math.round(taxWithheld).toLocaleString();

      const resLabel = document.getElementById('calc-div-result-label');
      const resVal = document.getElementById('calc-div-result-val');
      if (netBenefit >= 0) {
        resLabel.innerText = 'ขอคืนภาษีได้สุทธิ:';
        resLabel.className = 'text-emerald-900';
        resVal.innerText = '+฿' + Math.round(netBenefit).toLocaleString();
        resVal.className = 'font-mono text-emerald-800 text-sm';
      } else {
        resLabel.innerText = 'ต้องชำระภาษีเพิ่ม (ควรเลือก Final Tax 10%):';
        resLabel.className = 'text-amber-900';
        resVal.innerText = '-฿' + Math.round(Math.abs(netBenefit)).toLocaleString();
        resVal.className = 'font-mono text-rose-700 text-sm';
      }
    }

    // TAX CALCULATOR 2: TAX SAVING FUNDS (SSF, RMF, Thai ESG)
    function calculateFundTax() {
      const fundType = document.getElementById('calc-fund-type').value;
      const amount = Number(document.getElementById('calc-fund-amount').value) || 0;
      const bracket = Number(document.getElementById('calc-fund-bracket').value) || 0.15;

      let maxCap = 300000;
      if (fundType === 'ssf') maxCap = 200000;
      if (fundType === 'rmf') maxCap = 500000;

      const allowedDeduction = Math.min(amount, maxCap);
      const taxSaved = allowedDeduction * bracket;
      const netCost = amount - taxSaved;
      const yieldPct = amount > 0 ? (taxSaved / amount) * 100 : 0;

      document.getElementById('calc-fund-saved').innerText = '฿' + Math.round(taxSaved).toLocaleString();
      document.getElementById('calc-fund-netcost').innerText = '฿' + Math.round(netCost).toLocaleString();
      document.getElementById('calc-fund-yield').innerText = '+' + yieldPct.toFixed(1) + '%';
    }

    // TAX CALCULATOR 3: FOREIGN INVESTMENT TAX (ป.161/2566)
    function calculateForeignTax() {
      const gain = Number(document.getElementById('calc-foreign-gain').value) || 0;
      const bracket = Number(document.getElementById('calc-foreign-bracket').value) || 0.20;
      const credit = Number(document.getElementById('calc-foreign-credit').value) || 0;

      const thaiTax = gain * bracket;
      const allowedCredit = Math.min(credit, thaiTax);
      const netPayable = Math.max(0, thaiTax - allowedCredit);

      document.getElementById('calc-foreign-thai-tax').innerText = '฿' + Math.round(thaiTax).toLocaleString();
      document.getElementById('calc-foreign-dta-credit').innerText = '-฿' + Math.round(allowedCredit).toLocaleString();
      document.getElementById('calc-foreign-net-payable').innerText = '฿' + Math.round(netPayable).toLocaleString();
    }
`;

// Inject additional JS before the closing </script>
html = html.replace('  </script>', additionalJs + '\n  </script>');

// Update switchTab to support 'knowledge_hub'
html = html.replace(
  `      } else if (tabId === 'glossary') {`,
  `      } else if (tabId === 'knowledge_hub' || tabId === 'glossary' || tabId === 'caution') {
        tabId = 'knowledge_hub';
        const groupBtn = document.getElementById('group-btn-knowledge_hub');
        if (groupBtn) {
          groupBtn.classList.add('bg-emerald-50', 'border-emerald-600', 'text-emerald-950', 'ring-2', 'ring-emerald-600/20');
          groupBtn.classList.remove('bg-white', 'border-stone-200', 'text-stone-700');
        }`
);

// Save updated HTML to all target locations
fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(path.resolve('docs/index.html'), html, 'utf8');
fs.writeFileSync(path.resolve('public/download/index.html'), html, 'utf8');
fs.writeFileSync(path.resolve('investprep-standalone.html'), html, 'utf8');

console.log('Successfully updated standalone HTML files across all locations!');
