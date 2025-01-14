import { NextResponse } from "next/server";
import axios from 'axios'


export async function POST(request:Request) {
    const {username , password}= await request.json();

    try {
        const response = await axios.post('http://localhost:18083/api/v5/login', {
            username,
            password,
          });
          return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}