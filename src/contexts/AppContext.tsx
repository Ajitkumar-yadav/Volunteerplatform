
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Event, Skill, User } from '../types';
import { mockEvents, mockUsers } from '../data/mockData';
import { toast } from '@/components/ui/sonner';

interface AppContextProps {
  currentUser: User | null;
  users: User[];
  events: Event[];
  filteredEvents: Event[];
  login: (email: string) => void;
  logout: () => void;
  registerUser: (user: Omit<User, 'id'>) => void;
  createEvent: (event: Omit<Event, 'id' | 'matchedVolunteers' | 'organizer'>) => void;
  matchVolunteerToEvent: (eventId: string, userId: string) => void;
  filterEventsBySkill: (skill: Skill | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<Skill | null>(null);

  const login = (email: string) => {
    const user = users.find(user => user.email === email);
    if (user) {
      setCurrentUser(user);
      toast.success(`Welcome back, ${user.name}!`);
    } else {
      toast.error('User not found');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info('You have been logged out.');
  };

  const registerUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: (users.length + 1).toString(),
      isOrganizer: false
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    toast.success('Account created successfully!');
  };

  const createEvent = (eventData: Omit<Event, 'id' | 'matchedVolunteers' | 'organizer'>) => {
    if (!currentUser) {
      toast.error('You must be logged in to create an event');
      return;
    }

    const newEvent: Event = {
      ...eventData,
      id: (events.length + 1).toString(),
      organizer: currentUser,
      matchedVolunteers: [],
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    toast.success('Event created successfully!');

    // Auto-match volunteers
    const matchedVolunteers = findMatchingVolunteers(newEvent);
    if (matchedVolunteers.length > 0) {
      for (const volunteer of matchedVolunteers) {
        matchVolunteerToEvent(newEvent.id, volunteer.id);
      }
    }
  };

  const matchVolunteerToEvent = (eventId: string, userId: string) => {
    const event = events.find(e => e.id === eventId);
    const volunteer = users.find(u => u.id === userId);
    
    if (!event || !volunteer) {
      toast.error('Event or volunteer not found');
      return;
    }

    if (event.matchedVolunteers.length >= event.maxVolunteers) {
      toast.error('This event already has the maximum number of volunteers');
      return;
    }

    if (event.matchedVolunteers.some(v => v.id === userId)) {
      toast.error('This volunteer is already matched to this event');
      return;
    }

    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          matchedVolunteers: [...e.matchedVolunteers, volunteer]
        };
      }
      return e;
    });

    setEvents(updatedEvents);
    setFilteredEvents(
      selectedSkillFilter 
        ? updatedEvents.filter(event => event.requiredSkills.includes(selectedSkillFilter))
        : updatedEvents
    );
    toast.success(`${volunteer.name} has been matched to ${event.title}!`);
  };

  const findMatchingVolunteers = (event: Event): User[] => {
    return users.filter(user => 
      user.region === event.region && 
      user.skills.some(skill => event.requiredSkills.includes(skill)) &&
      !user.isOrganizer
    );
  };

  const filterEventsBySkill = (skill: Skill | null) => {
    setSelectedSkillFilter(skill);
    if (skill) {
      setFilteredEvents(events.filter(event => event.requiredSkills.includes(skill)));
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      events,
      filteredEvents,
      login,
      logout,
      registerUser,
      createEvent,
      matchVolunteerToEvent,
      filterEventsBySkill
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
