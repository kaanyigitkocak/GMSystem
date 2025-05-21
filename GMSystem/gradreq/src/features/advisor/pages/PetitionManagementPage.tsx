import { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Stepper, Step, StepLabel, TextField, MenuItem, Divider, List, ListItem, ListItemText } from '@mui/material';

const petitionTypes = ['Course Exemption', 'Graduation Extension', 'Other'];
const mockStudents = [
  { id: '1', name: 'Jane Smith' },
  { id: '2', name: 'John Doe' },
];
const mockPetitions = [
  { id: '1', student: 'Jane Smith', type: 'Course Exemption', date: '2024-05-01' },
  { id: '2', student: 'John Doe', type: 'Graduation Extension', date: '2024-05-02' },
];

const steps = ['Type', 'Student', 'Content', 'Preview', 'Download'];

const PetitionManagementPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [petitionType, setPetitionType] = useState('');
  const [student, setStudent] = useState('');
  const [content, setContent] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Petition Management</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 3 }}>
            {activeStep === 0 && (
              <TextField select label="Petition Type" value={petitionType} onChange={e => setPetitionType(e.target.value)} fullWidth>
                {petitionTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            )}
            {activeStep === 1 && (
              <TextField select label="Student" value={student} onChange={e => setStudent(e.target.value)} fullWidth>
                {mockStudents.map(s => (
                  <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
                ))}
              </TextField>
            )}
            {activeStep === 2 && (
              <TextField label="Content" value={content} onChange={e => setContent(e.target.value)} fullWidth multiline minRows={4} />
            )}
            {activeStep === 3 && (
              <Box>
                <Typography variant="subtitle1">Preview</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography><b>Type:</b> {petitionType}</Typography>
                <Typography><b>Student:</b> {student}</Typography>
                <Typography><b>Content:</b> {content}</Typography>
              </Box>
            )}
            {activeStep === 4 && (
              <Box>
                <Typography>Downloadable PDF will be generated here.</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>Download PDF</Button>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)}>Back</Button>
            <Button disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(s => s + 1)}>Next</Button>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Created Petitions</Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {mockPetitions.map(p => (
              <ListItem key={p.id} divider>
                <ListItemText primary={`${p.type} for ${p.student}`} secondary={`Date: ${p.date}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PetitionManagementPage; 