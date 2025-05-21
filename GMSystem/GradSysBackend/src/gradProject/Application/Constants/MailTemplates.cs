namespace Application.Constants;

public static class MailTemplates
{
    public static class Settings
    {
        public const bool USE_HTML = true;
        public const string FONT_FAMILY = "'Segoe UI', Roboto, Arial, sans-serif";
        public const string FONT_SIZE = "15px";
        public const string PRIMARY_COLOR = "#4A6FFF";
        public const string BG_COLOR = "#f4f5f7";
        public const string TEXT_COLOR = "#333333";
    }

    public static class PasswordReset
    {
        public const string SUBJECT = "Password Reset Code";
        public static string GetBody(string code) => $@"
            <div style='font-family: {Settings.FONT_FAMILY}; font-size: {Settings.FONT_SIZE}; color: {Settings.TEXT_COLOR}; max-width: 600px; margin: 0 auto; background-color: {Settings.BG_COLOR}; padding: 20px; border-radius: 8px;'>
                <div style='background-color: white; padding: 30px; border-radius: 6px; box-shadow: 0px 2px 10px rgba(0,0,0,0.08);'>
                    <div style='text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px;'>
                        <h2 style='color: {Settings.PRIMARY_COLOR}; margin-bottom: 10px; font-weight: 600;'>Password Reset</h2>
                    </div>
                    <p style='margin-bottom: 20px; line-height: 1.5;'>Hello,</p>
                    <p style='margin-bottom: 20px; line-height: 1.5;'>You have requested a password reset for your account. You can use the code below to reset your password:</p>
                    <div style='background-color: #f0f4ff; padding: 15px; border-radius: 5px; text-align: center; margin: 25px 0;'>
                        <span style='font-size: 24px; font-weight: bold; letter-spacing: 5px; color: {Settings.PRIMARY_COLOR};'>{code}</span>
                    </div>
                    <p style='margin-bottom: 20px; line-height: 1.5;'>This code is valid for <strong>15 minutes</strong>.</p>
                    <p style='margin-bottom: 10px; line-height: 1.5;'>If you did not make this request, please ignore this email.</p>
                    <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 13px; color: #777; text-align: center;'>
                        <p>This is an automatically generated email, please do not reply.</p>
                    </div>
                </div>
            </div>";
    }

    public static class EmailVerification
    {
        public const string SUBJECT = "Email Verification Code";
        public static string GetBody(string code) => $@"
            <div style='font-family: {Settings.FONT_FAMILY}; font-size: {Settings.FONT_SIZE}; color: {Settings.TEXT_COLOR}; max-width: 600px; margin: 0 auto; background-color: {Settings.BG_COLOR}; padding: 20px; border-radius: 8px;'>
                <div style='background-color: white; padding: 30px; border-radius: 6px; box-shadow: 0px 2px 10px rgba(0,0,0,0.08);'>
                    <div style='text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px;'>
                        <h2 style='color: {Settings.PRIMARY_COLOR}; margin-bottom: 10px; font-weight: 600;'>Verify Your Email Address</h2>
                    </div>
                    <p style='margin-bottom: 20px; line-height: 1.5;'>Hello,</p>
                    <p style='margin-bottom: 20px; line-height: 1.5;'>Please use the following code to verify your email address:</p>
                    <div style='background-color: #f0f4ff; padding: 15px; border-radius: 5px; text-align: center; margin: 25px 0;'>
                        <span style='font-size: 24px; font-weight: bold; letter-spacing: 5px; color: {Settings.PRIMARY_COLOR};'>{code}</span>
                    </div>
                    <p style='margin-bottom: 20px; line-height: 1.5;'>This code is valid for <strong>15 minutes</strong>.</p>
                    <p style='margin-bottom: 10px; line-height: 1.5;'>If you did not create an account, please ignore this email.</p>
                    <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 13px; color: #777; text-align: center;'>
                        <p>This is an automatically generated email, please do not reply.</p>
                    </div>
                </div>
            </div>";
    }
} 