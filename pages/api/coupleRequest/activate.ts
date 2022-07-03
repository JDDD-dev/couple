import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerActivateCouple(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session){
        res.status(400).send("Not logged in")
        return
    }

    const cRequest = await prisma.coupleRequest.findUniqueOrThrow({
        where: {
            id: req.body.id
        }
    })

    if (cRequest.receiverId != session.userId){
        res.status(400).send("Not Allowed to do That")
        return
    }

    await prisma.couple.create({
        data: {
            active: true,
            joinerId: cRequest.receiverId,
            creatorId: cRequest.senderId,
        }
    })

    await prisma.coupleRequest.delete({
        where: {
            id: req.body.id
        }
    })

    res.status(200).send("Couple Created!")
}