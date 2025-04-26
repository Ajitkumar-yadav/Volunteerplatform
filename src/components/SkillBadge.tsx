
import { Music, GraduationCap, Trash2, Dumbbell, Utensils } from "lucide-react";
import { Skill } from "@/types";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
  showIcon?: boolean;
}

const SkillBadge = ({ skill, className, showIcon = true }: SkillBadgeProps) => {
  const getSkillInfo = (skillType: Skill) => {
    switch (skillType) {
      case 'dance':
        return { 
          name: 'Dancing', 
          icon: <Music size={16} />, 
          className: 'skill-dance' 
        };
      case 'teach':
        return { 
          name: 'Teaching', 
          icon: <GraduationCap size={16} />, 
          className: 'skill-teach' 
        };
      case 'clean':
        return { 
          name: 'Cleaning', 
          icon: <Trash2 size={16} />, 
          className: 'skill-clean' 
        };
      case 'sports':
        return { 
          name: 'Sports', 
          icon: <Dumbbell size={16} />, 
          className: 'skill-sports' 
        };
      case 'cook':
        return { 
          name: 'Cooking', 
          icon: <Utensils size={16} />, 
          className: 'skill-cook' 
        };
    }
  };

  const skillInfo = getSkillInfo(skill);

  return (
    <span className={cn('skill-badge flex items-center gap-1', skillInfo.className, className)}>
      {showIcon && skillInfo.icon}
      <span>{skillInfo.name}</span>
    </span>
  );
};

export default SkillBadge;
