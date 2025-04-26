
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary/10 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-primary mb-3">VolunteerConnect</h3>
            <p className="text-gray-600 max-w-md">
              Connecting volunteers with skills to events that need them. Make a difference in your community today.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
                <li><Link to="/events" className="text-gray-600 hover:text-primary">Events</Link></li>
                <li><Link to="/volunteers" className="text-gray-600 hover:text-primary">Volunteers</Link></li>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
              <ul className="space-y-2">
                <li><Link to="/events?skill=dance" className="text-gray-600 hover:text-primary">Dancing</Link></li>
                <li><Link to="/events?skill=teach" className="text-gray-600 hover:text-primary">Teaching</Link></li>
                <li><Link to="/events?skill=clean" className="text-gray-600 hover:text-primary">Cleaning</Link></li>
                <li><Link to="/events?skill=sports" className="text-gray-600 hover:text-primary">Sports</Link></li>
                <li><Link to="/events?skill=cook" className="text-gray-600 hover:text-primary">Cooking</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">About</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-gray-600 text-center">
            &copy; {new Date().getFullYear()} VolunteerConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
