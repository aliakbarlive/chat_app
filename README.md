# chat_app
 this is one to one real time chat app in mern stack   
### How to use
1. Clone the repo
    ```
    git clone https://github.com/aliakbarlive/chat_app.git
    ```
2. Enter the directory
    ```
    cd chat_app
    ```
3. Install dependencies
    ```
    yarn install
    ```
4. create .env file
   - go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) to create a cluster and change the MONGO_URI
   - change the CLIENT_URL to your local client port http://localhost:3000 
   - generate random token for ACCESS/REFRESH_TOKEN_SECRET and also COOKIE_SIGNATURE

5. Run the app   
    ```
    yarn dev
    ```
