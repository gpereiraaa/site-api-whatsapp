'use strict'

const divContatos = document.getElementById('contatos')

const containerDireita = document.getElementById('container-direita')

async function buscarContatos(user) {
    const url = `https://api-whatsapp-xdsy.onrender.com/v1/whatsapp/data/contact/user/?numero=${user}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function criarContatos(user) {

    const dados = await buscarContatos(user)
    dados.contatos.forEach(dataUser => {
        const a = document.createElement('a')
        const divContato = document.createElement('div')
        divContato.className = 'contato'
        const nome = document.createElement('h4')
        const img = document.createElement('img')
        nome.textContent = dataUser.nome
        img.src = dataUser.imagem

        divContato.appendChild(img)
        divContato.appendChild(nome)

        const numeroContato = dataUser.numero
        const urlImage = dataUser.imagem

        a.addEventListener('click', function () {
            criarConversa(user, numeroContato, urlImage)
        })

        a.appendChild(divContato)
        divContatos.appendChild(a)
    })

}

async function dadosConversa(user, contact) {
    const url = `https://api-whatsapp-xdsy.onrender.com/v1/whatsapp/conversation/user/contact/?numeroUser=${user}&numeroContact=${contact}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function criarConversa(user, contact, img) {
    const dados = await dadosConversa(user, contact)
    containerDireita.textContent = ''
    const divTitulo = document.createElement('div')
    divTitulo.className = 'titulo'
    const divContact = document.createElement('div')
    divContact.className = 'contact'
    const imgContact = document.createElement('img')
    const nomeContact = document.createElement('h4')
    nomeContact.textContent = dados.contato
    imgContact.src = img
    divContact.appendChild(imgContact)
    divContact.appendChild(nomeContact)
    divTitulo.appendChild(divContact)
    const divIcons = document.createElement('div')
    divIcons.className = 'icons'

    const icons1 = document.createElement('i')
    icons1.className = 'fa-solid fa-video'

    const icons2 = document.createElement('i')
    icons2.className = 'fa-solid fa-phone'

    const icons3 = document.createElement('i')
    icons3.className = 'fa-solid fa-magnifying-glass'
    divIcons.appendChild(icons1)
    divIcons.appendChild(icons2)
    divIcons.appendChild(icons3)
    divTitulo.appendChild(divIcons)

    const divConversa = document.createElement('div')
    divConversa.className = 'conversa'

    dados.mensagens.forEach(dataMessage => {
        if (dataMessage.de == 'me') {
            const divConversaUser = document.createElement('div')
            divConversaUser.className = 'conversa-user'
            const mensagem = document.createElement('p')
            mensagem.textContent = dataMessage.conteudo
            divConversaUser.appendChild(mensagem)
            divConversa.appendChild(divConversaUser)
        } else {
            const divConversaContact = document.createElement('div')
            divConversaContact.className = 'conversa-contact'
            const mensagem = document.createElement('p')
            mensagem.textContent = dataMessage.conteudo
            divConversaContact.appendChild(mensagem)
            divConversa.appendChild(divConversaContact)
        }
    })

    const divEnviar = document.createElement('div')
    divEnviar.className = 'enviar-mensagem'

    const icons4 = document.createElement('i')
    icons4.className = 'fa-solid fa-face-smile'

    const icons5 = document.createElement('i')
    icons5.className = 'fa-solid fa-paperclip'

    const icons6 = document.createElement('i')
    icons6.className = 'fa-solid fa-microphone-lines'
    const inputEnviar  = document.createElement('input')
    inputEnviar.setAttribute('type', 'text')
    inputEnviar.setAttribute('placeholder', 'Escreva a mensagem')

    divEnviar.appendChild(icons4)
    divEnviar.appendChild(icons5)
    divEnviar.appendChild(inputEnviar)
    divEnviar.appendChild(icons6)

    containerDireita.appendChild(divTitulo)
    containerDireita.appendChild(divConversa)
    containerDireita.appendChild(divEnviar)
}

criarContatos('11987876567')
