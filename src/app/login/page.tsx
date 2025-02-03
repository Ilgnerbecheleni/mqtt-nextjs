'use client'

import { useState } from "react";
import { useRouter } from "next/navigation"; 


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const  router = useRouter();
    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        // console.log(event)
        try {
            const response = await fetch('/api/emqx/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({username,password})
            })
        
            if(!response.ok){
                throw new Error("falha no login");
            }
            const data = await response.json();
            console.log(data.token);
            localStorage.setItem('token', data.token);
            router.push('/');
        } catch (error) {
            console.log(error.message);
        }
    }
   
    return (
       <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login no EMQX</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
    );
  }
  