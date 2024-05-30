import { Schema, model } from 'mongoose'

const schemaUsuario = new Schema({
    matricula: {
        type: String,
        require: true,
        minlength: [6, 'A matrícula deve ter exatamente 6 dígitos.'],
        maxlength: [6, 'A matrícula deve ter exatamente 6 dígitos.']
    }, 
    nome: {
        type: String,
        require: true,
    },
    papel: {
        type: String,
        require: true,
        enum: {
            values: ['admin', 'aluno', 'professor'],
            message: 'O papel deve ser admin, aluno ou professor.'
        } //apenas aceita uma dessas strings como valor
    },
}, { timestamps: true })

export const ModeloUsuario =  model('Usuario', schemaUsuario)