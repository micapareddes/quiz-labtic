import { TOKEN_ERROR, USER_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import ServidorError from "../ServidorError.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

        var accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET)
        console.log(user.nome, 'logado!')
        res.status(200).json({ accessToken }) 
    }
 
    async consultarUsuario(req, res) {

    }

    async criarUsuario(req, res ) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'adm') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

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

        const usuarioCriado = await ModeloUsuario.create(novoUsuario)
        console.log("Novo usuario criado!", usuarioCriado)

        return res.status(201).send()
    }

    async eliminarUsuario(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'adm') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)
        
        const userMatricula = req.body.matricula

        const resposta = await ModeloUsuario.deleteOne({"matricula": userMatricula})

        if (resposta.n === 0) {
            throw new ServidorError(USER_ERROR.DOESENT_EXIST)
        }

        console.log('Usuario deletado! ', userMatricula)
        return res.status(204).send()
    }

    async editarUsuario(req, res) {
        const reqUserId = req.userId
        const reqUser = await ModeloUsuario.findById(reqUserId)
        if (reqUser.papel !== 'adm') throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const id = req.params.id
        const atualizacoes = req.body

        if ('matricula' in atualizacoes || 'senha' in atualizacoes) {
            throw new ServidorError(USER_ERROR.FORBIDDEN_EDIT)
        }

        const usuario = await ModeloUsuario.findByIdAndUpdate(id, atualizacoes, { new: true })

        if (!usuario) {
            throw new ServidorError(USER_ERROR.DOESENT_EXIST)
        }

        console.log("Usuario editado!", usuario)
        return res.status(204).send()
    }

    async alterarSenha(req, res) {
        const id = req.userId
        const reqUser = await ModeloUsuario.findById(id)
        if (reqUser.papel === 'adm') {
            console.log('Adm não permitido!');
            throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)}
        
        const { senhaAtual, novaSenha } = req.body
        
        if (!reqUser) throw new ServidorError(USER_ERROR.DOESENT_EXIST)

        const senhaAtualCorreta = await bcrypt.compare(senhaAtual, reqUser.senha)

        if (!senhaAtualCorreta) throw new ServidorError(USER_ERROR.ICONRRECT_CURRENT_PASSWORD)
    
        const novaSenhaEncriptada = await bcrypt.hash(novaSenha, 8)
        await ModeloUsuario.findByIdAndUpdate(id, {senha: novaSenhaEncriptada})

        console.log('Senha alterada!');
        return res.status(204).send()
    }
}

export default new UsuarioController()