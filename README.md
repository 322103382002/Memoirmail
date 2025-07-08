# Memory Reconstruction Tool

A MERN-based application that transforms childhood memories into short AI-generated animations using ComfyUI and OpenAI.

## Features

- Convert text memories into vivid scene descriptions using GPT
- Generate keyframes using ComfyUI
- Create 5-second animated videos from keyframes
- User-friendly interface for memory submission and gallery viewing
- Secure authentication system

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- ComfyUI server running locally or accessible via API
- OpenAI API key
- FFmpeg installed on the system

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd memory-reconstruction-tool
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/memory-reconstruction
OPENAI_API_KEY=your_openai_api_key
COMFYUI_API_URL=http://localhost:8188
JWT_SECRET=your_jwt_secret
```

5. Start the backend server:
```bash
cd backend
npm run dev
```

6. Start the frontend development server:
```bash
cd frontend
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Create an account or log in
3. Click "Create Memory" to submit a childhood memory
4. Wait for the AI to process your memory and generate the animation
5. View your memories in the gallery

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - OpenAI API
  - ComfyUI
  - FFmpeg

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 