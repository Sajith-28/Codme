import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
try:
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
except ValueError:
    SMTP_PORT = 587
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER)

def send_reset_email(to_email: str, reset_code: str) -> bool:
    if not all([SMTP_HOST, SMTP_USER, SMTP_PASSWORD]):
        print("⚠️ SMTP environment variables not configured. Skipping email sending.")
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_FROM
        msg['To'] = to_email
        msg['Subject'] = "CODME - Password Reset Verification Code"

        body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #0a0a0f; color: #e2e8f0; padding: 20px; text-align: center;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #14141e; border: 1px solid #333; border-radius: 12px; padding: 30px; box-shadow: 0 4px 15px rgba(0, 240, 255, 0.1);">
                <h1 style="color: #00f0ff; font-family: monospace; font-size: 28px; margin-bottom: 20px;">CODME SYSTEM RESET</h1>
                <p style="font-size: 16px; line-height: 1.5; color: #94a3b8;">You requested a password reset for your CODME account. Use the verification code below to complete the process:</p>
                <div style="background-color: #0a0a0f; border: 1px solid #00f0ff; border-radius: 8px; padding: 15px 30px; font-size: 32px; font-weight: bold; font-family: monospace; letter-spacing: 5px; color: #b026ff; margin: 25px 0; display: inline-block; text-shadow: 0 0 10px rgba(176, 38, 255, 0.3);">
                    {reset_code}
                </div>
                <p style="font-size: 14px; color: #64748b; margin-top: 20px;">This code is valid for 15 minutes. If you did not request this, you can safely ignore this email.</p>
            </div>
        </body>
        </html>
        """
        msg.attach(MIMEText(body, 'html'))

        if SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT)
        else:
            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
            server.starttls()

        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_FROM, to_email, msg.as_string())
        server.quit()
        print(f"📧 Password reset email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Failed to send reset email to {to_email}: {str(e)}")
        return False
