import React, { useState } from "react";
import api from "../Apis/api"; // Adjust path as needed

const VideoFetcher = ({ conversions }) => {
  const [_conversions, _setConversions] = useState(conversions || []);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const fetchPresignedUrl = async () => {
    const downloadUrl = _conversions[0]?.videoGenerations[0]?.downloadUrl;
    if (downloadUrl) {
      try {
        // Extract the video key from the S3 URL
        const videoKey = downloadUrl.split("/").slice(-2).join("/"); // Gets "videos/filename.mp4"
        console.log(
          "Fetching pre-signed URL for video key:",
          downloadUrl,
          videoKey
        );

        // Fixed API endpoint format for fetching pre-signed URL
        const response = await api.get(
          `/admin/video/presigned-url?key=${encodeURIComponent(videoKey)}`
        );
        console.log("Pre-signed URL response:", response.data);

        if (response.data.success) {
          setVideoUrl(response.data.presignedUrl);
          setError(null);
        } else {
          throw new Error(response.data.message || "Failed to get video URL");
        }
      } catch (err) {
        console.error("Error fetching video URL:", err);
        setError("Failed to load video. Please try again.");
        setVideoUrl(null);
      }
    } else {
      setError("No video URL available in the conversion data");
    }
  };

  return (
    <div>
      <button onClick={fetchPresignedUrl}>Get Video Link</button>
      {videoUrl && (
        <video controls src={videoUrl} style={{ width: "100%" }} />
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default VideoFetcher;
