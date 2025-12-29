export interface ResumeContact {
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ResumeBullet {
  text: string;
  subBullets?: ResumeBullet[];
}

export interface ResumeExperience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string; // "Present" for current role
  highlights?: ResumeBullet[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location?: string;
  graduationDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface ResumeSkill {
  category: string;
  items: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ResumeAward {
  title: string;
  issuer: string;
  date?: string;
  description?: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
  date?: string;
}

export interface ResumeSection {
  type: 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'awards' | 'projects' | 'custom';
  title?: string;
  content?: string | unknown; // For custom sections
}

export interface ResumeAST {
  header: {
    name: string;
    title?: string;
    contact: ResumeContact;
  };
  summary?: string;
  experience?: ResumeExperience[];
  education?: ResumeEducation[];
  skills?: ResumeSkill[];
  certifications?: ResumeCertification[];
  awards?: ResumeAward[];
  projects?: ResumeProject[];
  custom?: Array<{
    title: string;
    content: string;
  }>;
}
