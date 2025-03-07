"use client"
import React, { useState } from 'react';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
  description?: string;
}

export interface EducationData {
  items: EducationItem[];
}

interface EducationProps {
  data: EducationData;
  onChange: (data: EducationData) => void;
}

const Education: React.FC<EducationProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      gpa: '',
      description: '',
    };
    
    onChange({
      items: [...data.items, newItem],
    });
  };

  const updateEducation = (id: string, updatedItem: Partial<EducationItem>) => {
    onChange({
      items: data.items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      items: data.items.filter(item => item.id !== id),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Education</h2>
      
      {data.items.map((item, index) => (
        <div key={item.id} className="mb-6 p-4 border border-gray-200 rounded">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Education #{index + 1}</h3>
            <button 
              onClick={() => removeEducation(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={item.institution}
                onChange={(e) => updateEducation(item.id, { institution: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="University Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={item.degree}
                onChange={(e) => updateEducation(item.id, { degree: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Bachelor of Science"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={item.fieldOfStudy}
                onChange={(e) => updateEducation(item.id, { fieldOfStudy: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Computer Science"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={item.location}
                onChange={(e) => updateEducation(item.id, { location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="City, State"
              />
            
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={item.startDate}
                onChange={(e) => updateEducation(item.id, { startDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="MM/YYYY"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={item.endDate}
                onChange={(e) => updateEducation(item.id, { endDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="MM/YYYY or Present"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={item.gpa || ''}
                onChange={(e) => updateEducation(item.id, { gpa: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 3.8/4.0"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={item.description || ''}
                onChange={(e) => updateEducation(item.id, { description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Notable achievements, honors, or relevant coursework"
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={addEducation}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Education
      </button>
    </div>
  );
};

export default Education;
