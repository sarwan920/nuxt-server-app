import { getStorage, ref, uploadBytes } from "firebase/storage";
export default defineEventHandler(async (event) => {

    const storage = getStorage();

    const formData = await readMultipartFormData(event);
    const storageRef = ref(storage, `images/${formData[0].name}`);
    const metadata = {
        contentType: 'image/jpeg',
    };
    const fileData = formData[0].data
    try {
        await uploadBytes(storageRef, fileData, metadata);
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Server Error!"
        })
    }

    return {
        Message: "File Uploaded Successfully"
    }

}) 