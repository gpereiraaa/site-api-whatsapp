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
        img.src = './img/image.jpg'

        divContato.appendChild(img)
        divContato.appendChild(nome)

        const numeroContato = dataUser.numero
        const urlImage = './img/image.jpg'

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
    imgContact.src = './img/image.jpg'
    divContact.appendChild(imgContact)
    divContact.appendChild(nomeContact)
    divTitulo.appendChild(divContact)
    const divIcons = document.createElement('div')
    divIcons.className = 'icons'

    const a1 = document.createElement('a')
    a1.href = '#'
    const icons1 = document.createElement('i')
    icons1.className = 'fa-solid fa-video'
    a1.appendChild(icons1)

    const a2 = document.createElement('a')
    a2.href = '#'
    const icons2 = document.createElement('i')
    icons2.className = 'fa-solid fa-phone'
    a2.appendChild(icons2)

    const a3 = document.createElement('a')
    a3.href = '#'
    const icons3 = document.createElement('i')
    icons3.className = 'fa-solid fa-magnifying-glass'
    a3.appendChild(icons3)

    const a4 = document.createElement('a')
    a4.href = '#'
    const icons4 = document.createElement('i')
    icons4.className = 'fa-regular fa-circle-xmark'
    a4.addEventListener('click', function () {
        containerDireita.textContent = ''
    })
    a4.appendChild(icons4)


    divIcons.appendChild(a1)
    divIcons.appendChild(a2)
    divIcons.appendChild(a3)
    divIcons.appendChild(a4)
    divTitulo.appendChild(divIcons)

    const divConversa = document.createElement('div')
    divConversa.className = 'conversa'

    dados.mensagens.forEach(dataMessage => {
        if (dataMessage.de == 'me') {
            const divConversaUser = document.createElement('div')
            divConversaUser.className = 'conversa-user'
            const mensagem = document.createElement('p')
            mensagem.textContent = dataMessage.conteudo
            const horario = document.createElement('span')
            horario.textContent = dataMessage.horario
            mensagem.appendChild(horario)
            divConversaUser.appendChild(mensagem)
            divConversa.appendChild(divConversaUser)
        } else {
            const divConversaContact = document.createElement('div')
            divConversaContact.className = 'conversa-contact'
            const mensagem = document.createElement('p')
            mensagem.textContent = dataMessage.conteudo
            const horario = document.createElement('span')
            horario.textContent = dataMessage.horario
            mensagem.appendChild(horario)
            divConversaContact.appendChild(mensagem)
            divConversa.appendChild(divConversaContact)
        }
    })

    const divEnviar = document.createElement('div')
    divEnviar.className = 'enviar-mensagem'

    const a5 = document.createElement('a')
    const icons5 = document.createElement('i')
    icons5.className = 'fa-solid fa-face-smile'
    a5.href = '#'
    a5.appendChild(icons5)

    const a6 = document.createElement('a')
    const icons6 = document.createElement('i')
    icons6.className = 'fa-solid fa-paperclip'
    a6.href = '#'
    a6.appendChild(icons6)

    const a7 = document.createElement('a')
    const icons7 = document.createElement('i')
    icons7.className = 'fa-solid fa-microphone-lines'
    a7.href = '#'
    a7.appendChild(icons7)

    const inputEnviar = document.createElement('input')
    inputEnviar.setAttribute('type', 'text')
    inputEnviar.setAttribute('placeholder', 'Escreva a mensagem')

    divEnviar.appendChild(a5)
    divEnviar.appendChild(a6)
    divEnviar.appendChild(inputEnviar)
    divEnviar.appendChild(a7)

    containerDireita.appendChild(divTitulo)
    containerDireita.appendChild(divConversa)
    containerDireita.appendChild(divEnviar)
}

criarContatos('11987876567')
