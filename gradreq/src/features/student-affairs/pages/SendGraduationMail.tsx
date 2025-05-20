import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Send as SendIcon,
} from '@mui/icons-material';
import type { EmailTemplate, EmailRecipient } from '../types/email';
import { sendAutomatedEmails, sendBulkEmailsToSecretaries } from '../services/emailService';

// Mock data for development
const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Mezuniyet Süreci Başlangıcı',
    subject: 'Mezuniyet Süreci Bilgilendirmesi',
    content: 'Sayın {name},\n\nMezuniyet süreci hakkında bilgilendirme...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Belge Teslim Hatırlatması',
    subject: 'Mezuniyet İçin Gerekli Belgeler',
    content: 'Sayın {name},\n\nLütfen aşağıdaki belgeleri teslim ediniz...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockRecipients: EmailRecipient[] = [
  {
    id: '1',
    email: 'secretary1@iyte.edu.tr',
    name: 'Bölüm Sekreteri 1',
    department: 'Bilgisayar Mühendisliği',
    faculty: 'Mühendislik',
  },
  {
    id: '2',
    email: 'secretary2@iyte.edu.tr',
    name: 'Bölüm Sekreteri 2',
    department: 'Makine Mühendisliği',
    faculty: 'Mühendislik',
  },
];

const SendGraduationMail = () => {
  const [selectedRecipients, setSelectedRecipients] = useState<EmailRecipient[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendToAllSecretaries, setSendToAllSecretaries] = useState(false);
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: 'none',
    align: 'left',
  });

  const handleTemplateChange = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setContent(template.content);
    }
  };

  const handleFormatChange = (format: string, value: any) => {
    setFormatting(prev => ({
      ...prev,
      [format]: value
    }));
  };

  const handleSend = async () => {
    if (!sendToAllSecretaries && selectedRecipients.length === 0) {
      setErrorMessage('Lütfen en az bir alıcı seçin');
      setShowError(true);
      return;
    }
    if (!subject.trim()) {
      setErrorMessage('Lütfen bir konu girin');
      setShowError(true);
      return;
    }
    if (!content.trim()) {
      setErrorMessage('Lütfen bir içerik girin');
      setShowError(true);
      return;
    }

    setIsSending(true);
    try {
      const template: EmailTemplate = {
        id: selectedTemplate || 'custom',
        name: 'Custom Email',
        subject: subject,
        content: content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let success;
      if (sendToAllSecretaries) {
        success = await sendBulkEmailsToSecretaries(template, content);
      } else {
        success = await sendAutomatedEmails(selectedRecipients, template, content);
      }

      if (success) {
        setShowSuccess(true);
        // Reset form
        setSelectedRecipients([]);
        setSelectedTemplate('');
        setSubject('');
        setContent('');
        setFormatting({
          bold: false,
          italic: false,
          underline: false,
          list: 'none',
          align: 'left',
        });
      } else {
        setErrorMessage('E-posta gönderilirken bir hata oluştu');
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('E-posta gönderilirken bir hata oluştu');
      setShowError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mezuniyet E-postası Gönder
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              E-posta Formu
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={sendToAllSecretaries}
                  onChange={(e) => setSendToAllSecretaries(e.target.checked)}
                />
              }
              label="Tüm Bölüm Sekreterlerine Gönder"
              sx={{ mb: 2 }}
            />

            {!sendToAllSecretaries && (
              <Autocomplete
                multiple
                options={mockRecipients}
                getOptionLabel={(option) => `${option.name} (${option.email})`}
                value={selectedRecipients}
                onChange={(_, newValue) => setSelectedRecipients(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Alıcılar"
                    placeholder="Alıcı seçin"
                    fullWidth
                    margin="normal"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={`${option.name} (${option.email})`}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            )}
            <Autocomplete
              multiple
              options={mockRecipients}
              getOptionLabel={(option) => `${option.name} (${option.email})`}
              value={selectedRecipients}
              onChange={(_, newValue) => setSelectedRecipients(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alıcılar"
                  placeholder="Alıcı seçin"
                  fullWidth
                  margin="normal"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={`${option.name} (${option.email})`}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>E-posta Şablonu</InputLabel>
              <Select
                value={selectedTemplate}
                label="E-posta Şablonu"
                onChange={(e) => handleTemplateChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>Şablon Seçin</em>
                </MenuItem>
                {mockTemplates.map((template) => (
                  <MenuItem key={template.id} value={template.id}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Konu"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              margin="normal"
            />

            <Box sx={{ mt: 2, mb: 1 }}>
              <ToggleButtonGroup
                size="small"
                aria-label="text formatting"
                sx={{ mb: 1 }}
              >
                <ToggleButton
                  value="bold"
                  selected={formatting.bold}
                  onChange={() => handleFormatChange('bold', !formatting.bold)}
                >
                  <FormatBold />
                </ToggleButton>
                <ToggleButton
                  value="italic"
                  selected={formatting.italic}
                  onChange={() => handleFormatChange('italic', !formatting.italic)}
                >
                  <FormatItalic />
                </ToggleButton>
                <ToggleButton
                  value="underline"
                  selected={formatting.underline}
                  onChange={() => handleFormatChange('underline', !formatting.underline)}
                >
                  <FormatUnderlined />
                </ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                size="small"
                aria-label="list formatting"
                sx={{ ml: 1, mb: 1 }}
              >
                <ToggleButton
                  value="bullet"
                  selected={formatting.list === 'bullet'}
                  onChange={() => handleFormatChange('list', formatting.list === 'bullet' ? 'none' : 'bullet')}
                >
                  <FormatListBulleted />
                </ToggleButton>
                <ToggleButton
                  value="number"
                  selected={formatting.list === 'number'}
                  onChange={() => handleFormatChange('list', formatting.list === 'number' ? 'none' : 'number')}
                >
                  <FormatListNumbered />
                </ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                size="small"
                aria-label="text alignment"
                sx={{ ml: 1, mb: 1 }}
                value={formatting.align}
                exclusive
                onChange={(_, value) => value && handleFormatChange('align', value)}
              >
                <ToggleButton value="left">
                  <FormatAlignLeft />
                </ToggleButton>
                <ToggleButton value="center">
                  <FormatAlignCenter />
                </ToggleButton>
                <ToggleButton value="right">
                  <FormatAlignRight />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <TextField
              fullWidth
              label="İçerik"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={6}
              margin="normal"
              sx={{
                '& .MuiInputBase-root': {
                  fontStyle: formatting.italic ? 'italic' : 'normal',
                  fontWeight: formatting.bold ? 'bold' : 'normal',
                  textDecoration: formatting.underline ? 'underline' : 'none',
                  textAlign: formatting.align,
                },
              }}
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleSend}
              >
                Gönder
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="E-posta Şablonları"
              action={
                <IconButton>
                  <AddIcon />
                </IconButton>
              }
            />
            <CardContent>
              {mockTemplates.map((template) => (
                <Box
                  key={template.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="subtitle1">{template.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {template.subject}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          E-posta başarıyla gönderildi
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SendGraduationMail; 