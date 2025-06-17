import React from 'react';
import ClassDetailsForm from '../components/appointment-class/ClassDetailsForm';
import { useIsMobile } from '../hooks/useIsMobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className={`w-full mx-auto px-4 py-4 md:py-8 ${isMobile ? 'max-w-full' : 'max-w-3xl'}`}>
        <ClassDetailsForm />
      </div>
    </div>
  );
};

export default Index;