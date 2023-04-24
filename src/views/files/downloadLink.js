import React from 'react';

function DownloadLink({ url, label }) {
  return (
    <a href={url} download={label}>
      {label}
    </a>
  );
}

export default DownloadLink;