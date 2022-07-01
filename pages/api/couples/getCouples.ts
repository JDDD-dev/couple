import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]";

export default async function handlerGetCouples(req: NextApiRequest, res: NextApiResponse): Promise<void>{
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session && session.user && session.user.email){
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: session.user.email
            },
            include: {
                owns: true,
                joins: true,
            }
        })

            const couples = user.owns.concat(user.joins)
            res.status(200).send(JSON.stringify(couples))
    }else{
        res.status(403).send({
            error: "Unauthorized"
        })
    }
}