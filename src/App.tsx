import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Maquinas } from './pages/Machines'
import { MachineDetail } from './pages/MachineDetail'
import { QuemSomos } from './pages/QuemSomos'
import { Produtos } from './pages/Produtos'
import { Solucoes } from './pages/Solucoes'
import { Contato } from './pages/Contato'
import { UIPlaygroundPage } from './ui-playground/UIPlaygroundPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/maquinas" element={<Maquinas />} />
          <Route path="/maquinas/:slug" element={<MachineDetail />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/ui" element={<UIPlaygroundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
