import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Target recipient email explicitly requested by user
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'feidong185@gmail.com';

app.use(express.json());

// In-memory log of recent submissions
const bookingRecords: any[] = [];
const inquiryRecords: any[] = [];

// Helper to create nodemailer transporter if credentials are available
function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    notificationEmail: NOTIFICATION_EMAIL,
    serverTime: new Date().toISOString(),
    totalBookings: bookingRecords.length,
    totalInquiries: inquiryRecords.length,
  });
});

// API: Send Notification Email (Web Booking & Quick Inquiry)
app.post('/api/send-email', async (req, res) => {
  try {
    const { type, data } = req.body;
    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    const recipient = NOTIFICATION_EMAIL;

    let subject = '';
    let textContent = '';
    let htmlContent = '';

    if (type === 'booking') {
      bookingRecords.unshift({ ...data, receivedAt: timestamp });
      if (bookingRecords.length > 50) bookingRecords.pop();

      subject = `【Art House 新体验课预约】${data.studentName || '学员'} - ${data.courseTitle || '课程'}`;
      
      textContent = `
Art House 体验课新预约通知
==================================
预约编号: ${data.id || 'N/A'}
学员姓名: ${data.studentName || '未填写'}
联系电话: ${data.phone || '未填写'}
电子邮箱: ${data.email || '未填写'}
联络方式: ${data.contactMethod || 'N/A'} (${data.contactAccount || '无账号'})
预约课程: ${data.courseTitle || '未指定'}
预约日期: ${data.date || '未选择'}
预约时段: ${data.timeSlot || '未选择'}
预约人数: ${data.attendeeCount || 1} 人
期望语言: ${data.languagePreference || '中文/日文'}
绘画基础: ${data.experienceLevel || '初学'}
费用预估: ¥${data.totalPrice || 0}
备注说明: ${data.specialNotes || '无特殊备注'}
提交时间: ${timestamp} (日本时间)
==================================
`;

      htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; border: 1px solid #E5DCD0; border-radius: 16px; overflow: hidden; color: #2C2825;">
          <div style="background: #E84A27; color: #FFFFFF; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px;">🎨 Art House 体验课新预约通知</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">预约编号: <strong>${data.id || 'N/A'}</strong></p>
          </div>
          
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63; width: 35%;">学员姓名</td>
                <td style="padding: 10px 0; color: #2C2825; font-size: 16px; font-weight: bold;">${data.studentName || '未填写'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">联系电话</td>
                <td style="padding: 10px 0; color: #E84A27; font-weight: bold;"><a href="tel:${data.phone}" style="color: #E84A27; text-decoration: none;">${data.phone || '未填写'}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">电子邮箱</td>
                <td style="padding: 10px 0; color: #2C2825;"><a href="mailto:${data.email}" style="color: #1967D2;">${data.email || '未填写'}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">备用社交账号</td>
                <td style="padding: 10px 0; color: #2C2825;">${data.contactMethod || 'N/A'}: ${data.contactAccount || '未填写'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">预约课程</td>
                <td style="padding: 10px 0; color: #2C2825; font-weight: bold;">${data.courseTitle || '未指定'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">预约时间</td>
                <td style="padding: 10px 0; color: #2C2825;">📅 <strong>${data.date || '未选择'}</strong> (${data.timeSlot || '未选择'})</td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">人数与语言</td>
                <td style="padding: 10px 0; color: #2C2825;">${data.attendeeCount || 1} 人 / 偏好语言: ${data.languagePreference || '中文/日文'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">经验与费用</td>
                <td style="padding: 10px 0; color: #2C2825;">基础: ${data.experienceLevel || '初学'} / 预估: <strong>¥${data.totalPrice || 0}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63; vertical-align: top;">备注留言</td>
                <td style="padding: 10px 0; color: #2C2825; line-height: 1.5;">${data.specialNotes || '无特殊说明'}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 14px; background: #FAF0E6; border-radius: 10px; font-size: 12px; color: #7A6E63; text-align: center;">
              📍 爱知县名古屋市天白区植田西1丁目707番地1 · 专属车位2台<br/>
              📅 提交时间: ${timestamp} (JST)
            </div>
          </div>
        </div>
      `;
    } else {
      // Inquiry message
      inquiryRecords.unshift({ ...data, receivedAt: timestamp });
      if (inquiryRecords.length > 50) inquiryRecords.pop();

      subject = `【Art House 网站快速留言咨询】来自 ${data.name || '访客'}`;

      textContent = `
Art House 网站快速留言咨询
==================================
咨询人姓名: ${data.name || '未填写'}
联系方式: ${data.contact || '未填写'}
咨询内容:
${data.message || '未填写具体内容'}
----------------------------------
提交时间: ${timestamp} (日本时间)
==================================
`;

      htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; border: 1px solid #E5DCD0; border-radius: 16px; overflow: hidden; color: #2C2825;">
          <div style="background: #2C2825; color: #FFFFFF; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; font-weight: bold;">💬 Art House 网站快速留言咨询</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #D8CFCE;">来自访客: <strong>${data.name || '访客'}</strong></p>
          </div>
          
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63; width: 30%;">姓名</td>
                <td style="padding: 10px 0; color: #2C2825; font-size: 16px; font-weight: bold;">${data.name || '未填写'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EAE0D5;">
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63;">联系方式</td>
                <td style="padding: 10px 0; color: #E84A27; font-weight: bold;">${data.contact || '未填写'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #7A6E63; vertical-align: top;">留言内容</td>
                <td style="padding: 10px 0; color: #2C2825; line-height: 1.6; white-space: pre-wrap;">${data.message || '无留言内容'}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 14px; background: #FAF0E6; border-radius: 10px; font-size: 12px; color: #7A6E63; text-align: center;">
              📅 提交时间: ${timestamp} (JST)
            </div>
          </div>
        </div>
      `;
    }

    // Always log to server console for full auditability
    console.log('\n======================================================');
    console.log(`[EMAIL DISPATCH] To: ${recipient}`);
    console.log(`[SUBJECT]: ${subject}`);
    console.log(`[CONTENT]:\n${textContent.trim()}`);
    console.log('======================================================\n');

    // Attempt live delivery if transporter is configured
    const transporter = getTransporter();
    let delivered = false;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Art House Atelier" <${process.env.SMTP_USER}>`,
          to: recipient,
          subject,
          text: textContent,
          html: htmlContent,
        });
        delivered = true;
        console.log(`[EMAIL DISPATCH SUCCESS] Successfully delivered to ${recipient}`);
      } catch (smtpErr) {
        console.warn('[EMAIL DISPATCH SMTP NOTICE]', smtpErr);
      }
    }

    res.json({
      success: true,
      delivered,
      recipient,
      subject,
      timestamp,
      message: `Notification logged and targeted for ${recipient}`,
    });
  } catch (error: any) {
    console.error('[EMAIL DISPATCH ERROR]', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Vite / Static file serving
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Art House server is running on http://0.0.0.0:${PORT}`);
    console.log(`Notification email destination: ${NOTIFICATION_EMAIL}`);
  });
}

setupViteOrStatic();
