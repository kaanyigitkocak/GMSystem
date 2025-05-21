namespace Application.SubServices.MailService
{

    public interface IMailService
    {
        Task SendMailAsync(MailDto mailDto);
    }
}
