import { useState } from 'react'; // Thêm useState
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { PhysicalFoundation } from '../components/forms/PhysicalFoundation';
import { Preferences } from '../components/forms/Preferences';
import { TimeAndBudget } from '../components/forms/TimeAndBudget';
import { Fridge } from '../components/forms/Fridge';
import { Sparkles, Loader2 } from 'lucide-react'; // Thêm icon Loader để làm hiệu ứng loading

export const Home = () => {
  const navigate = useNavigate();
  
  // 1. Tạo State tổng để gom dữ liệu từ tất cả các component con
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    goal: '',
    dietType: '',
    allergies: '',
    cookTime: '',
    budget: '',
    fridgeItems: []
  });

  // Hàm này sẽ được truyền xuống các component con để chúng cập nhật dữ liệu lên đây
  // Định nghĩa: field là chuỗi (string), value có thể là chuỗi hoặc mảng chuỗi (vì tủ lạnh có nhiều món)
  const handleUpdateForm = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 2. Chuyển hàm submit thành async để gọi API
  const handleSubmit = async () => {
    // CHẶN CỬA Ở ĐÂY: Nếu chưa nhập cân nặng hoặc mục tiêu thì báo lỗi và dừng lại
    if (!formData.weight || !formData.goal) {
      alert("Bạn ơi, hãy cho My Food biết ít nhất Cân nặng và Mục tiêu của bạn nhé!");
      return; 
    }

    setLoading(true);
    try {
      // Gọi API xuống Backend (địa chỉ cổng 3000 như bài trước)
      const response = await fetch('http://localhost:3000/api/goi-y-mon-an', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Gửi toàn bộ dữ liệu người dùng đã nhập
        body: JSON.stringify(formData), 
      });

      if (!response.ok) throw new Error("Lỗi mạng");
      
      const data = await response.json();

      // 3. Chuyển hướng sang trang kết quả VÀ mang theo dữ liệu AI trả về cùng dữ liệu form đầu vào
      navigate('/recommendations', { 
        state: { 
          aiResult: data.ketQua,
          userData: formData 
        } 
      });

    } catch (error) {
      console.error("Lỗi gọi AI:", error);
      alert("Oops! Không thể kết nối với đầu bếp AI lúc này.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          <div className="flex-1 flex flex-col gap-10">
            <div>
              <h1 className="text-6xl tracking-tight font-bold mb-4 text-gray-900">
                Craft your <span className="italic text-[#5f7041]">ideal</span> plate.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Hãy xây dựng một kế hoạch ăn uống tôn trọng cơ thể, lịch trình và tủ đựng thức ăn của bạn. Hãy cho chúng tôi biết về lối sống của bạn và chúng tôi sẽ xử lý vấn đề dinh dưỡng.  
              </p>
            </div>
            
            <div className="space-y-6">
              {/* 4. Truyền hàm cập nhật xuống cho các form */}
              <PhysicalFoundation onChange={handleUpdateForm} />
              <Preferences onChange={handleUpdateForm} />
              <TimeAndBudget onChange={handleUpdateForm} />
              <Fridge onChange={handleUpdateForm} />
              
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#5f7041] hover:bg-[#4a5833] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 transition-all mt-4"
              >
                {/* Đổi text và icon khi đang loading */}
                {loading ? (
                  <>Đang phân tích dữ liệu... <Loader2 size={20} className="animate-spin" /></>
                ) : (
                  <>Get My Personalized Meal Plan <Sparkles size={20} /></>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 italic mt-2">Calculated by AI based on your unique data.</p>
            </div>
          </div>

          <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col gap-8">
            <Sidebar />
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
};