import type {
  Expert,
  Technology,
  TechnologyCategory,
  Booking,
  Payment,
  Transaction,
  Conversation,
  Message,
  Notification,
  Review,
  ReviewStats,
  Course,
  Certificate,
  LearningAchievement,
  LearningStats,
  LearningSession,
  AdminStats,
  AdminUser,
  AdminExpert,
  AdminBooking,
  AdminPayment,
  AdminTechnology,
  RevenueData,
  UserGrowthData,
} from '../types';
import type { UserStats } from '../types/user.types';

// ============================================================
// USER DATA
// ============================================================

export const CURRENT_USER = {
  id: 'u1',
  email: 'akanksha@example.com',
  fullName: 'Akanksha Sharma',
  avatar: 'https://ui-avatars.com/api/?background=4F46E5&color=fff&name=Akanksha+Sharma&size=128',
  role: 'learner' as const,
  isVerified: true,
  createdAt: '2024-06-15T10:00:00Z',
};

export const USER_STATS: UserStats = {
  totalSessions: 12,
  hoursLearned: 18.5,
  sessionsCompleted: 12,
  certificates: 4,
  bookmarks: 8,
  reviewsGiven: 6,
};

// ============================================================
// TECHNOLOGIES
// ============================================================

export const TECHNOLOGIES: Technology[] = [
  { id: 't1', name: 'React.js', slug: 'react', category: 'Frontend', icon: '⚛️', expertCount: 85 },
  { id: 't2', name: 'Node.js', slug: 'nodejs', category: 'Backend', icon: '🟢', expertCount: 72 },
  { id: 't3', name: 'Python', slug: 'python', category: 'Backend', icon: '🐍', expertCount: 95 },
  { id: 't4', name: 'AWS', slug: 'aws', category: 'Cloud', icon: '☁️', expertCount: 60 },
  { id: 't5', name: 'TypeScript', slug: 'typescript', category: 'Frontend', icon: '📘', expertCount: 78 },
  { id: 't6', name: 'Docker', slug: 'docker', category: 'DevOps', icon: '🐳', expertCount: 45 },
  { id: 't7', name: 'MongoDB', slug: 'mongodb', category: 'Database', icon: '🍃', expertCount: 55 },
  { id: 't8', name: 'PostgreSQL', slug: 'postgresql', category: 'Database', icon: '🐘', expertCount: 40 },
  { id: 't9', name: 'GraphQL', slug: 'graphql', category: 'Backend', icon: '◈', expertCount: 35 },
  { id: 't10', name: 'Flutter', slug: 'flutter', category: 'Mobile', icon: '💙', expertCount: 30 },
  { id: 't11', name: 'Next.js', slug: 'nextjs', category: 'Frontend', icon: '▲', expertCount: 50 },
  { id: 't12', name: 'Kubernetes', slug: 'kubernetes', category: 'DevOps', icon: '☸️', expertCount: 38 },
  { id: 't13', name: 'Machine Learning', slug: 'ml', category: 'AI/ML', icon: '🤖', expertCount: 42 },
  { id: 't14', name: 'REST API', slug: 'rest-api', category: 'Backend', icon: '🔗', expertCount: 65 },
  { id: 't15', name: 'Vue.js', slug: 'vuejs', category: 'Frontend', icon: '💚', expertCount: 35 },
  { id: 't16', name: 'Express.js', slug: 'expressjs', category: 'Backend', icon: '🚂', expertCount: 58 },
];

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  {
    id: 'cat1', name: 'Frontend Development', slug: 'frontend',
    icon: '🎨', description: 'React, Angular, Vue, and more',
    technologies: TECHNOLOGIES.filter(t => t.category === 'Frontend'), expertCount: 248,
  },
  {
    id: 'cat2', name: 'Backend Development', slug: 'backend',
    icon: '⚙️', description: 'Node.js, Python, Java, and more',
    technologies: TECHNOLOGIES.filter(t => t.category === 'Backend'), expertCount: 325,
  },
  {
    id: 'cat3', name: 'Mobile Development', slug: 'mobile',
    icon: '📱', description: 'React Native, Flutter, Swift',
    technologies: TECHNOLOGIES.filter(t => t.category === 'Mobile'), expertCount: 120,
  },
  {
    id: 'cat4', name: 'DevOps & Cloud', slug: 'devops',
    icon: '☁️', description: 'AWS, Docker, Kubernetes',
    technologies: TECHNOLOGIES.filter(t => t.category === 'DevOps' || t.category === 'Cloud'), expertCount: 143,
  },
  {
    id: 'cat5', name: 'Data Science & AI', slug: 'data-science',
    icon: '🧠', description: 'Machine Learning, Deep Learning',
    technologies: TECHNOLOGIES.filter(t => t.category === 'AI/ML'), expertCount: 95,
  },
  {
    id: 'cat6', name: 'Database', slug: 'database',
    icon: '🗃️', description: 'SQL, NoSQL, Redis',
    technologies: TECHNOLOGIES.filter(t => t.category === 'Database'), expertCount: 95,
  },
];

// ============================================================
// EXPERTS
// ============================================================

export const EXPERTS: Expert[] = [
  {
    id: 'e1',
    userId: 'u2',
    fullName: 'John David',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?background=1E40AF&color=fff&name=John+David&size=128',
    title: 'Senior Backend Engineer at Google',
    bio: 'I have 15+ years of experience in backend development. I specialize in Node.js, Express, Microservices, and cloud technologies. I love teaching and helping students build real-world projects.',
    experience: 15,
    hourlyRate: 40,
    currency: 'USD',
    rating: 4.8,
    totalReviews: 120,
    totalSessions: 1000,
    totalStudents: 450,
    technologies: TECHNOLOGIES.filter(t => ['t2', 't5', 't8', 't14', 't16'].includes(t.id)),
    skills: ['System Design', 'Microservices', 'REST APIs', 'Database Design', 'Cloud Architecture'],
    languages: ['English', 'Hindi'],
    education: [
      { degree: 'B.Tech in Computer Science', institution: 'IIT Delhi', year: 2009 },
    ],
    achievements: [
      { id: 'a1', title: 'Top Mentor', description: '1000+ sessions completed', icon: '🏆', earnedAt: '2024-01-15T00:00:00Z' },
      { id: 'a2', title: 'Expert Reviewer', description: '4.8+ average rating', icon: '⭐', earnedAt: '2024-03-20T00:00:00Z' },
    ],
    certifications: [
      { id: 'c1', name: 'AWS Solutions Architect', issuer: 'Amazon', issueDate: '2023-06-01', credentialUrl: '#' },
      { id: 'c2', name: 'Google Cloud Professional', issuer: 'Google', issueDate: '2023-09-15', credentialUrl: '#' },
    ],
    socialLinks: { linkedin: '#', twitter: '#', github: '#', website: '#' },
    availability: [
      {
        day: 'Mon', date: '2026-07-07',
        slots: [
          { id: 's1', startTime: '09:00 AM', endTime: '10:00 AM', available: true },
          { id: 's2', startTime: '10:00 AM', endTime: '11:00 AM', available: true },
          { id: 's3', startTime: '02:00 PM', endTime: '03:00 PM', available: false },
          { id: 's4', startTime: '04:00 PM', endTime: '05:00 PM', available: true },
        ],
      },
      {
        day: 'Tue', date: '2026-07-08',
        slots: [
          { id: 's5', startTime: '09:00 AM', endTime: '10:00 AM', available: true },
          { id: 's6', startTime: '11:00 AM', endTime: '12:00 PM', available: true },
          { id: 's7', startTime: '03:00 PM', endTime: '04:00 PM', available: true },
        ],
      },
      {
        day: 'Wed', date: '2026-07-09',
        slots: [
          { id: 's8', startTime: '10:00 AM', endTime: '11:00 AM', available: true },
          { id: 's9', startTime: '02:00 PM', endTime: '03:00 PM', available: true },
        ],
      },
    ],
    status: 'active',
    isVerified: true,
    joinedAt: '2022-01-10T00:00:00Z',
    location: 'Bangalore, India',
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'e2',
    userId: 'u3',
    fullName: 'Anjali Sharma',
    email: 'anjali@example.com',
    avatar: 'https://ui-avatars.com/api/?background=7C3AED&color=fff&name=Anjali+Sharma&size=128',
    title: 'Backend Architect at Microsoft',
    bio: 'Passionate about scalable systems and mentoring. 10+ years building enterprise applications with Python, Django, and cloud technologies.',
    experience: 10,
    hourlyRate: 35,
    currency: 'USD',
    rating: 4.6,
    totalReviews: 85,
    totalSessions: 650,
    totalStudents: 300,
    technologies: TECHNOLOGIES.filter(t => ['t3', 't4', 't6', 't7'].includes(t.id)),
    skills: ['Python', 'Django', 'AWS', 'Docker', 'System Design'],
    languages: ['English', 'Hindi'],
    education: [
      { degree: 'M.Tech in Software Engineering', institution: 'IIIT Hyderabad', year: 2014 },
    ],
    achievements: [
      { id: 'a3', title: 'Rising Star', description: '500+ sessions', icon: '🌟', earnedAt: '2024-02-10T00:00:00Z' },
    ],
    certifications: [
      { id: 'c3', name: 'AWS Developer Associate', issuer: 'Amazon', issueDate: '2023-04-01', credentialUrl: '#' },
    ],
    socialLinks: { linkedin: '#', github: '#' },
    availability: [
      {
        day: 'Mon', date: '2026-07-07',
        slots: [
          { id: 's10', startTime: '10:00 AM', endTime: '11:00 AM', available: true },
          { id: 's11', startTime: '03:00 PM', endTime: '04:00 PM', available: true },
        ],
      },
      {
        day: 'Wed', date: '2026-07-09',
        slots: [
          { id: 's12', startTime: '09:00 AM', endTime: '10:00 AM', available: true },
          { id: 's13', startTime: '01:00 PM', endTime: '02:00 PM', available: true },
        ],
      },
    ],
    status: 'active',
    isVerified: true,
    joinedAt: '2022-06-20T00:00:00Z',
    location: 'Hyderabad, India',
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'e3',
    userId: 'u4',
    fullName: 'Rahul Gupta',
    email: 'rahul@example.com',
    avatar: 'https://ui-avatars.com/api/?background=059669&color=fff&name=Rahul+Gupta&size=128',
    title: 'Full Stack Developer & Mentor',
    bio: 'Full-stack engineer with expertise in React, Node.js, and cloud technologies. Love breaking down complex topics into simple concepts.',
    experience: 7,
    hourlyRate: 30,
    currency: 'USD',
    rating: 4.5,
    totalReviews: 65,
    totalSessions: 400,
    totalStudents: 200,
    technologies: TECHNOLOGIES.filter(t => ['t1', 't2', 't5', 't8', 't11'].includes(t.id)),
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'GraphQL'],
    languages: ['English', 'Hindi'],
    education: [
      { degree: 'B.E. in Information Technology', institution: 'VJTI Mumbai', year: 2017 },
    ],
    achievements: [
      { id: 'a4', title: 'Fast Responder', description: 'Average reply < 1 hour', icon: '⚡', earnedAt: '2024-05-01T00:00:00Z' },
    ],
    certifications: [],
    socialLinks: { linkedin: '#', github: '#', twitter: '#' },
    availability: [
      {
        day: 'Tue', date: '2026-07-08',
        slots: [
          { id: 's14', startTime: '09:00 AM', endTime: '10:00 AM', available: true },
          { id: 's15', startTime: '11:00 AM', endTime: '12:00 PM', available: true },
          { id: 's16', startTime: '04:00 PM', endTime: '05:00 PM', available: true },
        ],
      },
    ],
    status: 'active',
    isVerified: true,
    joinedAt: '2023-01-05T00:00:00Z',
    location: 'Mumbai, India',
    timezone: 'Asia/Kolkata',
  },
  {
    id: 'e4',
    userId: 'u5',
    fullName: 'Priya Patel',
    email: 'priya@example.com',
    avatar: 'https://ui-avatars.com/api/?background=DC2626&color=fff&name=Priya+Patel&size=128',
    title: 'ML Engineer at DeepMind',
    bio: 'Machine Learning engineer with 8 years of experience. Expert in PyTorch, TensorFlow, and deploying ML models at scale.',
    experience: 8,
    hourlyRate: 50,
    currency: 'USD',
    rating: 4.9,
    totalReviews: 45,
    totalSessions: 300,
    totalStudents: 150,
    technologies: TECHNOLOGIES.filter(t => ['t3', 't13'].includes(t.id)),
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
    languages: ['English', 'Gujarati'],
    education: [
      { degree: 'PhD in Machine Learning', institution: 'Stanford University', year: 2018 },
    ],
    achievements: [
      { id: 'a5', title: 'Top Rated', description: '4.9 average rating', icon: '🌟', earnedAt: '2024-04-15T00:00:00Z' },
    ],
    certifications: [
      { id: 'c4', name: 'TensorFlow Developer Certificate', issuer: 'Google', issueDate: '2023-08-01', credentialUrl: '#' },
    ],
    socialLinks: { linkedin: '#', github: '#', website: '#' },
    availability: [
      {
        day: 'Thu', date: '2026-07-10',
        slots: [
          { id: 's17', startTime: '10:00 AM', endTime: '11:00 AM', available: true },
          { id: 's18', startTime: '02:00 PM', endTime: '03:00 PM', available: true },
        ],
      },
    ],
    status: 'active',
    isVerified: true,
    joinedAt: '2022-09-01T00:00:00Z',
    location: 'San Francisco, USA',
    timezone: 'America/Los_Angeles',
  },
  {
    id: 'e5',
    userId: 'u6',
    fullName: 'Michael Brown',
    email: 'michael@example.com',
    avatar: 'https://ui-avatars.com/api/?background=EA580C&color=fff&name=Michael+Brown&size=128',
    title: 'DevOps Lead at Netflix',
    bio: 'DevOps specialist with extensive experience in CI/CD, containerization, and cloud infrastructure. Building resilient systems at scale.',
    experience: 12,
    hourlyRate: 45,
    currency: 'USD',
    rating: 4.7,
    totalReviews: 92,
    totalSessions: 550,
    totalStudents: 280,
    technologies: TECHNOLOGIES.filter(t => ['t4', 't6', 't12'].includes(t.id)),
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Infrastructure as Code'],
    languages: ['English'],
    education: [
      { degree: 'M.S. in Computer Science', institution: 'MIT', year: 2012 },
    ],
    achievements: [
      { id: 'a6', title: 'Veteran Mentor', description: '550+ sessions', icon: '🎖️', earnedAt: '2024-06-01T00:00:00Z' },
    ],
    certifications: [
      { id: 'c5', name: 'CKA - Certified Kubernetes Administrator', issuer: 'CNCF', issueDate: '2023-03-01', credentialUrl: '#' },
    ],
    socialLinks: { linkedin: '#', github: '#' },
    availability: [
      {
        day: 'Fri', date: '2026-07-11',
        slots: [
          { id: 's19', startTime: '09:00 AM', endTime: '10:00 AM', available: true },
          { id: 's20', startTime: '11:00 AM', endTime: '12:00 PM', available: true },
        ],
      },
    ],
    status: 'active',
    isVerified: true,
    joinedAt: '2022-03-15T00:00:00Z',
    location: 'New York, USA',
    timezone: 'America/New_York',
  },
];

// ============================================================
// BOOKINGS
// ============================================================

export const BOOKINGS: Booking[] = [
  {
    id: 'b1', learnerId: 'u1', learnerName: 'Akanksha Sharma',
    expertId: 'e1', expertName: 'John David',
    expertAvatar: EXPERTS[0].avatar,
    technology: 'Node.js', sessionType: '1-on-1',
    date: '2026-07-11', startTime: '10:00 AM', endTime: '11:00 AM',
    duration: 60, timezone: 'Asia/Kolkata', status: 'confirmed',
    amount: 40, currency: 'USD', paymentStatus: 'success',
    meetingLink: 'https://daily.co/room/abc123',
    createdAt: '2026-07-05T10:00:00Z', updatedAt: '2026-07-05T10:00:00Z',
  },
  {
    id: 'b2', learnerId: 'u1', learnerName: 'Akanksha Sharma',
    expertId: 'e2', expertName: 'Anjali Sharma',
    expertAvatar: EXPERTS[1].avatar,
    technology: 'AWS', sessionType: '1-on-1',
    date: '2026-07-14', startTime: '03:00 PM', endTime: '04:00 PM',
    duration: 60, timezone: 'Asia/Kolkata', status: 'confirmed',
    amount: 35, currency: 'USD', paymentStatus: 'success',
    createdAt: '2026-07-06T14:00:00Z', updatedAt: '2026-07-06T14:00:00Z',
  },
  {
    id: 'b3', learnerId: 'u1', learnerName: 'Akanksha Sharma',
    expertId: 'e3', expertName: 'Rahul Gupta',
    expertAvatar: EXPERTS[2].avatar,
    technology: 'React.js', sessionType: '1-on-1',
    date: '2026-06-28', startTime: '11:00 AM', endTime: '12:00 PM',
    duration: 60, timezone: 'Asia/Kolkata', status: 'completed',
    amount: 30, currency: 'USD', paymentStatus: 'success',
    createdAt: '2026-06-25T09:00:00Z', updatedAt: '2026-06-28T12:00:00Z',
  },
  {
    id: 'b4', learnerId: 'u1', learnerName: 'Akanksha Sharma',
    expertId: 'e1', expertName: 'John David',
    expertAvatar: EXPERTS[0].avatar,
    technology: 'System Design', sessionType: '1-on-1',
    date: '2026-06-20', startTime: '02:00 PM', endTime: '03:00 PM',
    duration: 60, timezone: 'Asia/Kolkata', status: 'completed',
    amount: 40, currency: 'USD', paymentStatus: 'success',
    createdAt: '2026-06-18T10:00:00Z', updatedAt: '2026-06-20T15:00:00Z',
  },
];

// ============================================================
// PAYMENTS & TRANSACTIONS
// ============================================================

export const PAYMENTS: Payment[] = [
  {
    id: 'p1', bookingId: 'b1', userId: 'u1',
    amount: 40, currency: 'USD', status: 'success',
    method: 'razorpay', transactionId: 'txn_001',
    razorpayOrderId: 'order_001', razorpayPaymentId: 'pay_001',
    createdAt: '2026-07-05T10:05:00Z', updatedAt: '2026-07-05T10:05:00Z',
  },
  {
    id: 'p2', bookingId: 'b2', userId: 'u1',
    amount: 35, currency: 'USD', status: 'success',
    method: 'upi', transactionId: 'txn_002',
    createdAt: '2026-07-06T14:05:00Z', updatedAt: '2026-07-06T14:05:00Z',
  },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'txn1', type: 'payment', amount: 40, currency: 'USD', status: 'success', description: 'Session with John David - Node.js', expertName: 'John David', technology: 'Node.js', date: '2026-07-05T10:05:00Z', method: 'razorpay' },
  { id: 'txn2', type: 'payment', amount: 35, currency: 'USD', status: 'success', description: 'Session with Anjali Sharma - AWS', expertName: 'Anjali Sharma', technology: 'AWS', date: '2026-07-06T14:05:00Z', method: 'upi' },
  { id: 'txn3', type: 'payment', amount: 30, currency: 'USD', status: 'success', description: 'Session with Rahul Gupta - React.js', expertName: 'Rahul Gupta', technology: 'React.js', date: '2026-06-25T09:05:00Z', method: 'card' },
  { id: 'txn4', type: 'payment', amount: 40, currency: 'USD', status: 'success', description: 'Session with John David - System Design', expertName: 'John David', technology: 'System Design', date: '2026-06-18T10:05:00Z', method: 'razorpay' },
  { id: 'txn5', type: 'refund', amount: 25, currency: 'USD', status: 'success', description: 'Refund - Cancelled session', expertName: 'Michael Brown', technology: 'Docker', date: '2026-06-10T16:00:00Z', method: 'razorpay' },
];

// ============================================================
// CONVERSATIONS & MESSAGES
// ============================================================

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    participants: [
      { id: 'u1', fullName: 'Akanksha Sharma', avatar: CURRENT_USER.avatar, isOnline: true },
      { id: 'u2', fullName: 'John David', avatar: EXPERTS[0].avatar, isOnline: true, lastSeen: '2026-07-07T10:00:00Z' },
    ],
    lastMessage: {
      id: 'm5', conversationId: 'conv1', senderId: 'u2', senderName: 'John David',
      content: "You're welcome! Here are the resources we discussed.",
      type: 'text', readBy: ['u2'], isEdited: false,
      createdAt: '2026-07-07T09:45:00Z', updatedAt: '2026-07-07T09:45:00Z',
    },
    unreadCount: 2,
    isOnline: true,
    createdAt: '2026-07-01T00:00:00Z',
    updatedAt: '2026-07-07T09:45:00Z',
  },
  {
    id: 'conv2',
    participants: [
      { id: 'u1', fullName: 'Akanksha Sharma', avatar: CURRENT_USER.avatar, isOnline: true },
      { id: 'u3', fullName: 'Anjali Sharma', avatar: EXPERTS[1].avatar, isOnline: false, lastSeen: '2026-07-06T18:30:00Z' },
    ],
    lastMessage: {
      id: 'm10', conversationId: 'conv2', senderId: 'u3', senderName: 'Anjali Sharma',
      content: 'Sure, see you tomorrow at 3 PM!',
      type: 'text', readBy: ['u3', 'u1'], isEdited: false,
      createdAt: '2026-07-06T18:30:00Z', updatedAt: '2026-07-06T18:30:00Z',
    },
    unreadCount: 0,
    isOnline: false,
    createdAt: '2026-07-03T00:00:00Z',
    updatedAt: '2026-07-06T18:30:00Z',
  },
  {
    id: 'conv3',
    participants: [
      { id: 'u1', fullName: 'Akanksha Sharma', avatar: CURRENT_USER.avatar, isOnline: true },
      { id: 'u4', fullName: 'Rahul Gupta', avatar: EXPERTS[2].avatar, isOnline: false, lastSeen: '2026-07-05T15:00:00Z' },
    ],
    lastMessage: {
      id: 'm15', conversationId: 'conv3', senderId: 'u1', senderName: 'Akanksha Sharma',
      content: 'Thank you for the session! It was very helpful.',
      type: 'text', readBy: ['u1', 'u4'], isEdited: false,
      createdAt: '2026-07-05T15:00:00Z', updatedAt: '2026-07-05T15:00:00Z',
    },
    unreadCount: 0,
    isOnline: false,
    createdAt: '2026-06-25T00:00:00Z',
    updatedAt: '2026-07-05T15:00:00Z',
  },
];

export const MESSAGES: Record<string, Message[]> = {
  conv1: [
    { id: 'm1', conversationId: 'conv1', senderId: 'u1', senderName: 'Akanksha Sharma', senderAvatar: CURRENT_USER.avatar, content: 'Hi John! Thank you for the session!', type: 'text', readBy: ['u1', 'u2'], isEdited: false, createdAt: '2026-07-07T09:30:00Z', updatedAt: '2026-07-07T09:30:00Z' },
    { id: 'm2', conversationId: 'conv1', senderId: 'u2', senderName: 'John David', senderAvatar: EXPERTS[0].avatar, content: "You're welcome! How's the project going?", type: 'text', readBy: ['u2', 'u1'], isEdited: false, createdAt: '2026-07-07T09:32:00Z', updatedAt: '2026-07-07T09:32:00Z' },
    { id: 'm3', conversationId: 'conv1', senderId: 'u1', senderName: 'Akanksha Sharma', senderAvatar: CURRENT_USER.avatar, content: "Can you explain this again?", type: 'text', readBy: ['u1', 'u2'], isEdited: false, createdAt: '2026-07-07T09:35:00Z', updatedAt: '2026-07-07T09:35:00Z' },
    { id: 'm4', conversationId: 'conv1', senderId: 'u2', senderName: 'John David', senderAvatar: EXPERTS[0].avatar, content: "Sure! Let me share my screen...", type: 'text', readBy: ['u2'], isEdited: false, createdAt: '2026-07-07T09:40:00Z', updatedAt: '2026-07-07T09:40:00Z' },
    { id: 'm5', conversationId: 'conv1', senderId: 'u2', senderName: 'John David', senderAvatar: EXPERTS[0].avatar, content: "You're welcome! Here are the resources we discussed.", type: 'text', readBy: ['u2'], isEdited: false, createdAt: '2026-07-07T09:45:00Z', updatedAt: '2026-07-07T09:45:00Z', attachments: [{ id: 'att1', name: 'Node.js_Resources.pdf', url: '#', type: 'application/pdf', size: 2048000 }] },
  ],
};

// ============================================================
// NOTIFICATIONS
// ============================================================

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'booking', title: 'Session Confirmed', message: 'Your session with John David on July 11 has been confirmed.', isRead: false, actionUrl: '/dashboard', createdAt: '2026-07-07T08:00:00Z' },
  { id: 'n2', userId: 'u1', type: 'session', title: 'Session Reminder', message: 'Your session with John David starts in 1 hour.', isRead: false, actionUrl: '/live-session/b1', createdAt: '2026-07-07T07:00:00Z' },
  { id: 'n3', userId: 'u1', type: 'payment', title: 'Payment Successful', message: 'Payment of $40 for Node.js session completed.', isRead: true, actionUrl: '/payment', createdAt: '2026-07-05T10:05:00Z' },
  { id: 'n4', userId: 'u1', type: 'review', title: 'New Review Response', message: 'John David responded to your review.', isRead: true, actionUrl: '/reviews', createdAt: '2026-07-04T14:00:00Z' },
  { id: 'n5', userId: 'u1', type: 'message', title: 'New Message', message: 'You have a new message from John David.', isRead: false, actionUrl: '/messages', createdAt: '2026-07-07T09:45:00Z' },
  { id: 'n6', userId: 'u1', type: 'system', title: 'Welcome!', message: 'Welcome to Expertise Connect! Start exploring experts.', isRead: true, actionUrl: '/search', createdAt: '2026-06-15T10:00:00Z' },
  { id: 'n7', userId: 'u1', type: 'booking', title: 'Session Completed', message: 'Your React.js session with Rahul Gupta has been completed. Leave a review!', isRead: true, actionUrl: '/reviews', createdAt: '2026-06-28T12:05:00Z' },
];

// ============================================================
// REVIEWS
// ============================================================

export const REVIEWS: Review[] = [
  {
    id: 'r1', bookingId: 'b3', reviewerId: 'u1', reviewerName: 'Akanksha Sharma',
    reviewerAvatar: CURRENT_USER.avatar,
    expertId: 'e3', expertName: 'Rahul Gupta',
    rating: 5, title: 'Excellent Session!',
    comment: 'Rahul explained React hooks and context API brilliantly. Very patient and knowledgeable. Highly recommend!',
    technology: 'React.js', isVerified: true, helpfulCount: 12,
    createdAt: '2026-06-29T10:00:00Z', updatedAt: '2026-06-29T10:00:00Z',
  },
  {
    id: 'r2', bookingId: 'b4', reviewerId: 'u1', reviewerName: 'Akanksha Sharma',
    reviewerAvatar: CURRENT_USER.avatar,
    expertId: 'e1', expertName: 'John David',
    rating: 5, title: 'Great System Design Session',
    comment: 'John covered system design patterns with real-world examples. The whiteboard session was very interactive and insightful.',
    technology: 'System Design', isVerified: true, helpfulCount: 8,
    response: { content: 'Thank you Akanksha! It was great working with you. Keep building!', createdAt: '2026-06-21T10:00:00Z' },
    createdAt: '2026-06-20T16:00:00Z', updatedAt: '2026-06-21T10:00:00Z',
  },
  {
    id: 'r3', bookingId: 'b100', reviewerId: 'u10', reviewerName: 'Vikram Singh',
    reviewerAvatar: 'https://ui-avatars.com/api/?background=0EA5E9&color=fff&name=Vikram+Singh&size=128',
    expertId: 'e1', expertName: 'John David',
    rating: 4, title: 'Very Helpful',
    comment: 'Good session on Node.js best practices. Would have liked more time on error handling patterns.',
    technology: 'Node.js', isVerified: true, helpfulCount: 5,
    createdAt: '2026-06-15T11:00:00Z', updatedAt: '2026-06-15T11:00:00Z',
  },
  {
    id: 'r4', bookingId: 'b101', reviewerId: 'u11', reviewerName: 'Sneha Reddy',
    reviewerAvatar: 'https://ui-avatars.com/api/?background=D946EF&color=fff&name=Sneha+Reddy&size=128',
    expertId: 'e1', expertName: 'John David',
    rating: 5, title: 'Mind-blowing!',
    comment: 'John is an incredible mentor. His approach to teaching microservices architecture is phenomenal.',
    technology: 'Microservices', isVerified: true, helpfulCount: 18,
    createdAt: '2026-06-10T09:00:00Z', updatedAt: '2026-06-10T09:00:00Z',
  },
];

export const REVIEW_STATS: ReviewStats = {
  averageRating: 4.8,
  totalReviews: 120,
  ratingBreakdown: { 5: 78, 4: 30, 3: 8, 2: 3, 1: 1 },
};

// ============================================================
// LEARNING
// ============================================================

export const COURSES: Course[] = [
  {
    id: 'course1', title: 'Mastering Node.js Backend Development',
    description: 'Complete backend development with Node.js, Express, and PostgreSQL',
    expertId: 'e1', expertName: 'John David', expertAvatar: EXPERTS[0].avatar,
    technology: 'Node.js', thumbnail: '', totalSessions: 8, completedSessions: 6,
    progress: 75, duration: 12, level: 'intermediate',
    status: 'in_progress', startedAt: '2026-05-01T00:00:00Z',
    nextSessionDate: '2026-07-11T10:00:00Z',
  },
  {
    id: 'course2', title: 'AWS for Developers',
    description: 'Learn AWS services from scratch - EC2, S3, Lambda, and more',
    expertId: 'e2', expertName: 'Anjali Sharma', expertAvatar: EXPERTS[1].avatar,
    technology: 'AWS', thumbnail: '', totalSessions: 6, completedSessions: 2,
    progress: 33, duration: 9, level: 'beginner',
    status: 'in_progress', startedAt: '2026-06-15T00:00:00Z',
    nextSessionDate: '2026-07-14T15:00:00Z',
  },
  {
    id: 'course3', title: 'Advanced React & TypeScript Patterns',
    description: 'Master advanced React patterns with TypeScript',
    expertId: 'e3', expertName: 'Rahul Gupta', expertAvatar: EXPERTS[2].avatar,
    technology: 'React.js', thumbnail: '', totalSessions: 5, completedSessions: 5,
    progress: 100, duration: 7.5, level: 'advanced',
    status: 'completed', startedAt: '2026-04-10T00:00:00Z', completedAt: '2026-06-28T00:00:00Z',
  },
  {
    id: 'course4', title: 'System Design Basics',
    description: 'Learn system design fundamentals for interviews and real-world applications',
    expertId: 'e1', expertName: 'John David', expertAvatar: EXPERTS[0].avatar,
    technology: 'System Design', thumbnail: '', totalSessions: 4, completedSessions: 4,
    progress: 100, duration: 6, level: 'intermediate',
    status: 'completed', startedAt: '2026-03-01T00:00:00Z', completedAt: '2026-04-20T00:00:00Z',
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert1', courseId: 'course3', courseName: 'Advanced React & TypeScript Patterns',
    expertName: 'Rahul Gupta', technology: 'React.js',
    issuedAt: '2026-06-28T00:00:00Z', credentialId: 'EC-CERT-2026-001',
    downloadUrl: '#', thumbnail: '',
  },
  {
    id: 'cert2', courseId: 'course4', courseName: 'System Design Basics',
    expertName: 'John David', technology: 'System Design',
    issuedAt: '2026-04-20T00:00:00Z', credentialId: 'EC-CERT-2026-002',
    downloadUrl: '#', thumbnail: '',
  },
  {
    id: 'cert3', courseId: 'course100', courseName: 'Node.js Fundamentals',
    expertName: 'John David', technology: 'Node.js',
    issuedAt: '2026-02-15T00:00:00Z', credentialId: 'EC-CERT-2026-003',
    downloadUrl: '#', thumbnail: '',
  },
  {
    id: 'cert4', courseId: 'course101', courseName: 'AWS Fundamentals',
    expertName: 'Michael Brown', technology: 'AWS',
    issuedAt: '2025-12-01T00:00:00Z', credentialId: 'EC-CERT-2025-015',
    downloadUrl: '#', thumbnail: '',
  },
];

export const LEARNING_ACHIEVEMENTS: LearningAchievement[] = [
  { id: 'la1', title: 'First Session', description: 'Completed your first session', icon: '🎯', category: 'sessions', earnedAt: '2025-12-01T00:00:00Z' },
  { id: 'la2', title: '10 Sessions', description: 'Completed 10 sessions', icon: '🔥', category: 'sessions', earnedAt: '2026-04-15T00:00:00Z', progress: 12, target: 10 },
  { id: 'la3', title: 'Tech Explorer', description: 'Learned 3+ technologies', icon: '🚀', category: 'technologies', earnedAt: '2026-03-01T00:00:00Z', progress: 4, target: 3 },
  { id: 'la4', title: 'Review Champion', description: 'Left 5+ reviews', icon: '⭐', category: 'review', earnedAt: '2026-06-01T00:00:00Z', progress: 6, target: 5 },
  { id: 'la5', title: '7-Day Streak', description: 'Learned for 7 consecutive days', icon: '📅', category: 'streak', earnedAt: '2026-05-20T00:00:00Z' },
];

export const LEARNING_STATS: LearningStats = {
  totalSessions: 12,
  hoursLearned: 18.5,
  technologiesLearned: 6,
  certificates: 4,
  currentStreak: 3,
  longestStreak: 12,
};

export const LEARNING_SESSIONS: LearningSession[] = [
  { id: 'ls1', bookingId: 'b1', expertName: 'John David', expertAvatar: EXPERTS[0].avatar, technology: 'Node.js', title: 'Mastering Node.js Backend', date: '2026-07-11T10:00:00Z', duration: 60, status: 'upcoming' },
  { id: 'ls2', bookingId: 'b2', expertName: 'Anjali Sharma', expertAvatar: EXPERTS[1].avatar, technology: 'AWS', title: 'AWS for Developers', date: '2026-07-14T15:00:00Z', duration: 60, status: 'upcoming' },
  { id: 'ls3', bookingId: 'b3', expertName: 'Rahul Gupta', expertAvatar: EXPERTS[2].avatar, technology: 'React.js', title: 'Advanced React Patterns', date: '2026-06-28T11:00:00Z', duration: 60, rating: 5, status: 'completed' },
  { id: 'ls4', bookingId: 'b4', expertName: 'John David', expertAvatar: EXPERTS[0].avatar, technology: 'System Design', title: 'System Design Basics', date: '2026-06-20T14:00:00Z', duration: 60, rating: 5, status: 'completed' },
];

// ============================================================
// ADMIN DATA
// ============================================================

export const ADMIN_STATS: AdminStats = {
  totalUsers: 15000,
  totalExperts: 1200,
  totalBookings: 45000,
  totalRevenue: 2500000,
  activeUsers: 8500,
  newUsersThisMonth: 450,
  newExpertsThisMonth: 35,
  completedSessions: 38000,
  pendingApprovals: 12,
  averageRating: 4.6,
  userGrowth: 12.5,
  revenueGrowth: 18.3,
};

export const ADMIN_USERS: AdminUser[] = [
  { id: 'au1', fullName: 'Akanksha Sharma', email: 'akanksha@example.com', avatar: CURRENT_USER.avatar, role: 'learner', status: 'active', isVerified: true, sessionsCount: 12, totalSpent: 450, joinedAt: '2024-06-15T00:00:00Z', lastActive: '2026-07-07T10:00:00Z' },
  { id: 'au2', fullName: 'Vikram Singh', email: 'vikram@example.com', role: 'learner', status: 'active', isVerified: true, sessionsCount: 28, totalSpent: 1200, joinedAt: '2023-11-01T00:00:00Z', lastActive: '2026-07-06T18:00:00Z' },
  { id: 'au3', fullName: 'Sneha Reddy', email: 'sneha@example.com', role: 'learner', status: 'active', isVerified: true, sessionsCount: 15, totalSpent: 600, joinedAt: '2024-02-20T00:00:00Z', lastActive: '2026-07-07T08:00:00Z' },
  { id: 'au4', fullName: 'Arjun Mehta', email: 'arjun@example.com', role: 'learner', status: 'inactive', isVerified: true, sessionsCount: 5, totalSpent: 200, joinedAt: '2024-08-10T00:00:00Z', lastActive: '2026-06-01T12:00:00Z' },
  { id: 'au5', fullName: 'Pooja Nair', email: 'pooja@example.com', role: 'learner', status: 'active', isVerified: false, sessionsCount: 0, totalSpent: 0, joinedAt: '2026-07-01T00:00:00Z', lastActive: '2026-07-07T09:00:00Z' },
];

export const ADMIN_EXPERTS: AdminExpert[] = EXPERTS.map(e => ({
  id: e.id, fullName: e.fullName, email: e.email, avatar: e.avatar,
  title: e.title, rating: e.rating, totalReviews: e.totalReviews,
  totalSessions: e.totalSessions, totalEarnings: e.totalSessions * e.hourlyRate * 0.8,
  status: e.status, isVerified: e.isVerified,
  technologies: e.technologies.map(t => t.name),
  joinedAt: e.joinedAt, lastActive: '2026-07-07T10:00:00Z',
}));

export const ADMIN_BOOKINGS: AdminBooking[] = BOOKINGS.map(b => ({
  id: b.id, learnerName: b.learnerName, expertName: b.expertName,
  technology: b.technology, date: b.date, duration: b.duration,
  amount: b.amount, status: b.status, paymentStatus: b.paymentStatus,
  createdAt: b.createdAt,
}));

export const ADMIN_PAYMENTS: AdminPayment[] = [
  { id: 'ap1', transactionId: 'txn_001', userName: 'Akanksha Sharma', expertName: 'John David', amount: 40, platformFee: 8, expertPayout: 32, status: 'success', method: 'Razorpay', date: '2026-07-05T10:05:00Z' },
  { id: 'ap2', transactionId: 'txn_002', userName: 'Akanksha Sharma', expertName: 'Anjali Sharma', amount: 35, platformFee: 7, expertPayout: 28, status: 'success', method: 'UPI', date: '2026-07-06T14:05:00Z' },
  { id: 'ap3', transactionId: 'txn_003', userName: 'Vikram Singh', expertName: 'John David', amount: 40, platformFee: 8, expertPayout: 32, status: 'success', method: 'Card', date: '2026-07-04T11:00:00Z' },
  { id: 'ap4', transactionId: 'txn_004', userName: 'Sneha Reddy', expertName: 'Priya Patel', amount: 50, platformFee: 10, expertPayout: 40, status: 'pending', method: 'Razorpay', date: '2026-07-07T09:00:00Z' },
];

export const ADMIN_TECHNOLOGIES: AdminTechnology[] = TECHNOLOGIES.map(t => ({
  id: t.id, name: t.name, slug: t.slug, category: t.category,
  expertCount: t.expertCount || 0, sessionCount: Math.floor(Math.random() * 5000) + 500,
  status: 'active' as const, createdAt: '2022-01-01T00:00:00Z',
}));

export const REVENUE_DATA: RevenueData[] = [
  { month: 'Jan', revenue: 180000, bookings: 3200 },
  { month: 'Feb', revenue: 195000, bookings: 3400 },
  { month: 'Mar', revenue: 210000, bookings: 3650 },
  { month: 'Apr', revenue: 205000, bookings: 3500 },
  { month: 'May', revenue: 225000, bookings: 3800 },
  { month: 'Jun', revenue: 240000, bookings: 4100 },
  { month: 'Jul', revenue: 260000, bookings: 4350 },
];

export const USER_GROWTH_DATA: UserGrowthData[] = [
  { month: 'Jan', learners: 9500, experts: 850, total: 10350 },
  { month: 'Feb', learners: 10200, experts: 890, total: 11090 },
  { month: 'Mar', learners: 11000, experts: 940, total: 11940 },
  { month: 'Apr', learners: 11800, experts: 980, total: 12780 },
  { month: 'May', learners: 12800, experts: 1050, total: 13850 },
  { month: 'Jun', learners: 13700, experts: 1130, total: 14830 },
  { month: 'Jul', learners: 15000, experts: 1200, total: 16200 },
];

// ============================================================
// TESTIMONIALS
// ============================================================

export const TESTIMONIALS = [
  {
    id: 'test1',
    name: 'Ravi Kumar',
    avatar: 'https://ui-avatars.com/api/?background=4F46E5&color=fff&name=Ravi+Kumar&size=128',
    role: 'Software Developer',
    company: 'Flipkart',
    content: 'Expertise Connect helped me level up my backend skills. The 1-on-1 sessions with John David on Node.js were incredibly valuable. Landed my dream job!',
    rating: 5,
  },
  {
    id: 'test2',
    name: 'Meera Joshi',
    avatar: 'https://ui-avatars.com/api/?background=7C3AED&color=fff&name=Meera+Joshi&size=128',
    role: 'Data Scientist',
    company: 'Amazon',
    content: 'The ML sessions with Priya were phenomenal. She broke down complex concepts into digestible pieces. Worth every penny!',
    rating: 5,
  },
  {
    id: 'test3',
    name: 'Amit Patel',
    avatar: 'https://ui-avatars.com/api/?background=059669&color=fff&name=Amit+Patel&size=128',
    role: 'DevOps Engineer',
    company: 'Razorpay',
    content: 'Michael\'s Kubernetes sessions transformed my understanding of container orchestration. Real-world examples made all the difference.',
    rating: 5,
  },
];

// ============================================================
// PRICING PLANS
// ============================================================

export const PRICING_PLANS = [
  {
    id: 'plan1',
    name: 'Starter',
    description: 'Perfect for beginners',
    price: 0,
    currency: 'USD',
    period: 'month',
    features: [
      'Browse expert profiles',
      'Search technologies',
      'Book up to 2 sessions/month',
      'Basic chat support',
      'Session recordings (7 days)',
    ],
    isPopular: false,
    cta: 'Get Started Free',
  },
  {
    id: 'plan2',
    name: 'Pro',
    description: 'Most popular for learners',
    price: 29,
    currency: 'USD',
    period: 'month',
    features: [
      'Everything in Starter',
      'Unlimited sessions',
      'Priority expert matching',
      'Session recordings (30 days)',
      'Learning progress tracking',
      'Certificates',
      'Priority support',
    ],
    isPopular: true,
    cta: 'Start Pro Plan',
  },
  {
    id: 'plan3',
    name: 'Enterprise',
    description: 'For teams and organizations',
    price: 99,
    currency: 'USD',
    period: 'month',
    features: [
      'Everything in Pro',
      'Team management',
      'Bulk booking discounts',
      'Custom learning paths',
      'Analytics dashboard',
      'API access',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    isPopular: false,
    cta: 'Contact Sales',
  },
];

// ============================================================
// FAQ
// ============================================================

export const FAQS = [
  { id: 'faq1', question: 'How do I book a session with an expert?', answer: 'Simply search for experts by technology, view their profiles, check availability, and book a slot. You can pay securely through our platform using Razorpay.' },
  { id: 'faq2', question: 'What if I need to cancel a session?', answer: 'You can cancel up to 4 hours before the session for a full refund. Cancellations within 4 hours may be subject to a cancellation fee.' },
  { id: 'faq3', question: 'How are experts verified?', answer: 'All experts go through a rigorous verification process including identity verification, skill assessment, and background checks before they can start teaching.' },
  { id: 'faq4', question: 'Can I become an expert on the platform?', answer: 'Yes! If you have 3+ years of experience in any technology, you can apply to become an expert. Sign up, complete your profile, and submit for verification.' },
  { id: 'faq5', question: 'What payment methods are supported?', answer: 'We support UPI, Credit/Debit cards, Net Banking, and popular wallets through our secure Razorpay integration.' },
  { id: 'faq6', question: 'Are sessions recorded?', answer: 'Yes, all sessions are recorded with consent from both parties. Recordings are available for review based on your subscription plan.' },
  { id: 'faq7', question: 'How do certificates work?', answer: 'After completing all sessions in a learning path, you receive a verified certificate that you can share on LinkedIn and other platforms.' },
];

// ============================================================
// HOW IT WORKS
// ============================================================

export const HOW_IT_WORKS_STEPS = [
  { id: 1, title: 'Search Technology', description: 'Find experts in the technology you want to learn.', icon: '🔍' },
  { id: 2, title: 'Choose Expert', description: 'Browse profiles, reviews, and pick the right mentor.', icon: '👨‍🏫' },
  { id: 3, title: 'Book Session', description: 'Select a time slot and book your 1-on-1 session.', icon: '📅' },
  { id: 4, title: 'Learn & Grow', description: 'Join the live session and accelerate your learning.', icon: '🚀' },
];

// ============================================================
// STATS FOR LANDING PAGE
// ============================================================

export const PLATFORM_STATS = [
  { label: 'Learners', value: '5000+', icon: '👨‍🎓' },
  { label: 'Experts', value: '1200+', icon: '👨‍💻' },
  { label: 'Technologies', value: '50+', icon: '💻' },
  { label: 'Sessions', value: '15K+', icon: '📹' },
];
