import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerGetCoupleRequest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }

    const session = await getServerSession(req, res, authOptions)

    if (!session){
        res.status(400).send("Not logged in")
        return
    }

    const cRequest = await prisma.coupleRequest.findMany({
        select: {
            sender: {
                select: {
                    email: true,
                    id: true,
                    image: true,
                    name: true,
                }
            },
            id: true
        },
        where: {
            receiverId: session.userId
        }
    })

    res.status(200).send(JSON.stringify(cRequest))
}