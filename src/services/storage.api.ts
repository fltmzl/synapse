import { storage } from "@/firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot
} from "firebase/storage";

export class StorageService {
  /**
   * Uploads a file to Firebase Storage
   * @param file The file to upload
   * @param path The path in storage (e.g., "articles/image.jpg")
   * @param onProgress Optional callback for progress tracking
   * @returns Promise resolving to the download URL
   */
  static async uploadFile(
    file: File,
    path: string,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }
}
