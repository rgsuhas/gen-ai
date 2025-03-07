"use client"
import React from 'react';
import { CertificationItem, CertificationsData } from '../ResumeBuilder';

interface CertificationsProps {
  data: CertificationsData;
  onChange: (data: CertificationsData) => void;
}

const Certifications: React.FC<CertificationsProps> = ({ data, onChange }) => {
  const addCertification = () => {
    const newItem: CertificationItem = {
      id: Date.now().toString(),
      title: '',
      provider: '',
      date: '',
      description: ''
    };
    
    onChange({
      items: [...data.items, newItem],
    });
  };

  const updateCertification = (id: string, updatedItem: Partial<CertificationItem>) => {
    onChange({
      items: data.items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      items: data.items.filter(item => item.id !== id),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Certifications</h2>
      <p className="text-gray-600 mb-4">
        Add professional certifications, licenses, or other credentials.
      </p>
      
      {data.items.map((item, index) => (
        <div key={item.id} className="mb-6 p-4 border border-gray-200 rounded">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Certification #{index + 1}</h3>
            <button 
              onClick={() => removeCertification(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Title
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateCertification(item.id, { title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., AWS Certified Solution Architect"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider/Organization
              </label>
              <input
                type="text"
                value={item.provider}
                onChange={(e) => updateCertification(item.id, { provider: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="text"
              value={item.date}
              onChange={(e) => updateCertification(item.id, { date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., May 2023 or May 2023 - May 2026"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={item.description}
              onChange={(e) => updateCertification(item.id, { description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Add any additional information or skills demonstrated by this certification"
              rows={3}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={addCertification}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Certification
      </button>
    </div>
  );
};

export default Certifications;
