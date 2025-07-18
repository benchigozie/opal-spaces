import { useAuth } from '../../hooks/useAuth';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className='font-Inria text-2xl text-my-black'>DashBoard</h1>
      <p>Welcome back { user?.firstName }.</p>
    </div>
  )
}

export default Dashboard