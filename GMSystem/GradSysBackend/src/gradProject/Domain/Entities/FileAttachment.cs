using System;
using Domain.Enums;
using NArchitecture.Core.Persistence.Repositories;
using System.Collections.Generic;

namespace Domain.Entities;

public class FileAttachment : Entity<Guid>
{
    public string FileName { get; set; } = string.Empty;   
    public string FilePath { get; set; } = string.Empty;   
    public StorageType StorageType { get; set; }
    public long FileSize { get; set; }                      
    public FileType FileType { get; set; }

    public string MimeType { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; }
    public Guid UploaderUserId { get; set; }
    public Guid? StudentUserId { get; set; }
    public Guid? ProcessId { get; set; }

    public virtual User UploaderUser { get; set; }
    public virtual User? StudentUser { get; set; }
    public virtual GraduationProcess? GraduationProcess { get; set; }
    public virtual TranscriptData? TranscriptData { get; set; }

    public FileAttachment()
    {
    }

    public FileAttachment(
        Guid uploaderUserId,
        string fileName,
        string filePath,
        StorageType storageType,
        long fileSize,
        FileType fileType,
        string mimeType,
        DateTime uploadDate,
        Guid? studentUserId = null,
        Guid? processId = null) : this()
    {
        Id = Guid.NewGuid();
        UploaderUserId = uploaderUserId;
        FileName = fileName;
        FilePath = filePath;
        StorageType = storageType;
        FileSize = fileSize;
        FileType = fileType;
        MimeType = mimeType;
        UploadDate = uploadDate;
        StudentUserId = studentUserId;
        ProcessId = processId;
    }
    
} 