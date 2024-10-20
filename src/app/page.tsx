import LandingPage from '@/components/LandingPage';
import UserDashboard from '@/components/UserDasboard/UserDashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <UserDashboard />
    )
  }

  return (
    <LandingPage />
  );
}
