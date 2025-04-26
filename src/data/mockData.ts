import { Event, Region, Skill, SkillDetail, User } from '../types';
import { Music, GraduationCap, Trash2, Dumbbell, Utensils } from 'lucide-react';

export const skillsData: Record<Skill, SkillDetail> = {
  dance: {
    id: 'dance',
    name: 'Dancing',
    icon: 'Music',
    color: '#D6BCFA'
  },
  teach: {
    id: 'teach',
    name: 'Teaching',
    icon: 'GraduationCap',
    color: '#93C5FD'
  },
  clean: {
    id: 'clean',
    name: 'Cleaning',
    icon: 'Trash2',
    color: '#86EFAC'
  },
  sports: {
    id: 'sports',
    name: 'Sports',
    icon: 'Dumbbell',
    color: '#FCA5A5'
  },
  cook: {
    id: 'cook',
    name: 'Cooking',
    icon: 'Utensils',
    color: '#FDE68A'
  }
};

export const regionsData: Region[] = [
  { id: 'north', name: 'North Region' },
  { id: 'south', name: 'South Region' },
  { id: 'east', name: 'East Region' },
  { id: 'west', name: 'West Region' },
  { id: 'central', name: 'Central Region' },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    skills: ['dance', 'teach'],
    region: 'north',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    bio: 'Professional dancer with 5 years of teaching experience.',
    isOrganizer: false
  },
  {
    id: '2',
    name: 'Sam Brown',
    email: 'sam@example.com',
    skills: ['clean', 'cook'],
    region: 'south',
    profilePicture: 'https://i.pravatar.cc/150?img=2',
    bio: 'Passionate about community service and cooking for large groups.',
    isOrganizer: false
  },
  {
    id: '3',
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    skills: ['sports', 'teach'],
    region: 'east',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    bio: 'Sports coach with experience teaching all ages.',
    isOrganizer: false
  },
  {
    id: '4',
    name: 'Taylor Williams',
    email: 'taylor@example.com',
    skills: ['dance', 'sports'],
    region: 'west',
    profilePicture: 'https://i.pravatar.cc/150?img=4',
    bio: 'Former professional athlete now focused on community outreach.',
    isOrganizer: false
  },
  {
    id: '5',
    name: 'Casey Martinez',
    email: 'casey@example.com',
    skills: ['clean', 'cook'],
    region: 'central',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    bio: 'Experienced in organizing and cleaning for large events.',
    isOrganizer: true
  },
  {
    id: '6',
    name: 'Riley Cooper',
    email: 'riley@example.com',
    skills: ['teach', 'sports'],
    region: 'north',
    profilePicture: 'https://i.pravatar.cc/150?img=6',
    bio: 'Physical education teacher with coaching experience.',
    isOrganizer: true
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Community Dance Workshop',
    description: 'Teach basic dance moves to community members of all ages.',
    date: '2025-05-15',
    time: '14:00',
    location: 'Community Center',
    region: 'north',
    organizer: mockUsers[5],
    requiredSkills: ['dance', 'teach'],
    matchedVolunteers: [mockUsers[0]],
    maxVolunteers: 3,
    isActive: true
  },
  {
    id: '2',
    title: 'Park Cleanup Day',
    description: 'Help clean and maintain our local park.',
    date: '2025-05-22',
    time: '09:00',
    location: 'Central Park',
    region: 'central',
    organizer: mockUsers[4],
    requiredSkills: ['clean'],
    matchedVolunteers: [mockUsers[1]],
    maxVolunteers: 10,
    isActive: true
  },
  {
    id: '3',
    title: 'Youth Sports Clinic',
    description: 'Introduce kids to various sports and teach basic skills.',
    date: '2025-06-05',
    time: '10:00',
    location: 'Sports Complex',
    region: 'east',
    organizer: mockUsers[5],
    requiredSkills: ['sports', 'teach'],
    matchedVolunteers: [mockUsers[2], mockUsers[3]],
    maxVolunteers: 5,
    isActive: true
  },
  {
    id: '4',
    title: 'Community Kitchen',
    description: 'Help prepare meals for homeless shelter residents.',
    date: '2025-05-18',
    time: '16:00',
    location: 'Downtown Shelter',
    region: 'south',
    organizer: mockUsers[4],
    requiredSkills: ['cook'],
    matchedVolunteers: [mockUsers[1]],
    maxVolunteers: 6,
    isActive: true
  }
];
