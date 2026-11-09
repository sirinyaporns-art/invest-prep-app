import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('public/investprep-standalone.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Update Google Fonts in head
const oldFontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;

const newFontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;

html = html.replace(oldFontLink, newFontLink);

// 2. Update Font Family in CSS style
html = html.replace(
  `font-family: 'Prompt', 'Plus Jakarta Sans', sans-serif;`,
  `font-family: 'Plus Jakarta Sans', 'Prompt', 'Kanit', sans-serif; letter-spacing: -0.012em;`
);

// 3. Update Brand Logo and Typography in Header (Thynk Unlimited purple style)
const oldBrandLogo = `<div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-900 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm border border-amber-400/30">
            IP
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-base tracking-tight text-emerald-900">InvestPrep</span>
              <span class="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                Single File Edition
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">ระบบประเมินความพร้อมและวางแผนการลงทุนมือใหม่</p>
          </div>
        </div>`;

const newBrandLogo = `<div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-fuchsia-600 to-pink-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            IP
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">InvestPrep</span>
              <span class="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold border border-purple-200">
                SET & ก.ล.ต.
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">Smart Wealth Technology · วางแผนพอร์ตการลงทุน</p>
          </div>
        </div>`;

html = html.replace(oldBrandLogo, newBrandLogo);

// 4. Update Header Primary Button to Black Pill (Morgan Maxwell style in reference photo)
const oldHeaderReportBtn = `<button onclick="openReportModal()" class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs transition-colors border border-amber-300/30">
            <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span>พิมพ์รายงานสรุป</span>
          </button>`;

const newHeaderReportBtn = `<button onclick="openReportModal()" class="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-black hover:bg-slate-800 active:scale-95 rounded-full shadow-xs transition-all">
            <svg class="w-3.5 h-3.5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span>พิมพ์รายงานสรุป</span>
          </button>`;

html = html.replace(oldHeaderReportBtn, newHeaderReportBtn);

// 5. Update Home Tab Hero Banner to include SVG Investment Graph Background & Reference 4 Process Cards
const oldHeroBannerStart = `<!-- TAB 0: WELCOME SECTION (หน้าแรก) -->
    <section id="tab-content-home" class="tab-panel space-y-10">
      <!-- HERO BANNER: Welcome to InvestPrep -->
      <div class="rounded-3xl border border-amber-900/15 overflow-hidden bg-white shadow-xs p-6 sm:p-10 lg:p-12">`;

const heroReplacement = `<!-- TAB 0: WELCOME SECTION (หน้าแรก) -->
    <section id="tab-content-home" class="tab-panel space-y-10">
      <!-- HERO BANNER: Styled after the reference design -->
      <div class="relative rounded-3xl border border-slate-200 bg-white shadow-xs p-6 sm:p-10 lg:p-12 overflow-hidden">
        
        <!-- Native SVG Investment Graph Background (Flowing waves & financial coordinate grid) -->
        <div aria-hidden="true" class="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-fuchsia-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
          <div class="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-cyan-400/15 via-sky-500/10 to-transparent rounded-full blur-3xl"></div>

          <svg class="absolute inset-0 w-full h-full object-cover" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="stWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.85" />
                <stop offset="45%" stop-color="#8B5CF6" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#D946EF" stop-opacity="0.85" />
              </linearGradient>
              <linearGradient id="stWaveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.4" />
                <stop offset="50%" stop-color="#A855F7" stop-opacity="0.5" />
                <stop offset="100%" stop-color="#EC4899" stop-opacity="0.4" />
              </linearGradient>
              <linearGradient id="stTrendLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#06B6D4" />
                <stop offset="50%" stop-color="#8B5CF6" />
                <stop offset="100%" stop-color="#D946EF" />
              </linearGradient>
            </defs>

            <!-- Bullish Investment Trend Line -->
            <path d="M 680,620 Q 820,580 960,490 T 1180,310 T 1360,190 L 1440,150" stroke="url(#stTrendLineGrad)" stroke-width="3.5" stroke-linecap="round" fill="none" />
            <circle cx="960" cy="490" r="5" fill="#8B5CF6" stroke="#FFFFFF" stroke-width="2.5" />
            <circle cx="1180" cy="310" r="6" fill="#D946EF" stroke="#FFFFFF" stroke-width="2.5" />
            <circle cx="1360" cy="190" r="7" fill="#06B6D4" stroke="#FFFFFF" stroke-width="3" />

            <!-- Ethereal Ribbon Waves (from reference image) -->
            <g opacity="0.7">
              <path d="M 850,750 C 980,600 1020,400 1150,330 C 1280,260 1380,310 1480,220" stroke="url(#stWaveGrad1)" stroke-width="1.2" fill="none" />
              <path d="M 865,745 C 995,595 1035,395 1165,325 C 1295,255 1395,305 1495,215" stroke="url(#stWaveGrad1)" stroke-width="1" fill="none" opacity="0.9" />
              <path d="M 880,740 C 1010,590 1050,390 1180,320 C 1310,250 1410,300 1510,210" stroke="url(#stWaveGrad1)" stroke-width="0.9" fill="none" opacity="0.8" />
              <path d="M 895,735 C 1025,585 1065,385 1195,315 C 1325,245 1425,295 1525,205" stroke="url(#stWaveGrad2)" stroke-width="0.8" fill="none" opacity="0.7" />
              <path d="M 910,730 C 1040,580 1080,380 1210,310 C 1340,240 1440,290 1540,200" stroke="url(#stWaveGrad2)" stroke-width="0.8" fill="none" opacity="0.6" />
              <path d="M 925,725 C 1055,575 1095,375 1225,305 C 1355,235 1455,285 1555,195" stroke="url(#stWaveGrad2)" stroke-width="0.75" fill="none" opacity="0.5" />
            </g>
          </svg>
        </div>

        <div class="relative z-10 max-w-4xl space-y-4">
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-xs font-semibold text-purple-800">
              <span class="font-mono bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-md border border-purple-200">INVESTPREP</span>
              <span>•</span>
              <span class="text-slate-600">ระบบประเมินความพร้อมและวางแผนพอร์ตการลงทุน</span>
            </div>
            
            <div class="space-y-2">
              <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Welcome to <span class="text-slate-900">InvestPrep</span>
                <span class="block text-xl sm:text-3xl lg:text-4xl mt-2 font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                  ตัวช่วยและแหล่งความรู้การลงทุนสำหรับคนทั่วไป
                </span>
              </h1>
            </div>

            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              ออกแบบขึ้นเพื่อเป็นเครื่องมือประเมินพฤติกรรมการเงิน ค้นหาระดับความเสี่ยงตามมาตรฐานสถาบัน TSI ตลาดหลักทรัพย์แห่งประเทศไทย และสำนักงาน ก.ล.ต. พร้อมจำลองพอร์ตและคำนวณการจัดสรรรายได้อย่างเป็นรูปธรรมเบื้องต้น ช่วยให้คนทั่วไปเริ่มต้นลงทุนได้อย่างมั่นใจ ไม่หลงทาง และไม่ตกเป็นเหยื่อมิจฉาชีพ อีกทั้งยังมีคลังความรู้เกี่ยวกับภาษีที่เหมาะสมกับผู้เริ่มต้น
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-3">
              <button onclick="switchTab('finance')" class="px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-black hover:bg-slate-900 rounded-full transition-all shadow-md flex items-center gap-2">
                <span>เริ่มต้นใช้งาน (ถัดไป)</span>
                <span class="text-fuchsia-400">→</span>
              </button>
              <button onclick="openReportModal()" class="px-5 py-3.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                ดูตัวอย่างรายงานสรุป
              </button>
            </div>
          </div>
        </div>

        <!-- 4 Process Cards (Matching reference image: [01 Process : ...], [02 Input : ...], [03 AI Task : ...], [04 Output : ...]) -->
        <div class="relative z-10 mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div onclick="switchTab('finance')" class="p-3.5 rounded-2xl bg-[#F3F4F6] hover:bg-purple-50 border border-slate-200 cursor-pointer flex items-center gap-3 transition-all">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              01
            </div>
            <div class="min-w-0">
              <div class="font-bold text-slate-900 truncate">สำรวจตนเอง : ข้อมูลการเงิน</div>
              <div class="text-[11px] text-slate-500 truncate">ตรวจกระแสเงินสดและหนี้ DTI</div>
            </div>
          </div>

          <div onclick="switchTab('checklist')" class="p-3.5 rounded-2xl bg-[#F3F4F6] hover:bg-purple-50 border border-slate-200 cursor-pointer flex items-center gap-3 transition-all">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              02
            </div>
            <div class="min-w-0">
              <div class="font-bold text-slate-900 truncate">เช็กลิสต์ : ความพร้อม 7 เสาหลัก</div>
              <div class="text-[11px] text-slate-500 truncate">สำรองฉุกเฉินและประกันภัย</div>
            </div>
          </div>

          <div onclick="switchTab('portfolio')" class="p-3.5 rounded-2xl bg-[#F3F4F6] hover:bg-purple-50 border border-slate-200 cursor-pointer flex items-center gap-3 transition-all">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              03
            </div>
            <div class="min-w-0">
              <div class="font-bold text-slate-900 truncate">จัดสรรพอร์ต : Asset Allocation</div>
              <div class="text-[11px] text-slate-500 truncate">สังเคราะห์ 4 ปัจจัยสัมพันธ์กัน</div>
            </div>
          </div>

          <div onclick="switchTab('knowledge_hub')" class="p-3.5 rounded-2xl bg-[#F3F4F6] hover:bg-purple-50 border border-slate-200 cursor-pointer flex items-center gap-3 transition-all">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              04
            </div>
            <div class="min-w-0">
              <div class="font-bold text-slate-900 truncate">ความรู้ & ภาษี : ก.ล.ต./SET</div>
              <div class="text-[11px] text-slate-500 truncate">คลังคำศัพท์และคำนวณภาษี</div>
            </div>
          </div>
        </div>
      </div>`;

// Replace from `<!-- TAB 0: WELCOME SECTION (หน้าแรก) -->` up to `<!-- 2. THE 8 STEPS WORKFLOW`
const heroStartIdx = html.indexOf('<!-- TAB 0: WELCOME SECTION (หน้าแรก) -->');
const heroEndIdx = html.indexOf('<!-- 2. THE 8 STEPS WORKFLOW');

if (heroStartIdx !== -1 && heroEndIdx !== -1) {
  html = html.substring(0, heroStartIdx) + heroReplacement + '\n\n    ' + html.substring(heroEndIdx);
}

// 6. Add Bottom Gradient Strip before </body>
if (!html.includes('id="bottom-accent-strip"')) {
  html = html.replace(
    '</body>',
    `  <!-- Bottom Vibrant Accent Bar (matching reference photo) -->
  <div id="bottom-accent-strip" class="w-full h-3 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 shrink-0"></div>
</body>`
  );
}

// Save to all target paths
fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(path.resolve('docs/index.html'), html, 'utf8');
fs.writeFileSync(path.resolve('public/download/index.html'), html, 'utf8');
fs.writeFileSync(path.resolve('investprep-standalone.html'), html, 'utf8');

console.log('Restyle standalone completed successfully!');
