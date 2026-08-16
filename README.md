# Prakash Portfolio

A responsive Next.js portfolio with animated sections, a dark/light theme, project filtering, an editable resume builder, and a contact form.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create a production build, run `npm run build` and then `npm start`.

## Resume: public viewers and owner-only editing

Visitors use `/resume` to view, share, or download the current resume. They never see the editor.

Only the owner can edit at `/resume/login`. Set `RESUME_ADMIN_PASSWORD` and a long random `RESUME_ADMIN_SECRET` in Vercel’s Environment Variables. A signed, HTTP-only session cookie protects `/resume/edit` and the write API.

Resume updates are saved to a private Vercel Blob, not the deployment filesystem, so the same saved resume is shown after a redeploy. In the Vercel project dashboard, create a **Blob** store and connect it to the project; Vercel adds `BLOB_READ_WRITE_TOKEN` automatically. Set the three resume variables for Production, Preview, and Development, then redeploy. Vercel’s [Blob SDK guide](https://vercel.com/docs/vercel-blob/using-blob-sdk) describes the store setup and automatic environment variable.

## Configure contact email

Copy `.env.example` to `.env.local` and set `EMAIL_USER` and `EMAIL_PASS` to enable email delivery. Without those values, form submissions succeed in development and are logged by the server instead.
