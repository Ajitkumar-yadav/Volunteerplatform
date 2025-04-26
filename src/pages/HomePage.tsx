
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRightIcon, UsersIcon, CalendarIcon } from "lucide-react";
import EventCard from "@/components/EventCard";
import VolunteerCard from "@/components/VolunteerCard";
import { mockEvents, mockUsers } from "@/data/mockData";

const HomePage = () => {
  const featuredEvents = mockEvents.slice(0, 3);
  const featuredVolunteers = mockUsers.filter(user => !user.isOrganizer).slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/20 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Connect <span className="text-primary">Volunteers</span> with Events
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Match skilled volunteers with events that need their expertise. Make a difference in your community through teaching, dancing, cooking, sports, and cleaning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Become a Volunteer
                  </Button>
                </Link>
                <Link to="/events">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" 
                alt="Volunteers collaborating" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <CalendarIcon className="text-primary" />
              Featured Events
            </h2>
            <Link to="/events" className="text-primary flex items-center hover:underline">
              View all events
              <ChevronRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Volunteers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <UsersIcon className="text-primary" />
              Featured Volunteers
            </h2>
            <Link to="/volunteers" className="text-primary flex items-center hover:underline">
              View all volunteers
              <ChevronRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVolunteers.map(volunteer => (
              <VolunteerCard key={volunteer.id} volunteer={volunteer} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <UsersIcon size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Register Your Skills</h3>
              <p className="text-gray-600">Create an account and let us know your volunteer skills and availability.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <CalendarIcon size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Events</h3>
              <p className="text-gray-600">Browse events in your region that need your specific skills.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <ChevronRightIcon size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Matched</h3>
              <p className="text-gray-600">We'll match you with events that need your skills in your area.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
