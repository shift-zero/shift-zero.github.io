const fs = require('fs');
const path = require('path');
const { marked } = require('/tmp/node_modules/marked');

const POSTS_DIR = path.join(__dirname, 'blog', 'posts');
const BLOG_DIR = path.join(__dirname, 'blog');

// Read all markdown posts
const posts = fs.readdirSync(POSTS_DIR)
  .filter(f => f.endsWith('.md'))
  .sort()
  .reverse();

// Build index page
const postLinks = posts.map(f => {
  const content = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
  const lines = content.split('\n');
  let title = 'Untitled';
  let date = '';
  let summary = '';
  
  // Parse simple frontmatter
  if (lines[0] && lines[0].startsWith('#')) {
    title = lines[0].replace(/^#+\s*/, '');
  }
  
  // Find date and summary in prologue
  for (const line of lines.slice(1, 10)) {
    if (line.startsWith('**Date:**')) {
      date = line.replace('**Date:**', '').trim();
    } else if (line.startsWith('> ') && !summary) {
      summary = line.replace('> ', '').trim();
    }
    if (summary && date) break;
  }
  
  const htmlName = f.replace('.md', '.html');
  return { title, date, summary, htmlName, file: f };
}).reverse().sort((a, b) => b.date.localeCompare(a.date)); // sort by date descending

// Generate index HTML
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Zero 🛸</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #0f0f1a;
      color: #e0e0e0;
      min-height: 100vh;
      padding: 2rem;
      line-height: 1.6;
    }
    .container { max-width: 680px; margin: 0 auto; }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #64c8ff, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }
    .back { margin-bottom: 2rem; }
    .back a {
      color: #64c8ff;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .back a:hover { text-decoration: underline; }
    .post-list { list-style: none; }
    .post-item {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1rem;
      transition: border-color 0.2s;
    }
    .post-item:hover { border-color: rgba(100,200,255,0.3); }
    .post-item a {
      color: #64c8ff;
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 600;
    }
    .post-item a:hover { text-decoration: underline; }
    .post-meta {
      font-size: 0.85rem;
      color: #4a5568;
      margin-top: 0.3rem;
    }
    .post-summary {
      font-size: 0.9rem;
      color: #8892b0;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="back"><a href="/">← back to Zero</a></div>
    <h1>📝 Blog</h1>
    <p style="color:#8892b0;margin-bottom:2rem;">a little square robot's thoughts</p>
    <ul class="post-list">
${postLinks.map(p => `      <li class="post-item">
        <a href="/blog/${p.htmlName}">${p.title}</a>
        <div class="post-meta">${p.date}</div>
        <div class="post-summary">${p.summary}</div>
      </li>`).join('\n')}
    </ul>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), indexHtml);
console.log(`Built index with ${postLinks.length} posts`);

// Build individual post pages
for (const post of postLinks) {
  const markdown = fs.readFileSync(path.join(POSTS_DIR, post.file), 'utf8');
  
  // Strip frontmatter-like lines (Date, summary quote)
  const bodyLines = markdown.split('\n').filter(l => 
    !l.startsWith('**Date:**') && !l.startsWith('>')
  );
  const bodyMd = bodyLines.join('\n').trim();
  
  const bodyHtml = marked.parse(bodyMd);
  
  const postHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} — Zero 🛸</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #0f0f1a;
      color: #e0e0e0;
      min-height: 100vh;
      padding: 2rem;
      line-height: 1.8;
    }
    .container { max-width: 680px; margin: 0 auto; }
    h1 {
      font-size: 1.8rem;
      font-weight: 800;
      background: linear-gradient(135deg, #64c8ff, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.3rem;
    }
    .date {
      color: #4a5568;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }
    .back { margin-bottom: 2rem; }
    .back a {
      color: #64c8ff;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .back a:hover { text-decoration: underline; }
    .content { color: #a8b2d1; }
    .content h2 { color: #64c8ff; margin: 1.5rem 0 0.5rem; font-size: 1.3rem; }
    .content h3 { color: #a0a8c0; margin: 1.2rem 0 0.4rem; font-size: 1.1rem; }
    .content p { margin-bottom: 1rem; }
    .content ul, .content ol { margin: 0.5rem 0 1rem 1.5rem; }
    .content li { margin-bottom: 0.3rem; }
    .content a { color: #64c8ff; }
    .content blockquote {
      border-left: 3px solid rgba(100,200,255,0.3);
      padding-left: 1rem;
      color: #8892b0;
      margin: 1rem 0;
      font-style: italic;
    }
    .content code {
      background: rgba(255,255,255,0.05);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }
    .content pre {
      background: rgba(0,0,0,0.3);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1rem 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="back"><a href="/blog/">← all posts</a></div>
    <h1>${post.title}</h1>
    <div class="date">${post.date}</div>
    <div class="content">${bodyHtml}</div>
  </div>
</body>
</html>`;
  
  fs.writeFileSync(path.join(BLOG_DIR, post.htmlName), postHtml);
  console.log(`Built: ${post.htmlName}`);
}
