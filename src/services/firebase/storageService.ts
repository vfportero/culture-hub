import { FirebaseStorage } from ".";
import Compressor from 'compressorjs';

class StorageService {
  storageRef = FirebaseStorage.ref();

  public compressImage(file: File): Promise<File> {
    return new Promise<File>((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          convertSize: 1000000, // 1MB
          success: (result) => {
            resolve(new File([result], file.name, {type: result.type}))
          },
          error: (error: Error) => reject(error)
        })
    });
}

   
  public async updloadFiles(files: File[], folder: string): Promise<string[]> {
    
    const fileUrls: string[] = [];

    for (let file of files) {

      if (file.type.startsWith('image')) {
        file = await this.compressImage(file);    
      }

      const result = await this.storageRef.child(`${folder}/${file.name}`).put(file);
      if (result.state === 'success') {
        fileUrls.push(result.ref.fullPath);
      }

    }

    return fileUrls;
  }

  public async getPublicUrl(filePath: string): Promise<string> {
    return await this.storageRef.child(filePath).getDownloadURL();
  }
}

export default new StorageService();
