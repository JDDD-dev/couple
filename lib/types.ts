export type CouplesResponse = {
    id: string
    joiner: User
    creator: User
    creatorId: string
    joinerId: string
}

export type User = {
    id: string
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