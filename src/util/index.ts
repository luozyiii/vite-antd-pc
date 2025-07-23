/**
 * 延迟多少毫秒后继续执行
 * @return {Promise}
 */

export function sleep(time = 300) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 *
 * @param content blob 文本内容
 * @param fileName 下载的文件名
 */
export const downloadBlob = (content: BlobPart, fileName: string) => {
  const blob = new Blob([content]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
