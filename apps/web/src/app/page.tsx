import LandingPage from '@/components/LandingPage';
import UserDashboard from '@/components/UserDasboard/UserDashboard';
import ParentDashboard from '@/components/ParentDashboad/ParentDashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("session in page.tsx");
  console.log(session);

  if (session && session.user.role === "child") {
    return (
      <UserDashboard />
    )
  } else if (session && session.user.role === "parent") {
    return (
      <ParentDashboard />
    )
  }

  return (
    <LandingPage />
  );
}
