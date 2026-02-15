
import { LucideIcon } from 'lucide-react';

export type PageName = 'home' | 'health' | 'wealth' | 'tech' | 'about' | 'blog' | 'clarity' | 'wealthwave' | 'championhealth' | 'bizboost';

export interface NavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  children?: { id: PageName; label: string; icon?: LucideIcon }[];
  action?: () => void;
}

export interface ServiceData {
  id: PageName;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  features: string[];
  cta: string;
  featuredPlatforms?: {
    id: PageName;
    title: string;
    description: string;
    image?: string;
  }[];
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}
