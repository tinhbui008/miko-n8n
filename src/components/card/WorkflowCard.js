import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined, StepForwardOutlined, HeartOutlined, StarFilled } from '@ant-design/icons';
import { Avatar, Card, Flex, Button } from 'antd';
const { Meta } = Card;
import Image from 'next/image';
import styles from '../../styles/components/Workflow.module.css';

export default function WorkflowCard() {

    const text = "AI tạo email giới thiệu cá nhân hóa (chèn tên, nhu cầu, gợi ý sản phẩm). Nếu khách hàng mở mail nhưng ádasdas ...";
    const truncatedText = text.length > 100 ? text.substring(0, 100) + "..." : text;

    return (
        <Card style={{ width: '370px' }}>
            <Flex style={{ position: 'absolute', top: '20px', right: '22px', gap: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(6px)', padding: '5px 18px' }}>
                <StarFilled style={{ color: '#FFDE5A' }} />
                <span className='text-sm font-semibold'>4.8</span>
                <HeartOutlined />
            </Flex>

            <Flex style={{ overflow: 'hidden', flexWrap: 'nowrap', gap: '9px' }}>
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

            <div style={{ margin: '6px 0' }}>
                <h2 className='text-sm font-semibold'>Đăng bài lên Facebook</h2>
            </div>

            <div>
                <p className='text-xs text-gray-500'>
                    {truncatedText}
                </p>
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
    )
}


// src/components/marketplace/ProductCard.js
// 'use client';

// import React, { useState } from 'react';
// import { Card, Button, Typography } from 'antd';
// import { HeartOutlined, HeartFilled } from '@ant-design/icons';

// const { Text, Title } = Typography;

// // Custom App Icons
// const AppIcons = {
//     Gmail: () => (
//         <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">M</span>
//         </div>
//     ),
//     Excel: () => (
//         <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
//             <div className="w-6 h-6 bg-white rounded grid grid-cols-2 gap-0.5 p-1">
//                 <div className="bg-green-600 rounded-sm"></div>
//                 <div className="bg-green-600 rounded-sm"></div>
//                 <div className="bg-green-600 rounded-sm"></div>
//                 <div className="bg-green-600 rounded-sm"></div>
//             </div>
//         </div>
//     ),
//     Telegram: () => (
//         <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//             <div className="w-5 h-5 border-2 border-white rounded-full relative">
//                 <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full transform translate-x-1 -translate-y-1"></div>
//             </div>
//         </div>
//     ),
//     Zalo: () => (
//         <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-sm">Zalo</span>
//         </div>
//     ),
//     WordPress: () => (
//         <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
//             <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
//                 <span className="text-gray-700 font-bold text-xs">W</span>
//             </div>
//         </div>
//     ),
//     Facebook: () => (
//         <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">f</span>
//         </div>
//     )
// };

// export default function WorkflowCard({
//     title = "Đăng bài lên Facebook",
//     description = "AI tạo email giới thiệu cá nhân hóa (chèn tên, nhu cầu, gợi ý sản phẩm).",
//     additionalInfo = "Nếu khách hàng mở mail nhưng ádasdas ...",
//     price = "99.000 đ",
//     rating = 4.8,
//     icons = ['Gmail', 'Excel', 'Telegram', 'Zalo', 'WordPress'],
//     onBuy,
//     onFavorite,
//     className = ""
// }) {
//     const [isFavorite, setIsFavorite] = useState(false);

//     const handleFavoriteToggle = () => {
//         const newFavoriteState = !isFavorite;
//         setIsFavorite(newFavoriteState);
//         if (onFavorite) {
//             onFavorite(newFavoriteState);
//         }
//     };

//     const handleBuyClick = () => {
//         if (onBuy) {
//             onBuy();
//         }
//     };

//     return (
//         <Card
//             style={{ width: '25%' }}
//             className={`${className}`}
//         >
//             {/* App Icons Row */}
//             <div className="flex items-center justify-between mb-6">
//                 <div className="flex space-x-3 b">
//                     {icons.slice(0, 5).map((iconName, index) => {
//                         const IconComponent = AppIcons[iconName];
//                         return IconComponent ? <IconComponent key={index} /> : null;
//                     })}
//                 </div>

//                 {/* Rating and Favorite */}
//                 <div className="flex items-center space-x-3">
//                     <div className="flex items-center space-x-1">
//                         <span className="text-yellow-500 text-lg">⭐</span>
//                         <Text strong className="text-gray-700 text-base">
//                             {rating}
//                         </Text>
//                     </div>
//                     <button
//                         onClick={handleFavoriteToggle}
//                         className="text-xl text-gray-400 hover:text-red-500 transition-colors p-1"
//                     >
//                         {isFavorite ?
//                             <HeartFilled className="text-red-500" /> :
//                             <HeartOutlined />
//                         }
//                     </button>
//                 </div>
//             </div>

//             {/* Product Title */}
//             <Title level={3} className="!mb-4 !text-gray-900 !font-semibold !text-xl">
//                 {title}
//             </Title>

//             {/* Description */}
//             <Text className="text-gray-600 block mb-2 leading-relaxed text-base">
//                 {description}
//             </Text>

//             {/* Additional Info with Link */}
//             <div className="mb-8">
//                 <Text className="text-gray-600 text-base">
//                     {additionalInfo}{' '}
//                     <span className="text-blue-500 hover:text-blue-600 cursor-pointer hover:underline">
//                         Xem Thêm
//                     </span>
//                 </Text>
//             </div>

//             {/* Price and Buy Button */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <Text type="secondary" className="text-sm block mb-1 uppercase tracking-wide">
//                         Price
//                     </Text>
//                     <Title level={3} className="!mb-0 !text-teal-600 !font-bold !text-xl">
//                         {price}
//                     </Title>
//                 </div>

//                 <Button
//                     size="large"
//                     onClick={handleBuyClick}
//                     className="px-8 h-12 border-gray-300 text-gray-600 hover:border-teal-500 hover:text-teal-600 font-medium rounded-lg bg-white"
//                     style={{
//                         borderColor: '#d1d5db',
//                         color: '#6b7280'
//                     }}
//                 >
//                     Buy Now
//                 </Button>
//             </div>
//         </Card>
//     );
// }