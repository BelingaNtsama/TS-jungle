"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Download, Mail, Phone, Edit, ChevronLeft, ChevronRight } from "lucide-react"

const Customers = () => {
  const [rowData, setRowData] = useState([])
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const itemsPerPage = 5

  useEffect(() => {
    const mockCustomers = [
      {
        id: "CUST-001",
        name: "Jean Dupont",
        email: "jean.dupont@email.com",
        phone: "+33 6 12 34 56 78",
        city: "Paris",
        country: "France",
        totalOrders: 12,
        totalSpent: 2450.5,
        status: "VIP",
        joinDate: "2023-03-15",
        lastOrder: "2024-01-10",
      },
      {
        id: "CUST-002",
        name: "Marie Martin",
        email: "marie.martin@email.com",
        phone: "+33 6 98 76 54 32",
        city: "Lyon",
        country: "France",
        totalOrders: 8,
        totalSpent: 1200.75,
        status: "Actif",
        joinDate: "2023-06-22",
        lastOrder: "2024-01-08",
      },
      {
        id: "CUST-003",
        name: "Pierre Durand",
        email: "pierre.durand@email.com",
        phone: "+33 6 11 22 33 44",
        city: "Marseille",
        country: "France",
        totalOrders: 3,
        totalSpent: 450.25,
        status: "Actif",
        joinDate: "2023-11-10",
        lastOrder: "2024-01-05",
      },
      {
        id: "CUST-004",
        name: "Sophie Leroy",
        email: "sophie.leroy@email.com",
        phone: "+33 6 55 66 77 88",
        city: "Toulouse",
        country: "France",
        totalOrders: 25,
        totalSpent: 5200.0,
        status: "VIP",
        joinDate: "2022-08-05",
        lastOrder: "2024-01-12",
      },
      {
        id: "CUST-005",
        name: "Thomas Bernard",
        email: "thomas.bernard@email.com",
        phone: "+33 6 99 88 77 66",
        city: "Nice",
        country: "France",
        totalOrders: 1,
        totalSpent: 89.99,
        status: "Nouveau",
        joinDate: "2024-01-01",
        lastOrder: "2024-01-01",
      },
      {
        id: "CUST-006",
        name: "Emma Dubois",
        email: "emma.dubois@email.com",
        phone: "+33 6 44 55 66 77",
        city: "Bordeaux",
        country: "France",
        totalOrders: 0,
        totalSpent: 0,
        status: "Inactif",
        joinDate: "2023-09-15",
        lastOrder: null,
      },
    ]
    setRowData(mockCustomers)
  }, [])

  const getStatusBadge = (status) => {
    const classes = {
      VIP: "badge badge-secondary",
      Actif: "badge badge-success",
      Nouveau: "badge badge-info",
      Inactif: "badge badge-ghost",
    }
    return classes[status] || "badge badge-ghost"
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let filtered = rowData

    if (searchText) {
      filtered = rowData.filter((row) =>
        Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())),
      )
    }

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]

        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (sortDirection === "asc") {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })
    }

    return filtered
  }, [rowData, searchText, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const currentData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="card-title text-2xl">Gestion des clients</h2>
              <p className="text-base-content/70">Gérez votre base de clients et analysez leur comportement d'achat</p>
            </div>
          </div>

          {/* Barre d'outils */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  className="input input-bordered pl-10 w-full lg:w-80"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline">
                <Download className="h-4 w-4" />
                Exporter
              </button>
              <button className="btn btn-primary">
                <Plus className="h-4 w-4" />
                Nouveau client
              </button>
            </div>
          </motion.div>

          {/* Statistiques rapides */}
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6" variants={itemVariants}>
            <div className="stat bg-primary/10 rounded-lg">
              <div className="stat-value text-primary">{rowData.length}</div>
              <div className="stat-title">Total clients</div>
            </div>
            <div className="stat bg-secondary/10 rounded-lg">
              <div className="stat-value text-secondary">{rowData.filter((c) => c.status === "VIP").length}</div>
              <div className="stat-title">Clients VIP</div>
            </div>
            <div className="stat bg-success/10 rounded-lg">
              <div className="stat-value text-success">{rowData.filter((c) => c.status === "Actif").length}</div>
              <div className="stat-title">Clients actifs</div>
            </div>
            <div className="stat bg-warning/10 rounded-lg">
              <div className="stat-value text-warning">
                €{rowData.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(0)}
              </div>
              <div className="stat-title">CA total</div>
            </div>
          </motion.div>

          {/* Tableau */}
          <motion.div className="overflow-x-auto" variants={itemVariants}>
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} className="cursor-pointer hover:bg-base-200">
                    ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("name")} className="cursor-pointer hover:bg-base-200">
                    Nom {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Ville</th>
                  <th onClick={() => handleSort("totalOrders")} className="cursor-pointer hover:bg-base-200">
                    Commandes {sortField === "totalOrders" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("totalSpent")} className="cursor-pointer hover:bg-base-200">
                    Total dépensé {sortField === "totalSpent" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Statut</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-base-200/50"
                  >
                    <td className="font-medium">{customer.id}</td>
                    <td className="font-medium">{customer.name}</td>
                    <td className="text-sm">{customer.email}</td>
                    <td className="text-sm">{customer.phone}</td>
                    <td>{customer.city}</td>
                    <td>{customer.totalOrders}</td>
                    <td className="font-bold">€{customer.totalSpent.toFixed(2)}</td>
                    <td>
                      <span className={getStatusBadge(customer.status)}>{customer.status}</span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-sm btn-outline btn-primary" title="Envoyer un email">
                          <Mail className="h-3 w-3" />
                        </button>
                        <button className="btn btn-sm btn-outline btn-success" title="Appeler">
                          <Phone className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-sm btn-outline btn-primary">
                          <Edit className="h-3 w-3" />
                        </button>
                        <button className="btn btn-sm btn-outline">Voir</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-base-content/70">
              Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} sur {filteredAndSortedData.length}{" "}
              résultats
            </div>
            <div className="join">
              <button
                className="join-item btn btn-sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`join-item btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item btn btn-sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Customers
