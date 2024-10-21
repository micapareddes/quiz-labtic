import mongoose from "mongoose"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import { ModeloQuiz } from "../models/Quiz.js"
import ServidorError from "../ServidorError.js"
import { DISCIPLINA_ERROR, TOKEN_ERROR, USER_ERROR } from "../constants/errorCodes.js"
import { ModeloAlunos_Disciplina } from "../models/Alunos_Disciplina.js"


class DisciplinaController {
    async criarDisciplina(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const { nome, professor_id } = req.body
        
        if (nome.length < 3) throw new ServidorError(DISCIPLINA_ERROR.INVALID_NAME)
        
            const disciplinaExiste = await ModeloDisciplina.findOne({nome: nome})
        if (disciplinaExiste) throw new ServidorError(DISCIPLINA_ERROR.ALREADY_EXIST)

        let novaDisciplina = { 
            nome,
            professor_id: null 
        }

        if (professor_id) {
            const idInvalido = !mongoose.Types.ObjectId.isValid(professor_id)
            if (idInvalido) throw new ServidorError(USER_ERROR.INVALID_ID)
    
            const professor = await ModeloUsuario.findById(professor_id)
            const professorNaoExiste = !professor || professor.papel !== 'professor'
            
            if (professorNaoExiste) {
                console.log('Professor não existe!')
                throw new ServidorError(USER_ERROR.DOESNT_EXIST)
            }

            novaDisciplina = {
                nome,
                professor_id,
            }
        }

        await ModeloDisciplina.create(novaDisciplina)
        console.log('Nova disciplina criada!')
        return res.status(204).send()
    }

    async getName(req, res) {
        const id = req.params.id
        const nome = await ModeloDisciplina.findById(id, 'nome -_id')
        if (!nome) throw new ServidorError(DISCIPLINA_ERROR.DOESNT_EXIST)
        
        res.status(200).json(nome)
    }

    async editarDisciplina(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)
        
        const id = req.params.id
        let { nome, professor_id } = req.body

        if (!id) throw new ServidorError(DISCIPLINA_ERROR.ID_REQUIRED)

        if (!nome && !professor_id) throw new ServidorError(DISCIPLINA_ERROR.MISSING_FIELDS)

        if (professor_id === 'null') professor_id = null

        const updateData = { nome, professor_id }

        if (nome && nome.length < 3) throw new ServidorError(DISCIPLINA_ERROR.INVALID_NAME)

        const disciplina = await ModeloDisciplina.findByIdAndUpdate(id, updateData)

        if (!disciplina) throw new ServidorError(DISCIPLINA_ERROR.DOESNT_EXIST)

        res.status(204).send()
    }

    async eliminarDisciplina(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId, 'papel')
        const adminIvalido = !admin || admin.papel !== 'admin'
        if (adminIvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.body.id
        await ModeloDisciplina.findByIdAndDelete(id)
        
        res.status(204).send()
    }

    async eliminarDisciplinaEDependencias(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId, 'papel')
        const adminIvalido = !admin || admin.papel !== 'admin'
        if (adminIvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.body.id
        const objectId = new mongoose.Types.ObjectId(id)
        await ModeloDisciplina.findByIdAndDelete(id)
        await ModeloAlunos_Disciplina.deleteMany({ disciplina_id: objectId })
        await ModeloQuiz.deleteMany({ disciplina_id: objectId })
        
        res.status(204).send()
    }

    async mostrarDisciplinasDoProfessor(req, res) {
        const profId = req.userId

        const professor = await ModeloUsuario.findById(profId)
        const profNaoExiste = !professor || professor.papel !== 'professor'

        if (profNaoExiste) {
            throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        }

        const disciplinas = await ModeloDisciplina.find({professor_id: profId}, 'disciplina_id nome')

        return res.status(200).json(disciplinas)
    } 
    
    async listarDisciplinasCadastradas(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'

        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const disciplinasCadastradas = await ModeloDisciplina.find({}).populate('professor_id', 'nome')

        return res.status(200).json(disciplinasCadastradas)
    }

    async listarDisciplinasSemProfessor(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'

        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const disciplinasSemProfessor = await ModeloDisciplina.find({professor_id: null})

        return res.status(200).json(disciplinasSemProfessor)
    }

    async listarInformaçõesPorId(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'

        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.params.id
        
        const disciplina = await ModeloDisciplina.findOne({_id: id}, 'nome professor_id quizes')

        if (!disciplina) throw new ServidorError(DISCIPLINA_ERROR.DOESNT_EXIST)

        res.status(200).json(disciplina)
    }

    async cadastrarProfessorADisciplinas(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const { matricula, disciplinas } = req.body
        const professor = await ModeloUsuario.findOne({ matricula }, '_id papel');
        const professorInvalido = !professor || professor.papel !== 'professor'
        if (professorInvalido) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        for (const disciplina of disciplinas) {
            const existingDisciplina = await ModeloDisciplina.findById(disciplina.id);
            if (existingDisciplina.professor_id !== null) {
                throw new ServidorError(DISCIPLINA_ERROR.HAS_PROFESSOR(existingDisciplina.nome))
            }
        }


        await Promise.all(disciplinas.map(
            async (disciplina) => {
                await ModeloDisciplina.findByIdAndUpdate(
                    disciplina.id,
                    { professor_id: professor._id }
                )
            }
        ))
        res.status(204).send()
    }

    async editarProfessorDeDisciplinasPorId(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.params.id
        const novasDisciplinas = req.body
        const professor = await ModeloUsuario.findById(id, '_id papel');
        const professorInvalido = !professor || professor.papel !== 'professor'
        if (professorInvalido) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        const antigasDisciplinas = await ModeloDisciplina.find({ professor_id: id }, '_id')
        
        if (antigasDisciplinas.length === 0) {
            await ModeloDisciplina.updateMany(
                { _id: { $in: novasDisciplinas } }, 
                { $set: { professor_id: id }}
            )
            return res.status(204).send()
        }

        const antigasDisciplinasIds = antigasDisciplinas.map(d => {
            return d._id.toString()
        })
        if (antigasDisciplinas.length > 0 && novasDisciplinas.length === 0) {
            await ModeloDisciplina.updateMany(
                { _id: { $in: antigasDisciplinasIds } }, 
                { $set: { professor_id: null }}
            )
            return res.status(204).send()
        }

        const disciplinasParaEliminarProfessor = antigasDisciplinasIds.filter( id => !novasDisciplinas.includes(id) )
        await ModeloDisciplina.updateMany(
            { _id: { $in: disciplinasParaEliminarProfessor } }, 
            { $set: { professor_id: null }}
        )

        const disciplinasParaCadastrarProfessor = novasDisciplinas.filter( id => !antigasDisciplinasIds.includes(id))

        for (const id of disciplinasParaCadastrarProfessor) {
            const existingDisciplina = await ModeloDisciplina.findById(id);
            if (existingDisciplina.professor_id !== null) {
                throw new ServidorError(DISCIPLINA_ERROR.HAS_PROFESSOR(existingDisciplina.nome))
            }
        }

        await ModeloDisciplina.updateMany(
            { _id: { $in: disciplinasParaCadastrarProfessor } }, 
            { $set: { professor_id: id }}
        )
        return res.status(204).send()
    }

    async removeProfessorFromDisciplinas(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.body.id
        const disciplinasProfessor = await ModeloDisciplina.find({ professor_id: id }, '_id')

        if (disciplinasProfessor.length > 0) {
            const idsDisciplinasProfessor = disciplinasProfessor.map(d => {
                return d._id.toString()
            })
            await ModeloDisciplina.updateMany(
                { _id: { $in: idsDisciplinasProfessor } }, 
                { $set: { professor_id: null }}
            )
        }

        res.status(204).send()
    }

    async adicionarQuizADisciplina(req, res) {
        //TODO: Validação de pessoa pelo accesToken. Deve ser apenas professor ou admin também pode?
        const { disciplina_id, nome_quiz } = req.body
        const disciplina_objectId = new mongoose.Types.ObjectId(disciplina_id)
        const quiz_id = await ModeloQuiz.findOne({ titulo: nome_quiz, disciplina_id: disciplina_objectId }, '_id')
        const novoQuiz = {
            quiz_id,
            nome: nome_quiz
        }
        const disciplinaAtualizada = await ModeloDisciplina.findByIdAndUpdate(
            disciplina_objectId,
            { $push: { quizes: novoQuiz } },
            { new: true, useFindAndModify: false }
        )
        if (!disciplinaAtualizada) new ServidorError(DISCIPLINA_ERROR.DOESNT_EXIST)
        
        res.status(204).send()
    }

    async getQuizzesInfoByDisciplinaId(req, res) {
        const alunoId = req.userId

        const aluno = await ModeloUsuario.findById(alunoId)
        const alunoInvalido = !aluno || aluno.papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const disciplinaId = req.params.id
        const data = await ModeloDisciplina.findById(disciplinaId, 'nome quizes').populate('quizes.quiz_id', 'data_fim tipo')
        if (!data) throw new ServidorError(DISCIPLINA_ERROR.DOESNT_EXIST)

        res.status(200).json(data)
    }
}

export default new DisciplinaController()