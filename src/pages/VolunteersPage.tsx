
import { useState } from "react";
import VolunteerCard from "@/components/VolunteerCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skill } from "@/types";
import { useApp } from "@/contexts/AppContext";
import { regionsData } from "@/data/mockData";

const VolunteersPage = () => {
  const { users } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<Skill | "">("");
  const [regionFilter, setRegionFilter] = useState("");

  const volunteers = users.filter(user => !user.isOrganizer);

  const filteredVolunteers = volunteers.filter(volunteer => {
    // Filter by search term
    const matchesSearch = !searchTerm || 
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by skill
    const matchesSkill = !skillFilter || volunteer.skills.includes(skillFilter as Skill);
    
    // Filter by region
    const matchesRegion = !regionFilter || volunteer.region === regionFilter;
    
    return matchesSearch && matchesSkill && matchesRegion;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Volunteers</h1>
        <p className="text-gray-600">
          Meet the skilled volunteers who make our community stronger.
        </p>
      </div>

      <div className="mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Input
            type="text"
            placeholder="Search volunteers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <Select value={skillFilter} onValueChange={(value) => setSkillFilter(value as Skill | "")}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All skills</SelectItem>
              <SelectItem value="dance">Dancing</SelectItem>
              <SelectItem value="teach">Teaching</SelectItem>
              <SelectItem value="clean">Cleaning</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="cook">Cooking</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All regions</SelectItem>
              {regionsData.map(region => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredVolunteers.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No volunteers found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteersPage;
