import mongoose from "mongoose"
import { ModeloUsuario } from "../models/Usuario.js"

class UsuarioController {
    async criarUsuario(req, res ) {
        try {
            const { matricula, nome, papel } = req.body
            const matriculaNoBanco = await ModeloUsuario.findOne({"matricula": matricula})

            if (matriculaNoBanco) {
                return res.status(409).json({'Matricula já cadastrada': `${matricula} já existe.`})
            }

            const novoUsuario = {
                matricula,
                nome,
                papel,
            }

            const resposta = await ModeloUsuario.create(novoUsuario)
            console.log(resposta)

            return res.status(201).send()

        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError){
                return res.status(400).json({'Erro de validação': `${error.message}`})
            }
            return res.status(500).json({'Erro': `${error.message}`})
        }
    }

    async eliminarUsuario(req, res) {
        try {
            const matricula = {
                "matricula": req.body.matricula
            }
            const matriculaNoBanco = await ModeloUsuario.findOne(matricula)

            if (matriculaNoBanco) {
                const resposta = await ModeloUsuario.deleteOne(matricula)
                console.log(resposta)
                return res.status(204).send()
            }
            return res.status(404).json({'Erro': 'Não é possivel eliminar a matricula pois ela não existe.'})

        } catch (error) {
            return res.status(500).json({'Erro': `${error.message}`})
        }
    }

    async editarUsuario(req, res) {
        try {
            const id = req.params.id
            const atualizacoes = req.body

            if ('matricula' in atualizacoes) {
                return res.status(403).json({'Proibido': 'Não é permitido editar uma matricula'})
            }

            const usuario = await ModeloUsuario.findByIdAndUpdate(id, atualizacoes, { new: true })
            console.log(usuario)

            return res.status(204).send()

        } catch (error) {
            return res.status(500).json({'Erro': `${error.message}`})
        }
    }
}

export default new UsuarioController()