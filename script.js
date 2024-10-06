// obtém elementos da página
const frm = document.querySelector("form")
const respErros = document.querySelector("#outErros")
const respChances = document.querySelector("#outChances")
const respDica = document.querySelector("#outDica")

// array de escopo global com números já apostados
const erros = []

// num aleatório entre 1 e 100
const sorteado = Math.floor(Math.random() * 100) + 1

// constante com número máximo da chances
const chances = 6

// "escuta" evento submit do form
frm.addEventListener("submit",(e) => {
  //  evita envio do form
  e.preventDefault()

  // obtém número digitado
  const numero = Number(frm.inNumero.value)

  // se acertou
  if(numero == sorteado){
    respDica.innerText = `Parabéns!! Número sorteado: ${sorteado}`

    // troca status dos botões
     frm.btSubmit.disabled = true    
     frm.btNovo.className = "exibe"
     
  } else {
    // se número existe no array erros (já apostou)
    if(erros.includes(numero)) {
      alert(`Você já apostou o número ${numero}. Tente outro...`)
    } else {
      // adiciona número no array
      erros.push(numero)

      //obtém tamanho do array
      const numErros = erros.length

      // calcula N° de chances
      const numChances = chances - numErros

      // exibe N° de erros, conteúdo do array e N° de chances
      respErros.innerText = `${numErros} (${erros.join(",")})`
      respChances.innerText = numChances

      if(numChances == 0) {
        alert("Suas chances acabaram...")
        frm.btSubmit.disabled = true
        frm.btNovo.className = "Exibe"
        respDica.innerText = `Game Over!! Número Sorteado: ${sorteado}`
      } else {
        // usa operador ternário para mensagem da dica
        const dica = numero < sorteado ? "maior" : "menor"
        respDica.innerText = `Dica: tente um número ${dica} que ${numero}`
      }
    }
  }
  // limpa campo de entrada
  frm.inNumero.value = "" 

  // posiciona cursor neste campo
  frm.inNumero.focus() 

  frm.btNovo.addEventListener("click", () => {
    location.reload()    // recarrega a página
  })
})

