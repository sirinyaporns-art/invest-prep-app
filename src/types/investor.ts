export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  whyImportant: string;
  actionTip: string;
  category: 'foundation' | 'knowledge' | 'execution';
  isCompleted: boolean;
  isAutoSynced?: boolean;
  syncSourceLabel?: string;
}

export interface PersonalFinance {
  age: number;
  gender: 'male' | 'female' | 'other' | 'unspecified';
  occupation: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyDebtPayment: number;
  totalDebt: number;
  emergencyFund: number;
  currentInvestments: number;
}

export type InvestmentHorizon = 'short' | 'medium' | 'long' | 'very_long';

export interface InvestmentGoal {
  purpose: string;
  customPurpose: string;
  targetAmount: number;
  timeHorizonYears: number;
  horizonCategory: InvestmentHorizon;
  importanceLevel: 'essential' | 'important' | 'flexible'; // ความสำคัญของเงินก้อนนี้
  downsideTolerance: 'none' | 'low' | 'moderate' | 'high';
}

export interface TSIQuestionOption {
  text: string;
  score: number;
  subtext?: string;
}

export interface TSIQuestion {
  id: number;
  question: string;
  category: 'profile' | 'knowledge' | 'risk_tolerance' | 'capacity';
  options: TSIQuestionOption[];
}

export type RiskLevel = 1 | 2 | 3 | 4 | 5;

export interface RiskProfile {
  level: RiskLevel;
  title: string;
  titleEn: string;
  scoreRange: string;
  description: string;
  suitabilityText: string;
  maxStockRatio: number;
  suggestedAllocation: {
    asset: string;
    percentage: number;
    color: string;
    description: string;
  }[];
  expectedAnnualReturn: string;
  historicalMaxDrawdown: string;
}

export interface AssetClassItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'equity' | 'fund' | 'fixed_income' | 'alternative' | 'cash';
  riskScore: number; // 1-8 scale matching Thai mutual fund risk scale
  minimumCapital: string;
  expectedReturn: string;
  liquidity: 'high' | 'medium' | 'low';
  pros: string[];
  cons: string[];
  beginnerRecommendation: string;
  description: string;
  isInterested: boolean;
  interestLevel: 'high' | 'medium' | 'none';
}

export interface BudgetSplit {
  needs: number; // 50%
  wants: number; // 30%
  savingsAndInvest: number; // 20%
}
