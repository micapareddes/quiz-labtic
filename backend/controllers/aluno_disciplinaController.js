import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import { ModeloAlunos_Disciplina } from "../models/Alunos_Disciplina.js"
import ServidorError from "../ServidorError.js"
import { DISCIPLINA_ERROR, RELATION_ERROR, USER_ERROR } from "../constants/errorCodes.js"
class Aluno_DisciplinaController {
    async consultarRelacaoPorAluno(req, res) {
        console.log('Nova consulta de relação!'); 
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
                                disciplina_nome: 1,
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
        res.status(200).json(data);
    }
}

export default new Aluno_DisciplinaController()