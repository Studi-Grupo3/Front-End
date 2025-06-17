/* contexts/ClassWizardContext.jsx */
import React, { createContext, useContext, useState } from 'react';
import { classService } from '../services/classService';

const ClassWizardContext = createContext();

export const ClassWizardProvider = ({ children }) => {
  const [wizardData, setWizardData] = useState({
    phase: '', subject: '', duration: '', materials: [],
    model: '', professorId: null, date: null, time: null,
    personalData: {}, address: {}, payment: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateWizardData = (patch) => {
    setWizardData(prev => ({ ...prev, ...patch }));
  };

  const submitAll = async () => {
    setIsSubmitting(true);
    try {
      const response = await classService.createClass(wizardData);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ClassWizardContext.Provider value={{
      wizardData,
      updateWizardData,
      submitAll,
      isSubmitting
    }}>
      {children}
    </ClassWizardContext.Provider>
  );
};

export const useClassWizard = () => {
  const ctx = useContext(ClassWizardContext);
  if (!ctx) throw new Error('useClassWizard deve ser usado dentro de ClassWizardProvider');
  return ctx;
};
