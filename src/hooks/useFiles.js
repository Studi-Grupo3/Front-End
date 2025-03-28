import { useState } from "react";
import { fileService } from "../services/fileService";

export const useFiles = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    setUploading(true);
    setError(null);
    try {
      return await fileService.uploadFile(file);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const getFileMetadata = async (id) => {
    try {
      return await fileService.getFileMetadata(id);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const downloadFile = async (id) => {
    try {
      await fileService.downloadFile(id);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    uploading,
    error,
    uploadFile,
    getFileMetadata,
    downloadFile,
  };
};