// const { models } = require('@/db/config/sequelize');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.APP_SECRET,
});

class ImageService {
  async getAllCloudinary() {
    const { resources } = await cloudinary.search
      .expression('folder:labranzas')
      .sort_by('public_id', 'desc')
      .execute();

    // const publicIds = resources.map((file) => file.public_id);
    // return publicIds;
    return resources;
  }

  async createCloudinary(imagePath, originalname) {
    const res = await cloudinary.uploader.upload(imagePath, {
      folder: 'labranzas',
      public_id: originalname,
      //  use_filename: true,
      // unique_filename: false,
      overwrite: true,
    });

    res.filename = originalname;

    return res;
  }

  async deleteCloudinary(public_id) {
    const deleteId = await cloudinary.uploader.destroy(public_id);
    if (deleteId.result !== 'ok') {
      throw 'Image not found';
    }
    return deleteId;
  }
}
module.exports = ImageService;
