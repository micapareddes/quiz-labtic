import mongoose from "mongoose"
import ServidorError from "../ServidorError.js"
import { TOKEN_ERROR, QUIZ_ERROR } from "../constants/errorCodes.js"
import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloQuiz } from "../models/Quiz.js"

class QuizController {
    async postNewQuiz(req, res) {
        const profId = req.userId
        const prof = await ModeloUsuario.findById(profId, 'papel')
        const profInvalido = !prof || prof.papel !== 'professor'
        if (profInvalido) throw new ServidorError(TOKEN_ERROR.FORBIDDEN_ACCESS)

        const quiz = req.body
        console.log(quiz);
        
        const disciplinaId = new mongoose.Types.ObjectId(quiz.disciplina_id)
        const nomeDoQuizExiste = await ModeloQuiz.findOne({ titulo: quiz.titulo, disciplina_id: disciplinaId })
        if (nomeDoQuizExiste) throw new ServidorError(QUIZ_ERROR.NAME_ALREADY_EXIST)
        await ModeloQuiz.create(quiz)
        console.log('Novo quiz criado!')
        return res.status(204).send()
    }
}

export default new QuizController()