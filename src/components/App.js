import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Chart from './Chart'

function App() {
  return (
    <div className="container mt-5">
        <BrowserRouter>
        <Chart />
      </BrowserRouter>
    </div>
  )
}

export default App
