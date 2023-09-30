import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Table from './Table'
import Pagination from './Pagination';

const ExistingClient = () => {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [clientPerPage] = useState(5)
  const searchValue = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:3500/clients').then(res => {
      setClients(res.data)
      setFilteredClients(res.data)
      setLoading(false)
    })
  }, [])

  const indexOfLastClient = currentPage * clientPerPage
  const indexOfFirstClient = indexOfLastClient - clientPerPage
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient)

  const handleSearch = (e) => {
    e.preventDefault()
    const clientsMatched = clients.filter(client => client.firstName === searchValue.current.value)
    if (clientsMatched.length !== 0) {
      setFilteredClients(clientsMatched)
    } else {
      setFilteredClients(clients)
    }
    searchValue.current.value = ""
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <Table clients={currentClients} loading={loading}/>
      <Pagination currentPage={currentPage} userPerPage={clientPerPage} totalUser={filteredClients.length} paginate={paginate}/>
      <form onSubmit={handleSearch} className='mt-10'>
        <label htmlFor="searchInput" className='m-3 text-lg'>Search</label>
        <input ref={searchValue} id='searchInput' type="text" placeholder='Last Name' className='text-lg rounded-md p-2 text-black focus:outline-none'/>
      </form>
    </div>
  )
}

export default ExistingClient