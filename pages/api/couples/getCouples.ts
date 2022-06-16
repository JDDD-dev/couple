import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "../../../prisma/generated/client";

const prisma = new PrismaClient()

export default async function handlerGetCouples(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await getSession({req})
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
        res.status(200).send(couples)
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}