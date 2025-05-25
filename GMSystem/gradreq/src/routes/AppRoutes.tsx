import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import theme from '../core/styles/theme';
import { useAuth } from '../features/auth/contexts/AuthContext';
import { UserType } from '../features/auth/types';
import AdvisorDashboardLayout from '../features/advisor/layout/AdvisorDashboardLayout';
import ErrorBoundary from '../shared/components/ErrorBoundary';
import AdvisorNotificationsPage from '../features/advisor/pages/NotificationsPage';
import ApprovalRankingPage from '../features/advisor/pages/ApprovalRankingPage';
import { DeansOfficeEligibilityProvider } from '../features/deansOffice/contexts/DeansOfficeEligibilityContext';

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
const SecretaryApprovalRankingPage = lazy(() => import('../features/secretary/pages/ApprovalRankingPage'));
const NotificationsPage = lazy(() => import('../features/secretary/pages/NotificationsPage'));

// Dean's Office pages
const DeansOfficeDashboard = lazy(() => import('../features/deansOffice/pages/DeansOfficeDashboardPage'));
const DeansOfficeDashboardLayout = lazy(() => import('../features/deansOffice/layout/DeansOfficeDashboardLayout'));
const DeansOfficeApprovalRankingPage = lazy(() => import('../features/deansOffice/pages/ApprovalRankingPage'));
const DeansOfficeNotificationsPage = lazy(() => import('../features/deansOffice/pages/NotificationsPage'));

// Student Affairs pages
const StudentAffairsDashboard = lazy(() => import('../features/student_affairs/pages/StudentAffairsDashboardPage'));
const StudentAffairsLayout = lazy(() => import('../features/student_affairs/layout/StudentAffairsLayout'));
const UploadGraduationDecisionsPage = lazy(() => import('../features/student_affairs/pages/UploadGraduationDecisionsPage'));

const StudentAffairsNotificationsPage = lazy(() => import('../features/student_affairs/pages/NotificationsPage'));
const StudentAffairsApprovalRankingPage = lazy(() => import('../features/student_affairs/pages/ApprovalRankingPage'));

// Admin pages - placeholder imports, these need to be created
const AdminDashboard = lazy(() => import('../features/admin/pages/AdminDashboardPage'));

// Advisor pages
import AdvisorDashboardPage from '../features/advisor/pages/AdvisorDashboardPage';

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
    case UserType.ADVISOR:
      return <Navigate to="/advisor" replace />;
    case UserType.ADMIN:
      return <Navigate to="/admin" replace />;
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
        <Route 
          path="/secretary" 
          element={
            <ProtectedRoute 
              element={
                <ErrorBoundary>
                  <SecretaryDashboardLayout>
                    <SecretaryDashboard />
                  </SecretaryDashboardLayout>
                </ErrorBoundary>
              } 
            />
          } 
        />
        <Route 
          path="/secretary/transcripts" 
          element={
            <ProtectedRoute 
              element={
                <ErrorBoundary>
                  <SecretaryDashboardLayout>
                    <TranscriptProcessingPage />
                  </SecretaryDashboardLayout>
                </ErrorBoundary>
              } 
            />
          } 
        />
        <Route 
          path="/secretary/ranking" 
          element={
            <ProtectedRoute 
              element={
                <ErrorBoundary>
                  <SecretaryDashboardLayout>
                    <SecretaryApprovalRankingPage />
                  </SecretaryDashboardLayout>
                </ErrorBoundary>
              } 
            />
          } 
        />
        <Route 
          path="/secretary/notifications" 
          element={
            <ProtectedRoute 
              element={
                <ErrorBoundary>
                  <SecretaryDashboardLayout>
                    <NotificationsPage />
                  </SecretaryDashboardLayout>
                </ErrorBoundary>
              } 
            />
          } 
        />
        
        {/* Dean's Office Dashboard routes */}
        <Route 
          path="/deansoffice" 
          element={
            <ProtectedRoute 
              element={
                <DeansOfficeEligibilityProvider>
                  <DeansOfficeDashboardLayout />
                </DeansOfficeEligibilityProvider>
              } 
            />
          }
        >
          <Route index element={<DeansOfficeDashboard />} />
          <Route path="approval-ranking" element={<DeansOfficeApprovalRankingPage />} />
          <Route path="notifications" element={<DeansOfficeNotificationsPage />} />
        </Route>

        {/* Student Affairs Dashboard routes */}
        <Route 
          path="/student-affairs" 
          element={
            <ProtectedRoute 
              element={<StudentAffairsLayout />} 
            />
          }
        >
          <Route index element={<StudentAffairsDashboard />} />
          <Route path="approval-ranking" element={<StudentAffairsApprovalRankingPage />} />
          <Route path="upload-graduation-decisions" element={<UploadGraduationDecisionsPage />} />

          <Route path="notifications" element={<StudentAffairsNotificationsPage />} />
        </Route>
        
        {/* Advisor Dashboard routes */}
        <Route path="/advisor" element={<ProtectedRoute element={<AdvisorDashboardLayout />} />}>
          <Route index element={<AdvisorDashboardPage />} />
          <Route path="approval-ranking" element={<ApprovalRankingPage />} />
          <Route path="notifications" element={<AdvisorNotificationsPage />} />
        </Route>
        
        {/* Admin Dashboard routes */}
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
        
        {/* Redirect root to appropriate dashboard or login */}
        <Route path="/" element={<DashboardRouter />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
