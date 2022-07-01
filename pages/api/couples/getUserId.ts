import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerGetUserId(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session && session.user && session.user.email){
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (user){
            res.status(200).send(JSON.stringify(user.id))
        }else{
            res.status(400).send("User not exits")
        }
        
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}