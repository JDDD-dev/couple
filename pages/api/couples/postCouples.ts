import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "../../../prisma/generated/client";

const prisma = new PrismaClient()

export default async function handlerPostCouples(req: NextApiRequest, res: NextApiResponse){
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
        if (couples.length > 2){
            res.status(401).send("You have the maximum amount of couples permited")
        }else{
            await prisma.couple.create({
                data: {
                    creatorId: user?.id!
                }
            })
            res.status(200).send("Couple created")
        }
    }else{
        res.status(403).send("Not logged in")
    }
}