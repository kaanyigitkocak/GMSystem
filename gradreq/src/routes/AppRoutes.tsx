import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import theme from '../core/styles/theme';
import { useAuth } from '../features/auth/contexts/AuthContext';
import { UserType } from '../features/auth/types';
import AdvisorDashboardLayout from '../features/advisor/layout/AdvisorDashboardLayout';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));

// Student pages
const StudentDashboard = lazy(() => import('../features/student/pages/StudentDashboardPage'));
const StudentDashboardLayout = lazy(() => import('../features/student/layout/StudentDashboardLayout'));
const TranscriptPage = lazy(() => import('../features/student/pages/TranscriptPage'));
const GraduationRequirementsPage = lazy(() => import('../features/student/pages/GraduationRequirementsPage'));
const ManualCheckPage = lazy(() => import('../features/student/pages/ManualCheckPage'));
const DisengagementCertificatesPage = lazy(() => import('../features/student/pages/DisengagementCertificatesPage'));
const StudentNotificationsPage = lazy(() => import('../features/student/pages/NotificationsPage'));

// Secretary pages
const SecretaryDashboard = lazy(() => import('../features/secretary/pages/SecretaryDashboardPage'));
const SecretaryDashboardLayout = lazy(() => import('../features/secretary/layout/SecretaryDashboardLayout'));
const TranscriptProcessingPage = lazy(() => import('../features/secretary/pages/TranscriptProcessingPage'));
const DepartmentRankingPage = lazy(() => import('../features/secretary/pages/DepartmentRankingPage'));
const NotificationsPage = lazy(() => import('../features/secretary/pages/NotificationsPage'));

// Dean's Office pages
const DeansOfficeDashboard = lazy(() => import('../features/deansOffice/pages/DeansOfficeDashboardPage'));
const DeansOfficeDashboardLayout = lazy(() => import('../features/deansOffice/layout/DeansOfficeDashboardLayout'));
const FileUploadPage = lazy(() => import('../features/deansOffice/pages/FileUploadPage'));
const FacultyRankingPage = lazy(() => import('../features/deansOffice/pages/FacultyRankingPage'));
const DeansOfficeNotificationsPage = lazy(() => import('../features/deansOffice/pages/NotificationsPage'));

// Student Affairs pages
const StudentAffairsDashboard = lazy(() => import('../features/student_affairs/pages/StudentAffairsDashboardPage'));
const StudentAffairsDashboardLayout = lazy(() => import('../features/student_affairs/layout/StudentAffairsDashboardLayout'));
const UploadGraduationDecisionsPage = lazy(() => import('../features/student_affairs/pages/UploadGraduationDecisionsPage'));
const UniversityRankingsPage = lazy(() => import('../features/student_affairs/pages/UniversityRankingsPage'));
const StudentAffairsNotificationsPage = lazy(() => import('../features/student_affairs/pages/NotificationsPage'));

// Advisor pages
import AdvisorDashboardPage from '../features/advisor/pages/AdvisorDashboardPage';
import MyStudentsPage from '../features/advisor/pages/MyStudentsPage';
import ManualCheckRequestsPage from '../features/advisor/pages/ManualCheckRequestsPage';

// Loading component - positioned fixed to cover the whole screen
const LoadingComponent = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.default,
      zIndex: 9999 // To appear above other content
    }}
  >
    <CircularProgress color="primary" size={60} thickness={4} />
    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
      Loading...
    </Typography>
  </Box>
);

// Protected route component to redirect to login if not authenticated
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

// Route to redirect to appropriate dashboard based on user role
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user.role) {
    case UserType.STUDENT:
      return <Navigate to="/student" replace />;
    case UserType.SECRETARY:
      return <Navigate to="/secretary" replace />;
    case UserType.DEANS_OFFICE:
      return <Navigate to="/deansoffice" replace />;
    case UserType.STUDENT_AFFAIRS:
      return <Navigate to="/student-affairs" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Student Dashboard routes */}
        <Route path="/student" element={<ProtectedRoute element={<StudentDashboard />} />} />
        <Route 
          path="/student/transcript" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <TranscriptPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student/requirements" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <GraduationRequirementsPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student/manual-check" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <ManualCheckPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student/disengagement" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <DisengagementCertificatesPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student/notifications" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <StudentNotificationsPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        
        {/* Secretary Dashboard routes */}
        <Route path="/secretary" element={<ProtectedRoute element={<SecretaryDashboard />} />} />
        <Route 
          path="/secretary/transcripts" 
          element={
            <ProtectedRoute 
              element={
                <SecretaryDashboardLayout>
                  <TranscriptProcessingPage />
                </SecretaryDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/secretary/ranking" 
          element={
            <ProtectedRoute 
              element={
                <SecretaryDashboardLayout>
                  <DepartmentRankingPage />
                </SecretaryDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/secretary/notifications" 
          element={
            <ProtectedRoute 
              element={
                <SecretaryDashboardLayout>
                  <NotificationsPage />
                </SecretaryDashboardLayout>
              } 
            />
          } 
        />
        
        {/* Dean's Office Dashboard routes */}
        <Route path="/deansoffice" element={<ProtectedRoute element={<DeansOfficeDashboard />} />} />
        <Route 
          path="/deansoffice/file-upload" 
          element={
            <ProtectedRoute 
              element={
                <DeansOfficeDashboardLayout>
                  <FileUploadPage />
                </DeansOfficeDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/deansoffice/faculty-ranking" 
          element={
            <ProtectedRoute 
              element={
                <DeansOfficeDashboardLayout>
                  <FacultyRankingPage />
                </DeansOfficeDashboardLayout>
              } 
            />
          } 
        />
        <Route
          path="/deansoffice/notifications"
          element={
            <ProtectedRoute
              element={
                <DeansOfficeNotificationsPage />
              }
            />
          }
        />

        {/* Student Affairs Dashboard routes */}
        <Route path="/student-affairs" element={<ProtectedRoute element={<StudentAffairsDashboard />} />} />
        <Route 
          path="/student-affairs/upload-graduation-decisions" 
          element={
            <ProtectedRoute 
              element={
                <StudentAffairsDashboardLayout>
                  <UploadGraduationDecisionsPage />
                </StudentAffairsDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student-affairs/university-rankings" 
          element={
            <ProtectedRoute 
              element={
                <StudentAffairsDashboardLayout>
                  <UniversityRankingsPage />
                </StudentAffairsDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student-affairs/notifications" 
          element={
            <ProtectedRoute 
              element={
                <StudentAffairsDashboardLayout>
                  <StudentAffairsNotificationsPage />
                </StudentAffairsDashboardLayout>
              } 
            />
          } 
        />
        
        {/* Advisor Dashboard routes */}
        <Route path="/advisor" element={<ProtectedRoute element={<AdvisorDashboardLayout />} />}>
          <Route index element={<AdvisorDashboardPage />} />
          <Route path="my-students" element={<MyStudentsPage />} />
          <Route path="manual-check-requests" element={<ManualCheckRequestsPage />} />
        </Route>
        
        {/* Redirect root to appropriate dashboard or login */}
        <Route path="/" element={<DashboardRouter />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 