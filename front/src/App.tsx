import React, { useMemo } from 'react'
import { useState } from 'react'
import './App.css'
import Create from './pages/Create'
import Edit from './pages/Edit'
import Home from './pages/Home'


function App() {
  const [page, setPage] = useState<"home" | "edit" | "create" | string>("home")

  const renderPage = useMemo(() => {
    switch (page) {
      case "edit":
        return <Edit setPage={setPage} />

      case "create":
        return <Create setPage={setPage} />

      default:
        return <Home setPage={setPage} />
    }
  }, [page])


  return (
    <>
      {renderPage}
    </>
  )
}

export default App
