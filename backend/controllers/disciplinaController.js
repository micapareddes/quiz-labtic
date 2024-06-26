import mongoose from "mongoose"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import ServidorError from "../ServidorError.js"
import { DISCIPLINA_ERROR, TOKEN_ERROR, USER_ERROR } from "../constants/errorCodes.js"


class DisciplinaController {
    async consultarDisciplinasPorProfessor(req, res) {
        const profId = req.userId

        const professor = await ModeloUsuario.findById(profId)
        const profNaoExiste = !professor || professor.papel !== 'professor'

        if (profNaoExiste) {
            throw new ServidorError(USER_ERROR.DOESNT_EXIST)
        }

        const disciplinas = await ModeloDisciplina.find({professor_id: profId}, 'disciplina_id nome')
        const disciplinasDoProfessor = { nome: professor.nome, disciplinas }
        console.log(disciplinasDoProfessor);

        return res.status(200).json(disciplinasDoProfessor)
    }

    async listarDisciplinasCadastradas(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'

        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const disciplinasCadastradas = await ModeloDisciplina.find({}).populate('professor_id', 'nome')

        console.log(disciplinasCadastradas);
        return res.status(200).json({ disciplinasCadastradas })
    }

    async criarDisciplina(req, res) {
        const adminId = req.userId

        const admin = await ModeloUsuario.findById(adminId)
        const adminInvalido = !admin || admin.papel !== 'admin'

        if (adminInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const { nome, professor_id } = req.body

        if (nome.length < 3) throw new ServidorError(DISCIPLINA_ERROR.INVALID_NAME)

        const disciplinaExiste = await ModeloDisciplina.findOne({nome: nome})

        if (disciplinaExiste) throw new ServidorError(DISCIPLINA_ERROR.ALREADY_EXIST)

        let novaDisciplina = { nome }

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

    async editarDisciplina(req, res) {

    }

    async eliminarDisciplina(req, res) {
    }
}

export default new DisciplinaController()