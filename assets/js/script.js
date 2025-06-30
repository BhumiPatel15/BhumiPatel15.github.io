const bootLines = [
    "loading kernel modules... [ OK ]",
    "initializing network interfaces... [ OK ]",
    "applying firewall policies... [ OK ]",
    "starting intrusion detection service... [ OK ]",
    "establishing VPN tunnel... [ OK ]",
    "performing initial threat scan... [ OK ]",
    "user@bhumi-terminal:~$ ./open_portfolio"
];

const mainHeaderLine = "[ SCANNING COMPLETE... PROFILE IDENTIFIED — Bhumi Patel | Cybersecurity Student | STATUS: ACTIVE ]";

const bootContainer = document.querySelector('.boot-sequence');
const mainHeaderContainer = document.querySelector('.main-header');

let lineIndex = 0;

function typeLine() {
    if (lineIndex < bootLines.length) {
        const line = bootLines[lineIndex];
        const p = document.createElement('p');

        if (line.includes("user@")) {
            p.className = 'system-line';
        } else if (line.startsWith("WARNING:") || line.startsWith("ERROR:")) {
            p.className = 'alert-line';
        } else {
            p.className = 'boot-line';
        }

        bootContainer.appendChild(p);
        typeCharacter(p, line, 0, () => {
            lineIndex++;
            setTimeout(typeLine, 60);
        });
    } else {
        setTimeout(showMainContent, 700);
    }
}

function typeCharacter(el, text, i, cb) {
    if (i < text.length) {
        el.textContent += text.charAt(i);
        setTimeout(() => typeCharacter(el, text, i + 1, cb), 10);
    } else {
        if (text.includes("[ OK ]")) {
            const parts = text.split("[ OK ]");
            el.innerHTML = `${parts[0]}<span class="ok-status">[ OK ]</span>`;
        }
        if (text.includes("user@")) {
            const match = text.match(/(.*?)@(.*?):(.*?)\\$ (.*)/);
            if (match) {
                el.innerHTML =
                    `<span class="prompt-user">${match[1]}</span>@` +
                    `<span class="prompt-host">${match[2]}</span>:` +
                    `<span class="prompt-path">${match[3]}$</span> ` +
                    `<span class="prompt-cmd">${match[4]}</span>`;
            }
        }
        cb();
    }
}

function showMainContent() {
    bootContainer.innerHTML = "";
    const p = document.createElement('p');
    p.className = 'flash-header';
    p.textContent = mainHeaderLine;
    mainHeaderContainer.appendChild(p);

    // Reveal rest of the content
    document.querySelector('nav').style.display = 'flex';
    document.querySelector('.image-container').style.display = 'inline-block';
    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'block');
    document.querySelector('.footer').style.display = 'block';
}

// Start on load
window.onload = typeLine;
