# user-registeration-api
User Registration API with MongoDB, Image Upload, and Email Sending

# how to run the API
1. Install dependencies using- "npm i" command
2. Create .env file to store- MONGODB_URL, USER, PASS (for the security purpose I am not sharing my personal details)
3. To run the server use- "nodemon server" command

# api endpoint
1. For user registeration- localhost:8000/api/register
2. To get all users- localhost:8000/api/getAllUsers

# data-form
for user registeration data should be send from body in form-data format 
data that should be passed- name, email,password, and profilePicture(attach image file)

# validation added
1. input required validation (name, email, password, profilePicture)
2. image required validation
3. image allowed format validation (jpeg, jpg, png)
4. file size validation
5. user already registered

# packages used
1. nodemon
2. express
3. dotenv
4. bcrypt
5. mongoose
6. multer
7. nodemailer
