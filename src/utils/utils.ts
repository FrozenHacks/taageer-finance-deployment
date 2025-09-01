/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DashboardData } from "../types/types";

export function reformatData(data: any): DashboardData {
  const loanData = data.customer_data;

  const totalLoans = loanData.length;
  const totalDebt = loanData.reduce(
    (acc: number, loan: any) => acc + parseInt(loan.total_outstanding),
    0
  );
  const monthlyPayment = loanData.reduce(
    (acc: number, loan: any) => acc + parseInt(loan.monthly_payment),
    0
  );

  return {
    userName: loanData[0]?.name,
    residentId: loanData[0]?.resident_id,
    userAvatar: `https://avatars.dicebear.com/api/initials/${loanData[0]?.name}.svg`,
    stats: {
      totalOutstanding: formatCurrency(parseInt(totalDebt)),
      monthlyPayment: formatCurrency(monthlyPayment),
      creditScore: 750,
      activeLoans: totalLoans,
    },
    loans: loanData.map((loan: any) => ({
      id: loan?.id.toString(),
      type: loan?.acc_type.split(" ")[0].toLowerCase(),
      loanId: loan?.id.toString(),
      loanDate: loan?.payment_date,
      emi: formatCurrency(parseInt(loan?.monthly_payment)),
      totalOutstanding: formatCurrency(parseInt(loan?.total_outstanding)),
      monthlyPayment: formatCurrency(parseInt(loan?.monthly_payment)),
      status: loan?.status,
    })),
  };
}

export const formatCurrency = (amount: number | string) => {
  const numberAmount = typeof amount === "number" ? amount : parseFloat(amount);
  if (isNaN(numberAmount)) {
    return `${amount} OMR`;
  }
  return `${numberAmount.toFixed(3)} OMR`;
};

export const transformTranscriptionData = (transcriptionData: any) => {
  console.log(transcriptionData);

  const startTime = transcriptionData[0]?.streamInfo.timestamp;
  return transcriptionData.map(
    (item: {
      participantInfo: { identity: string | string[] };
      text: any;
      streamInfo: { timestamp: number };
    }) => {
      const speaker = item.participantInfo.identity.includes("agent")
        ? "agent"
        : "customer";
      const message = item.text;
      const timestamp = Math.floor(
        (item?.streamInfo.timestamp - startTime) / 1000
      );
      const formattedTimestamp = `00:${String(timestamp).padStart(2, "0")}`;

      return {
        speaker,
        message,
        timestamp: formattedTimestamp,
      };
    }
  );
};
