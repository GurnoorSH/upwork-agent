import type { Job } from "./jobTypes";

const now = Date.now();

export const mockJobs: Job[] = [
  {
    uid: "mock-framer-mobile",
    title: "Quick Framer website Fix Mobile Responsiveness on my framer landing page ($10)",
    ciphertext: "mock-framer-mobile",
    description:
      "I need help improving the mobile responsiveness of my Framer website homepage.\n\nTask:\n* Fix layout issues on mobile view\n* Ensure sections display properly on different screen sizes\n* Make the homepage look clean and responsive on mobile devices\n\nThis is a small and quick task for someone experienced with Framer.\n\nMore work available if this goes well.",
    type: "Fixed-price",
    amount: { amount: "10", displayValue: "$10" },
    createdOn: new Date(now - 45_000).toISOString(),
    tierText: "Intermediate",
    proposalsTier: "Less than 5",
    connectPrice: 2,
    skills: [
      { prettyName: "Web Development" },
      { prettyName: "Website Redesign" },
      { prettyName: "Framer" },
      { prettyName: "Responsive Design" },
      { prettyName: "Landing Page" }
    ],
    client: {
      paymentVerificationStatus: 1,
      totalSpent: 4100,
      totalHires: 18,
      totalFeedback: 4.9,
      location: { country: "United States" }
    },
    __isSeen: false
  },
  {
    uid: "mock-platform",
    title: "Multi-Agent Platform Development",
    ciphertext: "mock-platform",
    description:
      "We need a senior TypeScript developer to help build a browser-based automation platform. The work includes extension state, dashboard flows, API integration, and careful UX for repeated operational use.",
    type: "Hourly",
    hourlyBudget: { min: 45, max: 75 },
    createdOn: new Date(now - 7 * 60_000).toISOString(),
    tierText: "Expert",
    proposalsTier: "5 to 10",
    connectPrice: 8,
    skills: [
      { prettyName: "TypeScript" },
      { prettyName: "React" },
      { prettyName: "Chrome Extension" },
      { prettyName: "API Integration" }
    ],
    client: {
      paymentVerificationStatus: 1,
      totalSpent: 28600,
      totalHires: 42,
      totalFeedback: 4.8,
      location: { country: "Canada" }
    },
    __isSeen: false
  },
  {
    uid: "mock-seo",
    title: "Back End Website Setup and SEO Specialist",
    ciphertext: "mock-seo",
    description:
      "Looking for support setting up technical SEO, redirects, schema, and backend configuration for a small business site. Please share similar migration or launch work.",
    type: "Fixed-price",
    amount: { amount: "350", displayValue: "$350" },
    createdOn: new Date(now - 11 * 60_000).toISOString(),
    tierText: "Intermediate",
    proposalsTier: "10 to 15",
    connectPrice: 4,
    skills: [
      { prettyName: "Technical SEO" },
      { prettyName: "Backend Development" },
      { prettyName: "Schema Markup" }
    ],
    client: {
      paymentVerificationStatus: 0,
      totalSpent: 900,
      totalHires: 5,
      totalFeedback: 4.5,
      location: { country: "United Kingdom" }
    },
    __isSeen: true
  }
];
