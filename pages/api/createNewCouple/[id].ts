import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerPostCouples(req: NextApiRequest, res: NextApiResponse){
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session && session.user && session.user.email){
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: session.user.email
            },
            include: {
                owns: true,
                joins: true,
                sendFReq: true,
                receiveFReq: true,
            }
        })
        if ((user.joins.length + user.owns.length) > 2){
            res.status(301).send("You have the maximum amount of couples permited")
        }else if (user.owns.length + user.joins.length + user.receiveFReq.length + user.sendFReq.length > 2){
            res.status(400).send("You have between Couples and Couples Request more than 3")
        }else{
            const { id } = req.query
    
            if (!id){
                 res.status(400).send("Not Id in the Params")
            }else{
                const userJoiner = await prisma.user.findUniqueOrThrow({
                    where: {
                        id: id.toString()
                    },
                    include: {
                         owns: true,
                        joins: true,
                    }
                })
                if (userJoiner.owns.length + userJoiner.joins.length > 2){
                    res.status(302).send("The joiner account has already 3 couples")
                }else{
                    await prisma.coupleRequest.create({
                        data: {
                            senderId: user.id,
                            receiverId: id.toString(),
                        }
                    })
                    res.status(200).send("Friend Request sent")
                }
            }
        }
    }else{
        res.status(403).send("Not logged in")
    }
}