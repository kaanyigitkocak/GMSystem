// Service utility functions for student feature
import { getServiceConfig as getCommonServiceConfig } from "../../../../features/common/utils/serviceUtils";

// Re-export common service config
export const getServiceConfig = getCommonServiceConfig;

// Calculate GPA utility function
export const calculateGPA = (
  courses: Array<{ grade: string; credits: number }>
): string => {
  const gradePoints: Record<string, number> = {
    AA: 4.0,
    BA: 3.5,
    BB: 3.0,
    CB: 2.5,
    CC: 2.0,
    DC: 1.5,
    DD: 1.0,
    FF: 0.0,
  };

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    totalPoints += gradePoints[course.grade] * course.credits;
    totalCredits += course.credits;
  });

  return (totalPoints / totalCredits).toFixed(2);
};

// Calculate overall progress utility function
export const calculateOverallProgress = (
  requirements: Array<{ completed: number; total: number }>
): number => {
  let totalCompleted = 0;
  let totalRequired = 0;

  requirements.forEach((category) => {
    totalCompleted += category.completed;
    totalRequired += category.total;
  });

  return Math.round((totalCompleted / totalRequired) * 100);
};
