import React from 'react';
import { Row, Layout } from 'antd';

const TopNav: React.FC = () =>
  <Layout.Header className='bg-blue-500'>
    <Row align='middle' wrap={false} className='h-full'>
      <h4 className='text-white text-2xl'>Flight Management</h4>
    </Row>
  </Layout.Header>


export default TopNav