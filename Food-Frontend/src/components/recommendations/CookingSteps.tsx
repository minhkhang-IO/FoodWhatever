export const CookingSteps = () => {
  const steps = [
    { num: 1, title: 'Chuẩn bị gà', desc: 'Cắt gà thành miếng vừa ăn, ướp với chút muối, tiêu và nước cốt chanh sẵn có.' },
    { num: 2, title: 'Áp chảo nhiệt độ cao', desc: 'Sử dụng lửa lớn để mặt ngoài gà vàng giòn nhưng bên trong vẫn giữ được độ mọng nước.' },
    { num: 3, title: 'Kết hợp rau củ', desc: 'Luộc sơ măng tây hoặc bất kỳ rau xanh nào bạn có trong tủ lạnh để ăn kèm.' },
    { num: 4, title: 'Thưởng thức', desc: 'Trình bày ra đĩa phẳng để có cảm giác như đang thưởng thức tại nhà hàng.' },
  ];

  return (
    <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden mt-6 mb-12">
      {/* Budget Block */}
      <div className="bg-[#5f7041] text-white p-10 lg:w-[400px] flex-shrink-0 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Nấu ăn tại nhà theo ngân sách</h2>
          <p className="text-sm text-brand-light/80 mb-12 leading-relaxed">
            Tận dụng nguyên liệu sẵn có để tạo ra bữa ăn chuẩn 5 sao với chi phí tối thiểu.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/20 pb-4">
            <span className="text-sm text-brand-light/80 hover:text-white transition-colors">Ước tính chi phí</span>
            <span className="text-xl font-bold">45.000 VNĐ</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brand-light/80">Tiết kiệm so với Ăn ngoài</span>
            <span className="bg-[#dff3ae] text-[#5f7041] text-xs font-bold px-3 py-1 rounded-full">GIẢM 68%</span>
          </div>
        </div>
      </div>

      {/* Steps Block */}
      <div className="bg-[#f6f7f5] p-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
          {steps.map(step => (
            <div key={step.num} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#dff3ae] text-[#5f7041] flex items-center justify-center font-bold text-sm shrink-0">
                {step.num}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
