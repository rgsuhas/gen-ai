"use client"
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDragIndicator } from 'react-icons/md';

interface DraggableSectionProps {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
  onToggleCollapse?: (id: string) => void;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  id,
  index,
  title,
  children,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`mb-6 rounded-lg border border-gray-200 bg-white shadow-sm ${
            snapshot.isDragging ? 'opacity-70' : ''
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 rounded-t-lg">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div className="flex items-center gap-2">
              {onToggleCollapse && (
                <button
                  onClick={() => onToggleCollapse(id)}
                  className="p-1 rounded-full hover:bg-gray-200"
                  aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              <div {...provided.dragHandleProps} className="cursor-grab p-1 rounded-full hover:bg-gray-200">
                <MdDragIndicator className="h-5 w-5" />
              </div>
            </div>
          </div>
          {!isCollapsed && <div className="p-4">{children}</div>}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableSection;

