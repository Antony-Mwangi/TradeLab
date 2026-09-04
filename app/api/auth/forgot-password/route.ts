// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });

    // For security, don't reveal if user exists
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, you will receive a password reset email." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token and expiry (1 hour)
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Build reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Only import Resend and send email if API key exists
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "TradeLab <noreply@tradelab.com>",
          to: user.email,
          subject: "Reset Your TradeLab Password",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Reset Your Password</title>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px 20px; }
                  .container { max-width: 500px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; padding: 40px; border: 1px solid #2a2a2a; }
                  .logo { font-size: 24px; font-weight: bold; color: #10b981; margin-bottom: 20px; }
                  .logo span { color: #ffffff; }
                  h1 { font-size: 24px; margin-bottom: 12px; }
                  p { color: #9ca3af; line-height: 1.6; margin-bottom: 20px; }
                  .button { display: inline-block; background: linear-gradient(135deg, #10b981, #06b6d4); color: #ffffff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 16px 0; }
                  .button:hover { opacity: 0.9; }
                  .divider { border-top: 1px solid #2a2a2a; margin: 24px 0; }
                  .footer { font-size: 12px; color: #6b7280; text-align: center; }
                  .token { background: #0a0a0a; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 14px; color: #10b981; word-break: break-all; margin: 12px 0; }
                  .expiry { color: #6b7280; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="logo">Trade<span>Lab</span></div>
                  <h1>Reset Your Password</h1>
                  <p>We received a request to reset your TradeLab password. Click the button below to create a new password.</p>
                  <div style="text-align: center;">
                    <a href="${resetUrl}" class="button">Reset Password</a>
                  </div>
                  <p style="font-size: 14px; color: #6b7280;">Or copy and paste this link into your browser:</p>
                  <div class="token">${resetUrl}</div>
                  <div class="divider"></div>
                  <p class="expiry">This link will expire in <strong>1 hour</strong>.</p>
                  <p class="expiry">If you didn't request this, please ignore this email.</p>
                  <div class="divider"></div>
                  <div class="footer">© ${new Date().getFullYear()} TradeLab. All rights reserved.</div>
                </div>
              </body>
            </html>
          `,
        });
        
        console.log("Password reset email sent to:", user.email);
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Still return success to prevent user enumeration
      }
    } else {
      // Log warning but don't fail the request
      console.warn("RESEND_API_KEY not configured. Email not sent.");
      console.log("Reset URL (development):", resetUrl);
    }

    return NextResponse.json(
      { message: "If an account exists, you will receive a password reset email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}