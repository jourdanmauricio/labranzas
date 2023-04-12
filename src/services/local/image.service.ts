import axios from 'axios';
import { CloudinaryImage } from '@/models';

export class ImageHttpService {
  private static instance: ImageHttpService | null = null;

  public static getIntance(): ImageHttpService {
    if (ImageHttpService.instance === null) {
      ImageHttpService.instance = new ImageHttpService();
    }

    return ImageHttpService.instance;
  }

  getAllImages = async () => {
    const { data } = await axios.get('/api/images');
    return data;
  };

  async create(file: any) {
    const fd = new FormData();
    fd.append('image', file);

    const upload = await axios.post('/api/images/upload-image', fd);
    return upload;
  }

  async delete(id: CloudinaryImage['public_id']): Promise<{ id: string }> {
    const { data } = await axios.delete('/api/images', {
      data: { public_id: id },
    });
    return data;
  }
}
