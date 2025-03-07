"use client"
import React, { useState } from 'react';

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

interface ProjectsProps {
  data: ProjectsData;
  onChange: (data: ProjectsData) => void;
}

const Projects: React.FC<ProjectsProps> = ({ data, onChange }) => {
  const [newTech, setNewTech] = useState('');

  const addProject = () => {
    const newItem: ProjectItem = {
      id: Date.now().toString(),
      title: '',
      techStack: [],
      description: '',
      date: '',
    };
    
    onChange({
      items: [...data.items, newItem],
    });
  };

  const updateProject = (id: string, updatedItem: Partial<ProjectItem>) => {
    onChange({
      items: data.items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      items: data.items.filter(item => item.id !== id),
    });
  };

  const addTechToProject = (id: string, tech: string) => {
    if (!tech.trim()) return;
    
    onChange({
      items: data.items.map(item => 
        item.id === id 
          ? { ...item, techStack: [...item.techStack, tech.trim()] } 
          : item
      ),
    });
    setNewTech('');
  };

  const removeTechFromProject = (id: string, techToRemove: string) => {
    onChange({
      items: data.items.map(item => 
        item.id === id 
          ? { ...item, techStack: item.techStack.filter(tech => tech !== techToRemove) } 
          : item
      ),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      
      {data.items.map((item, index) => (
        <div key={item.id} className="mb-6 p-4 border border-gray-200 rounded">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Project #{index + 1}</h3>
            <button 
              onClick={() => removeProject(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateProject(item.id, { title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., Portfolio Website"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateProject(item.id, { date: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., June 2023 - Present"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {item.techStack.map((tech, techIndex) => (
                <div key={techIndex} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                  <span>{tech}</span>
                  <button
                    onClick={() => removeTechFromProject(item.id, tech)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded"
                placeholder="e.g., React"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechToProject(item.id, newTech);
                  }
                }}
              />
              <button
                onClick={() => addTechToProject(item.id, newTech)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={item.description}
              onChange={(e) => updateProject(item.id, { description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Describe your project, its features, and your contributions"
              rows={3}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={addProject}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Project
      </button>
    </div>
  );
};

export default Projects;
