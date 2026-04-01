import { useState, useEffect } from 'react';
import { MapPin, Utensils, AlertCircle, Loader2 } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number | string;
  distance: string;
  lat: number;
  lng: number;
}

export const NearbySpots = ({ dishName }: { dishName?: string }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async (lat: number, lng: number) => {
      try {
        const response = await fetch('http://localhost:3000/api/tim-quan-an-gan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: lat, longitude: lng, dishName })
        });
        
        if (!response.ok) throw new Error("Lỗi kết nối máy chủ backend");
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        setRestaurants(data.quan_an || []);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi hệ thống");
      } finally {
        setLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchRestaurants(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Vui lòng cấp quyền Vị Trí (Location) trên trình duyệt để AI có thể quét bản đồ.");
          setLoading(false);
        }
      );
    } else {
      setError("Trình duyệt không hỗ trợ hệ thống định vị GPS.");
      setLoading(false);
    }
  }, [dishName]);

  return (
    <div className="bg-[#e9eae6] rounded-3xl p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Địa điểm ăn uống</h2>
        <MapPin size={20} className="text-[#657a44]" />
      </div>

      <div className="relative bg-gray-300 h-48 rounded-2xl overflow-hidden flex items-center justify-center">
        {/* Abstract Map Graphic Placeholder */}
        <div className="absolute inset-0 bg-gray-300 opacity-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.015\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23e0e0e0\'/%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.2\'/%3E%3C/svg%3E")'}}></div>
        {loading ? (
           <Loader2 size={40} className="text-[#657a44] animate-spin z-10" />
        ) : (
           <MapPin size={40} className="text-[#657a44] fill-[#657a44] text-white z-10" />
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Quán ăn nổi bật gần đây</h3>
        
        <div className="space-y-3">
          {loading && (
            <div className="flex justify-center items-center py-4 text-[#657a44]">
              <Loader2 size={24} className="animate-spin" />
              <span className="ml-2 text-sm font-medium">Đang quét bản đồ vệ tinh...</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 bg-red-50 text-red-600 p-3 rounded-xl border border-red-100 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && restaurants.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4 bg-white rounded-2xl">Không tìm thấy quán ăn nổi bật nào gần bạn.</p>
          )}

          {!loading && !error && restaurants.slice(0, 3).map((spot) => (
            <a href={`https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`} target="_blank" rel="noreferrer" key={spot.id} className="block">
              <div className="bg-white rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-[#657a44]/20 hover:-translate-y-0.5">
                <div className="flex items-center gap-4 overflow-hidden pr-2">
                  <div className="w-10 h-10 rounded-xl bg-[#657a44] bg-opacity-90 flex items-center justify-center text-white shrink-0">
                    <Utensils size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm truncate">{spot.name}</h4>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">{spot.address}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded text-nowrap">{spot.rating} ★</span>
                      <span className="text-[10px] bg-[#e9eae6] text-[#657a44] px-1.5 py-0.5 rounded font-bold text-nowrap">{spot.distance} km</span>
                    </div>
                  </div>
                </div>
                <div className="text-gray-300 font-bold shrink-0">›</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
