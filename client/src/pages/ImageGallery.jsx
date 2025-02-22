import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from '../context/ThemeContext';
import Button from '../componants/Button';

const ImageGallery = () => {
  const { getImages, uploadImage, images } = useAuth();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    img: ""
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getImages(); // Fetch images when the component loads
  }, [getImages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL for the selected image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          img: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.title || !formData.subtitle || !formData.img) {
        throw new Error("Please fill in all fields");
      }

      const response = await uploadImage(formData);
      if (response.success) {
        // Reset form
        setFormData({ title: "", subtitle: "", img: "" });
        setPreviewUrl("");
      } else {
        throw new Error(response.message || "Failed to upload image");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-8`}>Image Gallery</h1>

      {/* Upload Form */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8 transition-colors duration-200`}>
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Upload New Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter subtitle"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </form>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img._id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden transition-colors duration-200`}>
            <img
              src={img.img}
              alt={img.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{img.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{img.subtitle}</p>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} col-span-full text-center py-8`}>
            No images uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
