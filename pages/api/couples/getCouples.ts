import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { PrismaClient } from "../../../prisma/generated/client";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient()

export default async function handlerGetCouples(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session){
        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email!
            }
        })
        const couples = await prisma.couple.findMany({
            where: {
                OR: [
                    {
                        creatorId: user?.id
                    },
                    {
                        joinerId: user?.id
                    }
                ]
            }
        })
        res.status(200).send(JSON.stringify(couples))
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}