export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'online' | 'away' | 'offline';
  joinedAt: string;
  bio: string;
}

export const USERS_DATA: User[] = [
  {
    id: 1,
    name: 'Cristiano Ronaldo',
    email: 'cr7@example.com',
    avatarUrl: 'assets/cr7.webp',
    role: 'admin',
    status: 'online',
    joinedAt: '2022-01-15T00:00:00Z',
    bio: 'A passionate frontend developer with a keen eye for aesthetics and design. She loves building highly interactive and accessible single-page applications.'
  },
  {
    id: 2,
    name: 'Mohamed Salah',
    email: 'salah@example.com',
    avatarUrl: 'assets/salah.png',
    role: 'editor',
    status: 'away',
    joinedAt: '2023-04-15T00:00:00Z',
    bio: 'Backend architect focused on scalable systems and microservices. When not coding, Bob enjoys hiking and exploring new mountain trails.'
  },
  {
    id: 3,
    name: 'Neymar Jr',
    email: 'neymar@example.com',
    avatarUrl: 'assets/neymar.webp',
    role: 'viewer',
    status: 'offline',
    joinedAt: '2023-10-20T00:00:00Z',
    bio: 'Enthusiastic QA engineer dedicated to ensuring the highest quality in software releases. Charlie is also an avid board game collector.'
  },
  {
    id: 4,
    name: 'Lionel Messi',
    email: 'messi@example.com',
    avatarUrl: 'assets/messi.png',
    role: 'admin',
    status: 'online',
    joinedAt: '2021-11-05T00:00:00Z',
    bio: 'Full-stack wizard and team lead. She excels in mentoring junior developers and driving project success through agile methodologies.'
  }
];
