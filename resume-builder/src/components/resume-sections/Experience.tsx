"use client"
import React from 'react';

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

interface ExperienceProps {
  data: ExperienceData;
  onChange: (data: ExperienceData) => void;
}

const Experience: React.FC<ExperienceProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };
    
    onChange({
      items: [...data.items, newItem],
    });
  };

  const updateExperience = (id: string, updatedItem: Partial<ExperienceItem>) => {
    onChange({
      items: data.items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      items: data.items.filter(item => item.id !== id),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      
      {data.items.map((item, index) => (
        <div key={item.id} className="mb-6 p-4 border border-gray-200 rounded">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Experience #{index + 1}</h3>
            <button 
              onClick={() => removeExperience(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateExperience(item.id, { company: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Company Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={item.position}
                onChange={(e) => updateExperience(item.id, { position: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Software Engineer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={item.startDate}
                onChange={(e) => updateExperience(item.id, { startDate: e.target.value })}
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
                onChange={(e) => updateExperience(item.id, { endDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="MM/YYYY or Present"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={item.location}
                onChange={(e) => updateExperience(item.id, { location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="City, State"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={item.description}
                onChange={(e) => updateExperience(item.id, { description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Describe your responsibilities and achievements"
                rows={4}
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={addExperience}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Experience
      </button>
    </div>
  );
};

export default Experience;

