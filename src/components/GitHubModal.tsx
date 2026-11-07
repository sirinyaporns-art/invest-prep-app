import React, { useState } from 'react';
import { Download, ExternalLink, Check, Copy, X, Globe, FileCode, CheckCircle2 } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyGuide = () => {
    const text = `วิธีนำไฟล์ index.html ขึ้น GitHub Pages:
1. ดาวน์โหลดไฟล์ index.html จากปุ่มในระบบ (หรือคัดลอกจาก docs/index.html)
2. ไปที่ https://github.com แล้วกด 'New repository' ตั้งชื่อคลัง (เช่น investprep)
3. กดเลือก Public แล้วกดสร้าง
4. กด 'uploading an existing file' และลากไฟล์ index.html ไปวาง แล้วกด 'Commit changes'
5. ไปที่แท็บ Settings > Pages เลือก Source: 'Deploy from a branch' เลือก Branch: main และโฟลเดอร์ / (root) แล้วกด Save
6. รอ 1-2 นาที คุณจะได้ลิงก์เว็บไซต์ใช้งานได้จริงทันที เช่น https://<username>.github.io/<reponame>/`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#131915] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 bg-white dark:bg-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-200 shadow-xs border border-amber-400/40">
              <FileCode className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  ไฟล์ index.html สำหรับนำขึ้น GitHub / GitHub Pages
                </h3>
                <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-700">
                  READY TO DEPLOY
                </span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                รวมโค้ดและดีไซน์ครบจบในไฟล์เดียว (Single File) พร้อมใช้งานได้ 100%
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* Action Download Banner */}
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800/60 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                  ดาวน์โหลดไฟล์ index.html ลงเครื่องของคุณ
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  ไฟล์นี้เป็นแบบ Standalone รวมครบทั้ง 8 ขั้นตอน เปิดใช้งานออฟไลน์ได้ หรืออัปโหลดขึ้น GitHub ได้ทันที
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/download/index.html"
                  download="index.html"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs border border-amber-300/40 transition-all hover:shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>ดาวน์โหลด index.html</span>
                </a>
                <a
                  href="/download/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-medium text-xs bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                  title="เปิดดูตัวอย่าง index.html ในแท็บใหม่"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">เปิดดูหน้าตัวอย่าง</span>
                </a>
              </div>
            </div>

            {/* Path notification */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>ตำแหน่งไฟล์ในระบบ: </span>
              <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300">
                docs/index.html
              </code>
              <span className="text-stone-400">และ</span>
              <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300">
                public/download/index.html
              </code>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>ขั้นตอนนำไฟล์ไปแอดใน GitHub และเปิดใช้งานฟรี (GitHub Pages)</span>
              </h4>
              <button
                onClick={handleCopyGuide}
                className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'คัดลอกเรียบร้อย' : 'คัดลอกขั้นตอน'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <strong className="block text-stone-800 dark:text-stone-200 mb-0.5">กดดาวน์โหลดไฟล์ index.html</strong>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                    กดปุ่ม <span className="font-semibold text-emerald-800 dark:text-emerald-300">"ดาวน์โหลด index.html"</span> ด้านบน เพื่อบันทึกไฟล์ไว้ในโฟลเดอร์ Downloads บนเครื่องคอมพิวเตอร์ของคุณ
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <strong className="block text-stone-800 dark:text-stone-200 mb-0.5">สร้าง Repository ใหม่บน GitHub</strong>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                    เข้าสู่เว็บไซต์ <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">github.com/new</a> แล้วตั้งชื่อ Repository เช่น <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">investprep</code> และเลือกเป็น <strong>Public</strong> จากนั้นกดปุ่ม <strong>Create repository</strong>
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <strong className="block text-stone-800 dark:text-stone-200 mb-0.5">อัปโหลดไฟล์ index.html</strong>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                    ในหน้า Repository กดลิงก์ <strong>"uploading an existing file"</strong> แล้วลากไฟล์ <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded font-bold">index.html</code> ที่ดาวน์โหลดไว้วางลงไป แล้วกดปุ่มเขียว <strong>Commit changes</strong>
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </div>
                <div>
                  <strong className="block text-stone-800 dark:text-stone-200 mb-0.5">เปิดใช้งาน GitHub Pages เพื่อได้ลิงก์ออนไลน์ฟรี</strong>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                    ไปที่แท็บ <strong>Settings</strong> &gt; เมนู <strong>Pages</strong> ทางซ้าย &gt; ในส่วน Branch เลือก <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">main</code> และโฟลเดอร์ <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">/ (root)</code> แล้วกด <strong>Save</strong>
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  ✓
                </div>
                <div>
                  <strong className="block text-emerald-900 dark:text-emerald-200 mb-0.5">เว็บไซต์ของคุณจะออนไลน์ทันที!</strong>
                  <p className="text-emerald-800/90 dark:text-emerald-300 text-[11px]">
                    รอ GitHub ประมวลผลประมาณ 1 นาที จะปรากฏข้อความ <em>"Your site is live at https://[username].github.io/[repo]/"</em> สามารถส่งลิงก์ให้อาจารย์ เพื่อนร่วมงาน หรือเปิดดูจากมือถือได้ทันที
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="text-[11px] text-stone-500">
            ไฟล์มีขนาด ~104 KB ไม่ต้องติดตั้ง Node.js หรือโปรแกรมใดๆ เพิ่มเติม
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
