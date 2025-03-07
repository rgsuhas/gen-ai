"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DraggableSection from './DraggableSection';
import PersonalInfo from './resume-sections/PersonalInfo';
import Education from './resume-sections/Education';
import Experience from './resume-sections/Experience';
import Skills from './resume-sections/Skills';
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

interface SectionMeta {
  id: string;
  type: 'personal' | 'education' | 'experience' | 'skills';
  title: string;
  isCollapsed: boolean;
}

const ResumeBuilder: React.FC = () => {
  // State for section metadata (order, collapse state)
  const [sections, setSections] = useState<SectionMeta[]>([
    { id: 'personal-info', type: 'personal', title: 'Personal Information', isCollapsed: false },
    { id: 'education', type: 'education', title: 'Education', isCollapsed: false },
    { id: 'experience', type: 'experience', title: 'Experience', isCollapsed: false },
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
      skillsData.items.some((item) => item.name.trim() !== '')
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

