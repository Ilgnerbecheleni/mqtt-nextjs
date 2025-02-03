'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter();
  const [users , setusers]= useState([]);
 


  useEffect(()=>{

    const token = localStorage.getItem('token');
    if(!token){
      router.push('/login')
      return
    }
    
    const fetchUsers = async ()=>{
      try {
        const response = await fetch('api/emqx/users',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          } 
      })
    const data = await response.json()
    console.log(data)

    if(data?.error?.code === "BAD_TOKEN"){
      console.warn("Token expirado");
      localStorage.removeItem("token");
      router.push('/login');
    }


      setusers(data?.data || [] );
      
      } catch (error) {
       
        console.error("Erro ao listar usuário:", error);
      }
    }

fetchUsers()
  },[router])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <h1>Lista de usuarios</h1>
       <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">User ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Superusuário</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: { user_id: string, is_superuser: boolean }, index: number) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{user.user_id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.is_superuser ? "Sim" : "Não"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center border border-gray-300 py-4">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>


    </div>
  );
}
