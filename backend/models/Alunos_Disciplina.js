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
            
}, { timestamps: true })

export const ModeloAlunos_Disciplina = model('Alunos_Disciplina', schemaAlunos_Disciplina)