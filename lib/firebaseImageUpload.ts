import firebaseApp from "@/lib/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export interface UploadImageType {
  url: string
}

export const firebaseImageUpload = async (image: File): Promise<UploadImageType> => {
  try {
    const fileName = new Date().getTime() + "-" + image.name;
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `products/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise<UploadImageType>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // handle progress if needed
        },
        (error) => {
          console.log("error uploading image ", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              const uploadedImage: UploadImageType = { url: downloadUrl };
              console.log("file available in ", downloadUrl);
              resolve(uploadedImage);
            })
            .catch((error) => {
              console.log("error getting download url ", error);
              reject(error);
            });
        }
      );
    });
  } catch (error) {
    console.log("error handle image upload ", error);
    throw new Error("Algo salió mal");
  }
};