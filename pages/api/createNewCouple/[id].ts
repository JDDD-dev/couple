import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerPostCouples(req: NextApiRequest, res: NextApiResponse){
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session && session.user && session.user.email){
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (user){
            const couples = await prisma.couple.findMany({
                where: {
                    OR: [
                        {
                            creatorId: user.id
                        },
                        {
                            joinerId: user.id
                        }
                    ]
                }
            })
            if (couples.length > 2){
                res.status(301).send("You have the maximum amount of couples permited")
            }else{
                const { id } = req.query
    
                if (!id){
                    res.status(400).send("Not Id in the Params")
                }else{
                    const couplesJoiner = await prisma.couple.findMany({
                        where: {
                            OR: [
                                {
                                    creatorId: id.toString()
                                },
                                {
                                    joinerId: id.toString()
                                }
                            ]
                        }
                    })
                    if (couplesJoiner.length > 2){
                        res.status(302).send("The joiner account has already 3 couples")
                    }else{
                        await prisma.coupleRequest.create({
                            data: {
                                senderId: user.id,
                                receiverId: id.toString(),
                            }
                        })
                        res.status(200).send("Couple created")
                    }
                }
            }
        }else{
            res.status(400).send("User not exits")
        }
    }else{
        res.status(403).send("Not logged in")
    }
}