import { apiFetch, BASE_URL } from "./api";

export const fileService = {
  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/files`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  },

  async getFileMetadata(id) {
    return apiFetch(`/files/${id}/info`);
  },

  async downloadFile(id) {
    const response = await fetch(`${BASE_URL}/files/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    const contentDisposition = response.headers.get("Content-Disposition");
    let filename = `downloaded-file`;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match) {
        filename = match[1];
      }
    }

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
};
