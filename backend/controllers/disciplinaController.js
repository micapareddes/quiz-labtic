import mongoose from "mongoose"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import ServidorError from "../ServidorError.js"
import { DISCIPLINA_ERROR, USER_ERROR } from "../constants/errorCodes.js"


class DisciplinaController {
    async consultarDisciplina(req, res) {
    }

    async criarDisciplina(req, res) {
        const { nome, professor_id } = req.body

        const disciplinaExiste = await ModeloDisciplina.findOne({nome: nome})

        if (disciplinaExiste) {
            console.log('Disciplina existe!')
            throw new ServidorError(DISCIPLINA_ERROR.ALREADY_EXIST)
        }

        let novaDisciplina

        if (professor_id) {
            const idInvalido = !mongoose.Types.ObjectId.isValid(professor_id)
            if (idInvalido) {
                console.log('ID inválido!')
                throw new ServidorError(USER_ERROR.INVALID_ID)
            }
    
            const professor = await ModeloUsuario.findById(professor_id)
            const professorNaoExiste = !professor || professor.papel !== 'professor'
            if (professorNaoExiste) {
                console.log('Professor não existe!')
                throw new ServidorError(USER_ERROR.DOESENT_EXIST)
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
    }

    async editarDisciplina(req, res) {

    }

    async eliminarDisciplina(req, res) {
    }
}

export default new DisciplinaController()