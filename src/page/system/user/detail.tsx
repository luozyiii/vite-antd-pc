import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card title={`用户详情 - ${id}`}>
      <p>用户详情页面</p>
      <p>用户ID: {id}</p>
    </Card>
  );
};

export default UserDetailPage;
