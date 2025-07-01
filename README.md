<img src="src/Images/Logo.png" alt="MindPour Logo" width="200">

MindPour is a modern, full-stack blogging and thought-sharing application built using React, Redux, and Appwrite. It allows users to register, express their thoughts as blog posts, upload featured images, and securely manage sessions — all wrapped in a clean, responsive UI.

## 🚀 Features

- **User Authentication**: Secure signup, login, and logout using Appwrite's authentication system.
- **Thought Management**: Users can create, edit, and delete their own posts or thoughts.
- **Image Uploads**: Attach and display featured images using Appwrite Storage.
- **Public/Private Posts**: Users can mark thoughts as public (active) or private (inactive).
- **SEO-Friendly Slugs**: Each post gets a clean, readable URL.
- **404 Handling**: Custom error page for invalid or missing routes.


## Live Preview

You can view a live preview of MindPour [here](https://mindpour.vercel.app/).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/developer-pranav/MindPour.git
    cd MindPour
    ```

2. Install Dependencies:
    ```bash
    npm install
    ```

3. Set up your .env file:
    ```env
    VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
    VITE_APPWRITE_PROJECT_ID=your_project_id
    VITE_APPWRITE_DATABASE_ID=your_database_id
    VITE_APPWRITE_COLLECTION_ID=your_collection_id
    VITE_APPWRITE_BUCKET_ID=your_bucket_id
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```


## 🧰 Tech Stack
- **Frontend**: React, Redux, Tailwind CSS

- **Backend as a Service (BaaS)**: Appwrite

- **Routing**: React Router

- **Editor**: React Hook Form + Custom Rich Text Editor

- **State Management**: Redux Toolkit


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Contributing

Want to contribute? Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

We appreciate your contributions!

## Contact

For any questions or suggestions, please open an issue or contact [DeveloperPranav](mailto:developer.pranav3306@gmail.com).
