import { ModeloUsuario } from "../models/Usuario.js"
import { ModeloDisciplina } from "../models/Disciplina.js"
import { ModeloAlunos_Disciplina } from "../models/Alunos_Disciplina.js"

class Aluno_DisciplinaController {
    async consultarRelacaoPorAluno(req, res) {
        try {
            const { aluno_id } = req.params

            const aluno = await ModeloUsuario.findById(aluno_id)
            const alunoNaoExiste = !aluno || aluno.papel !== 'aluno'

            if (alunoNaoExiste) {
                return res.status(404).json({"erro": "ID do aluno não existe no banco."})
            }

            const disciplinas = await ModeloAlunos_Disciplina.find({aluno_id}, 'disciplina_id disciplina_nome')
            const disciplinasDoAluno = { nomeAluno: aluno.nome, disciplinas }
            console.log('Nome do aluno e disciplinas enviadas!')

            return res.status(200).json(disciplinasDoAluno)

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }
    async criarRelacao(req, res) {
        try {
            const { aluno_id, disciplina_id, disciplina_nome } = req.body

            const alunoExiste = await ModeloUsuario.findById(aluno_id)
            const disciplinaExiste = await ModeloDisciplina.findById(disciplina_id)
            const alunoNaoExiste = !alunoExiste || alunoExiste.papel !== 'aluno'
            const disciplinaNaoExiste = !disciplinaExiste

            if (alunoNaoExiste) {
                return res.status(404).json({"Erro": "ID do aluno não existe no banco."})
            }
            
            if (disciplinaNaoExiste) {
                return res.status(404).json({"Erro": "ID da disciplina não existe no banco."})
            }

            if (disciplina_nome !== disciplinaExiste.nome) {
                return res.status(404).json({"Erro": "O nome informado é diferente do que consta no banco."})
            }

            const relacao = {
                aluno_id,
                disciplina_id,
                disciplina_nome
            }

            const relacaoExiste = await ModeloAlunos_Disciplina.findOne(relacao)

            if (relacaoExiste) {
                return res.status(400).json({"Erro": "A relação entre o aluno e a disciplina já existe."});
            }

            const relacaoCriada = await ModeloAlunos_Disciplina.create(relacao)

            return res.status(201).json({"Criado": "nova relacao criada"})

        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }
}

export default new Aluno_DisciplinaController()