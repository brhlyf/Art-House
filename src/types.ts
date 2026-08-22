export type Language = 'zh' | 'ja';

export interface Course {
  id: string;
  category: 'oil' | 'watercolor' | 'acrylic' | 'sketch' | 'ceramic' | 'trial' | 'kids' | 'online';
  title: {
    zh: string;
    ja: string;
  };
  subtitle: {
    zh: string;
    ja: string;
  };
  badge: {
    zh: string;
    ja: string;
  };
  description: {
    zh: string;
    ja: string;
  };
  duration: {
    zh: string;
    ja: string;
  };
  price: number; // in local currency
  trialPrice?: number;
  maxStudents: number;
  level: {
    zh: string;
    ja: string;
  };
  includedMaterials: {
    zh: string[];
    ja: string[];
  };
  syllabus: {
    title: {
      zh: string;
      ja: string;
    };
    desc: {
      zh: string;
      ja: string;
    };
  }[];
  scheduleTime: {
    zh: string;
    ja: string;
  };
  image: string;
  galleryImages: string[];
  tags: {
    zh: string[];
    ja: string[];
  };
}

export interface StudentArtwork {
  id: string;
  title: {
    zh: string;
    ja: string;
  };
  studentName: {
    zh: string;
    ja: string;
  };
  studentBio: {
    zh: string;
    ja: string;
  };
  category: 'oil' | 'watercolor' | 'acrylic' | 'sketch' | 'ceramic' | 'texture';
  medium: {
    zh: string;
    ja: string;
  };
  completionTime: {
    zh: string;
    ja: string;
  };
  image: string;
  processImage?: string;
  studentComment: {
    zh: string;
    ja: string;
  };
  teacherFeedback: {
    zh: string;
    ja: string;
  };
  likes: number;
}

export interface Instructor {
  id: string;
  name: {
    zh: string;
    ja: string;
  };
  role: {
    zh: string;
    ja: string;
  };
  almaMater: {
    zh: string;
    ja: string;
  };
  languages: ('zh' | 'ja' | 'en')[];
  bio: {
    zh: string;
    ja: string;
  };
  specialties: {
    zh: string[];
    ja: string[];
  };
  quote: {
    zh: string;
    ja: string;
  };
  image: string;
}

export interface BookingData {
  id: string;
  courseId: string;
  courseTitle: string;
  date: string;
  timeSlot: string;
  languagePreference: 'zh' | 'ja' | 'both';
  attendeeCount: number;
  studentName: string;
  email: string;
  phone: string;
  contactMethod: 'phone' | 'wechat' | 'line' | 'email';
  contactAccount?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  specialNotes?: string;
  instructorId?: string;
  createdAt: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Testimonial {
  id: string;
  author: {
    zh: string;
    ja: string;
  };
  course: {
    zh: string;
    ja: string;
  };
  avatar: string;
  rating: number;
  comment: {
    zh: string;
    ja: string;
  };
  date: string;
}
