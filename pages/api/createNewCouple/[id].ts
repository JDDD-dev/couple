import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { PrismaClient } from "../../../prisma/generated/client";
import { authOptions } from "../auth/[...nextauth]";
import sgMail from "@sendgrid/mail"

const prisma = new PrismaClient()

export default async function handlerPostCouples(req: NextApiRequest, res: NextApiResponse){
    const session = await unstable_getServerSession(req, res, authOptions)
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
            res.status(301).send("You have the maximum amount of couples permited")
        }else{
            const { id } = req.query
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
                await prisma.couple.create({
                    data: {
                        creatorId: user?.id!,
                        joinerId: id.toString()
                    }
                })
                const userEmail = await prisma.user.findUnique({
                    where: {
                        id: id.toString()
                    }
                })
                sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
                const msg = {
                    to: userEmail?.email!,
                    from: 'jesuspinolucena@gmail.com',
                    subject: 'A Wild Couple ❤️ request Appears!',
                    html: '<strong>A new Couple request was send by ' + user?.email + '</strong><a href="http://localhost:3000"></a>',
                };
                await sgMail.send(msg)
                res.status(200).send("Couple created")
            }
            
        }
    }else{
        res.status(403).send("Not logged in")
    }
}