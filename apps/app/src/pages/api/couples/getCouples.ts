import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerGetCouples(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await getServerSession(req, res, authOptions)
    if (session){
        
        const couples = await prisma.couple.findMany({
            select: {
                id: true,
                creatorId: true,
                creator: {
                    select: {
                        email: true,
                        name: true,
                        image: true
                    }
                },
                joiner: {
                    select: {
                        email: true,
                        name: true,
                        image: true
                    }
                }
            },
            where: {
                OR: [
                    {
                        creatorId: session.userId
                    },
                    {
                        joinerId: session.userId
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