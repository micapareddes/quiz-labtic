// Functions
import { handleGuardarRascunho } from '../functions/handleGuardarRascunho.js'
import { infoQuizValidation } from '/frontend/src/validations/infoQuizValidation.js'
import { getProfessorDisciplinas } from '../../../service/getProfessorDisciplinas.js'
import { navigateTo} from '/frontend/src/functions/navigateTo.js'
// Components
import { Heading } from '/frontend/src/components/heading.js'
import { painelItems } from '/frontend/src/pages/professor/components/sidebar-professor.js'
import { AlertDialog, openDialog } from '/frontend/src/components/dialog.js'
import { TextInput } from '/frontend/src/components/text-input.js'
import { Select } from '/frontend/src/components/select.js'
import { DataInput } from '/frontend/src/components/data-input.js'
import { TextArea } from '/frontend/src/components/text-area.js'
import { Button } from '/frontend/src/components/button.js'
import { ErrorMessage } from '/frontend/src/components/error-message.js'

function handleCriarPerguntas(e) {
    e.preventDefault()
    const form = document.getElementById('form')
    const nomeInput = form.querySelector('#nome')
    const tentativasInput = form.querySelector('#tentativas')
    const disciplinaInput = form.querySelector('#disciplina')
    const tipoInput = form.querySelector('#tipo')
    const tempoMaxInput = form.querySelector('#tempo-max')
    const dataInicioInput = form.querySelector('#data-inicio').querySelector('input')
    const dataFinalInput = form.querySelector('#data-final').querySelector('input')
    const orientacoesInput = form.querySelector('#orientacoes')
    const nomeInputContainer = form.querySelector('#nome-container')
    const tentativasInputContainer = form.querySelector('#tentativas-container')
    const disciplinaSelectContainer = form.querySelector('#disciplina-container')
    const tipoSelectContainer = form.querySelector('#tipo-container')
    const tempoMaxSelectContainer = form.querySelector('#tempo-max-container')
    const dataInicioContainer = form.querySelector('#data-inicio-container')
    const dataFinalContainer = form.querySelector('#data-final-container')
    const submit = form.querySelector('#criar-perguntas-button')

    const data = {
        nome: nomeInput.value.trim(),
        tentativas: tentativasInput.value.trim(),
        disciplina: {
            id: disciplinaInput.value,
            nome: disciplinaInput.selectedOptions[0].textContent.trim(),
        },
        tipo: tipoInput.value,
        tempoMax: tempoMaxInput.value,
        dataInicio: dataInicioInput.value,
        dataFinal: dataFinalInput.value,
        orientacoes: orientacoesInput.value.trim(),
    }
    const { success, error } = infoQuizValidation(data)
    
    // if (!success) {
    //     if (error.nameValidation) {
    //         nomeInput.classList.add('border-red-500')
    //         nomeInputContainer.appendChild(
    //             ErrorMessage('O nome deve conter pelo menos 3 caracteres.')
    //         )
    //     }
    //     if (error.disciplinaValidation) {
    //         disciplinaInput.classList.add('border-red-500')
    //         disciplinaSelectContainer.appendChild(
    //             ErrorMessage('Este campo é obrigatorio.')
    //         )
    //     }
    //     if (error.typeValidation) {
    //         tipoInput.classList.add('border-red-500')
    //         tipoSelectContainer.appendChild(
    //             ErrorMessage('Este campo é obrigatorio.')
    //         )
    //     }        
    //     if (error.attemptsValidation) {
    //         tentativasInput.classList.add('border-red-500')
    //         tentativasInputContainer.appendChild(
    //             ErrorMessage('Tentativas devem ser maior do que 0.')
    //         )
    //     }
    //     if (error.maxTimeValidation) {
    //         tempoMaxInput.classList.add('border-red-500')
    //         tempoMaxSelectContainer.appendChild(
    //             ErrorMessage('Este campo é obrigatorio.')
    //         )
    //     }        
    //     if (error.startDateValidation) {
    //         dataInicioInput.classList.add('border-b-red-500')
    //         dataInicioContainer.appendChild(
    //             ErrorMessage('Data inválida.')
    //         )
    //     }
    //     if (error.endDateValidation) {
    //         dataFinalInput.classList.add('border-b-red-500')
    //         dataFinalContainer.appendChild(
    //             ErrorMessage('Data inválida.')
    //         )
    //     }
    //     submit.disabled = true
    //     return
    // }

    const jsonData = JSON.stringify(data)
    localStorage.setItem('infos', jsonData)
    localStorage.setItem('step', true)

    navigateTo('/frontend/src/pages/professor/quiz/create/index.html?step=2')
}
function handleFormChange() { //TODO:
    const form = document.getElementById('form')

    const nomeInputContainer = form.querySelector('#nome-container')
    const errorNome = nomeInputContainer.querySelector('#error-message')

    if (errorNome) {
        const nomeInput = form.querySelector('#nome')
        errorNome.remove()
        nomeInput.classList.remove('border-red-500')
    }    

}
export async function Step1Page() {
    localStorage.removeItem('step')

    const main = document.getElementById('main')
    const form = document.createElement('form')
    const nameInputContainer = document.createElement('div')
    const disciplinaSelectContainer = document.createElement('div')
    const tipoSelectContainer = document.createElement('div')
    const tempoMaxSelectContainer = document.createElement('div')
    const dataInicioContainer = document.createElement('div')
    const dataFinalContainer = document.createElement('div')
    const buttonsContainer = document.createElement('div')
    const tiposDeQuiz = [
        {
            text: 'Prova',
            value: 'prova'
        },
        {
            text: 'Quiz',
            value: 'quiz'
        },
        {
            text: 'Simulado',
            value: 'simulado'
        },
    ]
    const disciplinas = await getProfessorDisciplinas()
    const disciplinasFormatadas = disciplinas.map((disciplina) => {
        return {
            text: disciplina.nome,
            value: disciplina._id
        }
    })
    const quizMaxTime = []

    const formatTime = (minutes) => {
        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}min`;
        }
    }
    for (let i =30; i <= 240; i+= 30) {
        quizMaxTime.push({
            text: formatTime(i),
            value: i,
        })
    }
    form.id = 'form'
    form.className = 'pt-6 gap-6 md:gap-8 md:p-10 flex flex-col md:grid md:grid-cols-2'
    buttonsContainer.className = 'md:col-span-2 flex flex-col md:flex-row gap-4 justify-end'

    nameInputContainer.className = 'col-span-2'
    disciplinaSelectContainer.id = 'disciplina-container'
    tipoSelectContainer.id = 'tipo-container'
    tempoMaxSelectContainer.id = 'tempo-max-container'
    dataInicioContainer.id = 'data-inicio-container'
    dataFinalContainer.id = 'data-final-container'

    buttonsContainer.append(
        Button({
            variant: 'outline',
            size: 'md', 
            title: 'Guardar como rascunho', 
            type: 'button', 
            onClick: () => handleGuardarRascunho(), 
            id: 'guardar-rascunho-button'
        }),            
        Button({
            variant: 'primary',
            size: 'md', 
            title: 'Criar Perguntas', 
            type: 'submit', 
            id: 'criar-perguntas-button'
        }),
    )
    nameInputContainer.appendChild(
        TextInput({
            placeholder: 'Nome do quiz',
            id: 'nome',
        })
    )
    disciplinaSelectContainer.appendChild(
        Select({
            placeholder: 'Selecione a disciplina', 
            options: disciplinasFormatadas, 
            id: 'disciplina',
        })
    )
    tipoSelectContainer.appendChild(
        Select({
            placeholder: 'Selecione o tipo de quiz', 
            options: tiposDeQuiz,
            id: 'tipo',
        })
    )
    tempoMaxSelectContainer.appendChild(
        Select({
            placeholder: 'Tempo máximo para realizar o quiz', 
            options: quizMaxTime,
            id: 'tempo-max',
        })
    )
    dataInicioContainer.appendChild(
        DataInput({
            labelName: 'Data de inicio',
            id: 'data-inicio'
        })
    )
    dataFinalContainer.appendChild(
        DataInput({
            labelName: 'Data de entrega',
            id: 'data-final'
        })
    )
    form.append(
        nameInputContainer,
        disciplinaSelectContainer,
        tipoSelectContainer,
        TextInput({
            type: 'number',
            placeholder: 'Tentativas para realizar o quiz',
            id: 'tentativas',
        }),
        tempoMaxSelectContainer,
        dataInicioContainer,
        dataFinalContainer,
        TextArea({
            placeholder: 'Escreva aqui as orientações para o aluno...',
            id: 'orientacoes',
            size: 'full',
            className: 'col-span-2',
        }),
        buttonsContainer
    )
    main.append(
        Heading({
            goBack: true, 
            title: 'Informações do quiz', 
            onGoBack: () => {
                if (form.querySelector('input').value) { //TODO: ajustar lógica de inputs preenchidos
                    openDialog(
                        AlertDialog({
                            message: 'O cadastro não será salvo.',
                            confirmarButtonName: 'Voltar',
                            onConfirm: () => goBack()
                        })
                    )
                    return
                }
                goBack()
            }
        }),
        form
    )

    form.onsubmit = handleCriarPerguntas
    form.oninput = handleFormChange

    const dadosPreenchidos = JSON.parse(localStorage.getItem('infos'))
    console.log(dadosPreenchidos);
    
    if (dadosPreenchidos) {
        const form = document.getElementById('form')
        const nomeInput = form.querySelector('#nome')
        const tentativasInput = form.querySelector('#tentativas')
        const disciplinaInput = form.querySelector('#disciplina')
        const tipoInput = form.querySelector('#tipo')
        const tempoMaxInput = form.querySelector('#tempo-max')
        const dataInicioInput = form.querySelector('#data-inicio').querySelector('input')
        const dataFinalInput = form.querySelector('#data-final').querySelector('input')
        const orientacoesInput = form.querySelector('#orientacoes')

        nomeInput.value = dadosPreenchidos.nome
        disciplinaInput.value = dadosPreenchidos.disciplina.id
        tentativasInput.value = dadosPreenchidos.tentativas
        tempoMaxInput.value = dadosPreenchidos.tempoMax
        dataInicioInput.value = dadosPreenchidos.dataInicio
        dataFinalInput.value = dadosPreenchidos.dataFinal
    }

}