import mongoose from "mongoose"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import { ModeloAlunos_Disciplina } from "../models/Alunos_Disciplina.js"
import ServidorError from "../ServidorError.js"
import { DISCIPLINA_ERROR, RELATION_ERROR, USER_ERROR, TOKEN_ERROR } from "../constants/errorCodes.js"
class Aluno_DisciplinaController {
    async consultarRelacaoPorAluno(req, res) {
        const alunoId = req.userId

        const aluno = await ModeloUsuario.findById(alunoId)
        const alunoNaoExiste = !aluno || aluno.papel !== 'aluno'

        if (alunoNaoExiste) {
            throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        }

        const disciplinas = await ModeloAlunos_Disciplina.find({aluno_id: alunoId}, 'disciplina_id disciplina_nome')
        const disciplinasDoAluno = { nome: aluno.nome, disciplinas }
        console.log(disciplinasDoAluno);
        return res.status(200).json(disciplinasDoAluno)
    }

    async criarRelacao(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const { aluno_id, disciplina_id, disciplina_nome } = req.body

        const alunoExiste = await ModeloUsuario.findById(aluno_id)
        const disciplinaExiste = await ModeloDisciplina.findById(disciplina_id)
        const alunoNaoExiste = !alunoExiste || alunoExiste.papel !== 'aluno'
        const disciplinaNaoExiste = !disciplinaExiste

        if (alunoNaoExiste) {
            throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        }
        if (disciplinaNaoExiste) {
            throw new ServidorError(DISCIPLINA_ERROR.DOESNT_EXIST)
        }
        if (disciplina_nome !== disciplinaExiste.nome) {
            throw new ServidorError(DISCIPLINA_ERROR.NAME_CONFLICT)
        }

        const relacao = {
            aluno_id,
            disciplina_id,
            disciplina_nome
        }

        const relacaoExiste = await ModeloAlunos_Disciplina.findOne(relacao)

        if (relacaoExiste) {
            throw new ServidorError(RELATION_ERROR.ALREADY_EXIST)
        }

        await ModeloAlunos_Disciplina.create(relacao)

        return res.status(204).send()
    }

    async eliminarRelacaoPorDisciplinaId(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.body.id

        await ModeloAlunos_Disciplina.deleteMany({ disciplina_id: id })
        
        res.status(204).send()
    }

    async eliminarRelacaoPorAlunoId(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId, 'papel')
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.body.id
        await ModeloAlunos_Disciplina.deleteMany({ aluno_id: id })
        
        res.status(204).send()
    }

    async cadastrarAlunoADisciplinas(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const { matricula, disciplinas } = req.body

        const aluno = await ModeloUsuario.findOne({ matricula }, '_id papel');
        const alunoNaoExiste = !aluno || aluno.papel !== 'aluno'
        if (alunoNaoExiste) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        const relacoes = disciplinas.map(disciplina => ({
            aluno_id: aluno._id,
            disciplina_id: disciplina.id,
            disciplina_nome: disciplina.nome
        }))

        await ModeloAlunos_Disciplina.insertMany(relacoes);
        
        return res.status(204).send();
    }

    async getAllStudents(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'

        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const data = await ModeloUsuario.aggregate([
            { $match: { papel: 'aluno' } },
            {
                $lookup: {
                    from: 'alunos_disciplinas',
                    localField: '_id',
                    foreignField: 'aluno_id',
                    as: 'disciplinas',
                    pipeline: [
                        {
                            $project: {
                                nome: "$disciplina_nome",
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    nome: 1,
                    matricula: 1,
                    disciplinas: 1
                }
            }
        ])
        res.status(200).json(data)
    }

    async getDisciplinasDoAluno(req, res) {
        const alunoId = req.userId

        const aluno = await ModeloUsuario.findById(alunoId)
        const invalidAluno = !aluno || aluno.papel !== 'aluno'

        if (invalidAluno) {
            throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        }

        const disciplinas = await ModeloAlunos_Disciplina.find({aluno_id: alunoId}, 'disciplina_nome disciplina_id')

        return res.status(200).json(disciplinas)
    }

    async getStudentDataWithDisciplinasById(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.params.id
        const { nome, email, matricula, papel } = await ModeloUsuario.findById(id, 'nome email matricula papel')
        const alunoInvalido = !papel || papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        
        const disciplinas = await ModeloAlunos_Disciplina.find({ aluno_id: new mongoose.Types.ObjectId(id) })
        .select({ disciplina_nome: 1, disciplina_id: 1 })
        .lean()
        const disciplinasFormatadas = disciplinas.map(disciplina => ({
            nome: disciplina.disciplina_nome,
            id: disciplina.disciplina_id
        }))

        const alunoFormatado = {
            nome,
            email,
            matricula,
            disciplinas: disciplinasFormatadas,
        }
    
        res.status(200).json(alunoFormatado)
    }

    async editarCadastroDeDisciplinasDoAlunoById(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const alunoId = req.params.id
        const aluno = await ModeloUsuario.findById(alunoId, 'papel')
        const alunoInvalido = !aluno || aluno.papel !== 'aluno'
        if (alunoInvalido) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        const novasDisciplinasAluno = req.body
        const disciplinasCadastradas = await ModeloAlunos_Disciplina.find({ aluno_id: alunoId })

        const novasDisciplinasFormatadas = novasDisciplinasAluno.map(disciplina => ({
            aluno_id: alunoId,
            disciplina_id: disciplina.id,
            disciplina_nome: disciplina.nome
        }))

        if (disciplinasCadastradas.length === 0) {
            await ModeloAlunos_Disciplina.insertMany(novasDisciplinasFormatadas)
            return res.status(204).send()
        }

        if (novasDisciplinasAluno.length === 0 && disciplinasCadastradas.length > 0) {
            await ModeloAlunos_Disciplina.deleteMany({ $or: disciplinasCadastradas})
            return res.status(204).send()
        }

        const disciplinasCadastradasIds = new Set(disciplinasCadastradas.map(disciplina => disciplina.disciplina_id.toString()))
        const novasCadastradasIds = new Set(novasDisciplinasAluno.map(disciplina => disciplina.id))

        const relacoesAEliminar = disciplinasCadastradas.filter( dc => !novasCadastradasIds.has(dc.disciplina_id.toString()) )
        
        if (relacoesAEliminar.length > 0) {await ModeloAlunos_Disciplina.deleteMany({ $or: relacoesAEliminar })}

        const relacoesACadastrar = novasDisciplinasFormatadas.filter( novaDisc => !disciplinasCadastradasIds.has(novaDisc.disciplina_id))
        
        await ModeloAlunos_Disciplina.insertMany(relacoesACadastrar)

        return res.status(204).send()
    }
}

export default new Aluno_DisciplinaController()