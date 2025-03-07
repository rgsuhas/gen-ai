"use client"
import React, { useState } from 'react';

export interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="City, State"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://github.com/johndoe"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={data.website || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

