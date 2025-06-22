const bootLines = [
    "loading kernel modules... [ OK ]",
    "initializing network interfaces... [ OK ]",
    "applying firewall policies... [ OK ]",
    "starting intrusion detection service... [ OK ]",
    "establishing VPN tunnel... [ OK ]",
    "performing initial threat scan... [ OK ]",
    "user@bhumi-terminal:~$ ./open_profile"
];

const mainHeaderLine = "[ SCANNING COMPLETE... MATCH FOUND — Bhumi Patel | M.S. Cybersecurity Student | SRE & Cloud Security | STATUS: ACTIVE ]";

const bootContainer = document.querySelector('.boot-sequence');
const mainHeaderContainer = document.querySelector('.main-header');

let lineIndex = 0;
let charIndex = 0;

const lineDelay = 50;
const charDelay = 10;

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
            setTimeout(typeLine, lineDelay);
        });
    } else {
        setTimeout(() => {
            bootContainer.innerHTML = "";
            showMainContent();
        }, 500);
    }
}

function typeCharacter(element, line, charIndex, callback) {
    if (charIndex < line.length) {
        element.textContent += line.charAt(charIndex);
        setTimeout(() => typeCharacter(element, line, charIndex + 1, callback), charDelay);
    } else {
        if (line.includes("[ OK ]")) {
            const parts = line.split("[ OK ]");
            element.innerHTML = `${parts[0]}<span class="ok-status">[ OK ]</span>`;
        }

        if (line.includes("user@")) {
            const promptParts = line.match(/(.*?)@(.*?):(.*?)\$ (.*)/);
            if (promptParts) {
                element.innerHTML = 
                    `<span class="prompt-user">${promptParts[1]}</span>` + "@" +
                    `<span class="prompt-host">${promptParts[2]}</span>` + ":" +
                    `<span class="prompt-path">${promptParts[3]}$</span> ` +
                    `<span class="prompt-cmd">${promptParts[4]}</span>`;
            }
        }

        callback();
    }
}

function showMainContent() {
    const p = document.createElement('p');
    p.className = 'flash-header';
    p.textContent = mainHeaderLine;
    mainHeaderContainer.appendChild(p);

    document.querySelector('.image-container').style.display = 'inline-block';
    document.querySelector('.button-container').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
}

document.querySelector('.image-container').style.display = 'none';
document.querySelector('.button-container').style.display = 'none';
document.querySelector('.footer').style.display = 'none';

window.onload = typeLine;
