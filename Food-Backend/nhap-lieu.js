const fs = require('fs');
const pdfParse = require('pdf-parse');
// Sử dụng Admin SDK để toàn quyền ghi vào Database
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 1. CẤU HÌNH KẾT NỐI
// Cắm chìa khóa Firebase vào
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Cắm API Key của Google AI Studio (Dùng lại key cũ của bạn)
const genAI = new GoogleGenerativeAI("AIzaSyCKlfTF-GOxvof6uBl5JABKFVQhrdEoJdc");

async function duaSachVaoDatabase() {
    try {
        console.log("Đang đọc file PDF...");
        
        // --- CÔNG ĐOẠN 1: CHUNKING (BĂM NHỎ DỮ LIỆU) ---
        // --- CÔNG ĐOẠN 1: CHUNKING (BĂM NHỎ DỮ LIỆU) ---
        const dataBuffer = fs.readFileSync('./555 mon an viet nam.pdf');
        
        // Mẹo xử lý lỗi "is not a function": Tự động tìm đúng hàm để chạy
        const parseFunc = typeof pdfParse === 'function' ? pdfParse : (pdfParse.default || pdfParse);
        
        const pdfData = await parseFunc(dataBuffer);
        const toanBoChuTrongSach = pdfData.text;

        // Kỹ thuật băm nhỏ đơn giản: Cắt theo các cụm khoảng trắng lớn hoặc dấu hiệu chuyển bài.
        // Giả sử mỗi công thức cách nhau bởi 2 lần xuống dòng (\n\n)
        const cacDoanNho = toanBoChuTrongSach
            .split('\n\n')
            .map(doan => doan.trim())
            .filter(doan => doan.length > 100); // Bỏ qua các đoạn quá ngắn (như số trang, tiêu đề lặt vặt)

        console.log(`Đã băm sách thành ${cacDoanNho.length} công thức/đoạn nhỏ.`);

        // --- CÔNG ĐOẠN 2: EMBEDDING (MÃ HÓA THÀNH VECTOR) ---
        // Sử dụng model chuyên dụng cho việc tạo Vector của Google
        const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        
        console.log("Bắt đầu mã hóa và lưu vào Firestore. Vui lòng đợi...");

        // Chạy vòng lặp qua từng đoạn công thức
        for (let i = 0; i < cacDoanNho.length; i++) {
            const doanText = cacDoanNho[i];
            
            // Gọi AI biến chữ thành mảng số
            const result = await embeddingModel.embedContent(doanText);
            const vectorArray = result.embedding.values; 

            // --- CÔNG ĐOẠN 3: LƯU VÀO FIRESTORE ---
            // Lưu ý: FieldValue.vector là tính năng mới cực xịn của Firestore để hỗ trợ Vector Search
            await db.collection('recipes').add({
                noiDung: doanText,
                vectorEmbedding: FieldValue.vector(vectorArray), 
                ngayTao: admin.firestore.FieldValue.serverTimestamp()
            });

            console.log(`Đã lưu công thức thứ ${i + 1}/${cacDoanNho.length} vào Database.`);
        }

        console.log("🎉 TUYỆT VỜI! Đã nhập xong toàn bộ sách vào hệ thống.");
        
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý:", error);
    }
}

// Chạy hàm
duaSachVaoDatabase();