using Application.Features.Staffs.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Staffs.Commands.Create;

public class CreateStaffCommand : IRequest<CreatedStaffResponse>
{
    public string? StaffIdentificationNumber { get; set; }
    public string? Title { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? FacultyId { get; set; }

    public class CreateStaffCommandHandler : IRequestHandler<CreateStaffCommand, CreatedStaffResponse>
    {
        private readonly IMapper _mapper;
        private readonly IStaffRepository _staffRepository;
        private readonly StaffBusinessRules _staffBusinessRules;

        public CreateStaffCommandHandler(IMapper mapper, IStaffRepository staffRepository,
                                         StaffBusinessRules staffBusinessRules)
        {
            _mapper = mapper;
            _staffRepository = staffRepository;
            _staffBusinessRules = staffBusinessRules;
        }

        public async Task<CreatedStaffResponse> Handle(CreateStaffCommand request, CancellationToken cancellationToken)
        {
            Staff staff = _mapper.Map<Staff>(request);

            await _staffRepository.AddAsync(staff);

            CreatedStaffResponse response = _mapper.Map<CreatedStaffResponse>(staff);
            return response;
        }
    }
}