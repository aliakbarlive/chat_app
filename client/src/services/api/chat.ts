export const chatApi = {
    getUserContacts: (userId: string) => {
        return `/api/users/${userId}/contacts`;
    },
    getUserMessages: ({ userId, chatId, type }: { userId: string; chatId: string; type: string }) => {
        return `/api/users/${userId}/messages?chatId=${chatId}&type=${type}`;
    },
    postUserMessage: ({ userId, chatId, type }: { userId: string; chatId: string; type: string }) => {
        return `/api/users/${userId}/message?chatId=${chatId}&type=${type}`;
    },
    updateReadStatus: ({ userId, chatId, type }: { userId: string; chatId: string; type: string }) => {
        return `/api/users/${userId}/messages/status?chatId=${chatId}&type=${type}`;
    }
};