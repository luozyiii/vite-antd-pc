import { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Upload } from 'antd';
import { uniqueId } from 'lodash-es';
import DraggableUploadListItem from './DraggableUploadListItem';
import styles from './index.module.scss';
import type { DragEndEvent } from '@dnd-kit/core';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

type CustomeUploadProps = UploadProps & {
  value?: UploadFile[];
  onChange?: (value: UploadFile[]) => void;
};

const Comp = ({ maxCount = 1, value = [], onChange, ...other }: CustomeUploadProps) => {
  const [loading, setLoading] = useState(false);

  // status: done | uploading | error
  // percent 进度 50
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const handleOnChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (fileList?.length === 0 && value?.length > 0) {
      const newValue: any = [];
      const len = maxCount < value?.length ? maxCount : value?.length;
      for (let i = 0; i < len; i++) {
        const ele = value[i];
        newValue.push({
          uid: uniqueId(),
          name: 'image.png',
          status: 'done',
          url: ele.url,
        });
      }
      setFileList(newValue);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(fileList);
  }, [fileList, onChange]);

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
        <Upload
          className={styles.uploadBox}
          {...other}
          maxCount={maxCount}
          listType="picture-card"
          fileList={fileList}
          onChange={handleOnChange}
          itemRender={(originNode, file) => <DraggableUploadListItem originNode={originNode} file={file} />}
        >
          {fileList.length >= maxCount ? null : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>上传{fileList.length}</div>
            </div>
          )}
        </Upload>
      </SortableContext>
    </DndContext>
  );
};

export default Comp;
