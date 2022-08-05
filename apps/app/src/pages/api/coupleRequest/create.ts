import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerPostCouples(req: NextApiRequest, res: NextApiResponse){
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session){

        const user = await prisma.user.findUniqueOrThrow({
            select: {
                email: true,
                id: true,
                owns: {
                    select: {
                        joinerId: true
                    }
                },
                joins: {
                    select: {
                        creatorId: true
                    }
                },
                receiveFReq: {
                    select: {
                        senderId: true
                    }
                },
                sendFReq: {
                    select: {
                        receiverId: true
                    }
                }
            },
            where: {
                id: session.userId
            }
        })
        if ((user.owns.length + user.joins.length) > 2){
            res.status(400).send("You have the maximum amount of couples permited")
            return
        }

        const email: string = JSON.parse(req.body)
    
        if (!email){
            res.status(400).send("Not Email in the Params")
            return
        }

        if (user.email == email){
            res.status(400).send("You can't add yourself as a Couple")
            return
        }

        const id = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        })

        if (id == null){
            res.status(400).send("This User does not exits")
            return
        }
        

        if (user.owns.find(couple => couple.joinerId == id.id) !== undefined) {
            res.status(400).send("You are already in a Couple with this User")
            return
        }

        if (user.joins.find(couple => couple.creatorId == id.id) !== undefined){
            res.status(400).send("You are already in a Couple with this User")
            return
        }

        if (user.sendFReq.find((fRequest) => {
            fRequest.receiverId == id.id
        }) != undefined){
            res.status(400).send("You already sent a Couple Request to this User")
            return
        }

        if (user.receiveFReq.find((fRequest) => {
            fRequest.senderId == id.id
        }) != undefined){
            res.status(400).send("You already have a Couple Request from this User")
            return
        }

        await prisma.coupleRequest.create({
            data: {
                senderId: user.id,
                receiverId: id.id,
            }
        })
            res.status(200).send("Friend Request sent")
    }else{
        res.status(403).send("Not logged in")
    }
}