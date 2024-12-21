const ejs = require('ejs');
const fs = require('fs');
const { execSync } = require('child_process');

const { projects } = require('./projects.js');

async function build() {
    if (fs.existsSync('./out')) {
        fs.rmSync('./out', { recursive: true });
    }
    fs.mkdirSync('./out', { recursive: true });

    const html = await ejs.renderFile('./index.ejs', { projects: projects });
    fs.writeFileSync('./out/index.html', html);
    fs.cpSync('./static', './out', { recursive: true });
    execSync('npm run tailwind');
}

build();
