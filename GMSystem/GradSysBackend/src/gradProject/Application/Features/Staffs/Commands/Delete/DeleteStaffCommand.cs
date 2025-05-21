using Application.Features.Staffs.Constants;
using Application.Features.Staffs.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Staffs.Commands.Delete;

public class DeleteStaffCommand : IRequest<DeletedStaffResponse>
{
    public Guid Id { get; set; }

    public class DeleteStaffCommandHandler : IRequestHandler<DeleteStaffCommand, DeletedStaffResponse>
    {
        private readonly IMapper _mapper;
        private readonly IStaffRepository _staffRepository;
        private readonly StaffBusinessRules _staffBusinessRules;

        public DeleteStaffCommandHandler(IMapper mapper, IStaffRepository staffRepository,
                                         StaffBusinessRules staffBusinessRules)
        {
            _mapper = mapper;
            _staffRepository = staffRepository;
            _staffBusinessRules = staffBusinessRules;
        }

        public async Task<DeletedStaffResponse> Handle(DeleteStaffCommand request, CancellationToken cancellationToken)
        {
            Staff? staff = await _staffRepository.GetAsync(predicate: s => s.Id == request.Id, cancellationToken: cancellationToken);
            await _staffBusinessRules.StaffShouldExistWhenSelected(staff);

            await _staffRepository.DeleteAsync(staff!);

            DeletedStaffResponse response = _mapper.Map<DeletedStaffResponse>(staff);
            return response;
        }
    }
}