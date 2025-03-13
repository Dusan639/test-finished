import React from 'react'
import { ToastContainer } from 'react-toastify'
//COMPONENTS
import TableLayout from '../components/Table/TableLayout'

const Homepage = () => {
  return (
    <>
      <main className="wrapper">
        <section id="table-section">
          <h1>Users list</h1>
          <TableLayout />
        </section>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Homepage
