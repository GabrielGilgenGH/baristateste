import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Maquinas } from './pages/Machines'
import { QuemSomos } from './pages/QuemSomos'
import { Produtos } from './pages/Produtos'
import { Solucoes } from './pages/Solucoes'
import { Contato } from './pages/Contato'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/maquinas" element={<Maquinas />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
