"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var react_table_1 = require("@tanstack/react-table");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var table_1 = require("@/components/ui/table");
var tabs_1 = require("@/components/ui/tabs");
var Column_1 = require("@/components/dashboard/products/Column");
var navigation_1 = require("next/navigation");
var axios_1 = require("axios");
function ProductsPage() {
    var _this = this;
    var _a, _b, _c;
    var _d = react_1.useState([]), sorting = _d[0], setSorting = _d[1];
    var _e = react_1.useState([]), columnFilters = _e[0], setColumnFilters = _e[1];
    var _f = react_1.useState({}), columnVisibility = _f[0], setColumnVisibility = _f[1];
    var _g = react_1.useState({}), rowSelection = _g[0], setRowSelection = _g[1];
    var _h = react_1.useState("all"), statusFilter = _h[0], setStatusFilter = _h[1];
    var _j = react_1.useState({
        from: undefined,
        to: undefined
    }), dateRange = _j[0], setDateRange = _j[1];
    var _k = react_1.useState(false), showDatePicker = _k[0], setShowDatePicker = _k[1];
    var _l = react_1.useState(false), showFilters = _l[0], setShowFilters = _l[1];
    var _m = react_1.useState([]), categoryFilter = _m[0], setCategoryFilter = _m[1];
    var _o = react_1.useState([]), products = _o[0], setProducts = _o[1];
    var push = navigation_1.useRouter().push;
    var table = react_table_1.useReactTable({
        data: products,
        columns: Column_1.productColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: react_table_1.getCoreRowModel(),
        getPaginationRowModel: react_table_1.getPaginationRowModel(),
        getSortedRowModel: react_table_1.getSortedRowModel(),
        getFilteredRowModel: react_table_1.getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting: sorting,
            columnFilters: columnFilters,
            columnVisibility: columnVisibility,
            rowSelection: rowSelection
        }
    });
    var resetAllFilters = function () {
        var _a;
        setStatusFilter("all");
        setDateRange(undefined);
        setCategoryFilter([]);
        (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.setFilterValue("");
    };
    react_1.useEffect(function () {
        var _a, _b;
        if (statusFilter !== "all") {
            (_a = table.getColumn("status")) === null || _a === void 0 ? void 0 : _a.setFilterValue(statusFilter);
        }
        else {
            (_b = table.getColumn("status")) === null || _b === void 0 ? void 0 : _b.setFilterValue(undefined);
        }
    }, [statusFilter, table]);
    react_1.useEffect(function () {
        var _a, _b;
        if ((dateRange === null || dateRange === void 0 ? void 0 : dateRange.from) && (dateRange === null || dateRange === void 0 ? void 0 : dateRange.to)) {
            var startDate = dateRange.from;
            var endDate = dateRange.to;
            (_a = table.getColumn("dateAdded")) === null || _a === void 0 ? void 0 : _a.setFilterValue({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            });
        }
        else {
            (_b = table.getColumn("dateAdded")) === null || _b === void 0 ? void 0 : _b.setFilterValue(undefined);
        }
    }, [dateRange, table]);
    react_1.useEffect(function () {
        var _a, _b;
        if (categoryFilter.length > 0) {
            (_a = table.getColumn("category")) === null || _a === void 0 ? void 0 : _a.setFilterValue(categoryFilter);
        }
        else {
            (_b = table.getColumn("category")) === null || _b === void 0 ? void 0 : _b.setFilterValue(undefined);
        }
    }, [categoryFilter, table]);
    var categories = react_1.useMemo(function () {
        return Array.from(new Set(products.map(function (product) { return product.category; })));
    }, []);
    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const response = await axios.get(
    //         "https://tapebackend.onrender.com/api/products"
    //       );
    //       setProducts(response.data);
    //       // console.log(response.data)
    //     } catch (error) {
    //       console.error("Error fetching products:", error);
    //     }
    //   };
    //   fetchProducts();
    // }, []);
    react_1.useEffect(function () {
        var fetchProducts = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get("https://tapebackend.onrender.com/api/products")];
                    case 1:
                        response = _a.sent();
                        // Validate and ensure data is an array
                        if (Array.isArray(response.data)) {
                            setProducts(response.data.map(function (item) { return ({
                                id: item.id,
                                name: item.name,
                                category: item.category || "Unknown",
                                status: item.status || "Unavailable",
                                dateAdded: item.dateAdded || new Date().toISOString()
                            }); }));
                        }
                        else {
                            console.error("Invalid product data format:", response.data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching products:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchProducts();
    }, []);
    console.log(products);
    return (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-4 p-4 md:p-8 pt-6" },
        React.createElement("div", null,
            React.createElement("h2", { className: "text-2xl font-bold tracking-tight" }, "Products"),
            React.createElement("p", { className: "text-muted-foreground" }, "Here's a list of your products")),
        React.createElement("div", { className: "flex items-center justify-between space-y-2" }),
        React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 sm:items-center justify-between" },
            React.createElement(tabs_1.Tabs, { value: statusFilter, onValueChange: setStatusFilter },
                React.createElement(tabs_1.TabsList, null,
                    React.createElement(tabs_1.TabsTrigger, { value: "all" }, "All Products"))),
            React.createElement(button_1.Button, { className: "bg-blue-700", onClick: function () { return push("/admin/dashboard/products/add-product"); } },
                React.createElement(lucide_react_1.Plus, { className: "mr-2 h-4 w-4" }),
                " Add Product")),
        React.createElement("div", { className: "space-y-4" },
            React.createElement("div", { className: "relative flex-grow" },
                React.createElement(lucide_react_1.Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
                React.createElement(input_1.Input, { placeholder: "Search products...", value: (_b = (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.getFilterValue()) !== null && _b !== void 0 ? _b : "", onChange: function (event) { var _a; return (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }, className: "pl-8 max-w-[400px]" })),
            React.createElement("div", { className: "rounded-md border" },
                React.createElement(table_1.Table, null,
                    React.createElement(table_1.TableHeader, null, table.getHeaderGroups().map(function (headerGroup) { return (React.createElement(table_1.TableRow, { key: headerGroup.id }, headerGroup.headers.map(function (header) {
                        return (React.createElement(table_1.TableHead, { key: header.id }, header.isPlaceholder
                            ? null
                            : react_table_1.flexRender(header.column.columnDef.header, header.getContext())));
                    }))); })),
                    React.createElement(table_1.TableBody, null, ((_c = table.getRowModel().rows) === null || _c === void 0 ? void 0 : _c.length) ? (table.getRowModel().rows.map(function (row) { return (React.createElement(table_1.TableRow, { key: row.id, "data-state": row.getIsSelected() && "selected" }, row.getVisibleCells().map(function (cell) { return (React.createElement(table_1.TableCell, { key: cell.id }, react_table_1.flexRender(cell.column.columnDef.cell, cell.getContext()))); }))); })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: Column_1.productColumns.length, className: "h-24 text-center" }, "No results.")))))))));
}
exports["default"] = ProductsPage;
