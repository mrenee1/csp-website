
import { Activity, Coins, Cpu, ShieldCheck, TrendingUp, HeartPulse, Home, Users, BookOpen, Info, Layers, Lock, Calculator } from 'lucide-react';
import { BlogPost, ServiceData, ResourceLink, NavItem, TeamMember } from './types';

export const NAV_STRUCTURE: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { 
    id: 'solutions', 
    label: 'Solutions', 
    icon: Layers,
    children: [
      { id: 'health', label: 'Health', icon: HeartPulse },
      { id: 'wealth', label: 'Wealth', icon: Coins },
      { id: 'tech', label: 'Technology', icon: Cpu },
    ]
  },
  { id: 'about', label: 'About', icon: Info },
  { id: 'blog', label: 'Insights', icon: BookOpen },
];

export const FOOTER_PORTALS = [
  { label: 'Clarity Commissions', url: '#' },
  { label: 'WealthWave', url: '#' },
  { label: 'Creative Care', url: '#' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ricky',
    name: 'Ricky Ballard',
    role: 'Managing Partner',
    bio: 'A visionary leader focused on the intersection of organizational health and sustainable growth. Ricky champions the philosophy that business longevity is built on the vitality of its leadership and the clarity of its mission.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    specialties: ['Organizational Strategy', 'Executive Wellness', 'Leadership Development']
  },
  {
    id: 'greg',
    name: 'Gregory Sheets',
    role: 'Senior Wealth Strategist',
    bio: 'Dedicated to eradicating financial illiteracy, Gregory brings decades of expertise in wealth preservation and asset protection. As a key partner with WealthWave, he helps business owners restructure their financial foundations for generational impact.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    specialties: ['WealthWave Systems', 'Asset Protection', 'Tax Efficiency']
  },
  {
    id: 'rob',
    name: 'Rob Bundy',
    role: 'Director of Technology',
    bio: 'Rob architects the digital ecosystems that power modern enterprises. With a deep focus on systems integration and data security, he ensures that technology serves as an accelerator for business goals rather than a bottleneck.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    specialties: ['Systems Architecture', 'Digital Transformation', 'Operational Efficiency']
  }
];

export const SERVICES: Record<string, ServiceData> = {
  health: {
    id: 'health',
    title: 'Health Solutions',
    subtitle: 'Vitality for Leadership',
    description: 'We optimize the physical and organizational health of your business. From executive wellness programs to comprehensive healthcare strategies, we ensure your most valuable assets—people—are performing at their peak.',
    icon: HeartPulse,
    color: 'bg-brand-purple',
    textColor: 'text-white',
    features: [
      'Executive Wellness Audits',
      'Corporate Healthcare Strategy',
      'Mental Health & Resilience Training',
      'Ergonomic Workspace Design'
    ],
    cta: 'Explore Health',
    featuredPlatforms: [
      {
        id: 'championhealth',
        title: 'Creative Care',
        description: 'Personalized wellbeing platform designed to optimize physical and mental performance for teams.',
      }
    ]
  },
  wealth: {
    id: 'wealth',
    title: 'Wealth Solutions',
    subtitle: 'Asset Security & Growth',
    description: 'Strategic financial planning that goes beyond basic accounting. We structure, protect, and grow your business capital through advanced wealth management and tax-efficient strategies.',
    icon: Coins,
    color: 'bg-brand-gold',
    textColor: 'text-white',
    features: [
      'Capital Preservation Strategy',
      'Tax-Efficient Structuring',
      'Succession Planning',
      'Investment Diversification'
    ],
    cta: 'Explore Wealth',
    featuredPlatforms: [
      {
        id: 'wealthwave',
        title: 'WealthWave',
        description: 'The How Money Works company. Eradicating financial illiteracy through education and strategy.',
      }
    ]
  },
  tech: {
    id: 'tech',
    title: 'Technology Solutions',
    subtitle: 'Digital Transformation',
    description: 'Future-proof your operations with enterprise-grade technology solutions. We bridge the gap between complex IT infrastructure and seamless business operations. Through our partnership with Biz Boost, we offer web development, design, branding, application development, hosting, and business email services.',
    icon: Cpu,
    color: 'bg-brand-dark',
    textColor: 'text-white',
    features: [
      'Web Development & Design',
      'Branding & Application Development',
      'Hosting & Business Email',
      'Cybersecurity & Risk Management',
      'Cloud Infrastructure Migration',
      'Data Analytics & BI'
    ],
    cta: 'Explore Tech',
    featuredPlatforms: [
      {
        id: 'clarity',
        title: 'Clarity Commissions',
        description: 'The audit-grade commission & incentive platform for 1099 sales organizations. Coming soon.',
      },
      {
        id: 'bizboost',
        title: 'Technology Services',
        description: 'Web development, design, branding, apps, hosting, business email. Powered by Biz Boost.',
      }
    ]
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Intersection of Health and Wealth in 2024",
    category: "Strategy",
    date: "Oct 12, 2023",
    excerpt: "Why modern CEOs are treating personal vitality as a key business asset.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80"
  },
  {
    id: 2,
    title: "Cybersecurity: The Hidden Wealth Protector",
    category: "Technology",
    date: "Nov 05, 2023",
    excerpt: "Protecting your digital assets is now synonymous with protecting your capital.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80"
  },
  {
    id: 3,
    title: "Sustainable Growth Models for Service Firms",
    category: "Wealth",
    date: "Nov 28, 2023",
    excerpt: "Scaling without losing the premium touch that defines your brand.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
  }
];

export const RSR_RESOURCES: ResourceLink[] = [
  {
    title: "2024 Market Outlook Report",
    url: "#",
    type: "PDF Download"
  },
  {
    title: "Executive Health Checklist",
    url: "#",
    type: "Interactive Tool"
  },
  {
    title: "Tech Stack Audit Template",
    url: "#",
    type: "Worksheet"
  }
];
