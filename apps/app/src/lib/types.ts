export type CouplesResponse = {
    id: string
    joiner: User
    creator: User
    creatorId: string
}

export type User = {
    email: string
    image: string
    name: string
}

export type CoupleRequestResponse = {
    sender: {
        email: string,
        id: string,
        image: string,
        name: string
    },
    id: string
}