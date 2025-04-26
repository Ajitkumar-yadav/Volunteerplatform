
export type Skill = 'dance' | 'teach' | 'clean' | 'sports' | 'cook';

export interface SkillDetail {
  id: Skill;
  name: string;
  icon: string;
  color: string;
}

export interface Region {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  skills: Skill[];
  region: string;
  profilePicture?: string;
  bio?: string;
  isOrganizer?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  region: string;
  organizer: User;
  requiredSkills: Skill[];
  matchedVolunteers: User[];
  maxVolunteers: number;
  isActive: boolean;
}
