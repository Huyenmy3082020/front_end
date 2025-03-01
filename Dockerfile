 # Sử dụng Node.js làm base image
 FROM node:18

 # Đặt thư mục làm việc trong container
 WORKDIR /src
 
 # Copy file package.json và package-lock.json (để tận dụng cache layer)
 COPY package*.json ./
 
 # Cài đặt dependencies
 RUN npm install
 
 # Copy toàn bộ code vào container
 COPY . .
 
 # Mở cổng 7000
 EXPOSE 7000
 
 # Chạy ứng dụng bằng npm (hoặc bạn có thể dùng yarn nếu cần)
 CMD ["npm", "start"]
 