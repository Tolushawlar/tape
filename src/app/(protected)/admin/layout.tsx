"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useState } from "react";

import { SidebarContent } from "@/components/dashboard/Sidebard";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/dashboard/Header";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 bg-[#1a1f37] text-white fixed h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              className="w-64 bg-[#1a1f37] text-white h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-6 h-6 text-white" />
                </Button>
              </div>
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 md:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />
        {/* Main Content */}
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
