import mongoose from "mongoose"
import ServidorError from "../ServidorError.js"
import { TOKEN_ERROR, QUIZ_ERROR, RELATION_ERROR, DISCIPLINA_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloQuiz } from "../models/Quiz.js"
import { ModeloAlunos_Disciplina } from "../models/Alunos_Disciplina.js"
import { ModeloResposta } from "../models/Resposta.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import { embaralhar } from "../utils/embaralhar.js"

class QuizController {
    async postNewQuiz(req, res) {
        const profId = req.userId
        const prof = await ModeloUsuario.findById(profId, 'papel')
        const profInvalido = !prof || prof.papel !== 'professor'
        if (profInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const quiz = req.body
        
        const disciplinaId = new mongoose.Types.ObjectId(quiz.disciplina_id)
        const quizExistente = await ModeloQuiz.findOne({ titulo: quiz.titulo, disciplina_id: disciplinaId })
        if (quizExistente) {
            if (quizExistente.isRascunho === 'false') throw new ServidorError(QUIZ_ERROR.NAME_ALREADY_EXIST)
            
            if (quizExistente.isRascunho) await ModeloQuiz.findByIdAndUpdate(quizExistente._id, quiz)

        } else {
            await ModeloQuiz.create(quiz)
        }
        
        res.status(204).send()   
    }

    async editarQuiz(req, res) {
        const userId = req.userId
        const user = await ModeloUsuario.findById(userId, 'papel')
        const userInvalido = !user || user.papel === 'aluno'
        if (userInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const quizId = req.params.id
        const newData = req.body
        if (newData.disciplina_id) throw new ServidorError(QUIZ_ERROR.FORBIDDEN_EDIT)
        
        let newRespostaData = {};

        if (newData.titulo) {
            newRespostaData.nome_quiz = newData.titulo
        }
        if (newData.tempo) {
            newRespostaData.tempo_quiz = newData.tempo
        }
        if (newData.perguntas) {
            newRespostaData.perguntas_quiz = newData.perguntas
        }

        await ModeloQuiz.findByIdAndUpdate(quizId, newData)

        await ModeloResposta.updateMany({quiz_id: quizId}, newRespostaData)

        if (newData.titulo) {
            await ModeloDisciplina.updateOne(
                { 'quizes.quiz_id': quizId },
                { $set: {'quizes.$.nome': newData.titulo} }
            )
        }
        
        res.status(204).send()
    }

    async deleteQuizAndDependencies(req, res) {
        const userId = req.userId
        const user = await ModeloUsuario.findById(userId, 'papel')
        const userInvalido = !user || user.papel === 'aluno'
        if (userInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)
        
        const quizId = req.params.id
        const quizObjectId = new mongoose.Types.ObjectId(quizId)
        const quiz = await ModeloQuiz.findByIdAndDelete(quizId)
        await ModeloResposta.deleteMany({ quiz_id: quizObjectId })
        await ModeloDisciplina.updateMany(
            { 'quizes.quiz_id': quizObjectId },
            { $pull: { quizes: { quiz_id: quizObjectId } } }
        )
        if (!quiz) throw new ServidorError(QUIZ_ERROR.DOESNT_EXIST)

        res.status(204).send()
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
                disciplina: {
                    nome: info.disciplina_id.nome,
                    id: info.disciplina_id._id,
                },
                orientacao: info.orientacao,
                tempo: info.tempo,
                tentativas: info.tentativas,
                titulo: info.titulo,
                alunos: alunosQueResponderam,
            }
            
        res.status(200).json(data)
    }

    async getQuiz(req, res) {
        const userId = req.userId
        const user = await ModeloUsuario.findById(userId, 'papel')
        const userInvalido = !user || user.papel === 'aluno'
        if (userInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const quizId = req.params.id
        const quiz = await ModeloQuiz.findById(quizId, '-createdAt -updatedAt').populate('disciplina_id', 'nome')
        if (!quiz) throw new ServidorError(QUIZ_ERROR.DOESNT_EXIST)

        res.status(200).json(quiz)
    }

    async embaralharQuizESalvar(req, res) {
        const alunoId = req.userId
        const aluno = await ModeloUsuario.findById(alunoId, 'papel')
        const alunoInvalido = !aluno || aluno.papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS) 

        const quizId = req.params.id
        const perguntasData = await ModeloQuiz.findById(quizId, 'titulo tempo disciplina_id perguntas')
        
        if (!perguntasData) throw new ServidorError(QUIZ_ERROR.DOESNT_EXIST)

        const isAlunoCadastradoADisciplina = await ModeloAlunos_Disciplina.exists({
            disciplina_id: perguntasData.disciplina_id,
            aluno_id: alunoId
        })
        if (!isAlunoCadastradoADisciplina) throw new ServidorError(RELATION_ERROR.DOESNT_EXIST)
        
        const perguntasComAlternativasEmbaralhadas = perguntasData.perguntas.map((perg) =>{
            const alternativas = perg.alternativas
            return {
                _id: perg._id,
                pergunta: perg.pergunta,
                alternativas: embaralhar(alternativas),
            }
        })

        const dataEmbaralhada = {
            quiz_id: perguntasData._id,
            aluno_id: alunoId,
            nome_quiz: perguntasData.titulo,
            disciplina_id: perguntasData.disciplina_id,
            tempo_quiz: perguntasData.tempo,
            perguntas_quiz: perguntasComAlternativasEmbaralhadas
        }
        
        const resposta  = await ModeloResposta.create(dataEmbaralhada)

        res.status(200).json(resposta._id)
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