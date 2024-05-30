import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import { ModeloUsuario_Disciplina } from "../models/Usuario_Disciplina.js"

class Usuario_DisciplinaController {
    async criarRelacaoInternamente(usuario_id, disciplina_id) {
        const relacao = {
            usuario_id,
            disciplina_id
        }

        const relacaoExiste = await ModeloUsuario_Disciplina.findOne(relacao)
        if (relacaoExiste) {
            console.log("Relação já existe!")
            return res.status(400).json({"Erro": "A relação entre o usuário e a disciplina já existe."});
        }

        await ModeloUsuario_Disciplina.create(relacao)
    }

    async criarRelacao(req, res) {
        try {
            const { usuario_id, disciplina_id } = req.body

            const usuarioExiste = await ModeloUsuario.findById(usuario_id)
            const disciplinaExiste = await ModeloDisciplina.findById(disciplina_id)
            const usuarioNaoExiste = !usuarioExiste
            const disciplinaNaoExiste = !disciplinaExiste

            if (usuarioNaoExiste) {
                return res.status(404).json({"Erro": "ID do usuario não existe no banco."})
            }
            
            if (disciplinaNaoExiste) {
                return res.status(404).json({"Erro": "ID da disciplina não existe no banco."})
            }

            const relacao = {
                usuario_id,
                disciplina_id
            }

            const relacaoExiste = await ModeloUsuario_Disciplina.findOne(relacao)

            if (relacaoExiste) {
                return res.status(400).json({"Erro": "A relação entre o usuário e a disciplina já existe."});
            }

            const relacaoCriada = await ModeloUsuario_Disciplina.create(relacao)
            console.log(relacaoCriada)

            return res.status(201).json({"Criado": "nova relacao criada"})

        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }
}

export default new Usuario_DisciplinaController()