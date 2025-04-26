
import { Link } from "react-router-dom";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SkillBadge from "@/components/SkillBadge";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

interface EventCardProps {
  event: Event;
  showJoin?: boolean;
}

const EventCard = ({ event, showJoin = true }: EventCardProps) => {
  const { currentUser, matchVolunteerToEvent } = useApp();

  const isUserMatched = currentUser && event.matchedVolunteers.some(v => v.id === currentUser.id);
  const isFull = event.matchedVolunteers.length >= event.maxVolunteers;
  
  const handleJoinEvent = () => {
    if (currentUser) {
      matchVolunteerToEvent(event.id, currentUser.id);
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">
          <Link to={`/events/${event.id}`} className="hover:text-primary transition-colors">
            {event.title}
          </Link>
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {event.requiredSkills.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} className="text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon size={16} className="text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon size={16} className="text-primary" />
            <span>{event.location}, {event.region}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span>{event.matchedVolunteers.length}/{event.maxVolunteers} volunteers</span>
        </div>
        {showJoin && currentUser && !currentUser.isOrganizer && (
          <Button 
            onClick={handleJoinEvent}
            disabled={isUserMatched || isFull}
            size="sm"
          >
            {isUserMatched ? 'Joined' : isFull ? 'Full' : 'Join'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
