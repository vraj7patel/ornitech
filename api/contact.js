import nodemailer from 'nodemailer';

// ─── User-Agent Parser (lightweight, no dependencies) ───────────────────────
function parseUserAgent(ua) {
  if (!ua) return { browser: 'Unknown', os: 'Unknown', device: 'Unknown' };

  let browser = 'Unknown';
  if (ua.includes('Edg/')) browser = 'Microsoft Edge';
  else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('Chrome/') && !ua.includes('Edg/')) browser = 'Google Chrome';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
  else if (ua.includes('MSIE') || ua.includes('Trident/')) browser = 'Internet Explorer';

  let os = 'Unknown';
  if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS X')) os = 'macOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Linux')) os = 'Linux';

  let device = 'Desktop';
  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) device = 'Mobile';
  else if (ua.includes('iPad') || ua.includes('Tablet')) device = 'Tablet';

  return { browser, os, device };
}

// ─── Admin Notification HTML Template ────────────────────────────────────────
function buildAdminEmail({ fullName, email, company, message, submittedAt, ip, country, browser, os, device }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>New Contact | Ornitech</title>
</head>
<body style="margin:0;padding:0;background-color:#050816;font-family:'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#FFFFFF;">

<!-- Wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050816;">
<tr><td align="center" style="padding:40px 16px;">

<!-- Container -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Logo & Badge -->
  <tr><td align="center" style="padding-bottom:32px;">
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <img src="https://www.ornitech.in/logo.png" alt="Ornitech Logo" style="display:block;height:45px;width:auto;outline:none;border:none;text-decoration:none;" />
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Label -->
  <tr><td align="center" style="padding-bottom:12px;">
    <span style="display:inline-block;background:linear-gradient(135deg,rgba(0,229,255,0.15),rgba(99,102,241,0.15));border:1px solid rgba(0,229,255,0.3);border-radius:20px;padding:6px 18px;font-size:11px;font-weight:600;letter-spacing:2px;color:#00E5FF;text-transform:uppercase;">⚡ New Contact Request</span>
  </td></tr>

  <!-- Title -->
  <tr><td align="center" style="padding-bottom:8px;">
    <h1 style="margin:0;font-size:28px;font-weight:800;background:linear-gradient(90deg,#00E5FF,#6366F1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Someone wants to build something amazing.</h1>
  </td></tr>

  <!-- Subtitle -->
  <tr><td align="center" style="padding-bottom:36px;">
    <p style="margin:0;font-size:14px;color:#94A3B8;line-height:1.6;">A visitor has submitted a new inquiry through the Ornitech website.</p>
  </td></tr>

  <!-- Main Card -->
  <tr><td style="background:#0F172A;border-radius:16px;border:1px solid rgba(0,229,255,0.1);padding:32px;margin-bottom:24px;">

    <!-- Full Name -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="background:rgba(0,229,255,0.06);border-radius:12px;padding:16px 20px;border:1px solid rgba(0,229,255,0.08);">
          <div style="font-size:11px;font-weight:600;color:#00E5FF;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">👤 Full Name</div>
          <div style="font-size:16px;font-weight:600;color:#FFFFFF;">${fullName}</div>
        </td>
      </tr>
    </table>

    <!-- Email -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="background:rgba(99,102,241,0.06);border-radius:12px;padding:16px 20px;border:1px solid rgba(99,102,241,0.08);">
          <div style="font-size:11px;font-weight:600;color:#6366F1;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">📧 Email Address</div>
          <div style="font-size:16px;font-weight:600;color:#FFFFFF;"><a href="mailto:${email}" style="color:#00E5FF;text-decoration:none;">${email}</a></div>
        </td>
      </tr>
    </table>

    <!-- Company -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="background:rgba(0,229,255,0.06);border-radius:12px;padding:16px 20px;border:1px solid rgba(0,229,255,0.08);">
          <div style="font-size:11px;font-weight:600;color:#00E5FF;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">🏢 Company</div>
          <div style="font-size:16px;font-weight:600;color:#FFFFFF;">${company || 'Not provided'}</div>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:rgba(99,102,241,0.06);border-radius:12px;padding:16px 20px;border:1px solid rgba(99,102,241,0.08);">
          <div style="font-size:11px;font-weight:600;color:#6366F1;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">💬 Message</div>
          <div style="font-size:14px;font-weight:400;color:#E2E8F0;line-height:1.7;white-space:pre-wrap;">${message}</div>
        </td>
      </tr>
    </table>

  </td></tr>

  <!-- Spacer -->
  <tr><td style="height:24px;"></td></tr>

  <!-- Technical Details Card -->
  <tr><td style="background:#0F172A;border-radius:16px;border:1px solid rgba(99,102,241,0.1);padding:28px 32px;">

    <div style="font-size:11px;font-weight:700;color:#6366F1;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;">🔍 Technical Details</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;color:#94A3B8;font-weight:500;">Submission Time</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:#FFFFFF;text-align:right;font-weight:600;">${submittedAt}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;color:#94A3B8;font-weight:500;">IP Address</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:#FFFFFF;text-align:right;font-family:'Courier New',monospace;font-weight:600;">${ip}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;color:#94A3B8;font-weight:500;">Country</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:#FFFFFF;text-align:right;font-weight:600;">${country}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;color:#94A3B8;font-weight:500;">Browser</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:#FFFFFF;text-align:right;font-weight:600;">${browser}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;color:#94A3B8;font-weight:500;">Operating System</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:#FFFFFF;text-align:right;font-weight:600;">${os}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;font-size:12px;color:#94A3B8;font-weight:500;">Device</td>
        <td style="padding:10px 0;font-size:13px;color:#FFFFFF;text-align:right;font-weight:600;">${device}</td>
      </tr>
    </table>

  </td></tr>

  <!-- Spacer -->
  <tr><td style="height:24px;"></td></tr>

  <!-- Action Buttons -->
  <tr><td align="center" style="padding-bottom:12px;">
    <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#00E5FF,#6366F1);color:#050816;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:0.5px;">↩ Reply to Client</a>
  </td></tr>
  <tr><td align="center" style="padding-bottom:36px;">
    <a href="https://www.ornitech.in" style="display:inline-block;background:transparent;color:#00E5FF;font-size:13px;font-weight:600;text-decoration:none;padding:10px 28px;border-radius:10px;border:1px solid rgba(0,229,255,0.3);letter-spacing:0.5px;">🌐 Open Website</a>
  </td></tr>

  <!-- Divider -->
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,0.2),rgba(99,102,241,0.2),transparent);"></td></tr>

  <!-- Footer -->
  <tr><td align="center" style="padding-top:32px;">
    <p style="margin:0 0 6px;font-size:11px;color:#475569;">This notification was automatically generated by the Ornitech Contact API.</p>
    <p style="margin:0 0 6px;font-size:11px;color:#475569;">Powered by <span style="color:#00E5FF;font-weight:600;">Ornitech AI Infrastructure</span></p>
    <p style="margin:0 0 12px;">
      <a href="https://www.ornitech.in" style="color:#6366F1;font-size:11px;text-decoration:none;">www.ornitech.in</a>
      <span style="color:#334155;margin:0 8px;">|</span>
      <a href="mailto:support@ornitech.in" style="color:#6366F1;font-size:11px;text-decoration:none;">support@ornitech.in</a>
    </p>
    <p style="margin:0;font-size:10px;color:#334155;">© 2026 Ornitech · Building Intelligent Software for the Future.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── User Thank You HTML Template ────────────────────────────────────────────
function buildThankYouEmail({ fullName, email, company, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Thank You | Ornitech</title>
</head>
<body style="margin:0;padding:0;background-color:#050816;font-family:'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#FFFFFF;">

<!-- Wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050816;">
<tr><td align="center" style="padding:40px 16px;">

<!-- Container -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Logo -->
  <tr><td align="center" style="padding-bottom:32px;">
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <img src="https://www.ornitech.in/logo.png" alt="Ornitech Logo" style="display:block;height:45px;width:auto;outline:none;border:none;text-decoration:none;" />
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Heading -->
  <tr><td align="center" style="padding-bottom:8px;">
    <h1 style="margin:0;font-size:28px;font-weight:800;background:linear-gradient(90deg,#00E5FF,#6366F1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Thanks for reaching out, ${fullName}.</h1>
  </td></tr>

  <!-- Subtitle -->
  <tr><td align="center" style="padding-bottom:36px;">
    <p style="margin:0;font-size:14px;color:#94A3B8;line-height:1.6;">Your request has entered our innovation pipeline.</p>
  </td></tr>

  <!-- Hero Card -->
  <tr><td style="background:#0F172A;border-radius:16px;border:1px solid rgba(0,229,255,0.1);padding:32px;">
    <p style="margin:0 0 8px;font-size:16px;color:#FFFFFF;font-weight:600;">Hi ${fullName},</p>
    <p style="margin:0 0 16px;font-size:14px;color:#CBD5E1;line-height:1.7;">Thank you for contacting <span style="color:#00E5FF;font-weight:600;">Ornitech</span>. We've successfully received your inquiry.</p>
    <p style="margin:0;font-size:14px;color:#CBD5E1;line-height:1.7;">Our technical team is reviewing your requirements and we'll connect with you shortly.</p>
  </td></tr>

  <!-- Spacer -->
  <tr><td style="height:24px;"></td></tr>

  <!-- Submission Details Card -->
  <tr><td style="background:#0F172A;border-radius:16px;border:1px solid rgba(99,102,241,0.1);padding:32px;">
    <div style="font-size:11px;font-weight:700;color:#6366F1;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;">📋 Your Submission</div>

    <!-- Name -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="background:rgba(0,229,255,0.06);border-radius:10px;padding:14px 18px;border:1px solid rgba(0,229,255,0.08);">
          <div style="font-size:10px;font-weight:600;color:#00E5FF;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">👤 Name</div>
          <div style="font-size:15px;font-weight:600;color:#FFFFFF;">${fullName}</div>
        </td>
      </tr>
    </table>

    <!-- Email -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="background:rgba(99,102,241,0.06);border-radius:10px;padding:14px 18px;border:1px solid rgba(99,102,241,0.08);">
          <div style="font-size:10px;font-weight:600;color:#6366F1;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">📧 Email</div>
          <div style="font-size:15px;font-weight:600;color:#FFFFFF;">${email}</div>
        </td>
      </tr>
    </table>

    <!-- Company -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="background:rgba(0,229,255,0.06);border-radius:10px;padding:14px 18px;border:1px solid rgba(0,229,255,0.08);">
          <div style="font-size:10px;font-weight:600;color:#00E5FF;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">🏢 Company</div>
          <div style="font-size:15px;font-weight:600;color:#FFFFFF;">${company || 'Not provided'}</div>
        </td>
      </tr>
    </table>

    <!-- Requirement -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:rgba(99,102,241,0.06);border-radius:10px;padding:14px 18px;border:1px solid rgba(99,102,241,0.08);">
          <div style="font-size:10px;font-weight:600;color:#6366F1;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">💬 Requirement</div>
          <div style="font-size:14px;font-weight:400;color:#E2E8F0;line-height:1.7;white-space:pre-wrap;">${message}</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Spacer -->
  <tr><td style="height:24px;"></td></tr>

  <!-- Progress Timeline Card -->
  <tr><td style="background:#0F172A;border-radius:16px;border:1px solid rgba(0,229,255,0.1);padding:28px 32px;">
    <div style="font-size:11px;font-weight:700;color:#00E5FF;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;">🚀 Project Status</div>

    <!-- Step 1 - Active -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td width="40" valign="top">
          <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#22C55E,#16A34A);text-align:center;line-height:28px;font-size:13px;color:#FFFFFF;font-weight:700;">✓</div>
        </td>
        <td valign="middle" style="padding-left:12px;">
          <div style="font-size:14px;font-weight:600;color:#22C55E;">Request Received</div>
          <div style="font-size:11px;color:#94A3B8;margin-top:2px;">Your inquiry has been logged</div>
        </td>
      </tr>
    </table>

    <!-- Connector -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr><td width="40" align="center"><div style="width:2px;height:20px;background:linear-gradient(180deg,#22C55E,#F59E0B);margin:0 auto;"></div></td><td></td></tr>
    </table>

    <!-- Step 2 - In Progress -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td width="40" valign="top">
          <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#F59E0B,#D97706);text-align:center;line-height:28px;font-size:13px;color:#FFFFFF;font-weight:700;">⟳</div>
        </td>
        <td valign="middle" style="padding-left:12px;">
          <div style="font-size:14px;font-weight:600;color:#F59E0B;">Technical Review</div>
          <div style="font-size:11px;color:#94A3B8;margin-top:2px;">Our team is evaluating your requirements</div>
        </td>
      </tr>
    </table>

    <!-- Connector -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr><td width="40" align="center"><div style="width:2px;height:20px;background:rgba(255,255,255,0.08);margin:0 auto;"></div></td><td></td></tr>
    </table>

    <!-- Step 3 - Pending -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td width="40" valign="top">
          <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);text-align:center;line-height:28px;font-size:13px;color:#64748B;">3</div>
        </td>
        <td valign="middle" style="padding-left:12px;">
          <div style="font-size:14px;font-weight:600;color:#64748B;">Solution Planning</div>
          <div style="font-size:11px;color:#475569;margin-top:2px;">Architecture &amp; approach design</div>
        </td>
      </tr>
    </table>

    <!-- Connector -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr><td width="40" align="center"><div style="width:2px;height:20px;background:rgba(255,255,255,0.08);margin:0 auto;"></div></td><td></td></tr>
    </table>

    <!-- Step 4 - Pending -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td width="40" valign="top">
          <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);text-align:center;line-height:28px;font-size:13px;color:#64748B;">4</div>
        </td>
        <td valign="middle" style="padding-left:12px;">
          <div style="font-size:14px;font-weight:600;color:#64748B;">Our Team Will Contact You</div>
          <div style="font-size:11px;color:#475569;margin-top:2px;">Personalized consultation call</div>
        </td>
      </tr>
    </table>

    <!-- Expected Response -->
    <div style="background:rgba(0,229,255,0.06);border-radius:10px;padding:12px 16px;border:1px solid rgba(0,229,255,0.1);text-align:center;">
      <span style="font-size:11px;color:#94A3B8;">Expected Response Time: </span>
      <span style="font-size:12px;color:#00E5FF;font-weight:700;">Within 24 Business Hours</span>
    </div>

  </td></tr>

  <!-- Spacer -->
  <tr><td style="height:24px;"></td></tr>

  <!-- Action Buttons -->
  <tr><td align="center" style="padding-bottom:12px;">
    <a href="https://www.ornitech.in/services" style="display:inline-block;background:linear-gradient(135deg,#00E5FF,#6366F1);color:#050816;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:0.5px;">🚀 Explore Our Services</a>
  </td></tr>
  <tr><td align="center" style="padding-bottom:36px;">
    <a href="https://www.ornitech.in" style="display:inline-block;background:transparent;color:#00E5FF;font-size:13px;font-weight:600;text-decoration:none;padding:10px 28px;border-radius:10px;border:1px solid rgba(0,229,255,0.3);letter-spacing:0.5px;">🌐 Visit Website</a>
  </td></tr>

  <!-- Why Ornitech Card -->
  <tr><td style="background:#0F172A;border-radius:16px;border:1px solid rgba(99,102,241,0.1);padding:28px 32px;">
    <div style="font-size:11px;font-weight:700;color:#6366F1;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;">💡 Why Ornitech?</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding:6px 4px 6px 0;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">AI Powered Solutions</span></div>
        </td>
        <td width="50%" style="padding:6px 0 6px 4px;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">Custom Web Development</span></div>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 4px 6px 0;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">SaaS Development</span></div>
        </td>
        <td style="padding:6px 0 6px 4px;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">Mobile Applications</span></div>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 4px 6px 0;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">Cloud Infrastructure</span></div>
        </td>
        <td style="padding:6px 0 6px 4px;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">Automation</span></div>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 4px 6px 0;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">UI/UX Design</span></div>
        </td>
        <td style="padding:6px 0 6px 4px;vertical-align:top;">
          <div style="font-size:13px;color:#CBD5E1;">✔ <span style="color:#FFFFFF;font-weight:500;">API Development</span></div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Spacer -->
  <tr><td style="height:24px;"></td></tr>

  <!-- Immediate Assistance -->
  <tr><td align="center" style="padding-bottom:24px;">
    <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.15);border-radius:12px;padding:16px 24px;display:inline-block;">
      <span style="font-size:13px;color:#94A3B8;">Need Immediate Assistance? </span>
      <a href="mailto:support@ornitech.in" style="color:#00E5FF;font-weight:600;font-size:13px;text-decoration:none;">support@ornitech.in</a>
    </div>
  </td></tr>

  <!-- Divider -->
  <tr><td style="height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,0.2),rgba(99,102,241,0.2),transparent);"></td></tr>

  <!-- Footer -->
  <tr><td align="center" style="padding-top:32px;">
    <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#FFFFFF;">Ornitech</p>
    <p style="margin:0 0 16px;font-size:12px;color:#94A3B8;">Building Intelligent Software for the Future.</p>

    <!-- Social Links -->
    <p style="margin:0 0 16px;">
      <a href="https://www.linkedin.com/company/ornitech" style="color:#6366F1;font-size:12px;text-decoration:none;font-weight:500;margin:0 10px;">LinkedIn</a>
      <a href="https://github.com/ornitech" style="color:#6366F1;font-size:12px;text-decoration:none;font-weight:500;margin:0 10px;">GitHub</a>
      <a href="https://www.instagram.com/ornitech.in" style="color:#6366F1;font-size:12px;text-decoration:none;font-weight:500;margin:0 10px;">Instagram</a>
    </p>

    <p style="margin:0 0 6px;">
      <a href="https://www.ornitech.in" style="color:#00E5FF;font-size:11px;text-decoration:none;">www.ornitech.in</a>
    </p>
    <p style="margin:0;font-size:10px;color:#334155;">© 2026 Ornitech · This email was generated automatically by the Ornitech Contact System.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Nodemailer Transport ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ─── API Handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  // Validate env
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return res.status(500).json({
      success: false,
      message: 'Server Configuration Error: GMAIL_USER or GMAIL_PASS environment variables are missing.',
      error: 'Missing environment variables.'
    });
  }

  const { fullName, email, company, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  // Extract metadata from request headers
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'Unknown';
  const country = req.headers['x-vercel-ip-country'] || 'Unknown';
  const userAgent = req.headers['user-agent'] || '';
  const { browser, os, device } = parseUserAgent(userAgent);
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });

  // Build emails
  const adminHtml = buildAdminEmail({ fullName, email, company, message, submittedAt, ip, country, browser, os, device });
  const thankYouHtml = buildThankYouEmail({ fullName, email, company, message });

  const adminMail = {
    from: `"Ornitech Contact API" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to: `vrajpuse14@gmail.com, ${process.env.GMAIL_USER}`,
    subject: `🚀 New Project Inquiry from ${fullName} | Ornitech`,
    html: adminHtml,
    text: `New Contact: ${fullName} (${email}) - Company: ${company || 'N/A'} - Message: ${message}`,
  };

  const thankYouMail = {
    from: `"Ornitech" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your Innovation Journey Starts Today 🚀 | Ornitech`,
    html: thankYouHtml,
    text: `Hi ${fullName}, thank you for contacting Ornitech! We've received your inquiry and our team will get back to you within 24 business hours. - Team Ornitech`,
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(thankYouMail);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message.',
      error: error.message,
      code: error.code || null
    });
  }
}
