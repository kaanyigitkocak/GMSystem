import type { ManualCheckRequest } from '../types/dashboard';

// Mock manual check requests service implementation
export const getManualCheckRequestsMock = async (): Promise<ManualCheckRequest[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      student: 'Jane Smith',
      studentId: '20201001',
      date: '2025-05-10',
      reason: 'Article 19',
      status: 'Pending',
      notes: '',
      priority: 'medium'
    },
    {
      id: '2',
      student: 'John Doe',
      studentId: '20201002',
      date: '2025-05-12',
      reason: 'Summer School',
      status: 'In Review',
      notes: 'Waiting for transcript.',
      priority: 'high'
    },
    {
      id: '3',
      student: 'Ali Veli',
      studentId: '20201003',
      date: '2025-05-15',
      reason: 'Transfer Credits',
      status: 'Pending',
      notes: '',
      priority: 'low'
    }
  ];
};

export const updateManualCheckRequestMock = async (id: string, updates: Partial<ManualCheckRequest>): Promise<ManualCheckRequest> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real implementation, this would update the request on the server
  const requests = await getManualCheckRequestsMock();
  const request = requests.find(r => r.id === id);
  
  if (!request) {
    throw new Error('Request not found');
  }
  
  return { ...request, ...updates };
};
