import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SIPCalculation {
  monthlyInvestment: number;
  expectedReturn: number;
  timePeriod: number;
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyData: Array<{
    year: number;
    investment: number;
    value: number;
  }>;
}

interface SIPState {
  currentCalculation: SIPCalculation | null;
  savedPlans: SIPCalculation[];
  loading: boolean;
}

const initialState: SIPState = {
  currentCalculation: null,
  savedPlans: [],
  loading: false,
};

const sipSlice = createSlice({
  name: 'sip',
  initialState,
  reducers: {
    calculateSIP: (state, action: PayloadAction<{
      monthlyInvestment: number;
      expectedReturn: number;
      timePeriod: number;
    }>) => {
      const { monthlyInvestment, expectedReturn, timePeriod } = action.payload;
      const monthlyRate = expectedReturn / (12 * 100);
      const totalMonths = timePeriod * 12;
      
      const totalValue = monthlyInvestment * 
        (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate * 
        (1 + monthlyRate);
      
      const totalInvestment = monthlyInvestment * totalMonths;
      const estimatedReturns = totalValue - totalInvestment;
      
      const yearlyData = [];
      for (let year = 1; year <= timePeriod; year++) {
        const months = year * 12;
        const investment = monthlyInvestment * months;
        const value = monthlyInvestment * 
          (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * 
          (1 + monthlyRate);
        yearlyData.push({ year, investment, value });
      }
      
      state.currentCalculation = {
        monthlyInvestment,
        expectedReturn,
        timePeriod,
        totalInvestment,
        estimatedReturns,
        totalValue,
        yearlyData,
      };
    },
    savePlan: (state, action: PayloadAction<SIPCalculation>) => {
      state.savedPlans.push(action.payload);
    },
    removePlan: (state, action: PayloadAction<number>) => {
      state.savedPlans.splice(action.payload, 1);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { calculateSIP, savePlan, removePlan, setLoading } = sipSlice.actions;
export default sipSlice.reducer;