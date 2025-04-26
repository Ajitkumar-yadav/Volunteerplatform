
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkillBadge from "@/components/SkillBadge";
import { MapPinIcon } from "lucide-react";
import { User } from "@/types";
import { regionsData } from "@/data/mockData";

interface VolunteerCardProps {
  volunteer: User;
}

const VolunteerCard = ({ volunteer }: VolunteerCardProps) => {
  const region = regionsData.find(r => r.id === volunteer.region);
  
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-0 pt-6 flex flex-col items-center text-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={volunteer.profilePicture} />
          <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Link 
          to={`/volunteers/${volunteer.id}`} 
          className="text-xl font-medium mt-4 hover:text-primary transition-colors"
        >
          {volunteer.name}
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <MapPinIcon size={16} />
          <span>{region?.name || volunteer.region}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-6 pt-4">
        <p className="text-gray-600 mb-4 text-center text-sm line-clamp-2">{volunteer.bio}</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {volunteer.skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VolunteerCard;
