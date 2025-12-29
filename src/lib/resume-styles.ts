export type ResumeStyle = 'classic' | 'modern' | 'minimal' | 'professional' | 'creative';

export interface StyleConfig {
  container: React.CSSProperties;
  header: React.CSSProperties;
  name: React.CSSProperties;
  title: React.CSSProperties;
  contactInfo: React.CSSProperties;
  section: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  jobEntry: React.CSSProperties;
  jobHeader: React.CSSProperties;
  jobTitle: React.CSSProperties;
  jobCompany: React.CSSProperties;
  jobMeta: React.CSSProperties;
  jobLocation: React.CSSProperties;
  bullets: React.CSSProperties;
  bulletItem: React.CSSProperties;
  skillGroup: React.CSSProperties;
  skillCategory: React.CSSProperties;
  certItem: React.CSSProperties;
  projectEntry: React.CSSProperties;
  projectHeader: React.CSSProperties;
  projectName: React.CSSProperties;
  projectDate: React.CSSProperties;
  projectDescription: React.CSSProperties;
  projectTech: React.CSSProperties;
  educationEntry: React.CSSProperties;
  educationHeader: React.CSSProperties;
  degree: React.CSSProperties;
  institution: React.CSSProperties;
}

const baseStyles: StyleConfig = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '40px',
    fontFamily: 'Georgia, serif',
    lineHeight: '1.6',
  },
  header: {
    borderBottom: '2px solid #000000',
    paddingBottom: '16px',
    marginBottom: '24px',
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
  },
  title: {
    fontSize: '16px',
    color: '#555555',
    margin: '0 0 12px 0',
  },
  contactInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    fontSize: '13px',
    color: '#666666',
    margin: '8px 0 0 0',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    borderBottom: '1px solid #cccccc',
    paddingBottom: '8px',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  jobEntry: {
    marginBottom: '16px',
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px',
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: 0,
  },
  jobCompany: {
    color: '#555555',
    fontSize: '13px',
    margin: '4px 0 0 0',
  },
  jobMeta: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#666666',
  },
  jobLocation: {
    fontSize: '12px',
    color: '#666666',
    marginBottom: '8px',
  },
  bullets: {
    marginLeft: '20px',
    marginTop: '8px',
    marginBottom: 0,
    paddingLeft: 0,
  },
  bulletItem: {
    marginBottom: '4px',
    fontSize: '13px',
    color: '#333333',
  },
  skillGroup: {
    marginBottom: '8px',
    fontSize: '13px',
  },
  skillCategory: {
    fontWeight: 'bold',
  },
  certItem: {
    marginBottom: '6px',
    fontSize: '13px',
  },
  projectEntry: {
    marginBottom: '16px',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: '13px',
  },
  projectDate: {
    fontSize: '12px',
    color: '#666666',
  },
  projectDescription: {
    fontSize: '13px',
    color: '#333333',
    marginBottom: '4px',
  },
  projectTech: {
    fontSize: '12px',
    color: '#666666',
  },
  educationEntry: {
    marginBottom: '16px',
  },
  educationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px',
  },
  degree: {
    fontWeight: 'bold',
    fontSize: '13px',
  },
  institution: {
    color: '#555555',
    fontSize: '13px',
    margin: '4px 0 0 0',
  },
};

export const classicStyle: StyleConfig = {
  ...baseStyles,
};

export const modernStyle: StyleConfig = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    ...baseStyles.header,
    borderBottom: '3px solid #2c3e50',
    paddingBottom: '20px',
  },
  name: {
    ...baseStyles.name,
    fontSize: '36px',
    color: '#2c3e50',
  },
  title: {
    ...baseStyles.title,
    fontSize: '18px',
    color: '#3498db',
    fontWeight: '600',
  },
  sectionTitle: {
    ...baseStyles.sectionTitle,
    fontSize: '15px',
    color: '#2c3e50',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
  },
};

export const minimalStyle: StyleConfig = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    padding: '32px',
  },
  header: {
    ...baseStyles.header,
    borderBottom: '1px solid #dddddd',
    paddingBottom: '12px',
    marginBottom: '20px',
  },
  name: {
    ...baseStyles.name,
    fontSize: '28px',
  },
  sectionTitle: {
    ...baseStyles.sectionTitle,
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    borderBottom: '1px solid #eeeeee',
    paddingBottom: '6px',
    marginBottom: '10px',
  },
  jobTitle: {
    ...baseStyles.jobTitle,
    fontSize: '13px',
  },
  jobCompany: {
    ...baseStyles.jobCompany,
    fontSize: '12px',
  },
};

export const professionalStyle: StyleConfig = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    fontFamily: 'Cambria, serif',
    padding: '48px',
  },
  header: {
    ...baseStyles.header,
    borderBottom: '3px double #1a1a1a',
    paddingBottom: '20px',
  },
  name: {
    ...baseStyles.name,
    fontSize: '34px',
    letterSpacing: '0.5px',
  },
  sectionTitle: {
    ...baseStyles.sectionTitle,
    fontSize: '14px',
    letterSpacing: '1px',
    borderBottom: '2px solid #333333',
  },
  jobTitle: {
    ...baseStyles.jobTitle,
    fontSize: '14px',
    fontWeight: '600',
  },
};

export const creativeStyle: StyleConfig = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    fontFamily: 'Trebuchet MS, sans-serif',
    backgroundColor: '#fafafa',
    borderTop: '4px solid #e74c3c',
  },
  header: {
    ...baseStyles.header,
    borderBottom: '2px solid #e74c3c',
  },
  name: {
    ...baseStyles.name,
    fontSize: '36px',
    color: '#e74c3c',
  },
  title: {
    ...baseStyles.title,
    color: '#e74c3c',
    fontSize: '16px',
    fontWeight: '600',
  },
  sectionTitle: {
    ...baseStyles.sectionTitle,
    fontSize: '14px',
    color: '#e74c3c',
    borderBottom: '2px solid #e74c3c',
    textTransform: 'capitalize',
  },
};

export const resumeStyles: Record<ResumeStyle, StyleConfig> = {
  classic: classicStyle,
  modern: modernStyle,
  minimal: minimalStyle,
  professional: professionalStyle,
  creative: creativeStyle,
};

export function getResumeStyles(style: ResumeStyle): StyleConfig {
  return resumeStyles[style] || classicStyle;
}
