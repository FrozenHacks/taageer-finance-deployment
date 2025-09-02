import React from "react";
import { Car, User, CreditCard, TrendingUp, Calendar } from "lucide-react";
import type { DashboardData } from "../types/types";

// interface LoanData {
//   id: string;
//   type: "car" | "personal";
//   loanId: string;
//   loanDate: string;
//   emi: string;
//   totalOutstanding: string;
//   monthlyPayment: string;
//   status: "Active" | "Inactive";
// }

// interface UserStats {
//   totalOutstanding: string;
//   monthlyPayment: string;
//   creditScore: number;
//   activeLoans: number;
// }

// interface FinancialDashboardProps {
//   userName?: string;
//   residentId?: string;
//   userAvatar?: string;
//   stats?: UserStats;
//   loans?: LoanData[];
// }

// const defaultStats: UserStats = {
//   totalOutstanding: "15,000 OMR",
//   monthlyPayment: "15,000 OMR",
//   creditScore: 750,
//   activeLoans: 32,
// };

// const defaultLoans: LoanData[] = [
//   {
//     id: "1",
//     type: "car",
//     loanId: "5216561",
//     loanDate: "08-Sep-2023",
//     emi: "10/24",
//     totalOutstanding: "15,000 OMR",
//     monthlyPayment: "15,000 OMR",
//     status: "Active",
//   },
//   {
//     id: "2",
//     type: "personal",
//     loanId: "5216561",
//     loanDate: "08-Sep-2023",
//     emi: "10/24",
//     totalOutstanding: "15,000 OMR",
//     monthlyPayment: "15,000 OMR",
//     status: "Active",
//   },
// ];

// interface DashboardData {
//   userName: string;
//   residentId: string;
//   userAvatar: string;
//   stats: UserStats;
//   loans: LoanData[];
// }

// export const defaultData: DashboardData = {
//   userName: "Amit Sharma",
//   residentId: "1xxxx69",
//   userAvatar:
//     "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
//   stats: {
//     totalOutstanding: "15,000 OMR",
//     monthlyPayment: "15,000 OMR",
//     creditScore: 750,
//     activeLoans: 32,
//   },
//   loans: [
//     {
//       id: "1",
//       type: "car",
//       loanId: "5216561",
//       loanDate: "08-Sep-2023",
//       emi: "10/24",
//       totalOutstanding: "15,000 OMR",
//       monthlyPayment: "15,000 OMR",
//       status: "Active",
//     },
//     {
//       id: "2",
//       type: "personal",
//       loanId: "5216561",
//       loanDate: "08-Sep-2023",
//       emi: "10/24",
//       totalOutstanding: "15,000 OMR",
//       monthlyPayment: "15,000 OMR",
//       status: "Active",
//     },
//   ],
// };

interface FinancialDashboardProps {
  data: DashboardData;
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ data }) => {
  const { userName, residentId, userAvatar, stats, loans } = data;

  const getLoanIcon = (type: string) => {
    return type === "car" ? Car : User;
  };

  const getIconColor = (type: string) => {
    return type === "car" ? "text-blue-600" : "text-indigo-600";
  };

  const getIconBgColor = (type: string) => {
    return type === "car" ? "bg-blue-100" : "bg-indigo-100";
  };

  const getLoanTitle = (type: string) => {
    return type;
    // return type === "car" ? "Car Loan" : "Personal Loan";
  };

  return (
    <div className="w-full max-w-6xl p-4 mx-auto sm:p-6 lg:p-8">
      {/* Header Section with Custom Box Shadow */}
      <div
        className="p-4 mb-6 bg-white rounded-xl sm:p-6 sm:mb-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(222, 246, 255, 0.01) 100%)",
          boxShadow: `
            0px 3.65px 5.48px 0px #FFFFFF66 inset,
            0px -1.83px 1.83px 0px #1B235512 inset,
            0px 2.74px 5.48px 0px #07006E08,
            0px 0.37px 20px 0px #19213D40
          `,
        }}
      >
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={userAvatar}
              alt={userName}
              className="object-cover w-12 h-12 border-2 rounded-full shadow-md sm:w-14 sm:h-14"
              style={{ borderColor: "#067CAC" }}
            />
            <div className="flex flex-col items-start">
              <p className="text-sm  font-medium text-[#09347A]">Welcome,</p>
              <p className="text-base sm:text-lg font-semibold text-[#09347A]">
                {userName}
              </p>
            </div>
          </div>

          <div className="mt-2 text-left sm:mt-0">
            <p className="text-xs text-gray-500 sm:text-sm">Resident ID</p>
            <p className="text-sm sm:text-base font-semibold text-[#09347A]">
              {residentId}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid with Left Alignment */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mb-8">
        <div
          className="p-4 transition-shadow duration-200 bg-white border border-gray-100 rounded-xl sm:p-6 hover:shadow-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(222, 246, 255, 0.01) 100%)",
            boxShadow: `
              0px 3.65px 5.48px 0px #FFFFFF66 inset,
              0px -1.83px 1.83px 0px #1B235512 inset,
              0px 2.74px 5.48px 0px #07006E08,
              0px 0.37px 20px 0px #19213D40
            `,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              Total Outstanding
            </p>
            <div className="w-4 h-4 mr-2 text-blue-600">OMR</div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#09347A] text-left">
            {stats.totalOutstanding}
          </p>
        </div>

        <div
          className="p-4 transition-shadow duration-200 bg-white border border-gray-100 rounded-xl sm:p-6 hover:shadow-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(222, 246, 255, 0.01) 100%)",
            boxShadow: `
              0px 3.65px 5.48px 0px #FFFFFF66 inset,
              0px -1.83px 1.83px 0px #1B235512 inset,
              0px 2.74px 5.48px 0px #07006E08,
              0px 0.37px 20px 0px #19213D40
            `,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              Monthly Payment
            </p>
            <Calendar className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#09347A] text-left">
            {stats.monthlyPayment}
          </p>
        </div>

        <div
          className="p-4 transition-shadow duration-200 bg-white border border-gray-100 rounded-xl sm:p-6 hover:shadow-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(222, 246, 255, 0.01) 100%)",
            boxShadow: `
              0px 3.65px 5.48px 0px #FFFFFF66 inset,
              0px -1.83px 1.83px 0px #1B235512 inset,
              0px 2.74px 5.48px 0px #07006E08,
              0px 0.37px 20px 0px #19213D40
            `,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              Credit Score
            </p>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#09347A] text-left">
            {stats.creditScore}
          </p>
        </div>

        <div
          className="p-4 transition-shadow duration-200 bg-white border border-gray-100 rounded-xl sm:p-6 hover:shadow-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(222, 246, 255, 0.01) 100%)",
            boxShadow: `
              0px 3.65px 5.48px 0px #FFFFFF66 inset,
              0px -1.83px 1.83px 0px #1B235512 inset,
              0px 2.74px 5.48px 0px #07006E08,
              0px 0.37px 20px 0px #19213D40
            `,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              Active Loans
            </p>
            <CreditCard className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#09347A] text-left">
            {stats.activeLoans}
          </p>
        </div>
      </div>

      {/* Loans Section */}
      <div className="space-y-4 sm:space-y-6">
        {loans.map((loan) => {
          const IconComponent = getLoanIcon(loan.type);
          const iconColor = getIconColor(loan.type);
          const iconBgColor = getIconBgColor(loan.type);
          const loanTitle = getLoanTitle(loan.type);

          return (
            <div
              key={loan.id}
              className="relative transition-all duration-200 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-gray-200"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(222, 246, 255, 0.01) 100%)",
                boxShadow: `
                  0px 3.65px 5.48px 0px #FFFFFF66 inset,
                  0px -1.83px 1.83px 0px #1B235512 inset,
                  0px 2.74px 5.48px 0px #07006E08,
                  0px 0.37px 20px 0px #19213D40
                `,
              }}
            >
              {/* Active Badge at Top Left Edge */}
              <div className="absolute top-0 left-0">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-tl-xl rounded-br-xl">
                  {loan.status}
                </span>
              </div>

              <div className="p-4 pt-8 sm:p-6 sm:pt-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  {/* Left Section */}
                  <div className="flex flex-col items-center mb-6 text-center sm:flex-row sm:items-center sm:text-left lg:mb-0 lg:flex-1">
                    {/* Icon */}
                    <div
                      className={`flex items-center justify-center rounded-md ${iconBgColor} w-[50px] h-[44px]`}
                    >
                      <IconComponent className={`w-5 h-5 ${iconColor}`} />
                    </div>

                    {/* Loan Details */}
                    <div className="flex flex-col items-center mt-2 sm:mt-0 sm:ml-4 sm:items-start">
                      <h3 className="text-lg sm:text-xl font-bold text-[#09347A]">
                        {loanTitle}{" "}
                        <span className="text-sm font-normal text-[#1AB4CC] block sm:inline sm:ml-1">
                          (Loan no: {loan.loanId})
                        </span>
                      </h3>

                      <div className="text-sm text-[#09347A]">
                        <p>
                          Loan Date -{" "}
                          <span className="font-bold">{loan.loanDate}</span>
                        </p>
                        <p>
                          EMI - <span className="font-bold">{loan.emi}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section with Vertical Divider */}
                  <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-100 sm:flex-row sm:gap-6 lg:gap-8 lg:pt-0 sm:border-t-0">
                    <div className="text-center">
                      <p className="text-xs text-[#09347A] mb-1">
                        Total Outstanding
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-[#09347A]">
                        {loan.totalOutstanding}
                      </p>
                    </div>

                    {/* Vertical Divider - Hidden on mobile, shown on larger screens */}
                    <div className="hidden w-px h-12 bg-gray-200 sm:block"></div>

                    <div className="text-center">
                      <p className="text-xs text-[#09347A] mb-1">
                        Monthly Payment
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-[#09347A]">
                        {loan.monthlyPayment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialDashboard;
