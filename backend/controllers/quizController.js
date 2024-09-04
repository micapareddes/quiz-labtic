import mongoose from "mongoose"
import ServidorError from "../ServidorError.js"
import { TOKEN_ERROR, QUIZ_ERROR, RELATION_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloQuiz } from "../models/Quiz.js"
import { ModeloAlunos_Disciplina } from "../models/Alunos_Disciplina.js"

class QuizController {
    async postNewQuiz(req, res) {
        const profId = req.userId
        const prof = await ModeloUsuario.findById(profId, 'papel')
        const profInvalido = !prof || prof.papel !== 'professor'
        if (profInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const quiz = req.body
        console.log(quiz);
        
        const disciplinaId = new mongoose.Types.ObjectId(quiz.disciplina_id)
        const nomeDoQuizExiste = await ModeloQuiz.findOne({ titulo: quiz.titulo, disciplina_id: disciplinaId })
        if (nomeDoQuizExiste) throw new ServidorError(QUIZ_ERROR.NAME_ALREADY_EXIST)
        await ModeloQuiz.create(quiz)
        console.log('Novo quiz criado!')
        return res.status(204).send()
    }

    async getPerguntasQuiz(req, res) {
        const alunoId = req.userId
        const aluno = await ModeloUsuario.findById(alunoId, 'papel')
        const alunoInvalido = !aluno || aluno.papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS) 

        const quizId = req.params.id
        const perguntasData = await ModeloQuiz.findById(quizId, 'titulo tempo perguntas.pergunta perguntas._id perguntas.alternativas.conteudo perguntas.alternativas._id').populate('disciplina_id', 'nome')
        if (!perguntasData) throw new ServidorError(QUIZ_ERROR.DOESNT_EXIST)

        const isAlunoCadastradoADisciplina = await ModeloAlunos_Disciplina.exists({
            disciplina_id: perguntasData.disciplina_id,
            aluno_id: alunoId
        })
        if (!isAlunoCadastradoADisciplina) throw new ServidorError(RELATION_ERROR.DOESNT_EXIST)
        res.status(200).json(perguntasData)
    }
}

export default new QuizController()