import Image from 'next/image';
import { FaDownload } from 'react-icons/fa'; // Import an icon from react-icons (or use any download icon)

const DownloadableImageWithHoverIcon = ({ imageURL, height }) => {
  console.log("imageURL--", imageURL);

  return (
    <div className="image-container">
      {/* Display Image */}
      <Image
        src={imageURL}
        alt="Sample Image"
        className="image"
        height={height}
      />

      {/* Download Icon */}
      {/* <a href={imageURL} download="sample-image.jpg" className="download-icon">
        <FaDownload size={24} color="white" />
      </a> */}

      <style jsx>{`
        .image-container {
          position: relative;
          display: inline-block;
        }

        .download-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
          padding: 5px;
          border-radius: 50%;
          display: none;
          cursor: pointer;
        }

        .image-container .download-icon {
          display: block;
        }

        .download-icon:hover {
          background-color: rgba(0, 0, 0, 0.8); /* Darken background on hover */
        }
      `}</style>
    </div>
  );
};

export default DownloadableImageWithHoverIcon;
