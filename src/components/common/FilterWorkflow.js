// src/components/common/FilterTabs.js
'use client';

import { Tabs, Input, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from '@/styles/components/FilterWorkflow.module.css';

const { Search } = Input;

export default function FilterWorkflow({
    tabs = [],
    defaultActiveKey = "all",
    onTabChange,
    onSearch,
    searchPlaceholder = "Tìm kiếm ...",
    className = ""
}) {
    return (
        <div className={`m-5 ${className}`}>
            <div className="flex items-center justify-between">
                <Tabs
                    defaultActiveKey={defaultActiveKey}
                    onChange={onTabChange}
                    className={`${styles.customTabs} ${className}`}
                    items={tabs}
                />

                <div className="ml-auto">
                    <Flex vertical gap={12}>
                        <Input.Search
                            className={`${styles.searchInput}`}
                            placeholder={searchPlaceholder}
                            variant="filled"
                            onSearch={onSearch}
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />

                    </Flex>
                </div>
            </div>
        </div>
    );
}