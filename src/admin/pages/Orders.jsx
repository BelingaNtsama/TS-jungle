"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Download, Filter, Eye, Edit, ChevronLeft, ChevronRight } from "lucide-react"

const Orders = () => {
  const [rowData, setRowData] = useState([])
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const itemsPerPage = 5

  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD-001",
        customer: "Jean Dupont",
        email: "jean.dupont@email.com",
        date: "2024-01-15",
        amount: 299.99,
        status: "Livré",
        items: 3,
        payment: "Carte bancaire",
      },
      {
        id: "ORD-002",
        customer: "Marie Martin",
        email: "marie.martin@email.com",
        date: "2024-01-14",
        amount: 159.5,
        status: "En cours",
        items: 2,
        payment: "PayPal",
      },
      {
        id: "ORD-003",
        customer: "Pierre Durand",
        email: "pierre.durand@email.com",
        date: "2024-01-13",
        amount: 89.99,
        status: "Expédié",
        items: 1,
        payment: "Carte bancaire",
      },
      {
        id: "ORD-004",
        customer: "Sophie Leroy",
        email: "sophie.leroy@email.com",
        date: "2024-01-12",
        amount: 449.99,
        status: "Annulé",
        items: 5,
        payment: "Virement",
      },
      {
        id: "ORD-005",
        customer: "Thomas Bernard",
        email: "thomas.bernard@email.com",
        date: "2024-01-11",
        amount: 199.99,
        status: "Livré",
        items: 2,
        payment: "Carte bancaire",
      },
      {
        id: "ORD-006",
        customer: "Emma Dubois",
        email: "emma.dubois@email.com",
        date: "2024-01-10",
        amount: 599.99,
        status: "En cours",
        items: 4,
        payment: "Carte bancaire",
      },
    ]
    setRowData(mockOrders)
  }, [])

  const getStatusBadge = (status) => {
    const classes = {
      Livré: "badge badge-success",
      "En cours": "badge badge-warning",
      Expédié: "badge badge-info",
      Annulé: "badge badge-error",
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

    // Filtrage
    if (searchText) {
      filtered = rowData.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase())),
      )
    }

    // Tri
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

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const currentData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="card-title text-2xl">Gestion des commandes</h2>
              <p className="text-base-content/70">Visualisez et gérez toutes les commandes de votre boutique</p>
            </div>
          </div>

          {/* Barre d'outils */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Rechercher une commande..."
                  className="input input-bordered pl-10 w-full lg:w-80"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button className="btn btn-outline">
                <Filter className="h-4 w-4" />
                Filtres
              </button>
            </div>
            <button className="btn btn-outline">
              <Download className="h-4 w-4" />
              Exporter
            </button>
          </motion.div>

          {/* Tableau */}
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="cursor-pointer hover:bg-base-200" onClick={() => handleSort("id")}>
                    ID Commande {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="cursor-pointer hover:bg-base-200" onClick={() => handleSort("customer")}>
                    Client {sortField === "customer" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Email</th>
                  <th className="cursor-pointer hover:bg-base-200" onClick={() => handleSort("date")}>
                    Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="cursor-pointer hover:bg-base-200" onClick={() => handleSort("amount")}>
                    Montant {sortField === "amount" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Statut</th>
                  <th>Articles</th>
                  <th>Paiement</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-base-200/50"
                  >
                    <td className="font-medium">{order.id}</td>
                    <td>{order.customer}</td>
                    <td className="text-sm">{order.email}</td>
                    <td>{order.date}</td>
                    <td className="font-bold">€{order.amount.toFixed(2)}</td>
                    <td>
                      <span className={getStatusBadge(order.status)}>{order.status}</span>
                    </td>
                    <td>{order.items}</td>
                    <td>{order.payment}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-sm btn-outline btn-primary">
                          <Eye className="h-3 w-3" />
                        </button>
                        <button className="btn btn-sm btn-outline btn-secondary">
                          <Edit className="h-3 w-3" />
                        </button>
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

export default Orders
