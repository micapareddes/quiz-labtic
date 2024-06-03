import mongoose from "mongoose"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"

class DisciplinaController {
    async criarDisciplina(req, res) {
        try {
            const { nome, professor_id } = req.body

            let novaDisciplina

            if (professor_id) {
                const idInvalido = !mongoose.Types.ObjectId.isValid(professor_id)
                if (idInvalido) {
                    console.log('ID inválido!')
                    return res.status(400).json({ error: 'ID do professor inválido.' });
                }
    
                const professor = await ModeloUsuario.findById(professor_id)
                const professorNaoExiste = !professor || professor.papel !== 'professor'
                if (professorNaoExiste) {
                    console.log('Professor não existe!')
                    return res.status(404).json({'Erro': 'Professor não existe!'})
                }
                novaDisciplina = {
                    nome,
                    professor_id
                }
            }

            novaDisciplina = { nome }
            
            await ModeloDisciplina.create(novaDisciplina)
            console.log('Nova disciplina criada!')
            return res.status(201).send()

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
        
    }

    async editarDisciplina(req, res) {

    }

    async eliminarDisciplina(req, res) {
    }
}

export default new DisciplinaController()