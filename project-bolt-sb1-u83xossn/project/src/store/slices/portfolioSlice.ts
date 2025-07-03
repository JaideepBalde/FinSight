import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Investment {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  units: number;
  price: number;
  date: string;
  type: 'stocks' | 'mutual_funds' | 'bonds';
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

interface PortfolioState {
  investments: Investment[];
  totalValue: number;
  totalInvestment: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  loading: boolean;
}

const initialState: PortfolioState = {
  investments: [],
  totalValue: 0,
  totalInvestment: 0,
  totalGainLoss: 0,
  totalGainLossPercent: 0,
  loading: false,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setInvestments: (state, action: PayloadAction<Investment[]>) => {
      state.investments = action.payload;
      portfolioSlice.caseReducers.calculateTotals(state);
    },
    addInvestment: (state, action: PayloadAction<Investment>) => {
      state.investments.push(action.payload);
      portfolioSlice.caseReducers.calculateTotals(state);
    },
    removeInvestment: (state, action: PayloadAction<string>) => {
      state.investments = state.investments.filter(inv => inv.id !== action.payload);
      portfolioSlice.caseReducers.calculateTotals(state);
    },
    updateInvestment: (state, action: PayloadAction<Investment>) => {
      const index = state.investments.findIndex(inv => inv.id === action.payload.id);
      if (index !== -1) {
        state.investments[index] = action.payload;
        portfolioSlice.caseReducers.calculateTotals(state);
      }
    },
    calculateTotals: (state) => {
      state.totalValue = state.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
      state.totalInvestment = state.investments.reduce((sum, inv) => sum + inv.amount, 0);
      state.totalGainLoss = state.totalValue - state.totalInvestment;
      state.totalGainLossPercent = state.totalInvestment > 0 ? 
        (state.totalGainLoss / state.totalInvestment) * 100 : 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setInvestments, addInvestment, removeInvestment, updateInvestment, calculateTotals, setLoading } = portfolioSlice.actions;
export default portfolioSlice.reducer;