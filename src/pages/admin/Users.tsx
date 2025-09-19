import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";



type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

function Users() {

  const { token } = useAuth();

  const [users, setUsers] = useState<UserType[]>([]);
  const [searchedUser, setSearchedUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    setTimeout(async () => {
      console.log("Fetching users...");
      try {
        const res = await api.get("/api/users/all");
        setUsers(res.data.users || []);
        setIsLoading(false);
        console.log(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }, 1000);
  }

  const findUser = async (email: string) => {

    try {
      const res = await api.get("/api/users/find", {
        params: { email },
      });
     
      setSearchedUser(res.data.user || null);
      setError("");
      console.log(res.data.user);
    } catch (err: any) {
      if (err.response.status === 404) {
        setError("No user found with that email.");
        setSearchedUser(null);
        return;
      }
      console.error("Error finding user:", err);
    } finally {

    }
  };

  const promoteUser = async () => {
    try {
      const res = await api.put(`/api/users/promote/${searchedUser?.id}`);
      console.log("User promoted:", res.data);
      fetchUsers();
    } catch (err) {
      console.error("Error promoting user:", err);
    }
  };

  const demoteUser = async () => {
    try {
      const res = await api.put(`/api/users/demote/${searchedUser?.id}`);
      console.log("User demoted:", res.data);
      fetchUsers();
    } catch (err) {
      console.error("Error demoting user:", err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchUsers();
  }, [token]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4 text-[13px] md:text-[15px]">
      <div>
        <h1 className='font-Inria text-2xl text-my-black'>Users</h1>
        <p>View and manage Users</p>
      </div>
      <div className="flex flex-col rounded-md bg-my-white p-3 md:p-4 shadow-md"> <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-very-light-wood">
            <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">First Name</th>
            <th className="border hidden lg:table-cell border-gray-300 px-2 md:px-4 py-2 text-left">Last Name</th>
            <th className="border hidden md:table-cell border-gray-300 px-2 md:px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="">
              <td className="py-2 px-1 md:px-4 border-b border-gray-300">{user.firstName}</td>
              <td className="py-2 px-1 md:px-4 border-b border hidden lg:table-cell border-gray-300">{user.lastName}</td>
              <td className="py-2 px-1 md:px-4 border-b border hidden md:table-cell border-gray-300">{user.email}</td>
              <td className="py-2 px-1 md:px-4 border-b border-gray-300">{user.role.toLocaleLowerCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>

        {
          users.length === 0 ? (
            <p className="p-1">No users found.</p>
          ) : null
        }
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email) {
            return;
          }
          findUser(email);
        }}

      >
        <div className="flex gap-2">
          <div><input type="email" placeholder="Find with Email" onChange={(e) => setEmail(e.target.value)} className="bg-my-white px-4 w-44 md:w-72 py-2 rounded-md focus:outline-light-wood" /></div>
          <button type="submit" className="px-4 py-2 bg-light-wood rounded-md hover:cursor-pointer text-my-white">Find</button>
        </div>
        <div>
          {
            searchedUser && (
              <div className="flex flex-col md:flex-row md:justify-between bg-very-light-wood rounded-lg gap-4 p-5 border border-gray-300 mt-2">
                <div className="rounded-md">
                  <p><span className="font-bold">First Name:</span> {searchedUser.firstName}</p>
                  <p><span className="font-bold">Last Name:</span> {searchedUser.lastName}</p>
                  <p><span className="font-bold">Email:</span> {searchedUser.email}</p>
                  <p><span className="font-bold">Role:</span> {searchedUser.role}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <button onClick={promoteUser} className="px-4 py-1 h-9 bg-sky-500 rounded-md hover:cursor-pointer text-my-white">Promote</button>'
                  <button onClick={demoteUser} className="px-4 py-1 h-9 bg-red-300 rounded-md hover:cursor-pointer text-my-white">Demote</button>
                </div>
              </div>
            )
          }
          {
            error && (
              <p className="mt-2">{error}</p>
            )
          }
        </div>
      </form>
    </div>
  )
}

export default Users;