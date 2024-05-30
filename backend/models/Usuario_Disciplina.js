import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const schemaUsuario_Disciplina = new Schema({
    usuario_id: {
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

export const ModeloUsuario_Disciplina = model('Usuario_Disciplina', schemaUsuario_Disciplina)