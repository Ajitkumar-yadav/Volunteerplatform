
import { Button } from "@/components/ui/button";
import { Music, GraduationCap, Trash2, Dumbbell, Utensils } from "lucide-react";
import { Skill } from "@/types";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

const SkillFilter = () => {
  const { filterEventsBySkill } = useApp();
  
  const skills: { id: Skill; label: string; icon: React.ReactNode; className: string }[] = [
    { id: 'dance', label: 'Dancing', icon: <Music size={20} />, className: 'bg-skill-dance text-purple-800' },
    { id: 'teach', label: 'Teaching', icon: <GraduationCap size={20} />, className: 'bg-skill-teach text-blue-800' },
    { id: 'clean', label: 'Cleaning', icon: <Trash2 size={20} />, className: 'bg-skill-clean text-green-800' },
    { id: 'sports', label: 'Sports', icon: <Dumbbell size={20} />, className: 'bg-skill-sports text-red-800' },
    { id: 'cook', label: 'Cooking', icon: <Utensils size={20} />, className: 'bg-skill-cook text-yellow-800' }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
      <Button 
        variant="outline" 
        onClick={() => filterEventsBySkill(null)}
        className="rounded-full px-4"
      >
        All
      </Button>
      
      {skills.map((skill) => (
        <Button
          key={skill.id}
          variant="outline"
          onClick={() => filterEventsBySkill(skill.id)}
          className={cn("rounded-full px-4 flex items-center gap-2", 
            skill.className ? `hover:${skill.className} focus:${skill.className}` : ''
          )}
        >
          {skill.icon}
          {skill.label}
        </Button>
      ))}
    </div>
  );
};

export default SkillFilter;
