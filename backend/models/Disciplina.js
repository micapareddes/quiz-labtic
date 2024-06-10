import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const schemaDisciplina = new Schema({
    nome: {
        type: String,
        require: true,
        trim: true,
        minlength: [3, 'O nome da disciplina deve ter pelo menos 3 caracteres.']
    },
    professor_id: {
        type: ObjectId,
        ref: 'Usuario',
    },
    quizes: [{
        quiz_id: {
            type: ObjectId,
            ref: 'Quiz',
            require: true,
        },
        nome: {
            type: String,
            require: true,
            trim: true,
            minlength: [3, 'O nome do quiz deve ter pelo menos 3 caracteres.']
        }
    }],
}, { timestamps: true })

export const ModeloDisciplina = model('Disciplina', schemaDisciplina)