import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import React, { FC } from 'react';

const S3Uploader: FC<{
  title: string;
  handleFinishedUpload: (info) => void;
}> = ({ title, handleFinishedUpload }) => {
  const handleError = (error, text) => {
    console.log('error', error, text);
  };

  const uploadOptions = {
    signingUrl: '/api/v1/images',
    signingUrlMethod: 'GET',
  };

  return (
    <div className="w-1/4 m-10">
      <p>{title}</p>
      <DropzoneS3Uploader
        onFinish={handleFinishedUpload}
        s3Url={process.env.NEXT_PUBLIC_S3URL}
        upload={uploadOptions}
        onError={handleError}
      />
    </div>
  );
};

export default S3Uploader;
