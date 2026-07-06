import profileJson from './profile.json';
import careerJson from './career.json';
import skillsJson from './skills.json';
import projectsJson from './projects.json';
import contactJson from './contact.json';
import type { ProfileData, CareerData, SkillsData, ProjectsData, ContactData } from '@/types/portfolio';

export const profile = profileJson as ProfileData;
export const career = careerJson as CareerData;
export const skills = skillsJson as SkillsData;
export const projects = projectsJson as ProjectsData;
export const contact = contactJson as ContactData;
