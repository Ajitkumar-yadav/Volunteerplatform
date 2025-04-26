
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";
import { Skill } from "@/types";
import { regionsData } from "@/data/mockData";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useApp();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [bio, setBio] = useState("");

  const handleSkillToggle = (skill: Skill) => {
    setSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (skills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    registerUser({
      name,
      email,
      skills,
      region,
      bio,
      profilePicture: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Join VolunteerConnect to start making a difference
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select required value={region} onValueChange={setRegion}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent>
                  {regionsData.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="skill-dance" 
                    checked={skills.includes('dance')}
                    onCheckedChange={() => handleSkillToggle('dance')}
                  />
                  <label htmlFor="skill-dance" className="text-sm font-medium">
                    Dancing
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="skill-teach" 
                    checked={skills.includes('teach')}
                    onCheckedChange={() => handleSkillToggle('teach')}
                  />
                  <label htmlFor="skill-teach" className="text-sm font-medium">
                    Teaching
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="skill-clean" 
                    checked={skills.includes('clean')}
                    onCheckedChange={() => handleSkillToggle('clean')}
                  />
                  <label htmlFor="skill-clean" className="text-sm font-medium">
                    Cleaning
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="skill-sports" 
                    checked={skills.includes('sports')}
                    onCheckedChange={() => handleSkillToggle('sports')}
                  />
                  <label htmlFor="skill-sports" className="text-sm font-medium">
                    Sports
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="skill-cook" 
                    checked={skills.includes('cook')}
                    onCheckedChange={() => handleSkillToggle('cook')}
                  />
                  <label htmlFor="skill-cook" className="text-sm font-medium">
                    Cooking
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                placeholder="Tell us about your experience..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">Register</Button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
