// import {
//     ArrowLeftIcon,
//     ArrowRightIcon,
//     DownloadIcon,
//     PencilIcon,
//     SearchIcon,
//     TrashIcon,
// } from "lucide-react";
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "../../../components/ui/avatar";
// import { Button } from "../../../components/ui/button";
// import { Card, CardContent } from "../../../components/ui/card";
// import { Checkbox } from "../../../components/ui/checkbox";
// import { Input } from "../../../components/ui/input";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "../../../components/ui/pagination";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../../../components/ui/table";
// import { useState } from "react";
//
// export const ProductListSection = () => {
//     // Product data for mapping
//     const products = [
//         {
//             name: "Droned Vape",
//             avatar: "/avatar-4.svg",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "Traditional Vapes",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//         {
//             name: "Crosscut E-Cig",
//             avatar: "/avatar-5.svg",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "E-Cigarettes",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//         {
//             name: "Cultyvate",
//             avatar: "/avatar-1.svg",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "Edibles",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//         {
//             name: "Demi High",
//             avatar: "/avatar-3.svg",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "Traditional Vapes",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//         {
//             name: "Candice Wu",
//             initials: "CW",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "Edibles",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//         {
//             name: "Natali Craig",
//             avatar: "/avatar-2.svg",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "E-Cigarettes",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//         {
//             name: "Drew Cano",
//             avatar: "/avatar-6.svg",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "Edibles",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//         {
//             name: "Orlando Diggs",
//             initials: "OD",
//             productId: "TUX001234",
//             supplierId: "REMA0123",
//             category: "E-Cigarettes",
//             price: "$4500",
//             weight: "3 lb",
//             stockLevel: "12000",
//             recLevel: "15000",
//         },
//     ];
//
//     // Pagination data
//     const paginationItems = [1, 2, 3, "...", 8, 9, 10];
//     const [isChecked, setIsChecked] = useState(false);
//
//     return (
//         <section className="w-full py-4">
//             <Card className="border border-[#eaecf0] shadow-shadow-md rounded-lg overflow-hidden">
//                 <CardContent className="p-0">
//                     <div className="flex justify-between items-center p-6 pb-4">
//                         <div className="w-[252px]">
//                             <div className="relative">
//                                 <SearchIcon className="absolute left-3.5 top-2.5 h-5 w-5 text-[#667084]" />
//                                 <Input
//                                     className="pl-10 py-2.5 border-[#cfd4dc] text-[#667084]"
//                                     placeholder="Search"
//                                 />
//                             </div>
//                         </div>
//                         <Button
//                             className="bg-[#6840c6] hover:bg-[#6840c6]/90 text-white gap-2"
//                             size="default"
//                         >
//                             <DownloadIcon className="h-5 w-5" />
//                             Export
//                         </Button>
//                     </div>
//
//                     <Table>
//                         <TableHeader className="bg-[#f8f9fb]">
//                             <TableRow className="border-b border-[#eaecf0]">
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex items-center gap-1">Product Name</div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex items-center gap-1">Product ID</div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex items-center gap-1">Supplier ID</div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex items-center gap-1">Category</div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex items-center gap-1">Price</div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex items-center gap-1">Weight</div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex flex-col h-6">
//                     <span className="text-xs font-medium text-[#667084] leading-3">
//                       Stock Level
//                     </span>
//                                         <span className="text-xs font-medium text-[#667084] leading-3">
//                       (in units)
//                     </span>
//                                     </div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex flex-col h-6">
//                     <span className="text-xs font-medium text-[#667084] leading-3">
//                       Rec. Level
//                     </span>
//                                         <span className="text-xs font-medium text-[#667084] leading-3">
//                       (in units)
//                     </span>
//                                     </div>
//                                 </TableHead>
//                                 <TableHead className="h-11 px-6 py-3 text-xs font-medium text-[#667084]">
//                                     <div className="flex items-center gap-1">Actions</div>
//                                 </TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {products.map((product, index) => (
//                                 <TableRow key={index} className="border-b border-[#eaecf0]">
//                                     <TableCell className="h-[72px] px-6 py-4">
//                                         <div className="flex items-center gap-3">
//                                             <Checkbox className="h-5 w-5 rounded-md border-[#cfd4dc]"
//                                                       checked={isChecked}
//                                                       onChange={e => setIsChecked(e.target.checked)}
//
//                                             />
//                                             {product.avatar ? (
//                                                 <Avatar className="h-10 w-10">
//                                                     <AvatarImage
//                                                         src={product.avatar}
//                                                         alt={product.name}
//                                                     />
//                                                     <AvatarFallback>{product.initials}</AvatarFallback>
//                                                 </Avatar>
//                                             ) : (
//                                                 <Avatar className="h-10 w-10 bg-[#f8f9fb]">
//                                                     <AvatarFallback className="text-[#475466]">
//                                                         {product.initials}
//                                                     </AvatarFallback>
//                                                 </Avatar>
//                                             )}
//                                             <div className="font-medium text-[#0f1728] text-sm">
//                                                 {product.name}
//                                             </div>
//                                         </div>
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4 text-sm text-[#667085]">
//                                         {product.productId}
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4">
//                     <span className="text-[#667084] font-bold text-sm leading-5 underline">
//                       {product.supplierId}
//                     </span>
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4">
//                     <span className="text-[#667084] font-bold text-sm leading-5 underline">
//                       {product.category}
//                     </span>
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4 text-sm text-[#667084]">
//                                         {product.price}
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4 text-sm text-[#667084]">
//                                         {product.weight}
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4 text-sm text-[#667084]">
//                                         {product.stockLevel}
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4 text-sm text-[#667084]">
//                                         {product.recLevel}
//                                     </TableCell>
//                                     <TableCell className="h-[72px] px-6 py-4">
//                                         <div className="flex space-x-2">
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 className="h-8 w-8 text-[#667084]"
//                                             >
//                                                 <PencilIcon className="h-4 w-4" />
//                                             </Button>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 className="h-8 w-8 text-[#667084]"
//                                             >
//                                                 <TrashIcon className="h-4 w-4" />
//                                             </Button>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//
//                     <div className="border-t border-[#eaecf0] py-4 px-6 flex justify-between items-center">
//                         <Pagination>
//                             <PaginationContent>
//                                 <PaginationItem>
//                                     <PaginationPrevious
//                                         href="#"
//                                         className="flex items-center gap-2 border border-[#cfd4dc] rounded-lg shadow-[0px_1px_2px_#1018280d]"
//                                     >
//                                         <ArrowLeftIcon className="h-5 w-5" />
//                                         <span className="text-sm font-medium text-[#344053]">
//                       Previous
//                     </span>
//                                     </PaginationPrevious>
//                                 </PaginationItem>
//                             </PaginationContent>
//                         </Pagination>
//
//                         <div className="flex gap-0.5">
//                             {paginationItems.map((item, index) => (
//                                 <PaginationItem key={index}>
//                                     <PaginationLink
//                                         href="#"
//                                         className={`w-10 h-10 flex items-center justify-center rounded-lg ${
//                                             item === 1
//                                                 ? "bg-[#f9f5ff] text-[#6840c6]"
//                                                 : "text-[#667084]"
//                                         }`}
//                                     >
//                                         {item}
//                                     </PaginationLink>
//                                 </PaginationItem>
//                             ))}
//                         </div>
//
//                         <Pagination>
//                             <PaginationContent>
//                                 <PaginationItem>
//                                     <PaginationNext
//                                         href="#"
//                                         className="flex items-center gap-2 border border-[#cfd4dc] rounded-lg shadow-[0px_1px_2px_#1018280d]"
//                                     >
//                     <span className="text-sm font-medium text-[#344053]">
//                       Next
//                     </span>
//                                         <ArrowRightIcon className="h-5 w-5" />
//                                     </PaginationNext>
//                                 </PaginationItem>
//                             </PaginationContent>
//                         </Pagination>
//                     </div>
//                 </CardContent>
//             </Card>
//         </section>
//     );
// };

import {
    Search,
    ArrowLeft,
    ArrowRight,
    Download,
    Pencil,
    Trash2,
    Plus,
    Filter,
    Eye,
} from "lucide-react";

export const ProductListSection = () => {
    const products = [
        {
            name: "Droned Vape",
            avatar: "/avatar-4.svg",
            productId: "TUX001234",
            supplierId: "REMA0123",
            category: "Traditional Vapes",
            price: "$4500",
            weight: "3 lb",
            stockLevel: "12000",
            recLevel: "15000",
        },
        {
            name: "Crosscut E-Cig",
            avatar: "/avatar-5.svg",
            productId: "TUX001234",
            supplierId: "REMA0123",
            category: "E-Cigarettes",
            price: "$4500",
            weight: "3 lb",
            stockLevel: "12000",
            recLevel: "15000",
        },
        {
            name: "Cultyvate",
            avatar: "/avatar-1.svg",
            productId: "TUX001234",
            supplierId: "REMA0123",
            category: "Edibles",
            price: "$4500",
            weight: "3 lb",
            stockLevel: "12000",
            recLevel: "15000",
        },
    ];

    const paginationItems = [1, 2, 3, "...", 8, 9, 10];

    return (
        <div className="border rounded-lg shadow-sm bg-white">
            {/* Header: Search, Filter, Add, Export */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98a2b3]" />
                        <input
                            placeholder="Search"
                            className="pl-9 w-64 rounded-lg border border-[#d0d5dd] h-9"
                        />
                    </div>
                    <button className="h-9 px-4 rounded border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </button>
                </div>
                <div className="flex gap-3">
                    <button className="h-9 px-4 rounded border bg-white text-[#344054] border-[#d0d5dd] hover:bg-[#f9fafb] flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Product
                    </button>
                    <button className="h-9 px-4 rounded bg-[#6840c6] text-white hover:bg-[#7f56d9] flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </button>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead>
                <tr className="bg-[#f9fafb] text-left border-b">
                    <th className="p-4">
                        <input type="checkbox" />
                    </th>
                    <th>Product Name</th>
                    <th>Product ID</th>
                    <th>Supplier ID</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Stock Level</th>
                    <th>Rec. Level</th>
                    <th className="text-right pr-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                        <td className="p-4">
                            <input type="checkbox" />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.productId}</td>
                        <td>
                <span className="underline font-medium text-[#667085]">
                  {product.supplierId}
                </span>
                        </td>
                        <td>
                <span className="underline font-medium text-[#667085]">
                  {product.category}
                </span>
                        </td>
                        <td>{product.price}</td>
                        <td>{product.weight}</td>
                        <td>{product.stockLevel}</td>
                        <td>{product.recLevel}</td>
                        <td className="text-right pr-4">
                            <div className="flex justify-end gap-2">
                                <button className="text-[#750983] hover:bg-[#f4ebff] p-1 rounded">
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button className="text-[#ef2424] hover:bg-[#fef2f2] p-1 rounded">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <button className="text-[#3a3a3a] hover:bg-[#f9fafb] p-1 rounded">
                                    <Eye className="h-4 w-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t">
                <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded px-3 py-2 bg-white hover:bg-[#f9fafb]">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                </button>
                <div className="flex gap-1">
                    {paginationItems.map((page, i) => (
                        <button
                            key={i}
                            className={`h-9 w-9 text-sm rounded ${
                                page === 1
                                    ? "bg-[#f9f5ff] text-[#7f56d9]"
                                    : "text-[#667085] hover:bg-[#f9fafb]"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button className="flex items-center text-[#344054] border border-[#d0d5dd] rounded px-3 py-2 bg-white hover:bg-[#f9fafb]">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                </button>
            </div>
        </div>
    );
};
