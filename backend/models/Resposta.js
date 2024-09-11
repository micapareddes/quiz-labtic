import { Schema, model, mongoose } from "mongoose";
import { ModeloUsuario } from "./Usuario.js";

const schemaResposta_Pergunta = new Schema({
    pergunta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz.perguntas',
        required: true,     
    },
    alternativa_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz.perguntas.alternativas',
        required: false,    
    }
})
const schemaResposta = new Schema({
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true, 
    },    
    aluno_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true, 
        validate: {
            validator: async function(value) {
                const usuario = await ModeloUsuario.findById(value);
                return usuario && usuario.papel === 'aluno';
            },
            message: 'O aluno_id deve referenciar um usuário com papel igual a "aluno".'
        }
    },
    nota: {
        type: Number,
        required: false,
    },
    respostas_perguntas: [schemaResposta_Pergunta]
})

export const ModeloResposta = model('Resposta', schemaResposta)