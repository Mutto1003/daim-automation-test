# ✅ ใช้ base image จาก Microsoft Playwright  browser + dependency พร้อมใช้งาน
# เวอร์ 1.52.0 และใช้ Ubuntu 22.04 (jammy)
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# ✅ กำหนด working directory ภายใน container เป็น /app
# คำสั่งถัดไปจะทำงานในโฟลเดอร์
WORKDIR /app

# ✅ ลอกเฉพาะไฟล์ package.json มาไว้ใน container
# เอาให้ Docker สามารถแคชการตั้ง dependencies ได้ ถ้า package.json ไม่เปลี่ยน
COPY package-lock.json ./
COPY package.json ./

# ✅ ตั้ง dependencies ตามใน package.json
# ใช้ npm ci เพราะเร็วและเสถียรกว่า npm install (เหมาะ CI/CD และ Docker build)
RUN npm ci

# ✅ ลอกไฟล์ข้อมูลจากโปรเจกต์บนเครื่อง →  /app ใน container
# รวมไฟล์ทดสอบ โค้ด และไฟล์ config ต่าง ๆ
COPY . .

# ✅ ตั้ง browser dependencies Chromium, Firefox, WebKit
# และตรวจสอบให้ตรงเวอร์ชั่นใช้ใน Playwright
RUN npx playwright install --with-deps

# ✅ กำหนดคำสั่งเริ่มต้นเมื่อ container ถูกรัน
# ในกรณีนี้จะรันทดสอบทั้งหมดของ Playwright
CMD ["npx", "playwright", "test", "--reporter=html", "--output=playwright-report"]
