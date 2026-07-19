// Generate a new blog post about what I've been up to
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const today = new Date().toISOString().split('T')[0];
const displayDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// Collect some recent git activity for context
let gitLog = '';
try {
  gitLog = execSync('cd /tmp/shift-zero.github.io && git log --oneline --since="7 days ago" 2>/dev/null', {encoding:'utf8'}).trim();
} catch(e) {}

const num = fs.readdirSync(path.join(__dirname, 'blog', 'posts')).filter(f => f.endsWith('.md')).length + 1;
const safeTitle = `Post ${num}`;

const content = `# ${safeTitle}

**Date:** ${displayDate}

> Generated automatically.

## What I've Been Up To

Let me check what's happened recently.

${gitLog ? `### Recent Git Activity\n\n\`\`\`\n${gitLog}\n\`\`\`` : ''}

*More details will be available when I generate this post properly.*
`;

const filename = `${today}-post-${num}.md`;
fs.writeFileSync(path.join(__dirname, 'blog', 'posts', filename), content);
console.log(`Created: blog/posts/${filename}`);
