# Nithin Kumar: Portfolio

A React, TypeScript, and Vite portfolio. Blog articles are Markdown files in `src/content/blog`.

## Run locally

1. Install Node.js LTS from [nodejs.org](https://nodejs.org).
2. Open this folder in VS Code and choose **Terminal > New Terminal**.
3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the local address printed in the terminal.
6. Check the production build before deploying:

   ```sh
   npm run build
   ```

Edit your details in `src/data/profile.ts`. The portrait and resume are `public/profile.png` and `public/resume.pdf`.

## Configure the contact form

The form uses EmailJS. Create an EmailJS service and email template in your EmailJS account, then copy `.env.example` to `.env` and add the three values from that account:

```powershell
Copy-Item .env.example .env
```

Set these variables in `.env`:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Configure the EmailJS template to use these template parameters:

- `from_name` — sender's name
- `reply_to` — sender's email address
- `subject` — message subject
- `message` — message body
- `website` — hidden spam honeypot; leave unused in the email body

Restart `npm run dev` after changing `.env`. Vite variables are included in browser code, so use only the EmailJS **public** key here; never put private keys or secrets in a `VITE_` variable. The `.env` file is ignored by Git and must not be committed. Add the same three values to the Vercel project's environment variables before deploying.

## Deploy to Vercel

### 1. Create a GitHub repository

Create a new, empty repository on [github.com/new](https://github.com/new). Do not add a README, license, or `.gitignore` there because this project already has files. Copy the repository's HTTPS URL; it will look like `https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git`.

Open the project folder in the terminal and run:

```sh
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with the values for the GitHub repository you created. If Git asks you to identify yourself, configure your Git author name and email with the values you want associated with your commits:

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

If GitHub authentication is requested, sign in using the browser flow from Git Credential Manager or your configured Git credential method. Never put a password or access token in these commands.

### 2. Deploy with Vercel

1. Sign in at [vercel.com](https://vercel.com) and choose **Add New… > Project**.
2. Import the GitHub repository you just pushed.
3. Leave the detected Vite settings as they are. The build command is `npm run build`, and the output directory is `dist`.
4. Before the first deployment, open the project's **Settings > Environment Variables** and add all three variables. Use the same values as your local `.env`:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Save the variables, then deploy. If you add or change a variable after deployment, redeploy so the updated values are included in the Vite build.

Alternatively, deploy from the terminal with the Vercel CLI:

```sh
npx vercel
npx vercel --prod
```

Follow the prompts to sign in and link the project. Set the same three environment variables in the Vercel project settings before the production deployment.

### 3. Replace the placeholder domain

After deployment, replace every `https://your-domain.example` placeholder in `index.html` and `public/sitemap.xml` with your actual public Vercel domain or custom domain. The `.example` domain is a placeholder, not a live site. Commit and push the update so Vercel redeploys:

```sh
git add index.html public/sitemap.xml
git commit -m "Set deployed site URL"
git push
```
