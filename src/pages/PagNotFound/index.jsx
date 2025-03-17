import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MetaData } from '../../components/Layout/MetaData';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <MetaData title="DXM - Page Not Found" />
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        }
      />
    </>

  );
};

export default PageNotFound;
