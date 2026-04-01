import { useLocation } from 'react-router-dom'; // Thêm dòng này
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RecommendationsHero } from '../components/recommendations/RecommendationsHero';
import { RecommendedDishes } from '../components/recommendations/RecommendedDishes';
import { NearbySpots } from '../components/recommendations/NearbySpots';
import { CookingSteps } from '../components/recommendations/CookingSteps';

export const Recommendations = () => {
  // 1. Lấy dữ liệu từ trang Home truyền sang
  const location = useLocation();
  const aiData = location.state;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-8 lg:px-12 py-10 mt-6 md:mt-10 bg-white">
        <RecommendationsHero userData={aiData?.userData} />
        
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Cột Trái - Truyền dữ liệu AI vào component của bạn */}
          <div className="flex-1">
            <RecommendedDishes 
              aiText={aiData?.aiResult} 
              aiImage={aiData?.imageUrl} 
            />
          </div>
          
          {/* Cột Phải - Giữ nguyên không đụng chạm */}
          <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
            <NearbySpots />
          </aside>
        </div>

        {/* Phần Dưới - Giữ nguyên không đụng chạm */}
        <div className="mt-16">
          <CookingSteps />
        </div>
      </main>

      <Footer />
    </div>
  );
};