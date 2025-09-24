// src/components/common/PageHeader.js
'use client';

import { Breadcrumb } from 'antd';
import { Layout } from 'antd';
const { Header: AntHeader } = Layout;

export default function FilterWorkflow({
    title,
    subtitle,
    actions,
    extra
}) {
    return (
        <div>
            <AntHeader
                className="bg-white px-6 flex items-center justify-between ml-6"
                style={{ height: '70px', backgroundColor: '#ffffff', marginTop: '20px' }}
            >
                
            </AntHeader>
        </div>
    );
}