'use client';

import React from 'react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: 2024,
      title: 'Event 1',
      description: 'Description for Event 1'
    },
    {
      year: 2024,
      title: 'Event 2',
      description: 'Description for Event 2'
    },
  ];

  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Timeline</h2>
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-24 text-xl font-bold">{event.year}</div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;