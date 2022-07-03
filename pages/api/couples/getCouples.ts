import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerGetCouples(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session){
        const couples = await prisma.couple.findMany({
            where: {
                OR: [
                    {
                        creatorId: session.userId
                    },
                    {
                        joinerId: session.userId
                    }
                ]
            },
            include: {
                creator: true,
                joiner: true
            }
        })

            res.status(200).send(JSON.stringify(couples))
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}