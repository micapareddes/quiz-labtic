import { Schema, model } from 'mongoose'
import validator from 'validator'

const schemaUsuario = new Schema({
    matricula: {
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'A matrícula deve ter exatamente 6 dígitos!'],
        maxlength: [6, 'A matrícula deve ter exatamente 6 dígitos!']
    }, 
    nome: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'O nome deve ter pelo menos 2 caracteres!']
    },
    papel: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'aluno', 'professor'],
            message: 'O papel deve ser admin, aluno ou professor!'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v)
            },
            message: props => `${props.value} não é um email válido!`
        }
    },
    senha: {
        type: String,
        required: true,
        minlength: [6, 'A senha deve ter pelo menos 6 caracteres!']
    }
}, { timestamps: true })

export const ModeloUsuario =  model('Usuario', schemaUsuario)