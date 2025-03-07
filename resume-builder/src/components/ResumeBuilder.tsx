"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DraggableSection from './DraggableSection';
import PersonalInfo from './resume-sections/PersonalInfo';
import Education from './resume-sections/Education';
import Experience from './resume-sections/Experience';
import Skills from './resume-sections/Skills';
import Coursework from './resume-sections/Coursework';
import Projects from './resume-sections/Projects';
import Certifications from './resume-sections/Certifications';
import ResumePreview from './ResumePreview';

export interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location: string;
  description?: string;
}

export interface EducationData {
  items: EducationItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface ExperienceData {
  items: ExperienceItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  proficiency?: string;
  category?: string;
}

export interface SkillsData {
  items: SkillItem[];
  categories: string[];
}

export interface CourseworkItem {
  id: string;
  title: string;
}

export interface CourseworkData {
  items: CourseworkItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  date: string;
}

export interface ProjectsData {
  items: ProjectItem[];
}

export interface CertificationItem {
  id: string;
  title: string;
  provider: string;
  date: string;
  description: string;
}

export interface CertificationsData {
  items: CertificationItem[];
}

interface SectionMeta {
  id: string;
  type: 'personal' | 'education' | 'experience' | 'skills' | 'coursework' | 'projects' | 'certifications';
  title: string;
  isCollapsed: boolean;
}

const ResumeBuilder: React.FC = () => {
  // State for section metadata (order, collapse state)
  const [sections, setSections] = useState<SectionMeta[]>([
    { id: 'personal-info', type: 'personal', title: 'Personal Information', isCollapsed: false },
    { id: 'education', type: 'education', title: 'Education', isCollapsed: false },
    { id: 'experience', type: 'experience', title: 'Experience', isCollapsed: false },
    { id: 'coursework', type: 'coursework', title: 'Relevant Coursework', isCollapsed: false },
    { id: 'projects', type: 'projects', title: 'Projects', isCollapsed: false },
    { id: 'certifications', type: 'certifications', title: 'Certifications', isCollapsed: false },
    { id: 'skills', type: 'skills', title: 'Skills', isCollapsed: false },
  ]);

  // State for actual resume data
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    website: '',
  });

  const [educationData, setEducationData] = useState<EducationData>({
    items: [
      {
        id: 'edu-1',
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        location: '',
        description: '',
      },
    ]
  });

  const [experienceData, setExperienceData] = useState<ExperienceData>({
    items: [
      {
        id: 'exp-1',
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
      },
    ]
  });

  const [skillsData, setSkillsData] = useState<SkillsData>({
    items: [
      { id: 'skill-1', name: '', proficiency: '', category: 'Technical' },
    ],
    categories: ['Technical', 'Soft Skills', 'Languages', 'Tools']
  });

  const [courseworkData, setCourseworkData] = useState<CourseworkData>({
    items: [
      { id: 'course-1', title: '' },
    ]
  });

  const [projectsData, setProjectsData] = useState<ProjectsData>({
    items: [
      {
        id: 'project-1',
        title: '',
        techStack: [],
        description: '',
        date: ''
      },
    ]
  });

  const [certificationsData, setCertificationsData] = useState<CertificationsData>({
    items: [
      {
        id: 'cert-1',
        title: '',
        provider: '',
        date: '',
        description: ''
      },
    ]
  });

  // Function to toggle section collapse
  const toggleSectionCollapse = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, isCollapsed: !section.isCollapsed }
          : section
      )
    );
  };

  // Handle drag end event
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If dropped outside droppable area
    if (!destination) return;

    // If dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Reorder sections
    const newSections = Array.from(sections);
    const [removed] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, removed);

    setSections(newSections);
  };

  // Check if any fields have been filled out for the preview
  const hasData = () => {
    return (
      personalInfo.name.trim() !== '' ||
      educationData.items.some((item) => item.institution.trim() !== '') ||
      experienceData.items.some((item) => item.company.trim() !== '') ||
      skillsData.items.some((item) => item.name.trim() !== '') ||
      courseworkData.items.some((item) => item.title.trim() !== '') ||
      projectsData.items.some((item) => item.title.trim() !== '') ||
      certificationsData.items.some((item) => item.title.trim() !== '')
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form section */}
        <div className="w-full lg:w-1/2">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="resume-sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {sections.map((section, index) => (
                    <DraggableSection
                      key={section.id}
                      id={section.id}
                      index={index}
                      title={section.title}
                      isCollapsed={section.isCollapsed}
                      onToggleCollapse={toggleSectionCollapse}
                    >
                      {section.type === 'personal' && (
                        <PersonalInfo data={personalInfo} onChange={setPersonalInfo} />
                      )}
                      {section.type === 'education' && (
                        <Education data={educationData} onChange={setEducationData} />
                      )}
                      {section.type === 'experience' && (
                        <Experience data={experienceData} onChange={setExperienceData} />
                      )}
                      {section.type === 'skills' && (
                        <Skills data={skillsData} onChange={setSkillsData} />
                      )}
                      {section.type === 'coursework' && (
                        <Coursework data={courseworkData} onChange={setCourseworkData} />
                      )}
                      {section.type === 'projects' && (
                        <Projects data={projectsData} onChange={setProjectsData} />
                      )}
                      {section.type === 'certifications' && (
                        <Certifications data={certificationsData} onChange={setCertificationsData} />
                      )}
                    </DraggableSection>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Preview section */}
        <div className="w-full lg:w-1/2 sticky top-8 h-fit">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="text-xl font-semibold">LaTeX Preview</h2>
            </div>
            <div className="p-4">
              {hasData() ? (
                <ResumePreview
                  personalInfo={personalInfo}
                  education={educationData.items}
                  experience={experienceData.items}
                  skills={skillsData.items}
                  skillCategories={skillsData.categories}
                  coursework={courseworkData.items}
                  projects={projectsData.items}
                  certifications={certificationsData.items}
                  sectionOrder={sections.map((section) => section.type)}
                />
              ) : (
                <div className="text-center p-8 text-gray-500">
                  <p>Fill in your resume details to see a preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

