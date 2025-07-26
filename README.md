# Stuff Swap

A web application for swapping items with other users.

## Setup Instructions

### 1. Database Setup (Required to fix the signup error)

The signup error you're experiencing is due to missing database tables. Follow these steps to fix it:

1. **Go to your Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project

2. **Run the Database Setup Script**
   - Go to the "SQL Editor" in your Supabase dashboard
   - Copy and paste the contents of `database_setup.sql` into the editor
   - Click "Run" to execute the script

3. **Verify the Setup**
   - Go to "Table Editor" in your Supabase dashboard
   - You should see three new tables: `profiles`, `items`, and `swaps`

### 2. Email Verification (Optional but Recommended)

By default, Supabase requires email verification. To disable this for testing:

1. Go to your Supabase dashboard
2. Navigate to "Authentication" → "Settings"
3. Under "Email Auth", uncheck "Enable email confirmations"

### 3. Running the Application

1. **Start a local server**
   ```bash
   # Using Python (if you have Python installed)
   python -m http.server 5500
   
   # Or using Node.js (if you have Node.js installed)
   npx http-server -p 5500
   
   # Or using Live Server extension in VS Code
   ```

2. **Open the application**
   - Navigate to `http://localhost:5500/StuffSwap/`
   - The signup should now work without database errors

## Features

- **User Authentication**: Sign up and login with email/password
- **User Profiles**: Store user information in the database
- **Item Management**: Add, view, and manage items for swapping
- **Swap System**: Request and manage item swaps between users

## File Structure

```
StuffSwap/
├── index.html          # Home page
├── signup.html         # User registration
├── login.html          # User login
├── dashboard.html      # User dashboard
├── js/
│   └── auth.js         # Authentication module
├── css/
│   └── styles.css      # Global styles
├── database_setup.sql  # Database setup script
└── README.md           # This file
```

## Troubleshooting

### Common Issues

1. **"Database error saving new user"**
   - Solution: Run the database setup script as described above

2. **"Email not verified"**
   - Solution: Check your email for verification link, or disable email verification in Supabase settings

3. **"Invalid login credentials"**
   - Solution: Make sure you're using the correct email and password

### Database Tables

The application uses these tables:

- **`profiles`**: User profile information
- **`items`**: Items available for swapping
- **`swaps`**: Swap requests between users

## Security

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- Authentication is handled by Supabase Auth

## Development

To modify the application:

1. Edit the HTML files for UI changes
2. Modify `js/auth.js` for authentication logic
3. Update `database_setup.sql` for database schema changes
4. Test changes locally before deploying
