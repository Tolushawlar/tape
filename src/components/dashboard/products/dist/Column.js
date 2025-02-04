"use client";
"use strict";
exports.__esModule = true;
exports.productColumns = void 0;
var lucide_react_1 = require("lucide-react");
var image_1 = require("next/image");
var checkbox_1 = require("@/components/ui/checkbox");
// import { Product } from "@/constants/products";
var button_1 = require("@/components/ui/button");
var SortableHeader_1 = require("../SortableHeader");
exports.productColumns = [
    {
        id: "select",
        header: function (_a) {
            var table = _a.table;
            return (React.createElement(checkbox_1.Checkbox, { checked: table.getIsAllPageRowsSelected(), onCheckedChange: function (value) { return table.toggleAllPageRowsSelected(!!value); }, "aria-label": "Select all" }));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement(checkbox_1.Checkbox, { checked: row.getIsSelected(), onCheckedChange: function (value) { return row.toggleSelected(!!value); }, "aria-label": "Select row" }));
        },
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: function (_a) {
            var column = _a.column;
            return React.createElement(SortableHeader_1.SortableHeader, { column: column, title: "Product" });
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "flex items-center" },
                React.createElement(image_1["default"], { src: "/placeholder.svg", alt: row.getValue("name"), width: 40, height: 40, className: "w-8 h-8 mr-2 rounded" }),
                React.createElement("div", null,
                    React.createElement("div", { className: "font-medium" }, row.getValue("name")),
                    row.original.additionalProducts && (React.createElement("div", { className: "text-sm text-muted-foreground" },
                        "+",
                        row.original.additionalProducts,
                        " other products")))));
        }
    },
    {
        accessorKey: "sku",
        header: function (_a) {
            var column = _a.column;
            return React.createElement(SortableHeader_1.SortableHeader, { column: column, title: "SKU" });
        }
    },
    {
        accessorKey: "category",
        header: function (_a) {
            var column = _a.column;
            return React.createElement(SortableHeader_1.SortableHeader, { column: column, title: "Category" });
        },
        filterFn: function (row, id, value) {
            if (Array.isArray(value)) {
                return value.includes(row.getValue(id));
            }
            return true; // No filter applied if value is not an array
        }
    },
    {
        accessorKey: "stock",
        header: function (_a) {
            var column = _a.column;
            return React.createElement(SortableHeader_1.SortableHeader, { column: column, title: "Stock" });
        }
    },
    {
        accessorKey: "amount",
        header: function (_a) {
            var column = _a.column;
            return React.createElement(SortableHeader_1.SortableHeader, { column: column, title: "Amount" });
        }
    },
    {
        accessorKey: "status",
        header: function (_a) {
            var column = _a.column;
            return React.createElement(SortableHeader_1.SortableHeader, { column: column, title: "Status" });
        },
        cell: function (_a) {
            var row = _a.row;
            var status = row.getValue("status");
            return (React.createElement("div", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " + (status === "Published"
                    ? "bg-green-100 text-green-800"
                    : status === "Draft"
                        ? "bg-gray-100 text-gray-800"
                        : status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800") }, status));
        }
    },
    {
        accessorKey: "dateAdded",
        header: function (_a) {
            var column = _a.column;
            return (React.createElement(SortableHeader_1.SortableHeader, { column: column, title: "Date Added" }));
        },
        cell: function (_a) {
            var getValue = _a.getValue;
            var date = getValue();
            return new Date(date).toLocaleDateString();
        },
        filterFn: function (row, columnId, filterValue) {
            var rowValue = row.getValue(columnId);
            if (!rowValue || !filterValue)
                return true;
            var rowDate = new Date(rowValue);
            var startDate = filterValue.startDate, endDate = filterValue.endDate;
            // Ensure both startDate and endDate are valid Dates
            return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
        }
    },
    {
        id: "actions",
        cell: function (_a) {
            var row = _a.row;
            var product = row.original;
            return (React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement(button_1.Button, { size: "icon", variant: "ghost", onClick: function () {
                        return (window.location.href = "/admin/dashboard/products/" + product.id + "/edit");
                    } },
                    React.createElement(lucide_react_1.Eye, null)),
                React.createElement(button_1.Button, { size: "icon", variant: "ghost" },
                    React.createElement(lucide_react_1.Trash2, null))));
        }
    },
];
