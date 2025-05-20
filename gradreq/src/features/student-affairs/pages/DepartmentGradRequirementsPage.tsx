import { useEffect, useState } from 'react';
import { Box, Typography, Paper, MenuItem, Select, InputLabel, FormControl, Button, List, ListItem, ListItemText, Alert } from '@mui/material';
import { getFaculties, addDepartmentGradRequirement, getDepartmentGradRequirements, deleteDepartmentGradRequirement } from '../services/studentAffairsService';
import type { Faculty, Department, DepartmentGradRequirement } from '../types';

const DepartmentGradRequirementsPage = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [requirements, setRequirements] = useState<DepartmentGradRequirement[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getFaculties().then(setFaculties);
  }, []);

  useEffect(() => {
    if (selectedFaculty) {
      const faculty = faculties.find(f => f.id === selectedFaculty);
      setDepartments(faculty ? faculty.departments : []);
      setSelectedDept('');
    } else {
      setDepartments([]);
      setSelectedDept('');
    }
  }, [selectedFaculty, faculties]);

  useEffect(() => {
    if (selectedDept) {
      getDepartmentGradRequirements(selectedDept).then(setRequirements);
    } else {
      setRequirements([]);
    }
  }, [selectedDept]);

  const handleAddRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!selectedFaculty || !selectedDept || !file) {
      setError('Please select faculty, department and a PDF file.');
      return;
    }
    setLoading(true);
    try {
      await addDepartmentGradRequirement(selectedDept, file, selectedFaculty);
      setFile(null);
      setSuccess('Requirement added successfully!');
      // Refresh list
      const updated = await getDepartmentGradRequirements(selectedDept);
      setRequirements(updated);
    } catch (err) {
      setError('Failed to add requirement.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError('');
    try {
      await deleteDepartmentGradRequirement(id);
      const updated = await getDepartmentGradRequirements(selectedDept);
      setRequirements(updated);
    } catch (err) {
      setError('Failed to delete requirement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Department Graduation Requirements</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="faculty-label">Faculty</InputLabel>
          <Select
            labelId="faculty-label"
            value={selectedFaculty}
            label="Faculty"
            onChange={e => setSelectedFaculty(e.target.value)}
          >
            {faculties.map((faculty) => (
              <MenuItem key={faculty.id} value={faculty.id}>{faculty.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedFaculty}>
          <InputLabel id="dept-label">Department</InputLabel>
          <Select
            labelId="dept-label"
            value={selectedDept}
            label="Department"
            onChange={e => setSelectedDept(e.target.value)}
            disabled={!selectedFaculty}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <form onSubmit={handleAddRequirement}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
            disabled={!selectedDept}
          >
            {file ? file.name : 'Upload PDF'}
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={e => {
                const f = e.target.files?.[0];
                setFile(f && f.type === 'application/pdf' ? f : null);
              }}
            />
          </Button>
          <Button type="submit" variant="contained" disabled={loading || !selectedDept}>
            {loading ? 'Adding...' : 'Add Requirement'}
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </Paper>
      {selectedDept && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Existing Requirements</Typography>
          <List>
            {requirements.length === 0 && <ListItem><ListItemText primary="No requirements yet." /></ListItem>}
            {requirements.map((req) => (
              <ListItem key={req.id} secondaryAction={
                <Button color="error" onClick={() => handleDelete(req.id)} disabled={loading}>
                  Delete
                </Button>
              }>
                <ListItemText
                  primary={
                    <a href={req.fileUrl} target="_blank" rel="noopener noreferrer">
                      {req.fileName}
                    </a>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default DepartmentGradRequirementsPage; 