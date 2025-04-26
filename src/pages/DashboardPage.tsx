
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import EventCard from "@/components/EventCard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Skill } from "@/types";
import { regionsData } from "@/data/mockData";

const DashboardPage = () => {
  const { currentUser, events, createEvent } = useApp();
  
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<Skill[]>([]);
  const [maxVolunteers, setMaxVolunteers] = useState("5");

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleSkillToggle = (skill: Skill) => {
    setRequiredSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (requiredSkills.length === 0) {
      alert("Please select at least one required skill");
      return;
    }

    createEvent({
      title,
      description,
      date,
      time,
      location,
      region,
      requiredSkills,
      maxVolunteers: parseInt(maxVolunteers),
      isActive: true,
    });
    
    setIsCreateEventOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setRegion("");
    setRequiredSkills([]);
    setMaxVolunteers("5");
  };

  // Filter events relevant to the current user
  const userEvents = currentUser.isOrganizer
    ? events.filter(event => event.organizer.id === currentUser.id)
    : events.filter(event => event.matchedVolunteers.some(volunteer => volunteer.id === currentUser.id));

  const upcomingEvents = userEvents.filter(event => new Date(event.date) >= new Date());
  
  const matchedEvents = currentUser.isOrganizer
    ? []
    : events.filter(event => 
        !event.matchedVolunteers.some(volunteer => volunteer.id === currentUser.id) &&
        event.requiredSkills.some(skill => currentUser.skills.includes(skill)) &&
        event.region === currentUser.region
      );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        
        {currentUser.isOrganizer && (
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusIcon size={18} />
                <span>Create Event</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
              <form onSubmit={handleCreateEvent}>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Fill out the details to create a new volunteer event
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="Community Cleanup"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      placeholder="Describe your event and what volunteers will be doing"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        value={time} 
                        onChange={e => setTime(e.target.value)} 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={location} 
                      onChange={e => setLocation(e.target.value)} 
                      placeholder="Community Center"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select required value={region} onValueChange={setRegion}>
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regionsData.map(region => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Required Skills</Label>
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="skill-dance" 
                          checked={requiredSkills.includes('dance')}
                          onCheckedChange={() => handleSkillToggle('dance')}
                        />
                        <label htmlFor="skill-dance" className="text-sm font-medium">
                          Dancing
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="skill-teach" 
                          checked={requiredSkills.includes('teach')}
                          onCheckedChange={() => handleSkillToggle('teach')}
                        />
                        <label htmlFor="skill-teach" className="text-sm font-medium">
                          Teaching
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="skill-clean" 
                          checked={requiredSkills.includes('clean')}
                          onCheckedChange={() => handleSkillToggle('clean')}
                        />
                        <label htmlFor="skill-clean" className="text-sm font-medium">
                          Cleaning
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="skill-sports" 
                          checked={requiredSkills.includes('sports')}
                          onCheckedChange={() => handleSkillToggle('sports')}
                        />
                        <label htmlFor="skill-sports" className="text-sm font-medium">
                          Sports
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="skill-cook" 
                          checked={requiredSkills.includes('cook')}
                          onCheckedChange={() => handleSkillToggle('cook')}
                        />
                        <label htmlFor="skill-cook" className="text-sm font-medium">
                          Cooking
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxVolunteers">Maximum Volunteers</Label>
                    <Input 
                      id="maxVolunteers" 
                      type="number"
                      min="1"
                      max="100"
                      value={maxVolunteers} 
                      onChange={e => setMaxVolunteers(e.target.value)} 
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Event</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          {!currentUser.isOrganizer && (
            <TabsTrigger value="recommended">Recommended Events</TabsTrigger>
          )}
          <TabsTrigger value="profile">Your Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CalendarIcon className="text-primary" />
              Your Upcoming Events
            </h2>
            
            {upcomingEvents.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-2">No upcoming events</h3>
                    <p className="text-gray-600 mb-4">
                      {currentUser.isOrganizer 
                        ? "You haven't created any events yet." 
                        : "You haven't joined any events yet."}
                    </p>
                    {currentUser.isOrganizer ? (
                      <Button onClick={() => setIsCreateEventOpen(true)}>Create an Event</Button>
                    ) : (
                      <Link to="/events">
                        <Button>Browse Events</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} showJoin={false} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        {!currentUser.isOrganizer && (
          <TabsContent value="recommended">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recommended Events For You</h2>
              
              {matchedEvents.length === 0 ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-2">No recommended events</h3>
                      <p className="text-gray-600 mb-4">
                        We couldn't find any events that match your skills in your region.
                      </p>
                      <Link to="/events">
                        <Button>Browse All Events</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="profile">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Your volunteer information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img 
                        src={currentUser.profilePicture || `https://i.pravatar.cc/150?img=${currentUser.id}`} 
                        alt={currentUser.name}
                        className="rounded-full w-24 h-24 object-cover"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Name</h3>
                    <p className="text-gray-600">{currentUser.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">{currentUser.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Role</h3>
                    <p className="text-gray-600">{currentUser.isOrganizer ? 'Event Organizer' : 'Volunteer'}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Region</h3>
                    <p className="text-gray-600">
                      {regionsData.find(r => r.id === currentUser.region)?.name || currentUser.region}
                    </p>
                  </div>
                  
                  {!currentUser.isOrganizer && (
                    <div>
                      <h3 className="font-semibold">Skills</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentUser.skills.map((skill) => (
                          <span key={skill} className={`skill-badge skill-${skill}`}>
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentUser.bio && (
                    <div>
                      <h3 className="font-semibold">Bio</h3>
                      <p className="text-gray-600">{currentUser.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Stats</CardTitle>
                  <CardDescription>Your activity on VolunteerConnect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <p className="text-4xl font-bold text-primary">{userEvents.length}</p>
                      <p className="text-sm text-gray-600">
                        {currentUser.isOrganizer ? 'Events Created' : 'Events Joined'}
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <p className="text-4xl font-bold text-primary">
                        {currentUser.skills ? currentUser.skills.length : 0}
                      </p>
                      <p className="text-sm text-gray-600">Skills</p>
                    </div>
                    
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <p className="text-4xl font-bold text-primary">
                        {currentUser.isOrganizer 
                          ? events.filter(e => e.organizer.id === currentUser.id).reduce(
                              (total, event) => total + event.matchedVolunteers.length, 0
                            )
                          : '0'
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentUser.isOrganizer ? 'Total Volunteers' : 'Completed Events'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to={currentUser.isOrganizer ? "/events" : "/profile"}>
                      <Button variant="outline" className="w-full">
                        {currentUser.isOrganizer ? 'Manage Events' : 'Edit Profile'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
