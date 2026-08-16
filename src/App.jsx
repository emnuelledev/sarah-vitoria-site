import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Acompanhamento from './pages/Acompanhamento'
import Conteudos from './pages/Conteudos'
import Artigo from './pages/Artigo'
import Agendamento from './pages/Agendamento'
import Privacidade from './pages/Privacidade'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/acompanhamento" element={<Acompanhamento />} />
        <Route path="/conteudos" element={<Conteudos />} />
        <Route path="/conteudos/:id" element={<Artigo />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
