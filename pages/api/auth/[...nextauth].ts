import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '../../../prisma/generated/client'
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const prisma: PrismaClient = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!
        })
    ]
})
