import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, DollarSign } from 'lucide-react';

export const InvestmentTaxCalculator: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'dividend_credit' | 'tax_saving' | 'foreign_tax'>('dividend_credit');

  // Calculator 1: Dividend Tax Credit (Default: 0 for user to input)
  const [dividendAmount, setDividendAmount] = useState<number>(0);
  const [corpTaxRate, setCorpTaxRate] = useState<number>(20); // 20% standard Thai corporate tax
  const [personalTaxBracket, setPersonalTaxBracket] = useState<number>(10); // 10% personal tax bracket

  // Calculator 2: Tax Saving Fund (SSF/RMF/Thai ESG) (Default: 0)
  const [taxSavingAmount, setTaxSavingAmount] = useState<number>(0);
  const [taxSavingBracket, setTaxSavingBracket] = useState<number>(10);

  // Calculator 3: Foreign Investment Tax (ป.161/2566) (Default: 0)
  const [foreignGainAmount, setForeignGainAmount] = useState<number>(0);
  const [foreignTaxBracket, setForeignTaxBracket] = useState<number>(10);
  const [foreignWithheldTax, setForeignWithheldTax] = useState<number>(0);

  // Math for Dividend Tax Credit (ม.47 ทวิ)
  const dividendWithholdingTax = dividendAmount * 0.10;
  const taxCredit = corpTaxRate > 0 && corpTaxRate < 100
    ? dividendAmount * (corpTaxRate / (100 - corpTaxRate))
    : 0;
  const grossedUpDividend = dividendAmount + taxCredit;
  const taxOwedOnDividend = grossedUpDividend * (personalTaxBracket / 100);
  const totalTaxPrepaid = dividendWithholdingTax + taxCredit;
  const netRefundOrOwed = totalTaxPrepaid - taxOwedOnDividend;
  const isRefund = netRefundOrOwed > 0;

  // Math for Tax Saving Funds
  const taxSavingsValue = taxSavingAmount * (taxSavingBracket / 100);
  const netCostAfterTax = taxSavingAmount - taxSavingsValue;

  // Math for Foreign Investment Tax
  const foreignEstimatedThaiTax = foreignGainAmount * (foreignTaxBracket / 100);
  const foreignNetPayable = Math.max(0, foreignEstimatedThaiTax - foreignWithheldTax);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white flex items-center justify-center font-bold">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              ระบบช่วยคำนวณภาษีที่เกิดจากการลงทุน (Investment Tax Calculator)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              จำลองผลกระทบทางภาษีและสิทธิประโยชน์ทางกฎหมายตามเกณฑ์ ก.ล.ต., ธปท. และกรมสรรพากร
            </p>
          </div>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center gap-2 pt-3 flex-wrap">
          <button
            onClick={() => setActiveCalc('dividend_credit')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCalc === 'dividend_credit'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            1. เครดิตภาษีเงินปันผลหุ้นไทย (ม.47 ทวิ)
          </button>
          <button
            onClick={() => setActiveCalc('tax_saving')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCalc === 'tax_saving'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            2. เงินประหยัดภาษี (SSF / RMF / Thai ESG)
          </button>
          <button
            onClick={() => setActiveCalc('foreign_tax')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCalc === 'foreign_tax'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            3. ประมาณการภาษีลงทุนต่างประเทศ (ป.161/2566)
          </button>
        </div>
      </div>

      {/* Calculator 1: Dividend Tax Credit */}
      {activeCalc === 'dividend_credit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-fuchsia-50/70 dark:bg-fuchsia-950/30 border border-pink-200 dark:border-fuchsia-900/60 text-xs text-fuchsia-900 dark:text-pink-200 leading-relaxed">
            <strong>หลักการคำนวณเครดิตภาษีเงินปันผล (Dividend Tax Credit):</strong>{' '}
            กำไรของบริษัทจดทะเบียนได้เสียภาษีเงินได้นิติบุคคลไปแล้วรอบหนึ่ง เมื่อจ่ายเงินปันผลให้แก่ผู้ถือหุ้น กฎหมายจึงอนุญาตให้ผู้ลงทุนนำภาษีนิติบุคคลนั้นมาขอเครดิตภาษีคืนได้ หากฐานภาษีเงินได้บุคคลธรรมดาของผู้ลงทุนต่ำกว่าอัตราภาษีนิติบุคคลของบริษัท (เช่น ฐานภาษี 0%, 5%, 10%, 15% จะได้เงินคืนภาษีจากสรรพากรแน่นอน!)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                เงินปันผลสุทธิที่ได้รับทั้งปี (บาท)
              </label>
              <input
                type="number"
                value={dividendAmount || ''}
                onChange={(e) => setDividendAmount(Math.max(0, Number(e.target.value)))}
                placeholder="เช่น 30000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
              <span className="text-[11px] text-slate-400">เงินปันผลก่อนหัก ณ ที่จ่าย 10%</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                อัตราภาษีนิติบุคคลของบริษัท (%)
              </label>
              <select
                value={corpTaxRate}
                onChange={(e) => setCorpTaxRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value={20}>20% (อัตรามาตรฐานของบริษัทส่วนใหญ่ใน SET/mai)</option>
                <option value={23}>23% (บริษัทเฉพาะกลุ่ม)</option>
                <option value={25}>25% (อัตราในอดีต)</option>
                <option value={0}>0% (กิจการได้รับการส่งเสริมการลงทุน BOI / ไม่ได้เครดิต)</option>
              </select>
              <span className="text-[11px] text-slate-400">ระบุไว้ในใบรับรองการหักภาษี ณ ที่จ่าย</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                ฐานภาษีเงินได้บุคคลธรรมดาของคุณ (%)
              </label>
              <select
                value={personalTaxBracket}
                onChange={(e) => setPersonalTaxBracket(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value={0}>0% (เงินได้สุทธิไม่เกิน 150,000 บาท/ปี - ยกเว้นภาษี)</option>
                <option value={5}>5% (เงินได้สุทธิ 150,001 - 300,000 บาท)</option>
                <option value={10}>10% (เงินได้สุทธิ 300,001 - 500,000 บาท)</option>
                <option value={15}>15% (เงินได้สุทธิ 500,001 - 750,000 บาท)</option>
                <option value={20}>20% (เงินได้สุทธิ 750,001 - 1,000,000 บาท)</option>
                <option value={25}>25% (เงินได้สุทธิ 1,000,001 - 2,000,000 บาท)</option>
                <option value={30}>30% (เงินได้สุทธิ 2,000,001 - 5,000,000 บาท)</option>
                <option value={35}>35% (เงินได้สุทธิเกิน 5,000,000 บาท)</option>
              </select>
              <span className="text-[11px] text-slate-400">ฐานภาษีขั้นสูงสุดของเงินได้สุทธิคุณ</span>
            </div>
          </div>

          {/* Result Scorecard */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">ผลลัพธ์สุทธิจากการยื่นขอเครดิตภาษี</span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-0.5 text-slate-900 dark:text-slate-100">
                  {dividendAmount === 0 ? (
                    <span className="text-slate-400 dark:text-slate-500 text-lg sm:text-xl font-normal">
                      ฿0 (กรุณากรอกเงินปันผลที่ได้รับ)
                    </span>
                  ) : isRefund ? (
                    <span className="text-purple-700 dark:text-purple-400">
                      + ได้รับเงินคืนภาษี ฿{Math.round(netRefundOrOwed).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-fuchsia-700 dark:text-fuchsia-400 font-semibold">
                      ต้องชำระภาษีเพิ่ม ฿{Math.round(Math.abs(netRefundOrOwed)).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-xs">
                {dividendAmount === 0 ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-semibold border border-slate-200 dark:border-slate-700">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>รอการกรอกข้อมูลเพื่อประเมิน</span>
                  </div>
                ) : isRefund ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-semibold border border-purple-300 dark:border-purple-800">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>แนะนำ: ควรรวมยื่นใน ภ.ง.ด.90 เพื่อรับเงินคืน!</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-950 dark:text-pink-200 font-semibold border border-pink-300">
                    <AlertTriangle className="w-4 h-4 text-fuchsia-600" />
                    <span>แนะนำ: เลือกเป็น Final Tax 10% ตามเดิม ไม่ต้องยื่นรวม</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-step breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[11px]">ภาษีหัก ณ ที่จ่าย 10%</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                  ฿{Math.round(dividendWithholdingTax).toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[11px]">เครดิตภาษีที่ขอคืนได้</span>
                <span className="font-bold text-purple-700 dark:text-purple-400 font-mono text-sm">
                  +฿{Math.round(taxCredit).toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[11px]">รายได้พึงประเมินรวม</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                  ฿{Math.round(grossedUpDividend).toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[11px]">ภาษีที่ต้องเสียตามฐาน {personalTaxBracket}%</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                  ฿{Math.round(taxOwedOnDividend).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 2: Tax Saving Funds (SSF/RMF/Thai ESG) */}
      {activeCalc === 'tax_saving' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
            <strong>พลังแห่งการประหยัดภาษี (Tax Deductible Return):</strong>{' '}
            การลงทุนในกองทุนลดหย่อนภาษี เช่น Thai ESG, SSF หรือ RMF เสมือนคุณได้รับ "ผลตอบแทนขั้นต่ำทันทีตามอัตราฐานภาษี" ตั้งแต่วันแรกที่ลงทุน และเงินต้นยังเติบโตต่อไปในกองทุนตามระยะเวลาที่กฎหมายกำหนด
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                ยอดเงินที่วางแผนลงทุนในกองทุนลดหย่อนภาษี (บาท)
              </label>
              <input
                type="number"
                value={taxSavingAmount || ''}
                onChange={(e) => setTaxSavingAmount(Math.max(0, Number(e.target.value)))}
                placeholder="เช่น 50000 หรือ 100000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
              <span className="text-[11px] text-slate-400">ตรวจสอบเพดานลดหย่อนสูงสุดของแต่ละกองทุน</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                ฐานภาษีเงินได้บุคคลธรรมดาของคุณ (%)
              </label>
              <select
                value={taxSavingBracket}
                onChange={(e) => setTaxSavingBracket(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value={5}>5% (เงินได้สุทธิ 150,001 - 300,000 บาท)</option>
                <option value={10}>10% (เงินได้สุทธิ 300,001 - 500,000 บาท)</option>
                <option value={15}>15% (เงินได้สุทธิ 500,001 - 750,000 บาท)</option>
                <option value={20}>20% (เงินได้สุทธิ 750,001 - 1,000,000 บาท)</option>
                <option value={25}>25% (เงินได้สุทธิ 1,000,001 - 2,000,000 บาท)</option>
                <option value={30}>30% (เงินได้สุทธิ 2,000,001 - 5,000,000 บาท)</option>
                <option value={35}>35% (เงินได้สุทธิเกิน 5,000,000 บาท)</option>
              </select>
              <span className="text-[11px] text-slate-400">อัตราภาษีของเงินได้ส่วนที่นำมาหักลดหย่อน</span>
            </div>
          </div>

          {/* Result Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-800 to-purple-950 text-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-700/60 pb-4">
              <div>
                <span className="text-xs text-purple-200 uppercase tracking-wider block">
                  เงินภาษีที่คุณจะประหยัดได้ทันที
                </span>
                <div className="text-3xl font-extrabold font-mono mt-0.5 text-pink-300">
                  {taxSavingAmount === 0 ? (
                    <span className="text-pink-200/80 text-xl font-normal">฿0 บาท (กรุณากรอกยอดเงินลงทุน)</span>
                  ) : (
                    <span>฿{Math.round(taxSavingsValue).toLocaleString()} บาท</span>
                  )}
                </div>
              </div>
              <div className="text-xs text-right">
                <span className="text-purple-200 block">ผลตอบแทนเริ่มต้นจากสิทธิภาษี</span>
                <span className="text-lg font-bold text-white font-mono">
                  {taxSavingAmount === 0 ? '0%' : `+${taxSavingBracket}% ทันที`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-purple-100">
              <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                <span className="block text-purple-300 text-[11px]">ต้นทุนจริงของคุณหลังหักภาษี</span>
                <span className="text-lg font-bold font-mono text-white">
                  ฿{Math.round(netCostAfterTax).toLocaleString()} บาท
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                <span className="block text-purple-300 text-[11px]">มูลค่าพอร์ตการลงทุนที่ได้รับ</span>
                <span className="text-lg font-bold font-mono text-white">
                  ฿{Math.round(taxSavingAmount).toLocaleString()} บาท (เต็มจำนวน)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 3: Foreign Investment Tax Estimator */}
      {activeCalc === 'foreign_tax' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>เกณฑ์ภาษีเงินได้จากการลงทุนต่างประเทศ (คำสั่งกรมสรรพากร ป.161/2566 & ป.162/2566):</strong>{' '}
            ตั้งแต่วันที่ 1 ม.ค. 2567 ผู้มีถิ่นที่อยู่ในไทย (เกิน 180 วันในปีภาษี) หากนำเงินกำไรหรือเงินปันผลจากการลงทุนต่างประเทศเข้ามาในไทยในปีภาษีใด จะต้องนำมารวมคำนวณภาษีเงินได้บุคคลธรรมดาตามอัตราก้าวหน้าในปีนั้น
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                กำไรหรือผลตอบแทนจากต่างประเทศที่นำเข้าไทย (บาท)
              </label>
              <input
                type="number"
                value={foreignGainAmount || ''}
                onChange={(e) => setForeignGainAmount(Math.max(0, Number(e.target.value)))}
                placeholder="เช่น 100000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
              <span className="text-[11px] text-slate-400">เฉพาะส่วนที่เป็นผลกำไร/ดอกเบี้ย/เงินปันผล</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                ฐานภาษีเงินได้บุคคลธรรมดาของคุณ (%)
              </label>
              <select
                value={foreignTaxBracket}
                onChange={(e) => setForeignTaxBracket(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value={5}>5%</option>
                <option value={10}>10%</option>
                <option value={15}>15%</option>
                <option value={20}>20%</option>
                <option value={25}>25%</option>
                <option value={30}>30%</option>
                <option value={35}>35%</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                ภาษีที่จ่ายในต่างประเทศแล้ว (DTA Credit ถ้ามี)
              </label>
              <input
                type="number"
                value={foreignWithheldTax || ''}
                onChange={(e) => setForeignWithheldTax(Math.max(0, Number(e.target.value)))}
                placeholder="เช่น 0 หรือภาษีหัก ณ ต่างประเทศ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block">
                  ประมาณการภาษีที่ต้องชำระเพิ่มเติมในไทย
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-fuchsia-700 dark:text-fuchsia-400 font-semibold mt-0.5">
                  {foreignGainAmount === 0 ? (
                    <span className="text-slate-400 dark:text-slate-500 text-lg sm:text-xl font-normal">
                      ฿0 บาท (กรุณากรอกผลกำไรต่างประเทศ)
                    </span>
                  ) : (
                    <span>฿{Math.round(foreignNetPayable).toLocaleString()} บาท</span>
                  )}
                </div>
              </div>
              <div className="text-xs max-w-sm text-slate-600 dark:text-slate-300">
                💡 <strong>เคล็ดลับลดภาระภาษีต่างประเทศ:</strong> หากเลือกลงทุนหุ้นต่างประเทศผ่าน <strong>กองทุนรวมดัชนีต่างประเทศ (FIF)</strong> หรือ <strong>DR / DRx</strong> ในตลาดหลักทรัพย์ไทย ผลกำไรจะได้รับการยกเว้นภาษี Capital Gain ทันทีตามกฎหมายไทย!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
