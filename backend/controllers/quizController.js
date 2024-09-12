import mongoose from "mongoose"
import ServidorError from "../ServidorError.js"
import { TOKEN_ERROR, QUIZ_ERROR, RELATION_ERROR, DISCIPLINA_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloQuiz } from "../models/Quiz.js"
import { ModeloAlunos_Disciplina } from "../models/Alunos_Disciplina.js"
import { ModeloResposta } from "../models/Resposta.js"
import { ModeloDisciplina } from "../models/Disciplina.js"

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

    async getInfosQuizForStudent(req, res) {
        const alunoId = req.userId
        const aluno = await ModeloUsuario.findById(alunoId, 'papel')
        const alunoInvalido = !aluno || aluno.papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)
        
        const quizId = req.params.id
        const info = await ModeloQuiz.findById(quizId, 'titulo tempo tentativas data_inicio data_fim orientacao').populate('disciplina_id', 'nome')
        if (!info) throw new ServidorError(QUIZ_ERROR.DOESNT_EXIST)

        const isAlunoCadastradoADisciplina = await ModeloAlunos_Disciplina.exists({
            disciplina_id: info.disciplina_id,
            aluno_id: alunoId
        })
        if (!isAlunoCadastradoADisciplina) throw new ServidorError(RELATION_ERROR.DOESNT_EXIST)

        const tentativas = await ModeloResposta.find({ quiz_id: quizId, aluno_id: alunoId }, '_id nota') //TODO: Adicionar logica de timestamp para definir ordem da tentativa

        const data = {
            data_fim: info.data_fim,
            data_inicio: info.data_inicio,
            disciplina_nome: info.disciplina_id.nome,
            orientacao: info.orientacao,
            tempo: info.tempo,
            tentativas: info.tentativas,
            titulo: info.titulo,
            tentativas_aluno: tentativas,
        }
        
        res.status(200).json(data)
    }

    async getInfosQuizForProfessor(req, res) {
        const profId = req.userId
        const prof = await ModeloUsuario.findById(profId, 'papel')
        const profInvalido = !prof || prof.papel !== 'professor'
        if (profInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)
        
        const quizId = req.params.id
        const info = await ModeloQuiz.findById(quizId, 'titulo tempo tentativas data_inicio data_fim orientacao').populate('disciplina_id', 'nome')
        if (!info) throw new ServidorError(QUIZ_ERROR.DOESNT_EXIST)

        const isProfCadastradoADisciplina = await ModeloDisciplina.exists({
            _id: info.disciplina_id,
            professor_id: profId
        })
        if (!isProfCadastradoADisciplina) throw new ServidorError(DISCIPLINA_ERROR.INVALID_PROFESSOR)
            
        const alunosQueResponderam = await ModeloResposta.find({ quiz_id: quizId }, 'nota').populate('aluno_id', 'nome')
            
        const data = {
                data_fim: info.data_fim,
                data_inicio: info.data_inicio,
                disciplina_nome: info.disciplina_id.nome,
                orientacao: info.orientacao,
                tempo: info.tempo,
                tentativas: info.tentativas,
                titulo: info.titulo,
                alunos: alunosQueResponderam,
            }
            
        res.status(200).json(data)
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
    
    async getPerguntasQuizForGabarito(req, res) {
        const quizId = req.params.id
        const perguntasData = await ModeloQuiz.findById(quizId, 'titulo perguntas').populate('disciplina_id', 'nome')
        if (!perguntasData) throw new ServidorError(QUIZ_ERROR.DOESNT_EXIST)

        res.status(200).json(perguntasData)
    }

    async getQuizzesPorDisciplinaIdParaProfessor(req, res) {
        const profId = req.userId
        const prof = await ModeloUsuario.findById(profId, 'papel')
        const profInvalido = !prof || prof.papel !== 'professor'
        if (profInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const disciplinaId = req.params.id
        const disciplinaObjectId = new mongoose.Types.ObjectId(disciplinaId)
        const quizzes = await ModeloQuiz.find({disciplina_id: disciplinaObjectId}, 'isRascunho titulo disciplina_id').populate('disciplina_id', 'nome')
        let postados = []
        let rascunhos = []
        quizzes.forEach((quiz) => {
            if (quiz.isRascunho) rascunhos.push(quiz)
            else postados.push(quiz)
        })
        const quiz = {postados, rascunhos}
        res.status(200).json(quiz)
    }
}

export default new QuizController()