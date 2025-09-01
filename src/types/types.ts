export interface DashboardData {
  userName: string;
  residentId: string;
  userAvatar: string;
  stats: UserStats;
  loans: LoanData[];
}

export interface LoanData {
  id: string;
  type: string;
  loanId: string;
  loanDate: string;
  emi: string;
  totalOutstanding: string;
  monthlyPayment: string;
  status: string;
}

export interface UserStats {
  totalOutstanding: string;
  monthlyPayment: string;
  creditScore: number;
  activeLoans: number;
}

export interface FinancialDashboardProps {
  userName?: string;
  residentId?: string;
  userAvatar?: string;
  stats?: UserStats;
  loans?: LoanData[];
}
