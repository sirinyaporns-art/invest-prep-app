import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('public/investprep-standalone.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Add Navigation Tab for Providers in the navbar if not present
if (!html.includes("switchTab('providers')")) {
  const targetNavBtn = `<button onclick="switchTab('knowledge_hub')"`;
  const providersNavBtn = `<button onclick="switchTab('providers')" id="nav-btn-providers" class="nav-tab px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors">
            ผู้ให้บริการที่แนะนำ
          </button>
          ` + targetNavBtn;
  html = html.replace(targetNavBtn, providersNavBtn);
}

// 2. Add TAB 8 Section for Recommended Investment Providers before the script tag
if (!html.includes('id="tab-providers"')) {
  const providersHtml = `
    <!-- TAB 8: RECOMMENDED INVESTMENT PROVIDERS (แนะนำผู้ให้บริการเกี่ยวกับการลงทุน) -->
    <div id="tab-providers" class="tab-pane hidden space-y-10 animate-fadeIn pb-12">
      <!-- Header -->
      <div class="space-y-3 border-b border-slate-200 pb-6">
        <div class="flex items-center gap-2 text-xs font-semibold">
          <span class="font-mono text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md border border-purple-200">
            STEP 08
          </span>
          <span class="text-slate-300">/</span>
          <span class="text-fuchsia-700">ก้าวสู่การลงทุนจริง</span>
          <span class="text-slate-300">/</span>
          <span class="text-slate-600">ผู้ให้บริการที่ได้รับใบอนุญาต ก.ล.ต.</span>
        </div>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              แนะนำผู้ให้บริการเกี่ยวกับการลงทุน
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
              หลังจากที่คุณได้สำรวจตนเอง ทำแบบประเมิน TSI และจัดสัดส่วนพอร์ตโฟลิโอเรียบร้อยแล้ว ก้าวสำคัญต่อไปคือการเลือกเปิดบัญชีกับ <strong>ผู้ให้บริการทางการเงินที่ได้รับใบอนุญาตถูกต้องตามกฎหมายจากสำนักงาน ก.ล.ต.</strong> เพื่อให้เงินลงทุนของคุณปลอดภัยและได้รับการคุ้มครอง
            </p>
          </div>
          <span class="px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 flex items-center gap-1.5 self-start md:self-auto">
            ✓ ก.ล.ต. & SET Approved
          </span>
        </div>
      </div>

      <!-- Provider Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Trinity Card -->
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600"></div>
          
          <div class="space-y-5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <span class="text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                บริษัทหลักทรัพย์ชั้นนำ
              </span>
              <span class="text-[11px] font-semibold text-fuchsia-700 bg-fuchsia-50 px-2.5 py-0.5 rounded-full border border-fuchsia-200">
                ✓ กำกับดูแลโดย ก.ล.ต.
              </span>
            </div>

            <div class="space-y-1.5">
              <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900">
                บริษัทหลักทรัพย์ ทรีนีตี้ จำกัด
              </h3>
              <div class="text-xs font-mono text-slate-500">
                Trinity Securities Company Limited
              </div>
              <p class="text-xs text-fuchsia-700 font-semibold pt-1">
                บริการทางการเงินและการลงทุนครบวงจร ด้วยบทวิเคราะห์เชิงลึกที่แม่นยำ
              </p>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span class="font-bold text-slate-900 block">การรับรองทางกฎหมาย:</span>
              <span class="text-[11px]">ใบอนุญาตประกอบธุรกิจหลักทรัพย์แบบ ก เลขที่ 0014/2544 จากกระทรวงการคลัง และกำกับดูแลโดยสำนักงาน ก.ล.ต.</span>
            </div>

            <div class="space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">จุดเด่นและบริการหลัก:</h4>
              <ul class="space-y-1.5 text-xs text-slate-700">
                <li>• ซื้อขายหุ้นไทย (SET / mai), TFEX และตราสารหนี้/หุ้นกู้ชั้นนำ</li>
                <li>• Open Architecture ซื้อขายกองทุนรวมได้หลากหลาย บลจ. ในบัญชีเดียว</li>
                <li>• ทีมนักวิเคราะห์คุณภาพสูง (Trinity Research) บทวิเคราะห์ยอดเยี่ยม</li>
                <li>• บริการที่ปรึกษาการเงินส่วนบุคคล (Wealth Management) และวาณิชธนกิจ</li>
              </ul>
            </div>

            <div class="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-1">
              <span class="font-bold text-purple-900 block">💡 เหมาะสำหรับ:</span>
              <p class="text-slate-700 leading-relaxed">
                ผู้ที่ต้องการบทวิเคราะห์เชิงลึก มีผู้เชี่ยวชาญให้คำแนะนำ และต้องการลงทุนในหุ้นกู้/กองทุนรวมหลากหลายค่าย
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <a href="https://www.trinitythai.com/" target="_blank" rel="noreferrer noopener" class="w-full sm:flex-1 py-3 px-5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all">
              <span>เข้าสู่เว็บไซต์ทางการ บล. ทรีนีตี้</span>
              <span class="text-fuchsia-400">↗</span>
            </a>
            <a href="https://www.sec.or.th/TH/Pages/MarketData/SEC-Check-First.aspx" target="_blank" rel="noreferrer noopener" class="py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap">
              <span>เช็กใบอนุญาต ก.ล.ต.</span>
            </a>
          </div>
        </div>

        <!-- InnovestX Card -->
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600"></div>

          <div class="space-y-5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <span class="text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                Super App การลงทุนอัจฉริยะ
              </span>
              <span class="text-[11px] font-semibold text-fuchsia-700 bg-fuchsia-50 px-2.5 py-0.5 rounded-full border border-fuchsia-200">
                ✓ กำกับดูแลโดย ก.ล.ต.
              </span>
            </div>

            <div class="space-y-1.5">
              <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900">
                InnovestX (อินโนเวสท์ เอกซ์)
              </h3>
              <div class="text-xs font-mono text-slate-500">
                InnovestX Securities Co., Ltd. (SCBX Group)
              </div>
              <p class="text-xs text-fuchsia-700 font-semibold pt-1">
                จักรวาลการลงทุนในมือคุณ ครอบคลุมทั้งหุ้นไทย หุ้นต่างประเทศ กองทุน และสินทรัพย์ดิจิทัล
              </p>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span class="font-bold text-slate-900 block">การรับรองทางกฎหมาย:</span>
              <span class="text-[11px]">ใบอนุญาตประกอบธุรกิจหลักทรัพย์และสินทรัพย์ดิจิทัลจากกระทรวงการคลัง กำกับดูแลโดยสำนักงาน ก.ล.ต.</span>
            </div>

            <div class="space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">จุดเด่นและบริการหลัก:</h4>
              <ul class="space-y-1.5 text-xs text-slate-700">
                <li>• Super App แอปเดียวลงทุนได้ครบ: หุ้นไทย, หุ้นสหรัฐฯ, ยุโรป, เอเชีย และ DR / DRx</li>
                <li>• กองทุนรวมครบทุก บลจ. ชั้นนำกว่า 1,800 กองทุน พร้อมคะแนนความน่าสนใจ</li>
                <li>• Intelligent Portfolios: ปรับสมดุลพอร์ตอัตโนมัติตามสภาวะตลาด</li>
                <li>• เปิดบัญชีง่าย อนุมัติไวผ่าน NDID ไม่มีค่าธรรมเนียมขั้นต่ำ</li>
              </ul>
            </div>

            <div class="p-4 rounded-2xl bg-fuchsia-50/70 border border-fuchsia-200 text-xs space-y-1">
              <span class="font-bold text-purple-900 block">💡 เหมาะสำหรับ:</span>
              <p class="text-slate-700 leading-relaxed">
                คนรุ่นใหม่และผู้ลงทุนที่ต้องการความคล่องตัว ใช้งานง่ายบนมือถือ เทรดหุ้นระดับโลก และต้องการพอร์ตอัตโนมัติ
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <a href="https://www.innovestx.co.th/th" target="_blank" rel="noreferrer noopener" class="w-full sm:flex-1 py-3 px-5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all">
              <span>เข้าสู่เว็บไซต์ทางการ InnovestX</span>
              <span class="text-fuchsia-400">↗</span>
            </a>
            <a href="https://www.sec.or.th/TH/Pages/MarketData/SEC-Check-First.aspx" target="_blank" rel="noreferrer noopener" class="py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap">
              <span>เช็กใบอนุญาต ก.ล.ต.</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Safety Guide -->
      <div class="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50/50 via-white to-fuchsia-50/40 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 class="text-base sm:text-lg font-bold text-slate-900">
          4 กฎเหล็กป้องกันมิจฉาชีพหลอกเปิดบัญชีและหลอกลงทุน (เกณฑ์ ก.ล.ต.)
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div class="p-4 rounded-2xl bg-white border border-purple-100 space-y-1">
            <div class="font-bold text-purple-700">01. ตรวจสอบใน SEC Check First</div>
            <p class="text-slate-500">เช็กรายชื่อบริษัทและผู้แนะนำว่าได้รับอนุญาตจริง</p>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-purple-100 space-y-1">
            <div class="font-bold text-purple-700">02. บัญชีรับโอนเป็นชื่อ บล. เท่านั้น</div>
            <p class="text-slate-500">ห้ามโอนเข้าบัญชีบุคคลธรรมดาไม่ว่าจะอ้างอะไรก็ตาม</p>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-purple-100 space-y-1">
            <div class="font-bold text-purple-700">03. ไม่การันตีผลตอบแทนเกินจริง</div>
            <p class="text-slate-500">หากบอกได้กำไรวันละ 2-5% สันนิษฐานว่าโกง 100%</p>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-purple-100 space-y-1">
            <div class="font-bold text-purple-700">04. เข้าช่องทางทางการ</div>
            <p class="text-slate-500">เข้าเว็บโดยตรง หรือโหลดแอปผ่าน App Store / Play Store</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert before the closing </main>
  html = html.replace('</main>', `${providersHtml}\n    </main>`);
}

// 3. Update JavaScript tab switcher function in standalone HTML
if (!html.includes("'tab-providers'")) {
  html = html.replace(
    "const tabPanes = document.querySelectorAll('.tab-pane');",
    "const tabPanes = document.querySelectorAll('.tab-pane');\n      if (tabId === 'providers') { document.getElementById('tab-providers')?.classList.remove('hidden'); return; }"
  );
}

// 4. Enforce purple & pink theme across standalone HTML:
html = html.replace(/emerald-/g, 'purple-');
html = html.replace(/amber-/g, 'pink-');
html = html.replace(/teal-/g, 'fuchsia-');

// Save to all target paths
fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(path.resolve('docs/index.html'), html, 'utf8');
fs.writeFileSync(path.resolve('public/download/index.html'), html, 'utf8');
fs.writeFileSync(path.resolve('investprep-standalone.html'), html, 'utf8');

console.log('Successfully updated standalone HTML files with Providers section and Purple-Pink theme!');
