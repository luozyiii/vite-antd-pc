import { useCallback } from 'react';
import { Upload, Button, message } from 'antd';
import type { UploadProps } from 'antd';
import type { AxiosResponse } from 'axios';

interface ComponentProps extends UploadProps {
  fetch: (params: FormData) => Promise<AxiosResponse<Blob>>;
  name?: string; // 上传文件的字段名，默认file
  onUpdate?: () => void;
}

const Component = ({ fetch, name = 'file', onUpdate, children, ...other }: ComponentProps) => {
  const handleImport = useCallback(
    async (options: { file: unknown; onSuccess?: (response: unknown) => void; onError?: (error: Error) => void }) => {
      const { file } = options;
      const data = new FormData();
      data.append(name, file as File);
      const res = await fetch(data);
      if (res.data.type.includes('application/json')) {
        const reader = new FileReader();
        reader.onload = function () {
          const readerResult: string = typeof reader.result === 'string' ? reader.result : '';
          const result = JSON.parse(readerResult);
          if ([4000, 4001].includes(result.code)) {
            message.error(result.desc);
          } else {
            onUpdate?.();
          }
        };
        reader.readAsText(res.data);
      }
    },
    [fetch, name, onUpdate],
  );

  return (
    <Upload customRequest={handleImport} showUploadList={false} {...other}>
      <Button>{children || '导入'}</Button>
    </Upload>
  );
};

Component.displayName = 'BatchImport';

export default Component;
