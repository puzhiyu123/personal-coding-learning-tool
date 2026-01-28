export interface Company {
  id: string;
  name: string;
  tier: 1 | 2 | 3 | 4;
  tierLabel: string;
  description: string;
  employeeCount: string;
  industry: string;
  tagline: string;
  color: string;
}

export const companies: Company[] = [
  // Tier 1 - Small Startups
  {
    id: "taskflow",
    name: "TaskFlow",
    tier: 1,
    tierLabel: "Small Startup",
    description: "A 5-person startup building a task management app for freelancers and small teams.",
    employeeCount: "5",
    industry: "Productivity",
    tagline: "Move fast, ship often",
    color: "primary",
  },
  {
    id: "fittrack",
    name: "FitTrack",
    tier: 1,
    tierLabel: "Small Startup",
    description: "A health and fitness tracking app focused on personalized workout routines.",
    employeeCount: "8",
    industry: "Health & Fitness",
    tagline: "Your personal fitness companion",
    color: "teal",
  },
  // Tier 2 - Medium Startups
  {
    id: "shopstream",
    name: "ShopStream",
    tier: 2,
    tierLabel: "Growing Startup",
    description: "An e-commerce platform connecting local artisans with global buyers. Growing fast with 50 employees.",
    employeeCount: "50",
    industry: "E-Commerce",
    tagline: "Local crafts, global reach",
    color: "accent",
  },
  {
    id: "learnpath",
    name: "LearnPath",
    tier: 2,
    tierLabel: "Growing Startup",
    description: "An EdTech company building interactive learning experiences for coding bootcamps.",
    employeeCount: "35",
    industry: "Education Technology",
    tagline: "Learn by doing, grow by teaching",
    color: "purple",
  },
  // Tier 3 - Series-E
  {
    id: "quickbite",
    name: "QuickBite",
    tier: 3,
    tierLabel: "Series-E Startup",
    description: "A food delivery company operating in 200+ cities. Established systems, significant technical debt, cross-team coordination required.",
    employeeCount: "2,000+",
    industry: "Food Delivery",
    tagline: "Delivered in 30 minutes or less",
    color: "orange",
  },
  {
    id: "ridenow",
    name: "RideNow",
    tier: 3,
    tierLabel: "Series-E Startup",
    description: "A ride-sharing platform with real-time matching, surge pricing, and driver management systems.",
    employeeCount: "3,500+",
    industry: "Transportation",
    tagline: "Your ride, your way",
    color: "blue",
  },
  // Tier 4 - Big-5
  {
    id: "cloudscale",
    name: "CloudScale",
    tier: 4,
    tierLabel: "Big-5 Company",
    description: "A cloud infrastructure company serving millions of businesses. Enterprise-scale, strict processes, massive codebase.",
    employeeCount: "50,000+",
    industry: "Cloud Infrastructure",
    tagline: "Scale without limits",
    color: "green",
  },
  {
    id: "searchfirst",
    name: "SearchFirst",
    tier: 4,
    tierLabel: "Big-5 Company",
    description: "A search engine company processing billions of queries daily. Complex distributed systems and strict code review processes.",
    employeeCount: "100,000+",
    industry: "Search & AI",
    tagline: "Find anything, anywhere",
    color: "primary",
  },
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function getCompaniesByTier(tier: 1 | 2 | 3 | 4): Company[] {
  return companies.filter((c) => c.tier === tier);
}

export function getTierLabel(tier: 1 | 2 | 3 | 4): string {
  switch (tier) {
    case 1: return "Small Startup";
    case 2: return "Growing Startup";
    case 3: return "Series-E Startup";
    case 4: return "Big-5 Company";
  }
}

export function getTierDescription(tier: 1 | 2 | 3 | 4): string {
  switch (tier) {
    case 1: return "Fast iteration, minimal process, wear many hats";
    case 2: return "Growing pains, some process, scaling challenges";
    case 3: return "Established systems, technical debt, cross-team coordination";
    case 4: return "Enterprise-scale, strict processes, massive codebase";
  }
}
