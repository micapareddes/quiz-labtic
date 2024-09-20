import mongoose from "mongoose"
import { TOKEN_ERROR, USER_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import { generateAccessToken } from "../utils/generateToken.js"
import ServidorError from "../ServidorError.js"

import bcrypt from "bcryptjs"

class UsuarioController {
    async login(req, res) {
        const { email, matricula, senha} = req.body

        if (!email && !matricula || !senha) throw new ServidorError(USER_ERROR.MISSING_REQUIRED_FIELDS)

        const user = await ModeloUsuario.findOne({$or: [
            { matricula: matricula },
            { email: email ?? " " }
        ]})

        if (!user) {
            console.log('Email ou matricula não existe!');
            throw new ServidorError(USER_ERROR.INVALID_LOGIN)
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha)

        if (!senhaCorreta) {
            console.log('Senha incorreta!')
            throw new ServidorError(USER_ERROR.INVALID_LOGIN)
        }

        const accessToken = generateAccessToken(user)

        console.log(user.nome, 'logado!')
        res.status(200).json({ accessToken }) 
    }

    async tipoDoUsuario(req, res) {
        const reqUserId = req.userId
        const userData = await ModeloUsuario.findById(reqUserId)

        if (!userData) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        return res.status(200).json({ userType: userData.papel })
    }
 
    async consultarUsuario(req, res) {

    }

    async criarUsuario(req, res ) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const { matricula, nome, papel, email } = req.body

        if (!matricula || !nome || !papel || !email) {
            throw new ServidorError(USER_ERROR.MISSING_REQUIRED_FIELDS)
        }

        const matriculaOuEmailNoBanco = await ModeloUsuario.find({$or: [
            { email: email },
            { matricula: matricula }
        ]})

        if (matriculaOuEmailNoBanco.length !== 0) {
            throw new ServidorError(USER_ERROR.ALREADY_EXIST)
        }

        const novoUsuario = {
            matricula,
            nome,
            papel,
            email,
            senha: await bcrypt.hash(matricula, 8),
        }

        await ModeloUsuario.create(novoUsuario)
        console.log("Novo usuario criado!")
        return res.status(204).send()
    }

    async eliminarUsuario(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)
        
        const id = req.body.id

        const user = await ModeloUsuario.findByIdAndDelete(id)

        if (!user) throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        
        res.status(204).send()
    }

    async editarUsuario(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId)
        const invalidAdmin = !admin || admin.papel !== 'admin'
        if (invalidAdmin) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.params.id
        const atualizacoes = req.body

        if ('senha' in atualizacoes || 'papel' in atualizacoes) {
            throw new ServidorError(USER_ERROR.FORBIDDEN_EDIT)
        }

        const usuario = await ModeloUsuario.findByIdAndUpdate(id, atualizacoes, { new: true })

        if (!usuario) {
            throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        }

        console.log("Usuario editado!")
        return res.status(204).send()
    }

    async alterarSenha(req, res) {
        const id = req.userId
        const reqUser = await ModeloUsuario.findById(id)
        if (reqUser.papel === 'admin') {
            console.log('Adm não permitido!');
            throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)}
        
        const { senhaAtual, novaSenha } = req.body
        
        if (!reqUser) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        const senhaAtualCorreta = await bcrypt.compare(senhaAtual, reqUser.senha)

        if (!senhaAtualCorreta) throw new ServidorError(USER_ERROR.INCORRECT_CURRENT_PASSWORD)
    
        const novaSenhaEncriptada = await bcrypt.hash(novaSenha, 8)
        await ModeloUsuario.findByIdAndUpdate(id, {senha: novaSenhaEncriptada})

        console.log('Senha alterada!');
        return res.status(204).send()
    }

    async consultarNome(req, res) {
        const reqUserId = req.userId
        const userData = await ModeloUsuario.findById(reqUserId)
        if (!userData) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        return res.status(200).json(userData.nome)
    }

    async listarInformacoesPorId(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.params.id
        const user = await ModeloUsuario.findOne({ _id: id }, 'nome matricula email')
        if (!user) throw new ServidorError(USER_ERROR.DOESNT_EXIST)

        res.status(200).json( user )
    }

    async listarTodosPorfessores(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const professoresCadastrados = await ModeloUsuario.find({papel: 'professor'}, 'nome _id')


        return res.status(200).json(professoresCadastrados)
    }

    async listarTodosProfessoresComDisciplinas(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'admin') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const data = await ModeloUsuario.aggregate([
            { $match: { papel: 'professor' } },
            {
                $lookup: {
                    from: 'disciplinas',
                    localField: '_id',
                    foreignField: 'professor_id',
                    as: 'disciplinas',
                    pipeline: [
                        {
                            $project: {
                                nome: 1,
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


        return res.status(200).json(data)
    }

    async getProfessorDataWithDisciplinasById(req, res) {
        const adminId = req.userId
        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'
        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.params.id
        const { nome, email, matricula, papel } = await ModeloUsuario.findById(id, 'nome email matricula papel')
        const professorInvalido = !papel || papel !== 'professor'
        if (professorInvalido) throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        
        const disciplinas = await ModeloDisciplina.find({ professor_id: new mongoose.Types.ObjectId(id) })
        .select({ nome: 1, _id: 1 })
        .lean()
        const disciplinasFormatadas = disciplinas.map(disciplina => ({
            nome: disciplina.nome,
            id: disciplina._id
        }))

        const professorFormatado = {
            nome,
            email,
            matricula,
            disciplinas: disciplinasFormatadas,
        }
    
        res.status(200).json(professorFormatado)
    }
}

export default new UsuarioController()