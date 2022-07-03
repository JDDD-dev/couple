import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerPostCouples(req: NextApiRequest, res: NextApiResponse){
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session){
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: session.userId
            },
            include: {
                joins: true,
                owns: true,
                sendFReq: true,
                receiveFReq: true,
            }
        })
        if ((user.owns.length + user.joins.length) > 2){
            res.status(400).send("You have the maximum amount of couples permited")
            return
        }

        const id = req.body.id
    
        if (!id){
            res.status(400).send("Not Id in the Params")
            return
        }
        
        if (user.owns.find((couple) => {
            couple.joinerId == id
        }) != undefined){
            res.status(400).send("You are already in a Couple with this User")
            return
        }

        if (user.joins.find((couple) => {
            couple.creatorId == id
        }) != undefined){
            res.status(400).send("You are already in a Couple with this User")
            return
        }

        if (user.sendFReq.find((fRequest) => {
            fRequest.receiverId == id
        }) != undefined){
            res.status(400).send("You already sent a Couple Request to this User")
            return
        }

        if (user.receiveFReq.find((fRequest) => {
            fRequest.senderId == id
        }) != undefined){
            res.status(400).send("You already have a Couple Request from this User")
            return
        }

        await prisma.coupleRequest.create({
            data: {
                senderId: user.id,
                receiverId: id.toString(),
            }
        })
            res.status(200).send("Friend Request sent")
    }else{
        res.status(403).send("Not logged in")
    }
}