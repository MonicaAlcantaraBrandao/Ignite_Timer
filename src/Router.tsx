import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}

// Route sempre entre Routes, e SEMPRE passar o path que é o link de cada element, element é a página que o link vai levar.

// sempre exportar a function Router para utilizar no App.

// Para utilizar o DefaultLayout que no caso é a junção do cabeçalho com uma página específica temos que colocar um <Route> </Route> entre toda a aplicação de Rotas e colocar o DefaultLayout como element, como feito acima.
