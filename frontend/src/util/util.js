
export const convertBytes = (sizeInBytes) => {
    const KB = 1024;
    const MB = 1024 * 1024;
  
    if (sizeInBytes < MB) {
      // Convert to KB and truncate to 1 decimal place
      return Math.floor((sizeInBytes / KB) * 10) / 10 + ' KB';
    } else {
      // Convert to MB and truncate to 1 decimal place
      return Math.floor((sizeInBytes / MB) * 10) / 10 + ' MB';
    }
  };
  