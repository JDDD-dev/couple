import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerGetUserId(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session){
        const { id } = req.query

        if (id){
            const user = await prisma.user.findUnique({
                where: {
                    id: id.toString()
                }
            })
            res.status(200).send(user)
        }else{
            res.status(400).send("Not Id in the Params")
        }
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}