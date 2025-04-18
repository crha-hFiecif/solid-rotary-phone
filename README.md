# Smart TV Content Recommender and Assistant

A modern web application that uses Google's Gemini AI to enhance the Smart TV user experience by providing personalized content recommendations, answering questions about shows/movies, and helping users navigate TV features through natural language.


## Features

- **Personalized Content Recommendations**: Get TV show and movie recommendations based on your viewing history
  
https://github.com/user-attachments/assets/a77e3866-54e7-4d41-beda-ba23ff35734e

- **Content Explorer**: Ask questions about shows and movies to learn more about them

https://github.com/user-attachments/assets/a215017c-c39e-461f-9e0d-97d324175cd1
  
- **Feature Guide**: Get help with TV features and settings through natural language queries

https://github.com/user-attachments/assets/be4e1795-e8cb-4ad1-aa16-bf0226fce70a


  

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: React with Material-UI
- **AI**: Google Gemini AI

## Prerequisites

- Node.js (v14 or higher)
- npm
- Google Gemini API Key

## Setup

1. Clone the repository:
   ```bash
   git clone this repos
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Create a `.env` file in the backend directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## API Endpoints

- `POST /api/recommendations`: Get personalized content recommendations
- `POST /api/content-info`: Get information about specific shows or movies
- `POST /api/feature-guide`: Get help with TV features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
