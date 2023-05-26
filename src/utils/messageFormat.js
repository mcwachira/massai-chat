export const formatMessage = (text) => {
    return {
        text:text,
        createdAt:new Date().getTime()
    }
}

export const formatLocation =(url) => {
    return {
        url,
        createdAt:new Date().getTime()
    }
}