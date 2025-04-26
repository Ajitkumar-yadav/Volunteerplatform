
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CalendarIcon, UserIcon } from "lucide-react";

const Header = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-primary">
            VolunteerConnect
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-primary transition-colors">
            Events
          </Link>
          <Link to="/volunteers" className="text-gray-700 hover:text-primary transition-colors">
            Volunteers
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-primary">
                <Button variant="outline" className="flex items-center gap-2">
                  <UserIcon size={18} />
                  <span className="hidden sm:inline">{currentUser.name}</span>
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
