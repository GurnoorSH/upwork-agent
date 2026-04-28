export type JobType = "Hourly" | "Fixed-price";

export type Job = {
  id?: string;
  uid?: string;
  title: string;
  ciphertext: string;
  description: string;
  type: JobType;
  recno?: string | number;
  freelancersToHire?: number;
  duration?: string;
  durationLabel?: string;
  engagement?: string;
  amount?: {
    amount: string;
    currency?: string;
    currencyCode?: string;
    displayValue?: string;
  };
  createdOn?: string;
  publishedOn?: string;
  renewedOn?: string;
  connectPrice?: number;
  tierText?: string;
  tier?: string | number;
  tierLabel?: string;
  contractorTier?: string;
  proposalsTier?: string;
  totalApplicants?: number;
  enterpriseJob?: boolean;
  premium?: boolean;
  isApplied?: boolean;
  attrs?: JobAttribute[];
  skills?: JobSkill[];
  hourlyBudget?: {
    type?: string;
    min: number;
    max: number;
  };
  weeklyBudget?: {
    amount?: number;
  };
  client?: JobClient;
  clientRelation?: JobClientRelation | null;
  aiRanking?: JobAiRanking;
  __isSeen?: boolean;
};

export type JobAiRanking = {
  selected: boolean;
  score: number;
  title: string;
  budget: string;
  clientSummary: string;
  reasons: string[];
  rejectionReason: string | null;
  rankedAt: number;
};

export type JobAttribute = {
  id?: string;
  uid?: string;
  prettyName: string;
  prefLabel?: string;
  parentSkillId?: string;
  highlighted?: boolean;
  freeText?: string;
  skillType?: string;
};

export type JobSkill = {
  id?: string;
  name?: string;
  prettyName?: string;
  prefLabel?: string;
  highlighted?: boolean;
};

export type JobClient = {
  totalHires?: number;
  totalPostedJobs?: number;
  totalSpent?: number;
  paymentVerificationStatus?: number;
  location?: {
    country?: string;
    city?: string;
    state?: string;
    countryTimezone?: string;
    worldRegion?: string;
  };
  totalReviews?: number;
  totalFeedback?: number;
  companyRid?: string;
  edcUserId?: string;
  lastContractRid?: string;
  companyOrgUid?: string;
  hasFinancialPrivacy?: boolean;
};

export type JobClientRelation = {
  companyRid?: string;
  companyName?: string;
  edcUserId?: string;
  lastContractPlatform?: string;
  lastContractRid?: string;
  lastContractTitle?: string;
};
