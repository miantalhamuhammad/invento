import {
    DownloadIcon,
    PencilIcon,
    SearchIcon,
    TrashIcon,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import { Input } from "../../../components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { useState, useMemo } from "react";
import PropTypes from "prop-types";

export const ProductListSection = ({ products = [], onDelete, searchTerm, onSearchChange, isLoading }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter products based on search term
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products.filter(product =>
            product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.barcode_number?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // Paginate products
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedProducts(paginatedProducts.map(product => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId, checked) => {
        if (checked) {
            setSelectedProducts(prev => [...prev, productId]);
        } else {
            setSelectedProducts(prev => prev.filter(id => id !== productId));
        }
    };

    const isAllSelected = paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length;
    const isIndeterminate = selectedProducts.length > 0 && selectedProducts.length < paginatedProducts.length;

    if (isLoading) {
        return (
            <div className="px-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-center items-center h-64">
                            <div className="text-lg">Loading products...</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="px-8">
            <Card>
                <CardContent className="p-6">
                    {/* Search and Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex items-center gap-2">
                                <DownloadIcon className="w-4 h-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={handleSelectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>SKU Code</TableHead>
                                    <TableHead>Barcode</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Purchase Price</TableHead>
                                    <TableHead>Selling Price</TableHead>
                                    <TableHead>Weight</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedProducts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-8">
                                            {searchTerm ? "No products found matching your search." : "No products found."}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedProducts.includes(product.id)}
                                                    onCheckedChange={(checked) => handleSelectProduct(product.id, checked)}
                                                    onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage src="/placeholder-product.png" />
                                                        <AvatarFallback>
                                                            {product.product_name?.charAt(0) || 'P'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{product.product_name}</div>
                                                        <div className="text-sm text-gray-500">{product.description}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{product.sku_code}</TableCell>
                                            <TableCell>{product.barcode_number || '-'}</TableCell>
                                            <TableCell>{product.category_name || '-'}</TableCell>
                                            <TableCell>${product.purchasing_price || product.purchase_price || 0}</TableCell>
                                            <TableCell>${product.selling_price || 0}</TableCell>
                                            <TableCell>{product.weight ? `${product.weight} ${product.weight_unit}` : '-'}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <PencilIcon className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onDelete(product.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className={currentPage === page ? "bg-[#6840c6] hover:bg-[#5a38b0]" : ""}
                                    >
                                        {page}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

ProductListSection.propTypes = {
    products: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};
