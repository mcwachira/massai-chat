import path from 'path'
import { fileURLToPath } from 'url'

export const getFileName = (metaUrl) => {
    const __filename = fileURLToPath(metaUrl);

return __filename
}

export const getDirname = (metaUrl) => {
    const  __dirname = path.dirname(getFileName(metaUrl))

    return __dirname;
}