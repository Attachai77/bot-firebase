export const usersData = [
    {
        lineUserId: 'U6272a7d41c09bde82d23685d1fef9862',
        name: 'Wick',
        citizenId: '000-1'
    },
    {
        lineUserId: '002',
        name: 'Ronaldo',
        citizenId: '000-2'
    },
    {
        lineUserId: '003',
        name: 'Messi',
        citizenId: '000-3'
    },
]

export const getUserByLineUserId = (lineUserId: string) => {
    return usersData.find((_user: any)=> _user.lineUserId === lineUserId )
}