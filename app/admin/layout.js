'use client'
import { useState } from "react";
import AdminNavBar from "@/components/AdminNavBar";
import AdminSideBar from "@/components/AdminSideBar";

const AdminLayout = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
        <AdminSideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>

        <div className="flex flex-col flex-1">
          <AdminNavBar setSideBarOpen={setIsSidebarOpen}/>
          <main className="p-4 overflow-y-auto">
            {children}
          </main>
        </div>
    </div>
  )
}

export default AdminLayout;