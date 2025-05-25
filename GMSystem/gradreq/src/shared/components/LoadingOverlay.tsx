import React from 'react';
import {
  CircularProgress,
  Typography,
  Backdrop,
  Paper,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LoadingOverlayProps {
  /** Whether the loading overlay is visible */
  isLoading: boolean;
  /** Loading message to display */
  message?: string;
  /** Size of the circular progress indicator */
  size?: number;
  /** Whether to blur the background content */
  backdropBlur?: boolean;
  /** Custom z-index for the overlay */
  zIndex?: number;
  /** Whether to show a semi-transparent backdrop */
  showBackdrop?: boolean;
  /** Custom color for the progress indicator */
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'warning' | 'info' | 'error';
}

/**
 * A reusable loading overlay component that displays on top of existing content
 * without hiding the underlying UI components.
 * 
 * Usage:
 * ```tsx
 * <Box sx={{ position: 'relative' }}>
 *   <YourContent />
 *   <LoadingOverlay 
 *     isLoading={isPerformingEligibilityCheck}
 *     message="Performing eligibility checks..."
 *   />
 * </Box>
 * ```
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  size = 48,
  backdropBlur = true,
  zIndex = 9999,
  showBackdrop = true,
  color = 'primary',
}) => {
  const theme = useTheme();

  if (!isLoading) {
    return null;
  }

  return (
    <Backdrop
      open={isLoading}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex,
        backgroundColor: showBackdrop 
          ? alpha(theme.palette.background.default, 0.8)
          : 'transparent',
        backdropFilter: backdropBlur ? 'blur(4px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'inherit',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(8px)',
          borderRadius: 2,
          minWidth: 200,
        }}
      >
        <CircularProgress 
          size={size} 
          color={color}
          thickness={4}
          sx={{ mb: 2 }}
        />
        <Typography 
          variant="body1" 
          color="text.primary"
          sx={{ 
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 300,
          }}
        >
          {message}
        </Typography>
      </Paper>
    </Backdrop>
  );
};

export default LoadingOverlay;
