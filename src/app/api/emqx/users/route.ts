import { NextResponse } from "next/server";

const emqxURL = "http://localhost:18083/api/v5/authentication/password_based:built_in_database/users"

export async function GET(req: Request) {
    

    const authHeader = req.headers.get('Authorization');


    if( !authHeader || !authHeader.startsWith('Bearer ')){
        return NextResponse.json({message:"Token Nao fornecido"},{status:401})
    }


    const token = authHeader.split(' ')[1];
    console.log(authHeader.split(' '));
    console.log(token);




    try {
        const response = await fetch(emqxURL,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            } 
        })

        if (!response.ok) {
            return NextResponse.json({ message: "Falha ao buscar usuários", error: await response.json() }, { status: response.status });
          }

          const users = await response.json();
       
          return NextResponse.json(users, {status:200})


    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return NextResponse.json({ message: "Erro interno do servidor", error: error }, { status: 500 });
    }


}