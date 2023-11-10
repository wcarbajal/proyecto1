import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";



export const authOptions ={
    providers: [
        
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label:"Email", type: "text", placeholder: "jsmith"},
                password: {label:"Password", type: "password", placeholder: "*****"}
            },
            async authorize(credentials, req) {
                
                
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!userFound) throw new Error("Usuario no existe");

                

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

                if(!matchPassword) throw new Error("Password errado")

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                    

                };
            },
        }),
        
    ],
    pages: {
        signIn: "/auth/login",
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
