using Application.Constants;
using Application.Features.Auth.Rules;
using Application.Services.AuthService;
using Application.Services.Repositories;
using Domain.Entities;
using MediatR;
using NArchitecture.Core.Application.Dtos;
using NArchitecture.Core.Security.Hashing;
using NArchitecture.Core.Security.JWT;
using System.Text.Json.Serialization;
using NArchitecture.Core.Application.Pipelines.Validation;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;

namespace Application.Features.Auth.Commands.Register;

public class UserForRegisterDto : IDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    
    // Öğrenci özellikleri
    public string StudentNumber { get; set; } = string.Empty;
    public Guid DepartmentId { get; set; }
    public Guid FacultyId { get; set; }
}

public class RegisterCommand : IRequest<RegisteredResponse>
{
    public UserForRegisterDto UserForRegisterDto { get; set; }
    public string IpAddress { get; set; }

    public RegisterCommand()
    {
        UserForRegisterDto = null!;
        IpAddress = string.Empty;
    }

    public RegisterCommand(UserForRegisterDto userForRegisterDto, string ipAddress)
    {
        UserForRegisterDto = userForRegisterDto;
        IpAddress = ipAddress;
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, RegisteredResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly IAuthService _authService;
        private readonly AuthBusinessRules _authBusinessRules;
        private readonly IOperationClaimRepository _operationClaimRepository;
        private readonly IUserOperationClaimRepository _userOperationClaimRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public RegisterCommandHandler(
            IUserRepository userRepository,
            IStudentRepository studentRepository,
            IAuthService authService,
            AuthBusinessRules authBusinessRules,
            IOperationClaimRepository operationClaimRepository,
            IUserOperationClaimRepository userOperationClaimRepository,
            IDepartmentRepository departmentRepository
        )
        {
            _userRepository = userRepository;
            _studentRepository = studentRepository;
            _authService = authService;
            _authBusinessRules = authBusinessRules;
            _operationClaimRepository = operationClaimRepository;
            _userOperationClaimRepository = userOperationClaimRepository;
            _departmentRepository = departmentRepository;
        }

        public async Task<RegisteredResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            // 1. Öğrenciyi numarasına göre bul
            Student? student = await _studentRepository.GetAsync(
                predicate: s => s.StudentNumber == request.UserForRegisterDto.StudentNumber,
                cancellationToken: cancellationToken
            );

            if (student == null)
                throw new BusinessException("Student not found.");

            // 2. Öğrenciye ait kullanıcıyı bul (Student.Id == User.Id varsayımıyla)
            User? user = await _userRepository.GetAsync(predicate: u => u.Id == student.Id, cancellationToken: cancellationToken);

            if (user == null) // Bu durum normalde olmamalı, veri tutarsızlığıdır.
                throw new BusinessException("User not found for the given student.");

            // 3. Kullanıcı zaten aktif mi kontrol et
            if (user.IsActive)
                throw new BusinessException("An active account already exists for this student number.");

            // 4. Bölüm bilgilerini kontrol et
            if (student.DepartmentId != request.UserForRegisterDto.DepartmentId)
                throw new BusinessException("Department information does not match.");
            


            // 5. E-posta değişiyorsa, yeni e-postanın başkası tarafından kullanılmadığını kontrol et
            if (user.Email != request.UserForRegisterDto.Email)
            {
                await _authBusinessRules.UserEmailShouldBeNotExists(request.UserForRegisterDto.Email);
            }

            // 6. Kullanıcı bilgilerini güncelle
            user.FirstName = request.UserForRegisterDto.FirstName;
            user.LastName = request.UserForRegisterDto.LastName;
            user.PhoneNumber = request.UserForRegisterDto.PhoneNumber;
            user.Email = request.UserForRegisterDto.Email;
            user.UserName = request.UserForRegisterDto.Email;
            
            HashingHelper.CreatePasswordHash(
                request.UserForRegisterDto.Password,
                passwordHash: out byte[] passwordHash,
                passwordSalt: out byte[] passwordSalt
            );
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            
            user.IsActive = true;
            user.IsEmailVerified = true; // E-posta doğrulama yapıldığı için true olarak ayarlandı

            await _userRepository.UpdateAsync(user);

            // 7. Token'ları oluştur
            AccessToken createdAccessToken = await _authService.CreateAccessToken(user);
            Domain.Entities.RefreshToken createdRefreshToken = await _authService.CreateRefreshToken(user, request.IpAddress);
            Domain.Entities.RefreshToken addedRefreshToken = await _authService.AddRefreshToken(createdRefreshToken);

            RegisteredResponse registeredResponse = new() { AccessToken = createdAccessToken, RefreshToken = addedRefreshToken };
            return registeredResponse;
        }
    }
}
