
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, MapPinIcon, ArrowLeftIcon } from "lucide-react";
import SkillBadge from "@/components/SkillBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useApp } from "@/contexts/AppContext";
import { regionsData } from "@/data/mockData";

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events, currentUser, matchVolunteerToEvent } = useApp();
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/events')}>
          Back to Events
        </Button>
      </div>
    );
  }
  
  const region = regionsData.find(r => r.id === event.region);
  const isUserMatched = currentUser && event.matchedVolunteers.some(v => v.id === currentUser.id);
  const isFull = event.matchedVolunteers.length >= event.maxVolunteers;

  const handleJoinEvent = () => {
    if (currentUser) {
      matchVolunteerToEvent(event.id, currentUser.id);
    } else {
      navigate('/login');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/events')}
        className="mb-6 gap-2"
      >
        <ArrowLeftIcon size={16} />
        Back to Events
      </Button>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {event.requiredSkills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center gap-3 py-4">
                <CalendarIcon className="text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{event.date}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-3 py-4">
                <ClockIcon className="text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-3 py-4">
                <MapPinIcon className="text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>
            <p className="mb-4">
              <span className="font-medium">Address:</span> {event.location}, {region?.name || event.region}
            </p>
            {/* Here you could add a map component if desired */}
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
              <MapPinIcon size={32} className="text-primary" />
              <span className="ml-2">Map would be displayed here</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Join This Event</h2>
            <p className="mb-6">
              {event.matchedVolunteers.length} out of {event.maxVolunteers} volunteer spots filled
            </p>
            
            {currentUser && !currentUser.isOrganizer && (
              <Button 
                className="w-full mb-4" 
                disabled={isUserMatched || isFull}
                onClick={handleJoinEvent}
              >
                {isUserMatched ? 'You\'ve Joined' : isFull ? 'Event Full' : 'Join Now'}
              </Button>
            )}
            
            {!currentUser && (
              <div className="space-y-4">
                <Button className="w-full" onClick={handleJoinEvent}>
                  Join Now
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  You'll need to log in or create an account
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Organized by</h2>
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={event.organizer.profilePicture} />
                <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{event.organizer.name}</p>
                <p className="text-sm text-gray-600">Event Organizer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Volunteers</h2>
            {event.matchedVolunteers.length === 0 ? (
              <p className="text-gray-600">No volunteers have joined yet.</p>
            ) : (
              <div className="space-y-3">
                {event.matchedVolunteers.map(volunteer => (
                  <div key={volunteer.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={volunteer.profilePicture} />
                      <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Link 
                      to={`/volunteers/${volunteer.id}`}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {volunteer.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
