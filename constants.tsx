
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
      { id: 'finance', label: 'Finance', icon: Coins },
      { id: 'tech', label: 'Technology', icon: Cpu },
    ]
  },
  { id: 'about', label: 'About', icon: Info },
];

export const PLATFORM_PILLARS = [
  {
    id: 'health',
    label: 'Health',
    color: '#4ade80',
    solutions: [
      {
        id: 'championhealth' as const,
        name: 'Creative Care',
        description: 'Reduce healthcare costs while improving employee wellbeing through modern employer health solutions.',
        icon: '💚',
        tags: ['Employee Wellness', 'Healthcare Savings', 'Modern Benefits'],
      },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    color: 'var(--gold)',
    solutions: [
      {
        id: 'wealthwave' as const,
        name: 'WealthWave',
        description: 'Financial literacy and wealth-building education designed to help employees and business owners build stronger financial futures.',
        icon: '📈',
        tags: ['Financial Literacy', 'Wealth Building', 'Employee Education'],
      },
      {
        id: 'creativepayments' as const,
        name: 'Impact Payments',
        description: 'Modern payment infrastructure and merchant services for mission-driven businesses.',
        icon: '💳',
        tags: ['Payment Processing', 'Merchant Services', 'Infrastructure'],
      },
    ],
  },
  {
    id: 'tech',
    label: 'Technology',
    color: '#5ba8d4',
    solutions: [
      {
        id: 'bizboost' as const,
        name: 'Creative Web',
        description: 'Professional websites, branding, and digital growth systems built for modern businesses.',
        icon: '✦',
        tags: ['Web Design', 'Branding', 'Digital Growth'],
      },
      {
        id: 'clarity' as const,
        name: 'Clarity Commissions',
        description: 'Automated commission tracking and compensation transparency for modern organizations.',
        icon: '⚡',
        tags: ['Automated Processing', 'Compensation Transparency', 'Payroll Efficiency'],
      },
    ],
  },
];

export const FOOTER_PORTALS = [
  { label: 'Clarity Commissions', url: '#' },
  { label: 'WealthWave', url: '#' },
  { label: 'Creative Care', url: '#' },
  { label: 'Impact Payments', url: '#' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ricky',
    name: 'Ricky Ballard',
    role: 'Co-Chief Executive Officer',
    bio: 'Ricky Ballard helps lead Creative Solutions Partners with a focus on strategic growth, partnership development, and long-term vision. He is committed to building solutions that create meaningful impact for businesses, families, and communities.',
    image: '/images/team/ricky-ballard.jpg',
    specialties: ['Leadership', 'Strategy', 'Partnerships']
  },
  {
    id: 'robin',
    name: 'Robin Bundy',
    role: 'Co-Chief Executive Officer',
    bio: 'Robin Bundy plays a key leadership role in shaping the direction of Creative Solutions Partners. With a strong emphasis on collaboration, innovation, and service, Robin helps guide the company\'s mission and future growth.',
    image: '/images/team/robin-bundy.jpg',
    specialties: ['Vision', 'Collaboration', 'Business Growth']
  }
];

export const SERVICES: Record<string, ServiceData> = {
  health: {
    id: 'health',
    title: 'Health Solutions',
    subtitle: 'Creative Care',
    description: 'Reduce healthcare costs while improving employee wellbeing through modern employer health solutions. We optimize the physical and organizational health of your business to ensure your most valuable assets—people—are performing at their peak.',
    icon: HeartPulse,
    color: 'bg-brand-purple',
    textColor: 'text-white',
    features: [
      'Employee Wellness Programs',
      'Corporate Healthcare Strategy',
      'Mental Health & Resilience Training',
      'Healthcare Cost Reduction'
    ],
    cta: 'Explore Health',
    featuredPlatforms: [
      {
        id: 'championhealth',
        title: 'Creative Care',
        description: 'Modern employer health solutions that reduce costs while improving employee wellbeing.',
      }
    ]
  },
  finance: {
    id: 'finance',
    title: 'Finance Solutions',
    subtitle: 'WealthWave & Impact Payments',
    description: 'Modern financial solutions designed to strengthen financial futures through education, literacy programs, and cutting-edge payment infrastructure.',
    icon: Coins,
    color: 'bg-brand-gold',
    textColor: 'text-white',
    features: [
      'Financial Literacy Programs',
      'Wealth-Building Education',
      'Payment Infrastructure',
      'Merchant Services'
    ],
    cta: 'Explore Finance',
    featuredPlatforms: [
      {
        id: 'wealthwave',
        title: 'WealthWave',
        description: 'Financial literacy and wealth-building education for employees and business owners.',
      },
      {
        id: 'creativepayments',
        title: 'Impact Payments',
        description: 'Modern payment infrastructure and merchant services for mission-driven businesses.',
      }
    ]
  },
  tech: {
    id: 'tech',
    title: 'Technology Solutions',
    subtitle: 'Creative Web & Clarity Commissions',
    description: 'Future-proof your operations with enterprise-grade technology solutions. Professional websites, branding, digital growth systems, and automated commission tracking built for modern businesses.',
    icon: Cpu,
    color: 'bg-brand-dark',
    textColor: 'text-white',
    features: [
      'Web Development & Design',
      'Branding & Digital Growth',
      'Automated Commission Tracking',
      'Digital Infrastructure'
    ],
    cta: 'Explore Tech',
    featuredPlatforms: [
      {
        id: 'bizboost',
        title: 'Creative Web',
        description: 'Professional websites, branding, and digital growth systems built for modern businesses.',
      },
      {
        id: 'clarity',
        title: 'Clarity Commissions',
        description: 'Automated commission tracking and compensation transparency for modern organizations.',
      }
    ]
  }
};

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
