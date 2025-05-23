using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Application.Features.Notifications.Queries.GetList;

public class GetListNotificationQuery : IRequest<GetListResponse<GetListNotificationListItemDto>>
{
    public PageRequest PageRequest { get; set; }
    public Guid? RecipientUserId { get; set; }
    public bool? IsRead { get; set; }

    public class GetListNotificationQueryHandler : IRequestHandler<GetListNotificationQuery, GetListResponse<GetListNotificationListItemDto>>
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IMapper _mapper;

        public GetListNotificationQueryHandler(INotificationRepository notificationRepository, IMapper mapper)
        {
            _notificationRepository = notificationRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListNotificationListItemDto>> Handle(GetListNotificationQuery request, CancellationToken cancellationToken)
        {
            // Build predicate based on filters
            Expression<Func<Notification, bool>>? predicate = BuildPredicate(request);

            IPaginate<Notification> notifications = await _notificationRepository.GetListAsync(
                predicate: predicate,
                include: n => n.Include(x => x.RecipientUser)
                              .Include(x => x.RelatedProcess),
                orderBy: n => n.OrderByDescending(x => x.CreationDate), // Latest notifications first
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListNotificationListItemDto> response = _mapper.Map<GetListResponse<GetListNotificationListItemDto>>(notifications);
            return response;
        }

        private Expression<Func<Notification, bool>>? BuildPredicate(GetListNotificationQuery request)
        {
            var predicates = new List<Expression<Func<Notification, bool>>>();

            // Filter by recipient user ID
            if (request.RecipientUserId.HasValue)
            {
                predicates.Add(n => n.RecipientUserId == request.RecipientUserId.Value);
            }

            // Filter by read status
            if (request.IsRead.HasValue)
            {
                predicates.Add(n => n.IsRead == request.IsRead.Value);
            }

            // Combine all predicates with AND logic
            if (!predicates.Any())
                return null;

            Expression<Func<Notification, bool>> combinedPredicate = predicates.First();
            foreach (var predicate in predicates.Skip(1))
            {
                var parameter = Expression.Parameter(typeof(Notification), "n");
                var left = Expression.Invoke(combinedPredicate, parameter);
                var right = Expression.Invoke(predicate, parameter);
                var andExpression = Expression.AndAlso(left, right);
                combinedPredicate = Expression.Lambda<Func<Notification, bool>>(andExpression, parameter);
            }

            return combinedPredicate;
        }
    }
}