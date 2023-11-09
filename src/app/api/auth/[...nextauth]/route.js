import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import {PrismaClient} from "@prisma/client";
import NextAuth from "next-auth/next";

const prisma = new PrismaClient();

const authOptions ={
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label:"Email", type: "text", placeholder: "jsmith"},
                password: {label:"Password", type: "password", placeholder: "*****"}
            },
            async authorize(credentials, req) {
                console.log(credentials);
                
                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!userFound) return null;

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                    

                };
            },
        }),
        
    ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}