import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const schemaAlunos_Disciplina = new Schema({
    aluno_id: {
        type: ObjectId,
        ref: 'Usuario',
        require: true,
    },
    disciplina_id: {
        type: ObjectId,
        ref: 'Disciplina',
        require: true,
    },
    disciplina_nome: {
        type: String,
        require: true,
        trim: true,
        minlength: [3, 'O nome da disciplina deve ter pelo menos 3 caracteres.']
    }
            
}, { timestamps: true })

export const ModeloAlunos_Disciplina = model('Alunos_Disciplina', schemaAlunos_Disciplina)