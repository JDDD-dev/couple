import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../../auth/[...nextauth]";

export default async function handlerGetNotes(req: NextApiRequest, res: NextApiResponse): Promise<void>{

    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }

    const session = await getServerSession(req, res, authOptions)

    if (session){
        const { coupleId } = req.query

        if (!coupleId){
            res.status(400).send("This Couple don't exits")
            return
        }

        const queryRes = await prisma.couple.findMany({
            include: {
                coupleNotes: true
            },
            where: {
                AND: [
                    {
                        id: Number.parseInt(coupleId.toString())
                    },
                    {
                        OR: [
                            {
                                creatorId: session.userId
                            },
                            {
                                joinerId: session.userId
                            }
                        ]
                    }
                ]
            }
        })

        if (queryRes.length === 0) {
            res.status(400).send("You don't have access to this Couple Data")
            return 
        }

        res.status(200).send(JSON.stringify(queryRes[0].coupleNotes))
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}