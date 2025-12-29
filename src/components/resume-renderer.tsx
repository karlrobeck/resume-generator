import type { ResumeAST } from '@/types/resume';
import { type ResumeStyle, getResumeStyles } from '@/lib/resume-styles';

interface ResumeRendererProps {
  resume: ResumeAST;
  style?: ResumeStyle;
}

export function ResumeRenderer({ resume, style = 'classic' }: ResumeRendererProps) {
  const customStyles = getResumeStyles(style);
  return (
    <div style={customStyles.container}>
      {/* Header */}
      <div style={customStyles.header}>
        <h1 style={customStyles.name}>{resume.header.name}</h1>
        {resume.header.title && (
          <p style={customStyles.title}>{resume.header.title}</p>
        )}

        {/* Contact Info */}
        <div style={customStyles.contactInfo}>
          {resume.header.contact.email && (
            <span>{resume.header.contact.email}</span>
          )}
          {resume.header.contact.phone && (
            <>
              <span>•</span>
              <span>{resume.header.contact.phone}</span>
            </>
          )}
          {resume.header.contact.location && (
            <>
              <span>•</span>
              <span>{resume.header.contact.location}</span>
            </>
          )}
          {resume.header.contact.linkedin && (
            <>
              <span>•</span>
              <a href={resume.header.contact.linkedin} style={{ color: '#0066cc', textDecoration: 'none' }}>
                LinkedIn
              </a>
            </>
          )}
          {resume.header.contact.github && (
            <>
              <span>•</span>
              <a href={resume.header.contact.github} style={{ color: '#0066cc', textDecoration: 'none' }}>
                GitHub
              </a>
            </>
          )}
          {resume.header.contact.website && (
            <>
              <span>•</span>
              <a href={resume.header.contact.website} style={{ color: '#0066cc', textDecoration: 'none' }}>
                {resume.header.contact.website}
              </a>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Summary</h2>
          <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, color: '#333333' }}>
            {resume.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Experience</h2>
          <div>
            {resume.experience.map((exp, idx) => (
              <div key={idx} style={customStyles.jobEntry}>
                <div style={customStyles.jobHeader}>
                  <div>
                    <p style={customStyles.jobTitle}>{exp.title}</p>
                    <p style={customStyles.jobCompany}>{exp.company}</p>
                  </div>
                  <div style={customStyles.jobMeta}>
                    {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                  </div>
                </div>
                {exp.location && (
                  <p style={customStyles.jobLocation}>{exp.location}</p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={customStyles.bullets}>
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} style={customStyles.bulletItem}>
                        {highlight.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Education</h2>
          <div>
            {resume.education.map((edu, idx) => (
              <div key={idx} style={customStyles.educationEntry}>
                <div style={customStyles.educationHeader}>
                  <div>
                    <p style={customStyles.degree}>{edu.degree}</p>
                    <p style={customStyles.institution}>{edu.institution}</p>
                  </div>
                  <div style={customStyles.jobMeta}>{edu.graduationDate}</div>
                </div>
                {edu.location && (
                  <p style={customStyles.jobLocation}>{edu.location}</p>
                )}
                {edu.gpa && (
                  <p style={{ fontSize: '12px', color: '#666666', margin: '4px 0' }}>
                    GPA: {edu.gpa}
                  </p>
                )}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul style={customStyles.bullets}>
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} style={customStyles.bulletItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Skills</h2>
          <div>
            {resume.skills.map((skillGroup, idx) => (
              <div key={idx} style={customStyles.skillGroup}>
                <span style={customStyles.skillCategory}>{skillGroup.category}:</span>
                <span style={{ marginLeft: '8px' }}>{skillGroup.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Certifications</h2>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {resume.certifications.map((cert, idx) => (
              <li key={idx} style={customStyles.certItem}>
                <span style={{ fontWeight: 'bold' }}>{cert.name}</span> • {cert.issuer}
                {cert.date && <span style={{ color: '#666666', marginLeft: '8px' }}>({cert.date})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div style={customStyles.section}>
          <h2 style={customStyles.sectionTitle}>Projects</h2>
          <div>
            {resume.projects.map((project, idx) => (
              <div key={idx} style={customStyles.projectEntry}>
                <div style={customStyles.projectHeader}>
                  <p style={customStyles.projectName}>{project.name}</p>
                  {project.date && (
                    <span style={customStyles.projectDate}>{project.date}</span>
                  )}
                </div>
                <p style={customStyles.projectDescription}>{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <p style={customStyles.projectTech}>
                    <span style={{ fontWeight: 'bold' }}>Tech:</span> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resume.custom && resume.custom.length > 0 && (
        <div>
          {resume.custom.map((section, idx) => (
            <div key={idx} style={customStyles.section}>
              <h2 style={customStyles.sectionTitle}>{section.title.toUpperCase()}</h2>
              <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap', color: '#333333' }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
