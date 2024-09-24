import mongoose  from 'mongoose'

export async function banco() {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Conectado com o banco pelo mongoose!')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}