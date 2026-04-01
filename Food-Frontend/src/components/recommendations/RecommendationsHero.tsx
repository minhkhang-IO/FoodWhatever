import { Sparkles } from 'lucide-react';

interface UserData {
  goal?: string;
  fridgeItems?: string[];
  dietType?: string;
}

export const RecommendationsHero = ({ userData }: { userData?: UserData }) => {
  // Trích xuất dữ liệu người dùng, sử dụng fallback nếu không có
  const goal = userData?.goal ? userData.goal.toLowerCase() : "sức khỏe";
  const fridgeText = userData?.fridgeItems?.length 
    ? userData.fridgeItems.join(', ')
    : "nguyên liệu sẵn có";
  const diet = userData?.dietType ? ` theo chế độ ${userData.dietType}` : "";

  return (
    <div className="mb-12">
      <div className="inline-flex items-center gap-1.5 bg-[#dff3ae] text-[#657a44] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-6">
        <Sparkles size={12} /> AI Insight
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-4xl mb-6">
        Dựa trên <span className="text-[#657a44] italic">{fridgeText}</span> và mục tiêu <span className="text-[#985e35] italic">{goal}</span> của bạn...
      </h1>
      
      <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
        Chúng tôi đã thiết kế một lộ trình dinh dưỡng thông minh{diet},
        đảm bảo bám sát nhu cầu cá nhân nhưng vẫn giữ được hương vị tinh tế của ẩm thực Việt.
      </p>
    </div>
  );
};
