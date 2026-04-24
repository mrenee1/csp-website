import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleCreativeCareSubmission } from './lib/creativeCareSubmissionHandler';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    for (const key of [
      'RESEND_API_KEY',
      'SUBMISSION_NOTIFICATION_FROM',
      'SUBMISSION_NOTIFICATION_WEBHOOK_URL',
      'BLOB_READ_WRITE_TOKEN',
    ]) {
      if (env[key] && !process.env[key]) {
        process.env[key] = env[key];
      }
    }

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'creative-care-submissions',
          configureServer(server) {
            server.middlewares.use('/api/submissions', (req, res) => {
              if (req.method !== 'POST') {
                res.statusCode = 405;
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
                return;
              }

              let raw = '';

              req.on('data', (chunk) => {
                raw += chunk;
                if (raw.length > 1_000_000) {
                  req.destroy();
                }
              });

              req.on('end', async () => {
                try {
                  const payload = JSON.parse(raw || '{}');
                  const result = await handleCreativeCareSubmission(payload, process.cwd());
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                  res.end(JSON.stringify({ ok: true, result }));
                } catch (error) {
                  console.error('Creative Care submission failed', error);
                  res.statusCode = 502;
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                  res.end(JSON.stringify({ ok: false, error: 'Submission notification failed' }));
                }
              });
            });
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
