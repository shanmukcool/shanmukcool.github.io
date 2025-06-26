const loading = document.querySelector('.loading');
const preview = document.querySelector('.preview');
const apps = document.querySelectorAll('.app');
const icons = document.querySelectorAll('.icon');
const links = document.querySelectorAll('.link');
const exit = document.querySelector('.exit');
const mobileWeb = document.querySelector('.mobileWeb');
const data = document.querySelector('.data');
const myWork = document.querySelector('.myWork');
const connect = document.querySelector('.connect');
const screen = document.querySelector('.screen');
const fullScreenButton = document.getElementById('fullscreen');
const enterSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>`;
const exitSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>`;
const web = document.querySelector('.box5');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const restart = document.querySelector('.restart');
const projects = ['spotify', 'RubiksCube', 'ludo', 'ttt', 'simonsays', 'calculator', 'To-Do', 'youtube', 'google', 'instagram'];
const source = ['../spotify/index.html', '../cube/web/index.html', '../ludo/web/index.html', '../ttt/web/index.html', '../simonsays.html', '../calculator.html', '../Todo.html', '../../css/youtube.html', '../../css/google/google.html', '../../css/instagram.html'];
const projectsdiv = document.querySelector('.container');

let activeData = null;

fullScreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullScreenButton.innerHTML = exitSVG;
    } else {
        fullScreenButton.innerHTML = enterSVG;
    }
});

apps.forEach(app => {
    app.addEventListener('click', () => {
        mobileWeb.src = ``;
        data.style.display = 'none';
        loading.style.display = 'block';
        preview.style.transform = 'scale(1)';
        setTimeout(() => {
            // mobileWeb.src = `${source[projects.indexOf(app.classList[0])]}`;
            mobileWeb.src = `https://shanmukn21.github.io/${app.classList[0]}`;
        }, 200);
    });
});

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        mobileWeb.src = ``;
        data.style.display = 'block';
        activeData = icon.classList[1];
        if (activeData === 'self') {
            startTyping();
        }
        document.querySelector(`.my${activeData}`).style.display = 'flex';
        preview.style.transform = 'scale(1)';
    });
});

myWork.addEventListener('focus', () => {
    apps.forEach(app => {
        app.removeAttribute('tabindex');
    });
});

myWork.addEventListener('blur', () => {
    apps.forEach(app => {
        app.setAttribute('tabindex', '0');
    });
});

connect.addEventListener('focus', () => {
    links.forEach(link => {
        link.removeAttribute('tabindex');
    });
});

connect.addEventListener('blur', () => {
    links.forEach(link => {
        link.setAttribute('tabindex', '0');
    });
});


exit.addEventListener('click', () => {
    preview.style.backgroundImage = ``;
    preview.style.transform = 'scale(0)';
    data.style.display = 'none';
    loading.style.display = 'none';
    if (activeData) document.querySelector(`.my${activeData}`).style.display = 'none';
    mobileWeb.src = ``;
});

function updateZoom() {
    const mobileWidth = preview.clientWidth;

    const targetWidth = 393;

    const widthRatio = mobileWidth / targetWidth;

    mobileWeb.style.zoom = widthRatio;
}

function startTyping() {
    const text = document.getElementById('typingText');
    text.classList.remove('typing', 'finished');
    void text.offsetWidth; // Trigger reflow to restart animation
    text.classList.add('typing');

    setTimeout(() => {
        text.classList.remove('typing');
        text.classList.add('finished');
    }, 2000); // Match the 2s animation duration
}

window.addEventListener('load', updateZoom);

const mobileObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        updateZoom();
    }
});

mobileObserver.observe(preview);

const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        updateZoomWeb();
    }
});

resizeObserver.observe(projectsdiv);

let presetProject = 0;
left.addEventListener('click', () => {
    if (presetProject > 0) {
        presetProject--;
        updateWeb(projects[presetProject]);
        left.href = `#${projects[presetProject]}`;
        right.href = `#${projects[presetProject + 1]}`;
    }
});

right.addEventListener('click', () => {
    if (presetProject < projects.length - 1) {
        presetProject++;
        updateWeb(projects[presetProject]);
        left.href = `#${projects[presetProject - 1]}`;
        right.href = `#${projects[presetProject]}`;
    }
});

function updateWeb(project) {
    const title = document.querySelector('.title');
    const goto = document.querySelector('.goto');
    const code = document.querySelector('.code');
    const iconWeb = document.querySelector('.iconWeb div');
    const linkWeb = document.querySelector('.linkWeb');
    // web.src = `${source[presetProject]}`;
    web.src=`https://shanmukn21.github.io/${project}/`;
    iconWeb.style.backgroundImage = `url(img/icons/${project}.png)`;
    title.innerHTML = project;
    goto.href=web.src;
    goto.href = `https://shanmukn21.github.io/${project}/`;
    code.href = `https://github.com/shanmukn21/${project}`;
    // linkWeb.innerHTML = web.src;
    linkWeb.innerHTML = `shanmukn21.github.io/${project}/`;
}

restart.addEventListener('click', () => {
    updateWeb(projects[presetProject]);
});

updateWeb(projects[presetProject]);
function updateZoomWeb() {
    const projectswidth = projectsdiv.clientWidth;
    web.style.zoom = projectswidth / 1536;
}

window.addEventListener('load', updateZoomWeb);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.id;
            updateWeb(currentId);

            presetProject = projects.indexOf(currentId);

            left.href = `#${projects[Math.max(presetProject - 1, 0)]}`;
            right.href = `#${projects[Math.min(presetProject + 1, projects.length - 1)]}`;
        }
    });
}, {
    root: document.querySelector('.desktop'),
    threshold: 0.5
});

document.querySelectorAll('.description-container > div').forEach(section => {
    observer.observe(section);
});