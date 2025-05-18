import { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

// User types
import { UserType } from '../types';

interface UserTypeSelectionFormProps {
  onContinue: (userType: UserType) => void;
}

const UserTypeSelectionForm = ({ onContinue }: UserTypeSelectionFormProps) => {
  const [userType, setUserType] = useState<UserType>(UserType.STUDENT);
  
  const handleContinue = () => {
    onContinue(userType);
  };
  
  return (
    <>
      <Typography variant="body1" gutterBottom>
        Please select the type of account you want to create.
      </Typography>
      
      <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
        <FormLabel component="legend">Account Type</FormLabel>
        <RadioGroup
          aria-label="account-type"
          name="account-type"
          value={userType}
          onChange={(e) => setUserType(e.target.value as UserType)}
        >
          <FormControlLabel value={UserType.STUDENT} control={<Radio />} label="Student" />
          <FormControlLabel value={UserType.ADVISOR} control={<Radio />} label="Advisor" />
          <FormControlLabel value={UserType.SECRETARY} control={<Radio />} label="Secretary" />
          <FormControlLabel value={UserType.DEANS_OFFICE} control={<Radio />} label="Dean's Office" />
          <FormControlLabel value={UserType.STUDENT_AFFAIRS} control={<Radio />} label="Student Affairs" />
          <FormControlLabel value={UserType.ADMIN} control={<Radio />} label="Administrator" />
        </RadioGroup>
      </FormControl>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {userType === UserType.STUDENT
          ? "Select Student if you are a student at the university."
          : userType === UserType.ADVISOR
          ? "Select Advisor if you are a faculty advisor for students."
          : userType === UserType.SECRETARY
          ? "Select Secretary if you are a department secretary."
          : userType === UserType.DEANS_OFFICE
          ? "Select Dean's Office if you work in the dean's office."
          : userType === UserType.STUDENT_AFFAIRS
          ? "Select Student Affairs if you work in the student affairs office."
          : "Select Administrator if you manage the system."}
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </>
  );
};

export default UserTypeSelectionForm; 