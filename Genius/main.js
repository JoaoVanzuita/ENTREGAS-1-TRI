const divPontuacao = document.getElementById("pontuacao")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))
const divPerdeu = document.getElementById("perdeu")
const botaoReiniciar = document.getElementById("reiniciar")
const header = document.querySelector("header")
const divContagem = document.getElementById("contagem")

let pontos
let sequencia = []
let animatingColors = false
let currentColorPosition = 0
let difficulty = 1500;

const botaoInicio = document.getElementById("botao")
botaoInicio.addEventListener("click", () => {
    inicio()
})

divMain.addEventListener("click", ev => {

    if (animatingColors) {
        return
    }

    const idxClickedElement = divs.indexOf(ev.target)

    if (idxClickedElement !== sequencia[currentColorPosition]) {

        perdeu()

        return

    }

    currentColorPosition++
    ev.target.classList.add("animate")

    if (currentColorPosition >= sequencia.length) {

        currentColorPosition = 0
        setTimeout(() => turno(), 3000)

    }
})

botaoReiniciar.addEventListener("click", () => {

    location.reload()

})

function perdeu() {

    divMain.style.display = "none"

    divs.forEach((div) => {

        div.style.display = "none"

    })

    divPontuacao.style.display = "none"

    botaoInicio.style.display = "none"

    if (sequencia.length == 1) {

        pontos = 0

    } else {

        pontos = sequencia.length - 1

    }

    divPerdeu.innerHTML = "Você perdeu. Melhor sorte na próxima!<br>Pontuação: " + pontos

    divPerdeu.style.display = "block"

    botaoReiniciar.style.display = "block"

}

divs.forEach(div => {

    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })

})

function playAnimationColors() {

    if (sequencia.length == 8) {

        difficulty = 1000

    }

    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, difficulty * index);
    })

}

function telaJogo() {

    divMain.style.display = "grid"
    divPontuacao.style.display = "block"
    header.style.display = "none"
}

function inicio() {

    let cnt = 4
    sequencia = []
    currentColorPosition = 0

    botaoInicio.style.display = "none"
    divContagem.style.display = "block"

    setTimeout(() => {

        telaJogo()

    }, 4200)

    setTimeout(() => {

        turno()

    }, 5000)

    let idx = setInterval(() => {

        divContagem.innerHTML = --cnt

        if (cnt <= 0) {

            divContagem.style.display = "none"

            clearInterval(idx)
        }
    }, 1000)

}

function turno() {

    divPontuacao.innerHTML = "Pontos: " + sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()

}
