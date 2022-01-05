import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromisse from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    produto: 'Livro',
    lanceInicial: 50,
    descricao: 'Sinopse do livro'
  },
  {
    produto: 'Outro Livro',
    lanceInicial: 70,
    descricao: 'Sinopse do Outro livro'
  }
]

describe('Um avaliador que se conecta com a API', () => {
  test('Mostra todos os leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromisse()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('Não há leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromisse()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
