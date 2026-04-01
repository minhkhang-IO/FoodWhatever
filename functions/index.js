const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const pdfExtract = require("pdf-extraction"); // ĐÃ THAY BẰNG CÔNG CỤ MỚI
const os = require("os");
const path = require("path");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

admin.initializeApp();
const db = admin.firestore();
const { FieldValue } = require("firebase-admin/firestore");

// DÁN API KEY CỦA BẠN VÀO ĐÂY NHÉ:
const API_KEY = "AIzaSyCKlfTF-GOxvof6uBl5JABKFVQhrdEoJdc"; 
const genAI = new GoogleGenerativeAI(API_KEY);

exports.xuLySachTuDong = functions.runWith({ timeoutSeconds: 540, memory: '1GB' }).storage.object().onFinalize(async (object) => {
    const fileBucket = object.bucket; 
    const filePath = object.name; 
    const contentType = object.contentType;

    if (!contentType.includes("pdf")) {
        console.log("Đây không phải PDF. Bỏ qua.");
        return null;
    }

    console.log(`Bắt đầu xử lý sách: ${filePath}`);

    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
    await bucket.file(filePath).download({ destination: tempFilePath });

    try {
        console.log("Bắt đầu nhai sách bằng công cụ mới...");
        const dataBuffer = fs.readFileSync(tempFilePath);
        
        // Chạy thẳng 1 mạch không cần check lỗi
        const pdfData = await pdfExtract(dataBuffer);
        const toanBoChu = pdfData.text;

        const cacDoanNho = toanBoChu
            .split('\n\n')
            .map(doan => doan.trim())
            .filter(doan => doan.length > 50);

        console.log(`Tìm thấy ${cacDoanNho.length} công thức. Đang gửi cho AI...`);

       const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

        for (let i = 0; i < cacDoanNho.length; i++) {
            const doanText = cacDoanNho[i];
            
            // THÊM DÒNG NÀY ĐỂ BẮT HỆ THỐNG NGHỈ 1 GIÂY TRƯỚC KHI HỎI TIẾP
            await new Promise(resolve => setTimeout(resolve, 1000)); 

            const result = await embeddingModel.embedContent(doanText);
            const vectorArray = result.embedding.values.slice(0, 768);

            await db.collection('recipes').add({
                noiDung: doanText,
                vectorEmbedding: FieldValue.vector(vectorArray),
                nguonSach: path.basename(filePath),
                ngayTao: admin.firestore.FieldValue.serverTimestamp()
            });
            
            // Thêm dòng này để dễ theo dõi tiến độ trong Logs
            console.log(`Đã lưu an toàn công thức thứ ${i + 1}/${cacDoanNho.length}`); 
        }
        
        console.log("🎉 TUYỆT VỜI! Đã tiêu hóa xong cuốn sách.");

    } catch (error) {
        console.error("Lỗi trong quá trình xử lý:", error);
    } finally {
        fs.unlinkSync(tempFilePath); 
    }
});