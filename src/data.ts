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

export type Company = {
  id: string;
  name: string;
  stage: string;
  portalViews: string;
  investorCount: number;
  reportCount: number;
  stakeholders: Stakeholder[];
  rounds: Round[];
  runway: Array<{ month: string; cash: number }>;
};

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Verified' | 'Pending MFA' | 'Needs review';
  companyIds: string[];
};

export const companies: Company[] = [
  {
    id: 'equivator',
    name: 'EquivatorAI',
    stage: 'Series A',
    portalViews: '2h',
    investorCount: 12,
    reportCount: 3,
    stakeholders: [
      { name: 'Rasha Abounamah', role: 'Founder & CEO', shares: 4_200_000, color: '#1d4ed8' },
      { name: 'Maya Haddad', role: 'Co-founder & CTO', shares: 2_800_000, color: '#0f766e' },
      { name: 'Advisor Pool', role: 'Advisors', shares: 350_000, color: '#9333ea' },
      { name: 'Employee Pool', role: 'ESOP', shares: 650_000, color: '#ea580c' },
    ],
    rounds: [
      { name: 'Seed', investment: 750_000, preMoney: 4_500_000, optionPool: 8 },
      { name: 'Series A', investment: 2_500_000, preMoney: 11_000_000, optionPool: 12 },
      { name: 'Series B', investment: 7_000_000, preMoney: 28_000_000, optionPool: 15 },
    ],
    runway: [
      { month: 'Jan', cash: 920 },
      { month: 'Feb', cash: 860 },
      { month: 'Mar', cash: 790 },
      { month: 'Apr', cash: 720 },
      { month: 'May', cash: 650 },
      { month: 'Jun', cash: 580 },
      { month: 'Jul', cash: 510 },
      { month: 'Aug', cash: 450 },
    ],
  },
  {
    id: 'dilute',
    name: 'Dilute Online',
    stage: 'Seed',
    portalViews: '1d',
    investorCount: 7,
    reportCount: 2,
    stakeholders: [
      { name: 'Rasha Abounamah', role: 'Founder', shares: 5_600_000, color: '#1d4ed8' },
      { name: 'Product Lead', role: 'Founding team', shares: 1_400_000, color: '#0f766e' },
      { name: 'Angel Syndicate', role: 'Seed investors', shares: 700_000, color: '#9333ea' },
      { name: 'Employee Pool', role: 'ESOP', shares: 900_000, color: '#ea580c' },
    ],
    rounds: [
      { name: 'Pre-seed', investment: 300_000, preMoney: 2_200_000, optionPool: 6 },
      { name: 'Seed', investment: 1_200_000, preMoney: 6_000_000, optionPool: 10 },
      { name: 'Series A', investment: 3_500_000, preMoney: 15_000_000, optionPool: 14 },
    ],
    runway: [
      { month: 'Jan', cash: 520 },
      { month: 'Feb', cash: 490 },
      { month: 'Mar', cash: 460 },
      { month: 'Apr', cash: 430 },
      { month: 'May', cash: 395 },
      { month: 'Jun', cash: 360 },
      { month: 'Jul', cash: 330 },
      { month: 'Aug', cash: 295 },
    ],
  },
  {
    id: 'venture-lab',
    name: 'Venture Lab',
    stage: 'Bridge',
    portalViews: '4h',
    investorCount: 18,
    reportCount: 5,
    stakeholders: [
      { name: 'Managing Partner', role: 'Founder', shares: 3_100_000, color: '#1d4ed8' },
      { name: 'Operations Partner', role: 'Co-founder', shares: 2_400_000, color: '#0f766e' },
      { name: 'Strategic Investors', role: 'Investors', shares: 1_600_000, color: '#9333ea' },
      { name: 'Team Pool', role: 'Incentive pool', shares: 800_000, color: '#ea580c' },
    ],
    rounds: [
      { name: 'Seed', investment: 900_000, preMoney: 5_500_000, optionPool: 9 },
      { name: 'Bridge', investment: 1_800_000, preMoney: 9_500_000, optionPool: 11 },
      { name: 'Series A', investment: 4_200_000, preMoney: 18_000_000, optionPool: 13 },
    ],
    runway: [
      { month: 'Jan', cash: 760 },
      { month: 'Feb', cash: 725 },
      { month: 'Mar', cash: 680 },
      { month: 'Apr', cash: 640 },
      { month: 'May', cash: 590 },
      { month: 'Jun', cash: 545 },
      { month: 'Jul', cash: 510 },
      { month: 'Aug', cash: 470 },
    ],
  },
];

export const platformUsers: PlatformUser[] = [
  {
    id: 'usr-rasha',
    name: 'Rasha Abounamah',
    email: 'rasha@equivator.ai',
    role: 'Owner',
    status: 'Verified',
    companyIds: ['equivator', 'dilute'],
  },
  {
    id: 'usr-maya',
    name: 'Maya Haddad',
    email: 'maya@equivator.ai',
    role: 'Finance admin',
    status: 'Verified',
    companyIds: ['equivator'],
  },
  {
    id: 'usr-omar',
    name: 'Omar Faris',
    email: 'omar@venturelab.co',
    role: 'Reviewer',
    status: 'Pending MFA',
    companyIds: ['venture-lab'],
  },
  {
    id: 'usr-lina',
    name: 'Lina Mansour',
    email: 'lina@dilute.online',
    role: 'Founder',
    status: 'Needs review',
    companyIds: ['dilute'],
  },
];

export const freeEmailDomains = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
];

export const stakeholders = companies[0].stakeholders;
export const rounds = companies[0].rounds;

export const formatMoney = (value: number) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) => new Intl.NumberFormat('en').format(value);

export function totalShares(items: Stakeholder[] = stakeholders) {
  return items.reduce((sum, item) => sum + item.shares, 0);
}

export function ownershipPercent(shares: number, total = totalShares()) {
  return (shares / total) * 100;
}

export function roundInvestorOwnership(round: Round) {
  return (round.investment / (round.preMoney + round.investment)) * 100;
}

export function founderOwnershipAfter(round: Round, items: Stakeholder[] = stakeholders) {
  const founderStart = ownershipPercent(items[0].shares + items[1].shares, totalShares(items));
  return founderStart - roundInvestorOwnership(round) - round.optionPool;
}

export const scenarioRowsFor = (items: Stakeholder[], companyRounds: Round[]) =>
  companyRounds.map((round) => ({
    name: round.name,
    investor: Number(roundInvestorOwnership(round).toFixed(1)),
    founders: Number(Math.max(founderOwnershipAfter(round, items), 0).toFixed(1)),
    optionPool: round.optionPool,
  }));

export const scenarioRows = scenarioRowsFor(stakeholders, rounds);
