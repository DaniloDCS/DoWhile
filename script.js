const progress = document.querySelector("#progress"),
    text = document.querySelector("#text"),
    textZoomPlus = document.querySelector("#zoom-plus"),
    textZoomMinus = document.querySelector("#zoom-minus"),
    mode = document.querySelector("#mode"),
    listen = document.querySelector("#listening"),
    share = document.querySelector("#share"),
    sizes = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];

let index = 4;

textZoomPlus.addEventListener("click", () => {
    if (index <= 7) index++

    document.querySelectorAll("p").forEach(p => {
        p.style.fontSize = sizes[index]
    })
})

textZoomMinus.addEventListener("click", () => {
    if (index >= 0) index--

    document.querySelectorAll("p").forEach(p => {
        p.style.fontSize = sizes[index]
    })
})

document.addEventListener('scroll', event => {
    let heightMax = document.body.scrollHeight - window.innerHeight,
        heightNow = window.pageYOffset,
        percent = (heightNow * 100) / heightMax;

    progress.style.width = `${percent}%`;
})

mode.addEventListener("click", () => {
    if (mode.children[0].className === "sun") {
        mode.children[0].className = "moon";
        mode.style.justifyContent = "left";
        mode.style.backgroundColor = "var(--cyan)";
        document.body.className = "dark";
    } else {
        mode.children[0].className = "sun";
        mode.style.justifyContent = "right";
        mode.style.backgroundColor = "var(--orange)"
        document.body.className = "light";
    }
})

listen.addEventListener("click", listening);

function listening() {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text.innerText;
    utterance.lang = "pt-BR";
    speechSynthesis.speak(utterance);
}

let warningGrenerator = false

share.addEventListener("click", e => {
    if (!warningGrenerator) {
        if (!navigator.clipboard) fallbackCopyTextToClipboard(location.href)
        navigator.clipboard.writeText(location.href)

        warningGrenerator = true
        let warning = document.createElement('div')
        warning.className = 'warning'
        warning.innerHTML = 'O link foi copiado!'
        warning.style.left = `44%`
        warning.style.bottom = `40px`
        document.body.append(warning)

        setTimeout(() => {
            warningGrenerator = false
            warning.remove()
        }, 6000);
    }

})