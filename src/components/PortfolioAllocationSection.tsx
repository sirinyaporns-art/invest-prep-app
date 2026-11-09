import React, { useState, useMemo } from 'react';
import { RiskProfile, InvestmentGoal, PersonalFinance, AssetClassItem, ChecklistItem } from '../types/investor';
import {
  PieChart,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Sliders,
  Wallet,
  Clock,
  Target,
  AlertTriangle,
  Info
} from 'lucide-react';

interface PortfolioAllocationSectionProps {
  riskProfile: RiskProfile;
  goal: InvestmentGoal;
  finance: PersonalFinance;
  assets: AssetClassItem[];
  checklist?: ChecklistItem[];
  onNavigateToTab: (tabId: string) => void;
}

interface AllocationSlice {
  assetName: string;
  category: string;
  percentage: number;
  color: string;
  suggestedInstruments: string;
  rationale: string;
}

export const PortfolioAllocationSection: React.FC<PortfolioAllocationSectionProps> = ({
  riskProfile,
  goal,
  finance,
  assets,
  checklist = [],
  onNavigateToTab,
}) => {
  // State: whether user is viewing the adjusted transition portfolio or pure TSI target benchmark
  const [allocationMode, setAllocationMode] = useState<'adjusted' | 'target'>('adjusted');

  // Diagnostic calculations
  const monthlyExpenses = finance.monthlyExpenses || 0;
  const monthlyIncome = finance.monthlyIncome || 0;
  const monthlyDebt = finance.monthlyDebtPayment || 0;
  const totalDebt = finance.totalDebt || 0;
  const emergencyFund = finance.emergencyFund || 0;

  const emergencyMonths = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
  const dtiPct = monthlyIncome > 0 ? (monthlyDebt / monthlyIncome) * 100 : 0;
  const monthlySurplus = monthlyIncome - monthlyExpenses - monthlyDebt;

  const completedChecklistCount = checklist.filter((c) => c.isCompleted).length;
  const isEmergencyFundChecked = checklist.find((c) => c.id === 'emergency-fund')?.isCompleted ?? false;
  const isDebtChecked = checklist.find((c) => c.id === 'clear-high-interest-debt')?.isCompleted ?? false;

  // Has financial warning triggers
  const hasEmergencyDeficit = monthlyExpenses > 0 && emergencyMonths < 3;
  const hasHighDti = dtiPct > 35;
  const hasUncheckedCoreDebt = (totalDebt > 0 || monthlyDebt > 0) && !isDebtChecked;
  const isShortHorizon = goal.timeHorizonYears > 0 && goal.timeHorizonYears <= 3;
  const isHouseGoal = goal.purpose === 'house' && goal.timeHorizonYears <= 5;
  const isPassiveIncome = goal.purpose === 'passive_income';

  // 1. Pure TSI Benchmark Portfolio (Target)
  const targetAllocation = useMemo<AllocationSlice[]>(() => {
    const level = riskProfile.level;

    if (level === 1) {
      return [
        {
          assetName: 'เงินฝากออมทรัพย์ดอกเบี้ยสูง (e-Savings)',
          category: 'สภาพคล่อง',
          percentage: 50,
          color: '#0ea5e9',
          suggestedInstruments: 'Dime! Save, KKP Start Saving, LHB You',
          rationale: 'ความเสี่ยงต่ำที่สุด คุ้มครองเงินต้น 100% ภายใต้สถาบันคุ้มครองเงินฝาก',
        },
        {
          assetName: 'พันธบัตรรัฐบาล & กองทุนตราสารหนี้ภาครัฐ',
          category: 'ตราสารหนี้',
          percentage: 45,
          color: '#3b82f6',
          suggestedInstruments: 'K-TREASURY, SCBFP, วอลเล็ต สบม.',
          rationale: 'รับดอกเบี้ยสม่ำเสมอ ความน่าเชื่อถือสูงสุดระดับ AAA',
        },
        {
          assetName: 'กองทุนรวมผสมความเสี่ยงต่ำ (Conservative)',
          category: 'ผสม',
          percentage: 5,
          color: '#10b981',
          suggestedInstruments: 'กองทุนรวมผสมตราสารหนี้หลัก หุ้นไม่เกิน 10%',
          rationale: 'กระจายลงทุนเล็กน้อยเพื่อเรียนรู้จังหวะตลาด',
        },
      ];
    }

    if (level === 2) {
      return [
        {
          assetName: 'เงินฝากและกองทุนตลาดเงิน',
          category: 'สภาพคล่อง',
          percentage: 20,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, K-MONEY, SCBTMF',
          rationale: 'รักษาสภาพคล่องสำรองยามจำเป็น ถอนได้ T+1',
        },
        {
          assetName: 'ตราสารหนี้และพันธบัตรคุณภาพดี',
          category: 'ตราสารหนี้',
          percentage: 60,
          color: '#3b82f6',
          suggestedInstruments: 'K-FIXED, SCBFIXED, พันธบัตรออมทรัพย์รัฐบาล',
          rationale: 'แกนหลักสร้างกระแสผลตอบแทนสม่ำเสมอ ผันผวนต่ำ',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นไทยปันผลสูง',
          category: 'ตราสารทุน',
          percentage: 15,
          color: '#10b981',
          suggestedInstruments: 'TISCOHD, SCBSETEQ, K-VALUE',
          rationale: 'รับเงินปันผลต่อเนื่องและโอกาสเติบโตชนะเงินเฟ้อ',
        },
        {
          assetName: 'กองทรัสต์อสังหาริมทรัพย์ (REITs)',
          category: 'ทางเลือก',
          percentage: 5,
          color: '#f59e0b',
          suggestedInstruments: 'CPNREIT, WHART, กองทุน K-GPROP',
          rationale: 'กระจายความเสี่ยงไปในสินทรัพย์ที่สร้างค่าเช่า',
        },
      ];
    }

    if (level === 3) {
      return [
        {
          assetName: 'เงินสดและตราสารหนี้สภาพคล่อง',
          category: 'สภาพคล่อง',
          percentage: 15,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, กองทุนรวมตลาดเงิน',
          rationale: 'กันชนลดความผันผวนและรอจังหวะซื้อเมื่อตลาดปรับฐาน',
        },
        {
          assetName: 'ตราสารหนี้และพันธบัตรรัฐบาล',
          category: 'ตราสารหนี้',
          percentage: 35,
          color: '#3b82f6',
          suggestedInstruments: 'K-CBOND, SCBFP, กองทุนตราสารหนี้ระยะกลาง',
          rationale: 'สร้างสมดุลความมั่นคงให้กับพอร์ตโฟลิโอ',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นไทย (SET50 / SET100)',
          category: 'หุ้นไทย',
          percentage: 20,
          color: '#10b981',
          suggestedInstruments: 'SCBSET50, TDEX, B-FUTURE',
          rationale: 'หุ้นผู้นำกลุ่มธุรกิจหลักในประเทศ',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นโลก / S&P 500',
          category: 'หุ้นโลก',
          percentage: 20,
          color: '#6366f1',
          suggestedInstruments: 'SCBS&P500, K-WORLDX, B-BHARAT',
          rationale: 'เกาะกระแสเศรษฐกิจและเทคโนโลยีชั้นนำของโลก',
        },
        {
          assetName: 'ทองคำแท่ง / REITs',
          category: 'ทางเลือก',
          percentage: 10,
          color: '#f59e0b',
          suggestedInstruments: 'K-GOLD, CPNREIT',
          rationale: 'ลดความผันผวนของพอร์ตและป้องกันเงินเฟ้อ',
        },
      ];
    }

    if (level === 4) {
      return [
        {
          assetName: 'เงินสด / กองทุนตลาดเงิน',
          category: 'สภาพคล่อง',
          percentage: 10,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, กองทุนตลาดเงิน',
          rationale: 'สำรองสภาพคล่องเพื่อรอจังหวะสะสมหุ้นราคาถูก',
        },
        {
          assetName: 'ตราสารหนี้ / พันธบัตร',
          category: 'ตราสารหนี้',
          percentage: 15,
          color: '#3b82f6',
          suggestedInstruments: 'K-FIXED, SCBFIXED',
          rationale: 'ตัวดูดซับแรงกระแทกเมื่อเกิดวิกฤตเศรษฐกิจ',
        },
        {
          assetName: 'กองทุน ETF สหรัฐฯ & หุ้นโลก (S&P500 / All-World)',
          category: 'หุ้นโลก',
          percentage: 40,
          color: '#6366f1',
          suggestedInstruments: 'SCBS&P500, ONE-UGG, K-USA, DR NDX01',
          rationale: 'เครื่องยนต์หลักในการเร่งการเติบโตของเงินทุนระยะยาว',
        },
        {
          assetName: 'หุ้นไทยเติบโตและปันผล',
          category: 'หุ้นไทย',
          percentage: 20,
          color: '#10b981',
          suggestedInstruments: 'SCBSET50, กองทุนหุ้นไทยเติบโต, TISCOHD',
          rationale: 'โอกาสรับปันผลสม่ำเสมอและสิทธิประโยชน์ทางภาษี',
        },
        {
          assetName: 'ทองคำ / REITs อสังหาริมทรัพย์',
          category: 'ทางเลือก',
          percentage: 15,
          color: '#f59e0b',
          suggestedInstruments: 'K-GOLD, CPNREIT, WHART',
          rationale: 'กระจายความเสี่ยงข้ามกลุ่มสินทรัพย์',
        },
      ];
    }

    // Level 5
    return [
      {
        assetName: 'เงินสดสำรองรอซื้อ',
        category: 'สภาพคล่อง',
        percentage: 5,
        color: '#0ea5e9',
        suggestedInstruments: 'e-Savings, บัญชีออมทรัพย์ดอกเบี้ยสูง',
        rationale: 'กระสุนสำรองเพื่อช้อนซื้อเวลาตลาดตื่นตระหนก',
      },
      {
        assetName: 'หุ้นต่างประเทศ & เมกะเทรนด์โลก (AI, Cloud, Semis)',
        category: 'หุ้นโลก',
        percentage: 50,
        color: '#6366f1',
        suggestedInstruments: 'SCBS&P500, K-CLOUDN, ONE-UGG, DRx AAPL80X',
        rationale: 'มุ่งเน้นผลตอบแทนสูงสุดจากนวัตกรรมพลิกโลก',
      },
      {
        assetName: 'หุ้นไทยเติบโต & บลูชิพ',
        category: 'หุ้นไทย',
        percentage: 20,
        color: '#10b981',
        suggestedInstruments: 'SCBSET50, หุ้นรายตัวพื้นฐานแกร่ง',
        rationale: 'สร้างสมดุลด้วยธุรกิจที่มีกระแสเงินสดในประเทศ',
      },
      {
        assetName: 'ทองคำและสินค้าโภคภัณฑ์',
        category: 'ทางเลือก',
        percentage: 15,
        color: '#f59e0b',
        suggestedInstruments: 'K-GOLD, SCBGOLD',
        rationale: 'สร้างภูมิคุ้มกันต่อวิกฤตการเงินและภูมิรัฐศาสตร์',
      },
      {
        assetName: 'สินทรัพย์ดิจิทัล / คริปโทฯ ทางเลือก',
        category: 'คริปโทฯ',
        percentage: 10,
        color: '#ec4899',
        suggestedInstruments: 'Bitcoin, Ethereum (ผ่านศูนย์ซื้อขาย ก.ล.ต.)',
        rationale: 'เงินเสี่ยงสูงเพื่อโอกาสผลตอบแทนก้าวกระโดด',
      },
    ];
  }, [riskProfile.level]);

  // 2. Dynamic Personalized Adjusted Portfolio (Factoring TSI + Goal + Finance + Checklist)
  const adjustedAllocation = useMemo<AllocationSlice[]>(() => {
    const horizon = goal.timeHorizonYears;
    const level = riskProfile.level;

    // Rule A: Ultra short horizon <= 1 year (Money needed within 1 year cannot afford drawdown)
    if (horizon > 0 && horizon <= 1) {
      return [
        {
          assetName: 'เงินฝากดอกเบี้ยสูง (e-Savings)',
          category: 'สภาพคล่อง',
          percentage: 60,
          color: '#0ea5e9',
          suggestedInstruments: 'Dime! Save, KKP Start Saving, LHB You',
          rationale: 'เงินที่ต้องใช้ใน 1 ปีห้ามขาดทุนเด็ดขาด ต้องเก็บในบัญชีคุ้มครองเงินต้นและถอนได้ทันที',
        },
        {
          assetName: 'กองทุนรวมตลาดเงิน / พันธบัตรระยะสั้น',
          category: 'ตราสารหนี้สั้น',
          percentage: 40,
          color: '#3b82f6',
          suggestedInstruments: 'K-MONEY, SCBTMF, T-CASH',
          rationale: 'สร้างผลตอบแทนชนะเงินฝากทั่วไปเล็กน้อยโดยแทบไม่มีความเสี่ยงต่อเงินต้น',
        },
      ];
    }

    // Rule B: Emergency Fund Deficit or Severe High Debt -> Transition Buffer Portfolio
    if (hasEmergencyDeficit || hasHighDti) {
      if (level <= 2) {
        return [
          {
            assetName: 'เงินฝากสภาพคล่องพิเศษ (Emergency Reserve Buffer)',
            category: 'สภาพคล่องพิเศษ',
            percentage: 45,
            color: '#0ea5e9',
            suggestedInstruments: 'e-Savings ธนาคารพาณิชย์ (1.5 - 3.0%)',
            rationale: 'ปรับเพิ่มสภาพคล่องฉุกเฉินเป็นอันดับแรกเนื่องจากเงินสำรองปัจจุบันยังไม่ครบ 3-6 เดือน',
          },
          {
            assetName: 'ตราสารหนี้ระยะสั้น / พันธบัตรรัฐบาล',
            category: 'ตราสารหนี้',
            percentage: 45,
            color: '#3b82f6',
            suggestedInstruments: 'K-TREASURY, SCBFP',
            rationale: 'รักษาเงินต้นและรับผลตอบแทนสม่ำเสมอ ลดความตึงตัวของกระแสเงินสด',
          },
          {
            assetName: 'กองทุนดัชนีหุ้นไทยปันผลสูง',
            category: 'หุ้นไทย',
            percentage: 10,
            color: '#10b981',
            suggestedInstruments: 'TISCOHD, SCBSETEQ',
            rationale: 'คงสัดส่วนหุ้นเพียง 10% เพื่อไม่ให้กระทบสภาพคล่องและเรียนรู้ตลาด',
          },
        ];
      } else {
        // Moderate/High TSI risk, but real finance is constrained
        return [
          {
            assetName: 'เงินฝากสภาพคล่องเสริม (Emergency Buffer)',
            category: 'สภาพคล่องพิเศษ',
            percentage: 30,
            color: '#0ea5e9',
            suggestedInstruments: 'e-Savings, กองทุนตลาดเงิน',
            rationale: 'ปรับเพิ่มสภาพคล่องเป็นพิเศษเพื่อชดเชยเงินสำรองที่ยังต่ำกว่าเกณฑ์ความปลอดภัย 3 เดือน',
          },
          {
            assetName: 'ตราสารหนี้ระยะกลางและพันธบัตร',
            category: 'ตราสารหนี้',
            percentage: 40,
            color: '#3b82f6',
            suggestedInstruments: 'K-FIXED, SCBFIXED',
            rationale: 'ทำหน้าที่ลดความผันผวนโดยรวม และเป็นเสาค้ำจุนพอร์ตในช่วงที่ยังมีภาระหนี้',
          },
          {
            assetName: 'กองทุนดัชนีหุ้นโลก (S&P 500 / All-World)',
            category: 'หุ้นโลก',
            percentage: 20,
            color: '#6366f1',
            suggestedInstruments: 'SCBS&P500, K-WORLDX',
            rationale: 'ลดสัดส่วนหุ้นลงจากเกณฑ์ TSI เพื่อป้องกันการถูกบีบให้ขายหุ้นขาดทุนยามฉุกเฉิน',
          },
          {
            assetName: 'ทองคำและสินทรัพย์ทางเลือก',
            category: 'ทางเลือก',
            percentage: 10,
            color: '#f59e0b',
            suggestedInstruments: 'K-GOLD, SCBGOLD',
            rationale: 'กระจายความเสี่ยงและป้องกันเงินเฟ้อ',
          },
        ];
      }
    }

    // Rule C: House purchase goal (horizon <= 5 years) -> Capital protection tilt
    if (isHouseGoal) {
      return [
        {
          assetName: 'เงินฝากดอกเบี้ยสูงและกองทุนตลาดเงิน',
          category: 'สภาพคล่อง',
          percentage: 25,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, K-MONEY',
          rationale: 'เตรียมพร้อมสำหรับค่าธรรมเนียมการโอนและเงินดาวน์บ้าน',
        },
        {
          assetName: 'ตราสารหนี้ระยะกลางและพันธบัตรคุณภาพสูง',
          category: 'ตราสารหนี้',
          percentage: 55,
          color: '#3b82f6',
          suggestedInstruments: 'K-FIXED, พันธบัตรออมทรัพย์รัฐบาล',
          rationale: 'ผลตอบแทนมั่นคง เงินต้นไม่ผันผวน เหมาะกับเป้าหมายซื้อบ้านใน 3-5 ปี',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นไทยปันผลสูง / หุ้นโลกเสี่ยงต่ำ',
          category: 'ตราสารทุน',
          percentage: 15,
          color: '#10b981',
          suggestedInstruments: 'TISCOHD, SCBDV',
          rationale: 'จำกัดสัดส่วนหุ้นไม่เกิน 15-20% เพื่อไม่ให้เงินดาวน์ลดลงหากเกิดวิกฤตเศรษฐกิจ',
        },
        {
          assetName: 'ทองคำแท่ง / กองทุนทองคำ',
          category: 'ทางเลือก',
          percentage: 5,
          color: '#f59e0b',
          suggestedInstruments: 'K-GOLD',
          rationale: 'ป้องกันความเสี่ยงค่าเงินและเงินเฟ้อ',
        },
      ];
    }

    // Rule D: Passive income goal -> Tilt towards high dividend & REITs
    if (isPassiveIncome) {
      return [
        {
          assetName: 'เงินฝากและกองทุนตลาดเงิน',
          category: 'สภาพคล่อง',
          percentage: 10,
          color: '#0ea5e9',
          suggestedInstruments: 'e-Savings, SCBTMF',
          rationale: 'สภาพคล่องหมุนเวียนรับกระแสเงินสด',
        },
        {
          assetName: 'ตราสารหนี้ภาคเอกชนคุณภาพดี (Investment Grade) & พันธบัตร',
          category: 'ตราสารหนี้',
          percentage: 30,
          color: '#3b82f6',
          suggestedInstruments: 'K-CBOND, SCBFIXED, พันธบัตรออมทรัพย์',
          rationale: 'รับคูปองดอกเบี้ยสม่ำเสมอเข้าบัญชี',
        },
        {
          assetName: 'กองทรัสต์อสังหาริมทรัพย์และโครงสร้างพื้นฐาน (REITs / IFF)',
          category: 'อสังหาฯ ค่าเช่า',
          percentage: 25,
          color: '#f59e0b',
          suggestedInstruments: 'CPNREIT, WHART, DIF, 3BBIF',
          rationale: 'จ่ายเงินปันผลจากค่าเช่าศูนย์การค้า คลังสินค้า เสาโทรคมนาคม (เฉลี่ย 6-9% ต่อปี)',
        },
        {
          assetName: 'กองทุนดัชนีหุ้นไทยปันผลสูง (High Dividend)',
          category: 'หุ้นปันผลไทย',
          percentage: 20,
          color: '#10b981',
          suggestedInstruments: 'TISCOHD, SCBSETEQ, K-VALUE',
          rationale: 'คัดหุ้น 30 ตัวที่มีประวัติจ่ายปันผลต่อเนื่องสม่ำเสมอ ได้สิทธิเครดิตภาษีเงินปันผล',
        },
        {
          assetName: 'กองทุนหุ้นโลกปันผล / Global Dividend Aristocrats',
          category: 'หุ้นโลกปันผล',
          percentage: 15,
          color: '#6366f1',
          suggestedInstruments: 'KF-GDIV, PRINCIPAL VNEQ',
          rationale: 'รับกระแสเงินสดปันผลในรูปสกุลเงินสากล',
        },
      ];
    }

    // Default: use the target allocation
    return targetAllocation;
  }, [
    goal.timeHorizonYears,
    goal.purpose,
    riskProfile.level,
    hasEmergencyDeficit,
    hasHighDti,
    isHouseGoal,
    isPassiveIncome,
    targetAllocation,
  ]);

  const activeAllocation = allocationMode === 'adjusted' ? adjustedAllocation : targetAllocation;

  const strategyTitle = useMemo(() => {
    if (allocationMode === 'adjusted') {
      if (hasEmergencyDeficit || hasHighDti) {
        return 'กลยุทธ์เสริมสร้างเกราะคุ้มกัน & เสริมสภาพคล่อง (Defensive Transition Strategy)';
      }
      if (isHouseGoal) {
        return 'กลยุทธ์คุ้มครองเงินดาวน์อสังหาริมทรัพย์ (Capital Preservation for Real Estate)';
      }
      if (isPassiveIncome) {
        return 'กลยุทธ์กระแสเงินสดปันผลและค่าเช่า (Income & Dividend Flow Strategy)';
      }
    }

    if (goal.timeHorizonYears > 0 && goal.timeHorizonYears <= 1) {
      return 'กลยุทธ์รักษาเงินต้นเข้มงวด (Short-term Capital Preservation)';
    }
    if (riskProfile.level <= 2) return 'กลยุทธ์เน้นรายได้และความมั่นคง (Income & Yield Focus)';
    if (riskProfile.level === 3) return 'กลยุทธ์สมดุลแบบ Core-Satellite (Balanced Core-Satellite)';
    if (riskProfile.level === 4) return 'กลยุทธ์พอร์ตเติบโตระยะยาวทั่วโลก (Global Long-term Wealth Compounder)';
    return 'กลยุทธ์เชิงรุกผลตอบแทนก้าวกระโดด (High-Beta Growth & Innovation)';
  }, [
    allocationMode,
    hasEmergencyDeficit,
    hasHighDti,
    isHouseGoal,
    isPassiveIncome,
    goal.timeHorizonYears,
    riskProfile.level,
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Clean Minimalist Header */}
      <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-purple-700 dark:text-purple-400 font-bold font-semibold tracking-wider">STEP 05</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="font-medium text-[11px] text-fuchsia-800 dark:text-pink-300 tracking-wider">จัดสรรพอร์ต</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>สังเคราะห์ 4 ปัจจัยสัมพันธ์กัน</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          การจัดสรรพอร์ตการลงทุนที่สัมพันธ์กับสถานะจริงของคุณ
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          ระบบวิเคราะห์สังเคราะห์ 4 เสาหลักพร้อมกัน ได้แก่ <strong>(1) ผลประเมินความเสี่ยง TSI</strong>, <strong>(2) เป้าหมายและกรอบเวลา</strong>, <strong>(3) ข้อมูลสุขภาพการเงินจริง (DTI, เงินสำรอง)</strong> และ <strong>(4) เช็คลิสต์ความพร้อม</strong> เพื่อให้คุณลงทุนได้อย่างปลอดภัยสูงสุด
        </p>
      </div>

      {/* 4-Factor Relationship Diagnostic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Factor 1: TSI Risk */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              1. ระดับความเสี่ยง TSI
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-600" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-slate-100">
            ระดับ {riskProfile.level}: {riskProfile.title}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            เพดานหุ้นแนะนำ: ไม่เกิน {riskProfile.maxStockRatio}%
          </p>
        </div>

        {/* Factor 2: Investment Goal */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              2. เป้าหมาย & กรอบเวลา
            </span>
            <Target className="w-3.5 h-3.5 text-fuchsia-600" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
            {goal.purpose === 'retirement'
              ? 'วางแผนเกษียณสุขใจ'
              : goal.purpose === 'house'
              ? 'ซื้อบ้าน / คอนโด'
              : goal.purpose === 'financial_freedom'
              ? 'อิสรภาพการเงิน'
              : goal.purpose === 'passive_income'
              ? 'กระแสเงินสดปันผล'
              : goal.purpose === 'education'
              ? 'ทุนการศึกษา'
              : goal.purpose === 'milestone'
              ? 'เป้าหมายสำคัญ'
              : goal.customPurpose || 'เป้าหมายทั่วไป'}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            กรอบเวลา: {goal.timeHorizonYears > 0 ? `${goal.timeHorizonYears} ปี` : 'ยังไม่ได้ระบุ'}
          </p>
        </div>

        {/* Factor 3: Financial Health (DTI & Emergency) */}
        <div className={`p-4 rounded-2xl border space-y-1.5 shadow-2xs ${
          hasEmergencyDeficit || hasHighDti
            ? 'bg-fuchsia-50/50 dark:bg-fuchsia-950/20 border-pink-300 dark:border-fuchsia-800/80'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              3. สุขภาพการเงินจริง
            </span>
            {hasEmergencyDeficit || hasHighDti ? (
              <AlertTriangle className="w-3.5 h-3.5 text-fuchsia-600" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            )}
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-slate-100">
            สำรอง {emergencyMonths.toFixed(1)} เดือน · DTI {Math.round(dtiPct)}%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {hasEmergencyDeficit
              ? 'สำรองยังต่ำกว่า 3 เดือน (ปรับพอร์ตเสริมสภาพคล่อง)'
              : hasHighDti
              ? 'ภาระหนี้สูงกว่า 35% (จำกัดสินทรัพย์เสี่ยง)'
              : 'สถานะการเงินมั่นคงพร้อมลงทุน'}
          </p>
        </div>

        {/* Factor 4: Checklist Readiness */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              4. เช็คลิสต์ความพร้อม
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-slate-100">
            ผ่าน {completedChecklistCount}/{checklist.length > 0 ? checklist.length : 7} เสาหลัก
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isEmergencyFundChecked && isDebtChecked
              ? 'เสาหลักสำคัญฉุกเฉินและหนี้สินผ่านเกณฑ์'
              : 'ยังมีเสาหลักพื้นฐานที่ควรเสริมควบคู่'}
          </p>
        </div>
      </div>

      {/* Advisory Message if Personal Financial Health Adjusted the Portfolio */}
      {(hasEmergencyDeficit || hasHighDti || isHouseGoal || isPassiveIncome) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-fuchsia-50/70 dark:bg-fuchsia-950/30 border border-pink-300 dark:border-fuchsia-800/80 flex items-start gap-3 text-xs leading-relaxed text-fuchsia-950 dark:text-pink-200">
          <Info className="w-5 h-5 text-fuchsia-700 dark:text-fuchsia-400 font-semibold shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm">
              ระบบปรับสัดส่วนพอร์ตอัตโนมัติตามข้อมูลส่วนตัวของคุณ (Dynamic Portfolio Tailoring)
            </div>
            <div>
              {hasEmergencyDeficit && (
                <p>
                  • <strong>เงินสำรองฉุกเฉินต่ำกว่า 3 เดือน ({emergencyMonths.toFixed(1)} เดือน):</strong> พอร์ตนี้จึงปรับเพิ่มสัดส่วนเงินฝากดอกเบี้ยสูง / ตลาดเงินเป็นพิเศษ เพื่อให้เป็น Buffer ฉุกเฉินจนกว่าคุณจะเก็บเงินสำรองครบ 3-6 เดือน จึงค่อยขยับไปลงทุนหุ้นเต็มสัดส่วน
                </p>
              )}
              {hasHighDti && (
                <p>
                  • <strong>ภาระหนี้สินรายเดือนต่อรายได้ (DTI = {Math.round(dtiPct)}%) สูงกว่าเกณฑ์ความปลอดภัย 35%:</strong> ปรับลดสัดส่วนหุ้นลง 10-15% เพื่อลดความกดดันด้านกระแสเงินสด
                </p>
              )}
              {isHouseGoal && (
                <p>
                  • <strong>เป้าหมายดาวน์/ซื้อบ้านในกรอบเวลาสั้น-กลาง:</strong> เน้นรักษาเงินต้นเป็นหลัก ไม่เพิ่มความเสี่ยงหุ้นมากเกินไปเพื่อปกป้องเงินดาวน์บ้านไม่ให้ลดลงหากเกิดวิกฤตเศรษฐกิจ
                </p>
              )}
              {isPassiveIncome && (
                <p>
                  • <strong>เป้าหมายสร้างกระแสเงินสดปันผล:</strong> เพิ่มสัดส่วนกองทุนดัชนีปันผลสูงและกองทรัสต์อสังหาริมทรัพย์ (REITs) เพื่อรับเงินปันผลต่อเนื่อง
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Mode Switcher (Adjusted vs Pure Target) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
          <button
            onClick={() => setAllocationMode('adjusted')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              allocationMode === 'adjusted'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>พอร์ตปรับตามสถานะจริง (แนะนำ)</span>
          </button>
          <button
            onClick={() => setAllocationMode('target')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              allocationMode === 'target'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-xs shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>พอร์ตเป้าหมาย TSI มาตรฐาน</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 dark:text-slate-400 px-3 font-mono">
          {allocationMode === 'adjusted'
            ? 'วิเคราะห์ครบทั้งความเสี่ยง + เป้าหมาย + ข้อมูลการเงิน'
            : `เกณฑ์มาตรฐานระดับ ${riskProfile.level} (${riskProfile.title})`}
        </span>
      </div>

      {/* Strategy Blueprint Banner (Green-Brown Earth Accent) */}
      <div className="p-6 sm:p-7 rounded-2xl border border-fuchsia-900/15 dark:border-purple-900/40 bg-fuchsia-50/40 dark:bg-purple-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span>พิมพ์เขียวกลยุทธ์ที่แนะนำสำหรับคุณ ({allocationMode === 'adjusted' ? 'พอร์ตปรับตามสุขภาพการเงินจริง' : 'พอร์ตเป้าหมาย TSI'})</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              {strategyTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              พอร์ตนี้เน้นกระจายความเสี่ยงหลายสินทรัพย์เพื่อลดความผันผวน โดยมีสัดส่วนหุ้นและสินทรัพย์เสี่ยงรวมกันไม่เกิน {riskProfile.maxStockRatio}% ตามเกณฑ์ความปลอดภัยมาตรฐาน ก.ล.ต.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0 border-t sm:border-t-0 sm:border-l border-purple-200 dark:border-purple-900/60 pt-3 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">ผลตอบแทนเฉลี่ยคาดหวัง</span>
              <span className="text-lg font-bold font-mono tabular-nums text-purple-600 dark:text-purple-400">
                {riskProfile.expectedAnnualReturn}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">ความผันผวนสูงสุดในอดีต</span>
              <span className="text-lg font-bold font-mono tabular-nums text-slate-700 dark:text-slate-300">
                {riskProfile.historicalMaxDrawdown}
              </span>
            </div>
          </div>
        </div>

        {/* Stacked Visual Bar */}
        <div className="mt-6">
          <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner">
            {activeAllocation.map((item, idx) => (
              <div
                key={idx}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full transition-all duration-300 relative group"
                title={`${item.assetName}: ${item.percentage}%`}
              />
            ))}
          </div>

          {/* Legend Items */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {activeAllocation.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {item.assetName}
                </span>
                <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400 font-bold">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Allocation Breakdown Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              สัดส่วนสินทรัพย์และเครื่องมือลงทุนแนะนำ (Sample Instruments)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">รวม 100%</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                <th className="py-3 px-4">ประเภทสินทรัพย์</th>
                <th className="py-3 px-3 text-right">สัดส่วน (%)</th>
                <th className="py-3 px-4">กองทุน / ตราสารตัวอย่างที่นิยมในไทย</th>
                <th className="py-3 px-4">บทบาทและเหตุผลที่สัมพันธ์กับสถานะคุณ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {activeAllocation.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.assetName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold tabular-nums text-slate-900 dark:text-white">
                    {item.percentage}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-purple-700 dark:text-purple-400 font-medium">
                    {item.suggestedInstruments}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.rationale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Beginner Advice Checklist */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          คำแนะนำในการบริหารพอร์ตสำหรับมือใหม่ (ตามหลัก ก.ล.ต. และตลาดหลักทรัพย์ฯ)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <span><strong>Rebalancing ปีละ 1 ครั้ง:</strong> ตรวจสอบสัดส่วนพอร์ตปีละครั้ง หากหุ้นขึ้นจนเกินสัดส่วน ให้ขายส่วนกำไรมาซื้อตราสารหนี้เพื่อคงระดับความเสี่ยงเดิม</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <span><strong>เน้น DCA รายเดือน:</strong> ทยอยซื้อในวันเดียวกันของทุกเดือน (เช่น วันเงินเดือนออก) ช่วยตัดอารมณ์ความกลัว ไม่ต้องจับจังหวะตลาด</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <span><strong>ไม่ตื่นตระหนกยามตลาดตก:</strong> ในอดีตตลาดหุ้นมีช่วงวิกฤตเสมอ แต่ระยะยาวมากกว่า 5-10 ปี ดัชนีโลกสามารถทำจุดสูงสุดใหม่ได้เสมอ</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <span><strong>ตรวจสอบค่าธรรมเนียม:</strong> เลือกลงทุนในกองทุนดัชนีที่มีค่าธรรมเนียมการจัดการต่ำ (Total Expense Ratio ไม่เกิน 0.5 - 1.0% ต่อปี)</span>
          </div>
        </div>
      </div>

      {/* Navigation Banner: Prev to Assets, Next to Budget & DCA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-[#FCFCFD] dark:bg-[#131A24]">
        <button
          onClick={() => onNavigateToTab('assets')}
          className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <span>← ย้อนกลับ: 04. สินทรัพย์ลงทุน</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-slate-400 font-mono hidden md:inline">STEP 06 · จัดสรรรายได้ & DCA</span>
          <button
            onClick={() => onNavigateToTab('budget')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-xl transition-all shadow-xs border border-pink-300/40 hover:shadow-sm"
          >
            <span>ไปที่จัดสรรรายได้ & DCA</span>
            <ArrowRight className="w-3.5 h-3.5 text-pink-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
