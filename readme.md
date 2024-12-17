fs.mkdir(dir, { recursive: true });
fs.readdir(dir, { recursive: true })
fs.stat(inputFile)

import markdownit from 'markdown-it';
const md = markdownit();
md.render('# Titre') // <h1>Titre</h1>