export type Stakeholder = {
  name: string;
  role: string;
  shares: number;
  color: string;
};

export type Round = {
  name: string;
  investment: number;
  preMoney: number;
  optionPool: number;
};

export const stakeholders: Stakeholder[] = [
  { name: 'Rasha Abounamah', role: 'Founder & CEO', shares: 4_200_000, color: '#1d4ed8' },
  { name: 'Maya Haddad', role: 'Co-founder & CTO', shares: 2_800_000, color: '#0f766e' },
  { name: 'Advisor Pool', role: 'Advisors', shares: 350_000, color: '#9333ea' },
  { name: 'Employee Pool', role: 'ESOP', shares: 650_000, color: '#ea580c' },
];

export const rounds: Round[] = [
  { name: 'Seed', investment: 750_000, preMoney: 4_500_000, optionPool: 8 },
  { name: 'Series A', investment: 2_500_000, preMoney: 11_000_000, optionPool: 12 },
  { name: 'Series B', investment: 7_000_000, preMoney: 28_000_000, optionPool: 15 },
];

export const formatMoney = (value: number) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) => new Intl.NumberFormat('en').format(value);

export function totalShares(items = stakeholders) {
  return items.reduce((sum, item) => sum + item.shares, 0);
}

export function ownershipPercent(shares: number, total = totalShares()) {
  return (shares / total) * 100;
}

export function roundInvestorOwnership(round: Round) {
  return (round.investment / (round.preMoney + round.investment)) * 100;
}

export function founderOwnershipAfter(round: Round) {
  const founderStart = ownershipPercent(stakeholders[0].shares + stakeholders[1].shares);
  return founderStart - roundInvestorOwnership(round) - round.optionPool;
}

export const scenarioRows = rounds.map((round) => ({
  name: round.name,
  investor: Number(roundInvestorOwnership(round).toFixed(1)),
  founders: Number(Math.max(founderOwnershipAfter(round), 0).toFixed(1)),
  optionPool: round.optionPool,
}));
