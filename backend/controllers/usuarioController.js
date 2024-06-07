import { USER_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import ServidorError from "../ServidorError.js"

class UsuarioController {
    async criarUsuario(req, res ) {
        const { matricula, nome, papel } = req.body
        const matriculaNoBanco = await ModeloUsuario.findOne({"matricula": matricula})

        if (matriculaNoBanco) {
            throw new ServidorError(USER_ERROR.ALREADY_EXIST)
        }

        const novoUsuario = {
            matricula,
            nome,
            papel,
        }

        const resposta = await ModeloUsuario.create(novoUsuario)
        console.log(resposta)

        return res.status(201).send()
    }

    async eliminarUsuario(req, res) {

        const matricula = {
            "matricula": req.body.matricula
        }
        const matriculaNoBanco = await ModeloUsuario.findOne(matricula)

        if (matriculaNoBanco) {
            const resposta = await ModeloUsuario.deleteOne(matricula)
            console.log(resposta)
            return res.status(204).send()
        }
        throw new ServidorError(USER_ERROR.DOESENT_EXIST)
    }

    async editarUsuario(req, res) {
        const id = req.params.id
        const atualizacoes = req.body

        if ('matricula' in atualizacoes) {
            throw new ServidorError(USER_ERROR.FORBIDDEN_EDIT_MATRICULA)
        }

        const usuario = await ModeloUsuario.findByIdAndUpdate(id, atualizacoes, { new: true })
        console.log(usuario)

        return res.status(204).send()
    }
}

export default new UsuarioController()