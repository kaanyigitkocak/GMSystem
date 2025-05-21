using Application.Features.Notifications.Constants;
using Application.Features.Notifications.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Notifications.Commands.Delete;

public class DeleteNotificationCommand : IRequest<DeletedNotificationResponse>
{
    public Guid Id { get; set; }

    public class DeleteNotificationCommandHandler : IRequestHandler<DeleteNotificationCommand, DeletedNotificationResponse>
    {
        private readonly IMapper _mapper;
        private readonly INotificationRepository _notificationRepository;
        private readonly NotificationBusinessRules _notificationBusinessRules;

        public DeleteNotificationCommandHandler(IMapper mapper, INotificationRepository notificationRepository,
                                         NotificationBusinessRules notificationBusinessRules)
        {
            _mapper = mapper;
            _notificationRepository = notificationRepository;
            _notificationBusinessRules = notificationBusinessRules;
        }

        public async Task<DeletedNotificationResponse> Handle(DeleteNotificationCommand request, CancellationToken cancellationToken)
        {
            Notification? notification = await _notificationRepository.GetAsync(predicate: n => n.Id == request.Id, cancellationToken: cancellationToken);
            await _notificationBusinessRules.NotificationShouldExistWhenSelected(notification);

            await _notificationRepository.DeleteAsync(notification!);

            DeletedNotificationResponse response = _mapper.Map<DeletedNotificationResponse>(notification);
            return response;
        }
    }
}