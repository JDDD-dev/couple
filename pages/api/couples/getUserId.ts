import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { PrismaClient } from "../../../prisma/generated/client";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient()

export default async function handlerGetUserId(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session){
        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email!
            }
        })
        res.status(200).send(user?.id)
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}