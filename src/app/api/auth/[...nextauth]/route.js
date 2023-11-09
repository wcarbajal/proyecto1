import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import NextAuth from "next-auth/next";



const authOptions ={
    providers: [
        
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label:"Email", type: "text", placeholder: "jsmith"},
                password: {label:"Password", type: "password", placeholder: "*****"}
            },
            async authorize(credentials, req) {
                console.log("Aqui empieza credentials", credentials);
                
                const userFound = await db.user.findUnique({
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
