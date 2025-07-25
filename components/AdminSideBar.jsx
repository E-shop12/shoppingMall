'use client'
import{ useState } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBox,
  FiPlus,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";


const menuItems = [
  { name: "OverView", href: "/admin", icon: <FiHome /> },
  { name: "Add New Product ", href: "/admin/products/new", icon: <FiPlus /> },
  {
    name: "Published Products",
    href: "/admin/products",
    icon: <FiBox />,
  },
];

const AdminSideBar = ({ isOpen, setIsOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
 


  const handleLogout1 = () => {
    setShowModal(true);
  };

  const handleLogout2 = () => {
    setShowModal(false);
    router.push('/');
  };
  const cancelDelete = () => {
    setShowModal(false);
  };
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-15" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 h-full bg-[#1f2894] text-white p-4 transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex flex-col w-64`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-20 md:w-35 ">
            <p>DayaMall</p>
          </div>
          {/* <h1 className="text-xl font-bold font-[play]">Dashboard</h1> */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white text-2xl"
          >
            <FiX />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-4 mt-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                whileTap={{ scale: 0.95 }}
                className={`relative group flex items-center gap-4 cursor-pointer p-2 rounded-md transition-all duration-200 font-[play] ${
                  isActive
                    ? "bg-white text-[#67216D] font-semibold"
                    : "hover:bg-[#561256]"
                }`}
              >
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  <span className="text-xl">{item.icon}</span>
                </Link>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}

          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 cursor-pointer p-2 rounded-md hover:bg-[#561256] transition-all mt-8"
            onClick={() => {
              handleLogout1();
              setIsOpen(false);
            }}
          >
            <FiLogOut className="text-xl" />
            <span className="text-lg">Logout</span>
          </motion.div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 p-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold text-[#283144] mb-4">
              Are you sure you want to Log Out?
            </h3>
            <div className="flex justify-end gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={cancelDelete}
                className="bg-gray-300 text-[#283144] px-4 py-2 rounded-lg"
              >
                Cancel
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout2}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Yes, Log Out
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  ); 
  
};

export default AdminSideBar