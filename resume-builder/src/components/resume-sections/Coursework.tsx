"use client"
import React from 'react';

export interface CourseworkItem {
  id: string;
  title: string;
}

export interface CourseworkData {
  items: CourseworkItem[];
}

interface CourseworkProps {
  data: CourseworkData;
  onChange: (data: CourseworkData) => void;
}

const Coursework: React.FC<CourseworkProps> = ({ data, onChange }) => {
  const addCoursework = () => {
    const newItem: CourseworkItem = {
      id: Date.now().toString(),
      title: '',
    };
    
    onChange({
      items: [...data.items, newItem],
    });
  };

  const updateCoursework = (id: string, updatedItem: Partial<CourseworkItem>) => {
    onChange({
      items: data.items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    });
  };

  const removeCoursework = (id: string) => {
    onChange({
      items: data.items.filter(item => item.id !== id),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Relevant Coursework</h2>
      <p className="text-gray-600 mb-4">
        Add courses that are relevant to the position you're applying for.
      </p>
      
      {data.items.map((item, index) => (
        <div key={item.id} className="mb-4 p-4 border border-gray-200 rounded">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Course #{index + 1}</h3>
            <button 
              onClick={() => removeCoursework(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateCoursework(item.id, { title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., Data Structures and Algorithms"
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={addCoursework}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Course
      </button>
    </div>
  );
};

export default Coursework;

