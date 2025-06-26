import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Download, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { ProductModal } from "@/admin/components/product-modal"
import { DeleteConfirmModal } from "@/admin/components/delete-confirm-modal"
import { ToastContainer } from "@/admin/components/toast-notification"
import { useToast } from "@/admin/hooks/toast"

const Products = () => {
  const [rowData, setRowData] = useState([])
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const itemsPerPage = 5
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const { toasts, removeToast, success, error } = useToast()

  useEffect(() => {
    const mockProducts = [
      {
        id: "PROD-001",
        name: "iPhone 15 Pro",
        category: "Électronique",
        price: 1199.99,
        stock: 25,
        status: "Actif",
        sku: "IPH15PRO-256",
        description: "Smartphone Apple dernière génération",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "PROD-002",
        name: "MacBook Air M2",
        category: "Électronique",
        price: 1499.99,
        stock: 12,
        status: "Actif",
        sku: "MBA-M2-512",
        description: "Ordinateur portable Apple",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "PROD-003",
        name: "T-shirt Nike",
        category: "Vêtements",
        price: 29.99,
        stock: 150,
        status: "Actif",
        sku: "NIKE-TSH-001",
        description: "T-shirt de sport Nike",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "PROD-004",
        name: "Casque Sony WH-1000XM4",
        category: "Électronique",
        price: 299.99,
        stock: 0,
        status: "Rupture",
        sku: "SONY-WH1000XM4",
        description: "Casque audio sans fil avec réduction de bruit",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "PROD-005",
        name: "Chaise de bureau",
        category: "Mobilier",
        price: 199.99,
        stock: 8,
        status: "Actif",
        sku: "CHAIR-OFF-001",
        description: "Chaise ergonomique pour bureau",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "PROD-006",
        name: "Livre JavaScript",
        category: "Livres",
        price: 39.99,
        stock: 45,
        status: "Inactif",
        sku: "BOOK-JS-2024",
        description: "Guide complet JavaScript 2024",
        image: "/placeholder.svg?height=200&width=200",
      },
    ]
    setRowData(mockProducts)
  }, [])

  const getStatusBadge = (status) => {
    const classes = {
      Actif: "badge badge-success",
      Inactif: "badge badge-ghost",
      Rupture: "badge badge-error",
    }
    return classes[status] || "badge badge-ghost"
  }

  const getStockColor = (stock) => {
    if (stock === 0) return "text-error font-bold"
    if (stock < 10) return "text-warning font-bold"
    return "text-success font-bold"
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setShowModal(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleDeleteProduct = (product) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = (productId) => {
    setRowData((prev) => prev.filter((p) => p.id !== productId))
    const deletedProduct = rowData.find((p) => p.id === productId)
    success("Produit supprimé", `${deletedProduct?.name} a été supprimé avec succès`)
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  const handleSaveProduct = (productData) => {
    if (selectedProduct) {
      // Modifier le produit existant
      setRowData((prev) => prev.map((p) => (p.id === productData.id ? productData : p)))
      success("Produit modifié", `${productData.name} a été modifié avec succès`)
    } else {
      // Ajouter un nouveau produit
      setRowData((prev) => [productData, ...prev])
      success("Produit ajouté", `${productData.name} a été ajouté avec succès`)
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let filtered = rowData

    if (searchText) {
      filtered = rowData.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase())),
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

  const ActionRenderer = ({ product }) => {
    return (
      <div className="flex gap-1">
        <button className="btn btn-sm btn-outline btn-primary" onClick={() => handleEditProduct(product)}>
          <Edit className="h-3 w-3" />
        </button>
        <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDeleteProduct(product)}>
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    )
  }

  return (
    <>
      <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h2 className="card-title text-2xl">Gestion des produits</h2>
                <p className="text-base-content/70">Gérez votre catalogue de produits, stocks et prix</p>
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
                    placeholder="Rechercher un produit..."
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
                <button className="btn btn-primary" onClick={handleAddProduct}>
                  <Plus className="h-4 w-4" />
                  Nouveau produit
                </button>
              </div>
            </motion.div>

            {/* Statistiques rapides */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6" variants={itemVariants}>
              <div className="stat bg-primary/10 rounded-lg">
                <div className="stat-value text-primary">{rowData.length}</div>
                <div className="stat-title">Total produits</div>
              </div>
              <div className="stat bg-success/10 rounded-lg">
                <div className="stat-value text-success">{rowData.filter((p) => p.status === "Actif").length}</div>
                <div className="stat-title">Produits actifs</div>
              </div>
              <div className="stat bg-error/10 rounded-lg">
                <div className="stat-value text-error">{rowData.filter((p) => p.stock === 0).length}</div>
                <div className="stat-title">Ruptures de stock</div>
              </div>
              <div className="stat bg-warning/10 rounded-lg">
                <div className="stat-value text-warning">
                  {rowData.filter((p) => p.stock > 0 && p.stock < 10).length}
                </div>
                <div className="stat-title">Stock faible</div>
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
                    <th onClick={() => handleSort("category")} className="cursor-pointer hover:bg-base-200">
                      Catégorie {sortField === "category" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("price")} className="cursor-pointer hover:bg-base-200">
                      Prix {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("stock")} className="cursor-pointer hover:bg-base-200">
                      Stock {sortField === "stock" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th>Statut</th>
                    <th>SKU</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-base-200/50"
                    >
                      <td className="font-medium">{product.id}</td>
                      <td className="font-medium">{product.name}</td>
                      <td>{product.category}</td>
                      <td className="font-bold">€{product.price.toFixed(2)}</td>
                      <td className={getStockColor(product.stock)}>{product.stock}</td>
                      <td>
                        <span className={getStatusBadge(product.status)}>{product.status}</span>
                      </td>
                      <td className="text-sm">{product.sku}</td>
                      <td>
                        <ActionRenderer product={product} />
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

      {/* Modales */}
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        product={productToDelete}
        onDelete={handleConfirmDelete}
      />

      {/* Notifications Toast */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  )
}

export default Products
