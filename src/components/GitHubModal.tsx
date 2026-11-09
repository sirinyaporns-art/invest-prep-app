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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#131915] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-800 flex items-center justify-center text-pink-200 shadow-xs border border-pink-400/40">
              <FileCode className="w-5 h-5 text-pink-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  ไฟล์ index.html สำหรับนำขึ้น GitHub / GitHub Pages
                </h3>
                <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-semibold border border-purple-300 dark:border-purple-700">
                  READY TO DEPLOY
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                รวมโค้ดและดีไซน์ครบจบในไฟล์เดียว (Single File) พร้อมนำขึ้นเว็บได้ทันที
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Action Download Banner */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/60 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300 block">
                  ดาวน์โหลดไฟล์ index.html ลงเครื่องของคุณ
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  ไฟล์นี้เป็นแบบ Standalone รวมครบทุกขั้นตอนการวางแผน พร้อมอัปโหลดขึ้น GitHub Pages หรือโฮสต์ได้ทันที
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/download/index.html"
                  download="index.html"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-950 hover:bg-black text-white font-bold shadow-sm shadow-xs border border-pink-300/40 transition-all hover:shadow-sm"
                >
                  <Download className="w-4 h-4 text-pink-300" />
                  <span>ดาวน์โหลด index.html</span>
                </a>
                <a
                  href="/download/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-medium text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  title="เปิดดูตัวอย่าง index.html ในแท็บใหม่"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">เปิดดูหน้าตัวอย่าง</span>
                </a>
              </div>
            </div>

            {/* Path notification */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
              <span>ตำแหน่งไฟล์ในระบบ: </span>
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-800 dark:text-purple-300">
                docs/index.html
              </code>
              <span className="text-slate-400">และ</span>
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-800 dark:text-purple-300">
                public/download/index.html
              </code>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-700" />
                <span>ขั้นตอนนำไฟล์ไปแอดใน GitHub และเปิดใช้งานฟรี (GitHub Pages)</span>
              </h4>
              <button
                onClick={handleCopyGuide}
                className="flex items-center gap-1 text-[11px] font-medium text-purple-700 hover:text-purple-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-purple-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'คัดลอกเรียบร้อย' : 'คัดลอกขั้นตอน'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 mb-0.5">กดดาวน์โหลดไฟล์ index.html</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    กดปุ่ม <span className="font-semibold text-purple-800 dark:text-purple-300">"ดาวน์โหลด index.html"</span> ด้านบน เพื่อบันทึกไฟล์ไว้ในโฟลเดอร์ Downloads บนเครื่องคอมพิวเตอร์ของคุณ
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 mb-0.5">สร้าง Repository ใหม่บน GitHub</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    เข้าสู่เว็บไซต์ <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-purple-700 underline font-semibold">github.com/new</a> แล้วตั้งชื่อ Repository เช่น <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">investprep</code> และเลือกเป็น <strong>Public</strong> จากนั้นกดปุ่ม <strong>Create repository</strong>
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 mb-0.5">อัปโหลดไฟล์ index.html</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    ในหน้า Repository กดลิงก์ <strong>"uploading an existing file"</strong> แล้วลากไฟล์ <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-bold">index.html</code> ที่ดาวน์โหลดไว้วางลงไป แล้วกดปุ่มเขียว <strong>Commit changes</strong>
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </div>
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 mb-0.5">เปิดใช้งาน GitHub Pages เพื่อได้ลิงก์ออนไลน์ฟรี</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    ไปที่แท็บ <strong>Settings</strong> &gt; เมนู <strong>Pages</strong> ทางซ้าย &gt; ในส่วน Branch เลือก <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">main</code> และโฟลเดอร์ <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/ (root)</code> แล้วกด <strong>Save</strong>
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs font-bold flex items-center justify-center shrink-0 text-xs">
                  ✓
                </div>
                <div>
                  <strong className="block text-purple-900 dark:text-purple-200 mb-0.5">เว็บไซต์ของคุณจะออนไลน์ทันที!</strong>
                  <p className="text-purple-800/90 dark:text-purple-300 text-[11px]">
                    รอ GitHub ประมวลผลประมาณ 1 นาที จะปรากฏข้อความ <em>"Your site is live at https://[username].github.io/[repo]/"</em> สามารถส่งลิงก์ให้อาจารย์ เพื่อนร่วมงาน หรือเปิดดูจากมือถือได้ทันที
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            ไฟล์มีขนาด ~104 KB ไม่ต้องติดตั้ง Node.js หรือโปรแกรมใดๆ เพิ่มเติม
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
