const actionBar = document.querySelector("div.action-bar")
const btAdd = actionBar.querySelector(".bt-add")
const container = document.querySelector(".container-data")
const templateModalAluno = container.querySelector("template.aluno")
const searchBar = actionBar.querySelector("input.search")

const fnMasks = {
    matricula: maskMatricula,
    nome: maskNome
}

function maskMatricula(el) {
    el.addEventListener("keydown", ev => { 
        const key = ev.key
        const regex = /\D/;
        if (regex.test(key) && key != "Backspace") {
            ev.preventDefault()
        }
    })
}

function maskNome(el){
    el.addEventListener("keydown", ev =>{
        const key = ev.key
        const regex = /\d/;
        if (regex.test(key)) {
            ev.preventDefault()
        }
    })
}

maskNome(searchBar)

//Permite que as máscaras dos campos sejam setadas
//somente após o usuário adicionar um formulário
function criarMascaras(maskElements){
   
    maskElements.forEach(el => {
        const maskName = el.dataset.mascara
        const fnMascara = fnMasks[maskName]
        fnMascara(el)
    })

}

btAdd.addEventListener("click", () => {

    const cloneModal = templateModalAluno.content.cloneNode(true)
    container.prepend(cloneModal)

    const maskElements = document.querySelectorAll("[data-mascara]")
    criarMascaras(maskElements)

    const btSalvar = document.querySelectorAll("button.bt-salvar")

    btSalvar.forEach(el =>{
        el.addEventListener("click", ev =>{

            const modal = ev.target.closest(".modal")
            const form = modal.querySelector("form.form")
            const formData = new FormData(form)

            formData.forEach(el =>{

                if(el != "")
                    console.log(el)
                
            })
    
        })
    }) 

})

container.addEventListener("click", ev => {
    const btClose = ev.target.closest(".bt-close")
    if (btClose) {
        const modal = ev.target.closest(".modal")
        modal.remove()
    }
})
