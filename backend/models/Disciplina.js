import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const schemaDisciplina = new Schema({
    nome: {
        type: String,
        require: true,
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
        }
    }],
}, { timestamps: true })

export const ModeloDisciplina = model('Disciplina', schemaDisciplina)