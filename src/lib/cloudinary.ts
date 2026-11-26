function cloudinarySetting(name: "VITE_CLOUDINARY_CLOUD_NAME" | "VITE_CLOUDINARY_UPLOAD_PRESET") {
  const value = import.meta.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export function cloudinaryReady() {
  return Boolean(cloudinarySetting("VITE_CLOUDINARY_CLOUD_NAME") && cloudinarySetting("VITE_CLOUDINARY_UPLOAD_PRESET"));
}

export async function uploadToCloudinary(file: File) {
  const cloudName = cloudinarySetting("VITE_CLOUDINARY_CLOUD_NAME");
  const uploadPreset = cloudinarySetting("VITE_CLOUDINARY_UPLOAD_PRESET");
  if (!cloudName || !uploadPreset) {
    throw new Error("Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET before uploading images.");
  }
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", uploadPreset);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload || typeof payload.secure_url !== "string") {
    const reason = payload && typeof payload === "object" && payload.error && typeof payload.error.message === "string" ? payload.error.message : "The image could not be uploaded.";
    throw new Error(reason);
  }
  return payload.secure_url;
}
