import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    
    const data = await request.json();
    /*console.log( data);*/
    
    const userFound = await db.user.findUnique({
        where:{
            username: data.user
        }
    })

    if (userFound)
    {
        return NextResponse.json({
            message: "user ya existe"
            },
            {
                status: 400
            })
    }
    const emailFound = await db.user.findUnique({
        where: {
            email: data.email
        }
    })
   
    if (emailFound)
    {
        return NextResponse.json({
            message: "email ya existe"}
            ,
            {
                status: 400
            }
            )
    }
    const newUser = await db.user.create({
        data
        
    })

    return NextResponse.json('Registrado: ', newUser);
}

export async function GET(){
    return NextResponse.json('aqui...');
}