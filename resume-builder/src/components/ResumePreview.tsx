"use client"
import React, { useState } from 'react';
import { PersonalInfoData } from './resume-sections/PersonalInfo';
import { EducationItem } from './resume-sections/Education';
import { ExperienceItem } from './resume-sections/Experience';
import { SkillItem } from './resume-sections/Skills';

interface ResumePreviewProps {
  personalInfo: PersonalInfoData;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  skillCategories: string[];
  sectionOrder: ('personal' | 'education' | 'experience' | 'skills')[];
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  personalInfo,
  education,
  experience,
  skills,
  skillCategories,
  sectionOrder,
}) => {
  const [showCode, setShowCode] = useState(false);

  // Generate LaTeX code for the resume
  const generateLatex = (): string => {
    let latex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[left=0.75in,right=0.75in,top=0.75in,bottom=0.75in]{geometry}
\\usepackage{hyperref}
\\usepackage{fontawesome}
\\usepackage{titlesec}
\\usepackage{enumitem}

\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{12pt}{8pt}

\\begin{document}

% Personal Information
\\begin{center}
  \\\\textbf{\\\\\\\\LARGE ${personalInfo.name || 'Your Name'}}\\\\\\\\\\\\\\\\\\\
  ${personalInfo.address ? `${personalInfo.address} $\\cdot$ ` : ''}
  ${personalInfo.phone ? `${personalInfo.phone} $\\cdot$ ` : ''}
  ${personalInfo.email ? `${personalInfo.email}` : ''}\\\\
  ${personalInfo.linkedin ? `\\href{${personalInfo.linkedin}}{LinkedIn} $\\cdot$ ` : ''}
  ${personalInfo.github ? `\\href{${personalInfo.github}}{GitHub} $\\cdot$ ` : ''}
  ${personalInfo.website ? `\\href{${personalInfo.website}}{Website}` : ''}
\\end{center}

`;

    // Add sections according to specified order
    sectionOrder.forEach((sectionType) => {
      if (sectionType === 'education' && education.length > 0) {
        latex += `\\section{EDUCATION}
\\begin{itemize}[leftmargin=*,label={},itemsep=4pt]
${education.map(edu => 
  `  \\item \\textbf{${edu.institution || 'University Name'}} \\hfill ${edu.location || ''}
  \\\\item ${edu.degree || ''} ${edu.fieldOfStudy || edu.field ? `in ${edu.fieldOfStudy || edu.field}` : ''} ${edu.startDate ? `\\\\hfill ${edu.startDate} - ${edu.endDate || 'Present'}` : ''}
  ${edu.gpa ? `\\item GPA: ${edu.gpa}` : ''}
  ${edu.achievements ? `\\item ${edu.achievements}` : ''}
`).join('\n')}\\end{itemize}

`;
      } else if (sectionType === 'experience' && experience.length > 0) {
        latex += `\\section{EXPERIENCE}
\\begin{itemize}[leftmargin=*,label={},itemsep=4pt]
${experience.map(exp => 
  `  \\item \\textbf{${exp.company || 'Company Name'}} \\hfill ${exp.location || ''}
  \\item ${exp.position || 'Position'} ${exp.startDate ? `\\hfill ${exp.startDate} - ${exp.endDate || 'Present'}` : ''}
  ${exp.description ? `\\item ${exp.description}` : ''}
`).join('\n')}\\end{itemize}

`;
      } else if (sectionType === 'skills' && skills.length > 0) {
        // Group skills by category if applicable
        // Group skills by category if applicable
        const categories: Record<string, SkillItem[]> = {};
        
        // Initialize categories from the provided skillCategories
        skillCategories.forEach(category => {
          categories[category] = [];
        });
        
        // Add an "Other" category for uncategorized skills
        if (!categories['Other']) {
          categories['Other'] = [];
        }
        
        // Populate categories with skills
        skills.forEach(skill => {
          const category = skill.category || 'Other';
          if (!categories[category]) {
            categories[category] = [];
          }
          categories[category].push(skill);
        });
        latex += `\\section{SKILLS}
\\begin{itemize}[leftmargin=*,label={},itemsep=4pt]
`;

        if (Object.keys(categories).length > 1) {
          // If we have multiple categories, display by category
          Object.entries(categories).forEach(([category, categorySkills]) => {
            if (categorySkills.length > 0) {
              latex += `  \\item \\textbf{${category}}: ${categorySkills.map(skill => `${skill.name}${skill.proficiency ? ` (${skill.proficiency})` : ''}`).join(', ')}
`;
            }
          });
        } else {
          // Otherwise just list the skills
          latex += `  \\item ${skills.map(skill => `${skill.name}${skill.proficiency ? ` (${skill.proficiency})` : ''}`).join(', ')}
`;
        }

        latex += `\\end{itemize}

`;
      }
    });

    latex += `\\end{document}`;
    return latex;
  };

  const downloadLatex = () => {
    const latex = generateLatex();
    const blob = new Blob([latex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const latexCode = generateLatex();

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowCode(!showCode)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded text-sm"
        >
          {showCode ? 'Hide LaTeX Code' : 'View LaTeX Code'}
        </button>
        <button
          onClick={downloadLatex}
          className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm"
        >
          Download .tex File
        </button>
      </div>

      {showCode ? (
        <div className="bg-gray-100 p-4 rounded overflow-auto text-sm font-mono">
          <pre>{latexCode}</pre>
        </div>
      ) : (
        <div className="bg-white p-6 border border-gray-300 rounded shadow-sm">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">{personalInfo.name || 'Your Name'}</h1>
            <div className="text-sm text-gray-600">
              {personalInfo.address && <span>{personalInfo.address} • </span>}
              {personalInfo.phone && <span>{personalInfo.phone} • </span>}
              {personalInfo.email && <span>{personalInfo.email}</span>}
            </div>
            <div className="text-sm text-blue-600">
              {personalInfo.linkedin && <span><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> • </span>}
              {personalInfo.github && <span><a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a> • </span>}
              {personalInfo.website && <span><a href={personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a></span>}
            </div>
          </div>

          {sectionOrder.map((sectionType) => {
            if (sectionType === 'education' && education.length > 0) {
              return (
                <div key="education" className="mb-6">
                  <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">Education</h2>
                  {education.map((edu, index) => (
                    <div key={edu.id || index} className="mb-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">{edu.institution || 'University Name'}</span>
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{edu.degree}{edu.fieldOfStudy || edu.field ? ` in ${edu.fieldOfStudy || edu.field}` : ''}</span>
                        <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                      </div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                      {edu.achievements && <div>{edu.achievements}</div>}
                    </div>
                  ))}
                </div>
              );
            } else if (sectionType === 'experience' && experience.length > 0) {
              return (
                <div key="experience" className="mb-6">
                  <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">Experience</h2>
                  {experience.map((exp, index) => (
                    <div key={exp.id || index} className="mb-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">{exp.company || 'Company Name'}</span>
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{exp.position || 'Position'}</span>
                        <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                      {exp.description && <div className="text-sm mt-1">{exp.description}</div>}
                    </div>
                  ))}
                </div>
              );
            } else if (sectionType === 'skills' && skills.length > 0) {
              // Group skills by category if applicable
              // Group skills by category if applicable
              const categories: Record<string, SkillItem[]> = {};
              
              // Initialize categories from the provided skillCategories
              skillCategories.forEach(category => {
                categories[category] = [];
              });
              
              // Add an "Other" category for uncategorized skills
              if (!categories['Other']) {
                categories['Other'] = [];
              }
              
              // Populate categories with skills
              skills.forEach(skill => {
                const category = skill.category || 'Other';
                if (!categories[category]) {
                  categories[category] = [];
                }
                categories[category].push(skill);
              });
              return (
                <div key="skills" className="mb-6">
                  <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">Skills</h2>
                  {Object.keys(categories).length > 1 ? (
                    <div>
                      {Object.entries(categories).map(([category, categorySkills]) => (
                        categorySkills.length > 0 && (
                          <div key={category} className="mb-2">
                            <span className="font-semibold">{category}: </span>
                            <span>
                              {categorySkills.map((skill, i) => (
                                <span key={skill.id || i}>
                                  {skill.name}{skill.proficiency ? ` (${skill.proficiency})` : ''}
                                  {i < categorySkills.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    <div>
                      {skills.map((skill, i) => (
                        <span key={skill.id || i}>
                          {skill.name}{skill.proficiency ? ` (${skill.proficiency})` : ''}
                          {i < skills.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}

          <div className="text-center text-gray-500 text-xs mt-8">
            <p>This is a preview of how your resume might look in LaTeX. Download the .tex file for full customization.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;

