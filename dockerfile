# import base image
FROM node

# Backend setup
WORKDIR /MERNBOT_backend
COPY backend/package*.json ./
COPY backend/.env ./
COPY backend/tsconfig*.json ./
ADD backend/dist ./dist
ADD backend/src ./src
RUN npm install

# Frontend setup
WORKDIR /MERNBOT_frontend
COPY vite-project-frontend/package*.json ./
COPY vite-project-frontend/index.html ./
COPY vite-project-frontend/.eslintrc.cjs ./
COPY vite-project-frontend/tsconfig*.json ./
COPY vite-project-frontend/vite.config.ts ./
ADD vite-project-frontend/src ./src
RUN npm install

# Expose ports
EXPOSE 5173 5000

# Startup script
WORKDIR /
COPY startup.sh .
RUN chmod +x startup.sh
CMD ["./startup.sh"]

