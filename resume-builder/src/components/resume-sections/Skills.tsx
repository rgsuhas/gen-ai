"use client"
import React, { useState } from 'react';

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

interface SkillsProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

const Skills: React.FC<SkillsProps> = ({ data, onChange }) => {
  const [newCategory, setNewCategory] = useState('');

  const addSkill = (category: string = '') => {
    const newItem: SkillItem = {
      id: Date.now().toString(),
      name: '',
      proficiency: '',
      category: category,
    };
    
    onChange({
      ...data,
      items: [...data.items, newItem],
    });
  };

  const updateSkill = (id: string, updatedItem: Partial<SkillItem>) => {
    onChange({
      ...data,
      items: data.items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter(item => item.id !== id),
    });
  };

  const addCategory = () => {
    if (newCategory.trim() && !data.categories.includes(newCategory.trim())) {
      onChange({
        ...data,
        categories: [...data.categories, newCategory.trim()],
      });
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    onChange({
      ...data,
      categories: data.categories.filter(cat => cat !== category),
      items: data.items.map(item => 
        item.category === category ? { ...item, category: '' } : item
      ),
    });
  };

  // Group skills by category
  const skillsByCategory: { [key: string]: SkillItem[] } = {
    'Uncategorized': []
  };
  
  data.categories.forEach(category => {
    skillsByCategory[category] = [];
  });
  
  data.items.forEach(skill => {
    if (skill.category && skillsByCategory[skill.category]) {
      skillsByCategory[skill.category].push(skill);
    } else {
      skillsByCategory['Uncategorized'].push(skill);
    }
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      
      {/* Category Management */}
      <div className="mb-6 p-4 border border-gray-200 rounded">
        <h3 className="font-semibold mb-3">Skill Categories (Optional)</h3>
        <div className="flex items-end gap-2 mb-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Category
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., Programming Languages"
            />
          </div>
          <button
            onClick={addCategory}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        
        {data.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.categories.map(category => (
              <div key={category} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                <span>{category}</span>
                <button
                  onClick={() => removeCategory(category)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Skills by Category */}
      {Object.entries(skillsByCategory).map(([category, skills]) => {
        // Skip empty categories except Uncategorized
        if (skills.length === 0 && category !== 'Uncategorized') return null;
        
        // Skip Uncategorized if empty and there are other categories
        if (category === 'Uncategorized' && skills.length === 0 && Object.keys(skillsByCategory).length > 1) return null;
        
        return (
          <div key={category} className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{category}</h3>
              <button
                onClick={() => addSkill(category !== 'Uncategorized' ? category : '')}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Skill to {category}
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center gap-2 p-2 border border-gray-200 rounded">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="e.g., Python"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Proficiency (Optional)
                      </label>
                      <select
                        value={skill.proficiency || ''}
                        onChange={(e) => updateSkill(skill.id, { proficiency: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select Proficiency</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    
                    {data.categories.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={skill.category || ''}
                          onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Uncategorized</option>
                          {data.categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-800 self-end"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {/* If there are no skills yet, show this button */}
      {data.items.length === 0 && (
        <button
          onClick={() => addSkill()}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add First Skill
        </button>
      )}
    </div>
  );
};

export default Skills;

