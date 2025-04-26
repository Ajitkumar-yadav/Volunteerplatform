
import { useState } from "react";
import EventCard from "@/components/EventCard";
import SkillFilter from "@/components/SkillFilter";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";

const EventsPage = () => {
  const { filteredEvents } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBySearch = searchTerm 
    ? filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredEvents;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Events</h1>
        <p className="text-gray-600">
          Find volunteer opportunities that match your skills and availability.
        </p>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search events by title, description, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-lg"
        />
      </div>

      <SkillFilter />

      {filteredBySearch.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No events found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBySearch.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
