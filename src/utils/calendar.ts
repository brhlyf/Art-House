import { BookingData } from '../types';

export function generateIcsFile(booking: BookingData): void {
  // Format date and time for ics
  const dateStr = booking.date.replace(/-/g, '');
  let startHour = 10;
  let startMin = 0;
  let endHour = 12;
  let endMin = 30;

  if (booking.timeSlot.includes('14:00') || booking.timeSlot.includes('下午')) {
    startHour = 14;
    startMin = 0;
    endHour = 16;
    endMin = 30;
  } else if (booking.timeSlot.includes('18:30') || booking.timeSlot.includes('晚间')) {
    startHour = 18;
    startMin = 30;
    endHour = 21;
    endMin = 0;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');
  const dtStart = `${dateStr}T${pad(startHour)}${pad(startMin)}00`;
  const dtEnd = `${dateStr}T${pad(endHour)}${pad(endMin)}00`;

  const title = `Art House 美术课: ${booking.courseTitle}`;
  const location = 'Art House 美术空间 (北京市朝阳区三里屯艺术街区79号楼302 / 東京都千代田区丸の内3-2-1 Art House 3F)';
  const description = `您的预约编号: ${booking.id}\\n课程: ${booking.courseTitle}\\n时段: ${booking.timeSlot}\\n语言偏好: ${booking.languagePreference}\\n参加人数: ${booking.attendeeCount}人\\n画材全包，请提前10分钟到场享用茶点。`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Art House Atelier//Booking System//CN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${booking.id}@arthouse-atelier.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `ArtHouse_Booking_${booking.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
