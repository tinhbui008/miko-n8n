import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined, StepForwardOutlined, HeartOutlined, StarFilled } from '@ant-design/icons';
import { Avatar, Card, Flex, Button, Modal } from 'antd';
const { Meta } = Card;
import Image from 'next/image';
import styles from '../../styles/components/Workflow.module.css';

export default function WorkflowCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [hoverTimer, setHoverTimer] = useState(null);

    const text = "AI tạo email giới thiệu cá nhân hóa (chèn tên, nhu cầu, gợi ý sản phẩm)";
    const descriptionText = "AI tạo email giới thiệu cá nhân hóa (chèn tên, nhu cầu, gợi ý sản phẩm).Nếu khách hàng mở mail nhưng AI tạo email giới thiệu cá nhân hóa (chèn tên, nhu cầu, gợi ý sản phẩm). Nếu khách hàng mở mail nhưng khách.";

    const truncatedText = text.length > 100 ? text.substring(0, 100) + "..." : text;
    // const description = descriptionText.length > 100 ? text.substring(0, 100) + "..." : descriptionText;

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Card
                style={{ width: '377px', height: '242px', cursor: 'pointer' }}
            >
                <Flex style={{ position: 'absolute', top: '20px', right: '22px', gap: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(6px)', padding: '5px 18px' }}>
                    <StarFilled style={{ color: '#FFDE5A' }} />
                    <span className='text-sm font-semibold'>4.8</span>
                    <HeartOutlined />
                </Flex>

                <Flex style={{ overflow: 'hidden', flexWrap: 'nowrap', gap: '9px', margin: '0 0 12px 0' }}>
                    <div style={{ padding: '0 10px', border: '1px solid #f7f7f7', flex: '0 0 50px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <Image alt="image" src="/images/google-mail.png" width={50} height={50} />
                    </div>

                    <div style={{ padding: '0 10px', border: '1px solid #f7f7f7', flex: '0 0 50px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <Image alt="image" src="/images/google-sheet.png" width={50} height={50} />
                    </div>

                    <div style={{ padding: '0 10px', border: '1px solid #f7f7f7', flex: '0 0 50px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <Image alt="image" src="/images/telegram.png" width={50} height={50} />
                    </div>

                    <div style={{ padding: '0 10px', border: '1px solid #f7f7f7', flex: '0 0 50px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <Image alt="image" src="/images/zalo.png" width={50} height={50} />
                    </div>

                    <div style={{ padding: '0 10px', border: '1px solid #f7f7f7', flex: '0 0 50px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <Image alt="image" src="/images/wordpress.png" width={50} height={50} />
                    </div>

                    <div style={{ padding: '0 10px', border: '1px solid #f7f7f7', flex: '0 0 50px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <Image alt="image" src="/images/wordpress.png" width={50} height={50} />
                    </div>
                </Flex>

                <div style={{ margin: '12px 0', }}>
                    <h2 className='text-sm font-semibold'>Đăng bài lên Facebook</h2>
                </div>

                <div>
                    <p className='text-xs text-gray-500'>
                        {truncatedText}
                    </p>
                    <span className='text-xs text-gray-500'>
                        Nếu khách hàng mở mail nhưng ...
                        <a href="#" className="text-blue-500 font-bold" onClick={handleClick}>Xem thêm</a>
                    </span>
                </div>

                <Flex style={{ justifyContent: 'space-between', margin: '10px 0', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <Flex vertical>
                            <span className={`${styles.price_title} font-bold`}>Price</span>
                            <span className={`${styles.price_value} font-semibold`}>99.000đ</span>
                        </Flex>
                    </div>
                    <Button className={`${styles.buy_now} font-bold`}>Buy Now</Button>
                </Flex>
            </Card>

            <Modal
                open={isModalOpen}
                style={{ top: 150, left: 20 }}
                width={499}
                height={504}
                closable={false}
                onCancel={handleModalClose}
                footer={null}
            >
                <div>
                    <Flex style={{ justifyContent: 'space-between' }}>
                        <div>
                            <Flex style={{ width: 'fit-content', minHeight: '60px', alignItems: 'center', gap: '20px', margin: '0 0 4px 0', padding: '0 10px', border: '1px solid #EFEFEF' }}>
                                <Image alt="image" src="/images/google-mail.png" width={35} height={35} />
                                <span style={{ lineHeight: '40px', fontWeight: 'bold', color: '#676767', fontSize: '20px' }}>Hook Email</span>
                            </Flex>

                            <Flex style={{ width: 'fit-content', minHeight: '60px', alignItems: 'center', gap: '20px', margin: '0 0 4px 0', padding: '0 10px', border: '1px solid #EFEFEF' }}>
                                <Image alt="image" src="/images/google-sheet.png" width={35} height={35} />
                                <span style={{ lineHeight: '40px', fontWeight: 'bold', color: '#676767', fontSize: '20px' }}>Chatbot Telegram</span>
                            </Flex>

                            <Flex style={{ width: 'fit-content', minHeight: '60px', alignItems: 'center', gap: '20px', margin: '0 0 4px 0', padding: '0 10px', border: '1px solid #EFEFEF' }}>
                                <Image alt="image" src="/images/wordpress.png" width={35} height={35} />
                                <span style={{ lineHeight: '40px', fontWeight: 'bold', color: '#676767', fontSize: '20px' }}>Call Data WordPress</span>
                            </Flex>

                            <Flex style={{ width: 'fit-content', minHeight: '60px', alignItems: 'center', gap: '20px', margin: '0 0 4px 0', padding: '0 10px', border: '1px solid #EFEFEF' }}>
                                <Image alt="image" src="/images/zalo.png" width={35} height={35} />
                                <span style={{ lineHeight: '40px', fontWeight: 'bold', color: '#676767', fontSize: '20px' }}>Call Data WordPress</span>
                            </Flex>

                            <Flex style={{ width: 'fit-content', minHeight: '60px', alignItems: 'center', gap: '20px', margin: '0 0 4px 0', padding: '0 10px', border: '1px solid #EFEFEF' }}>
                                <Image alt="image" src="/images/google-sheet.png" width={35} height={35} />
                                <span style={{ lineHeight: '40px', fontWeight: 'bold', color: '#676767', fontSize: '20px' }}>Push Notification</span>
                            </Flex>
                        </div>

                        <Flex style={{ border: '1px solid #EFEFEF', position: 'absolute', top: '20px', right: '22px', gap: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(6px)', padding: '5px 18px' }}>
                            <StarFilled style={{ color: '#FFDE5A' }} />
                            <span className='text-sm font-semibold'>4.8</span>
                            <HeartOutlined />
                        </Flex>
                    </Flex>

                    <h2 className='text-sm font-semibold'>Đăng bài lên Facebook</h2>

                    <p className='text-xs text-gray-500'>
                        {descriptionText}
                        <a href="#" className="text-blue-500 font-bold" onClick={handleClick}>Xem thêm</a>
                    </p>

                    <Flex style={{ justifyContent: 'space-between', margin: '10px 0', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <Flex vertical>
                                <span className={`${styles.price_title} font-bold`}>Price</span>
                                <span className={`${styles.price_value} font-semibold`}>99.000đ</span>
                            </Flex>
                        </div>

                        <Button className={`${styles.buy_now_modal} ${styles.buy_now} font-bold`}>Buy Now</Button>
                    </Flex>
                </div>
            </Modal>
        </>
    )
}