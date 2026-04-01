import React from 'react';
import { Link } from 'react-router-dom';

// Khai báo kiểu dữ liệu cho Props truyền vào
interface Props {
  aiText?: string;
  aiImage?: string;
}

const renderAiText = (text: string) =>
  text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    const isBold = part.startsWith('**') && part.endsWith('**') && part.length > 4;

    if (isBold) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });

export const RecommendedDishes: React.FC<Props> = ({ aiText, aiImage }) => {
  return (
    <div className="flex flex-col gap-8">
      
      {/* NẾU CÓ DỮ LIỆU AI TRUYỀN TỚI */}
      {aiText ? (
        <>
          {/* 1. Hiển thị hình ảnh siêu đẹp (Nếu backend có trả về ảnh) */}
          {aiImage && (
            <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-md">
              <img 
                src={aiImage} 
                alt="Món ăn AI đề xuất" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          {/* 2. Hiển thị nội dung Text của AI */}
          <div className="bg-[#f6f7f5] rounded-3xl p-8 shadow-sm border border-gray-100">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ✨ Đề xuất từ Đầu bếp AI
             </h2>
             {/* Class whitespace-pre-wrap để giữ format xuống dòng */}
             <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[15px]">
               {renderAiText(aiText)}
             </div>
          </div>
        </>
      ) : (
        /* NẾU KHÔNG CÓ DỮ LIỆU (Người dùng F5 hoặc vào thẳng link) */
        <div className="text-center py-20 bg-[#f6f7f5] rounded-3xl border border-dashed border-gray-300">
          <p className="text-lg text-gray-500 mb-6">Bạn chưa tạo thực đơn nào cả.</p>
          <Link to="/" className="text-[#5f7041] font-bold underline">
            Quay lại trang chủ để bắt đầu
          </Link>
        </div>
      )}

    </div>
  );
};
