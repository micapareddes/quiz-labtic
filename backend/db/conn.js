import mongoose  from 'mongoose'

export async function banco() {
    try {
        await mongoose.connect("mongodb://localhost:27017/quiz-database")
        console.log('Conectado com o banco pelo mongoose!')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}