import { useState } from "react";
import { Search, Plus } from "lucide-react";

const employeesData = [
  { id: 1, name: "Tahan Khan", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=1", level: "ceo" },
  { id: 2, name: "Herry Kane", role: "Project Manager", img: "https://i.pravatar.cc/150?img=2", level: "manager" },
  { id: 3, name: "David Warner", role: "Team Lead", img: "https://i.pravatar.cc/150?img=3", level: "manager" },
  { id: 4, name: "Azam Khan", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?img=4", level: "team" },
  { id: 5, name: "Joe Root", role: "Frontend Developer", img: "https://i.pravatar.cc/150?img=5", level: "team" },
  { id: 6, name: "Max Miller", role: "Backend Developer", img: "https://i.pravatar.cc/150?img=6", level: "team" },
  { id: 7, name: "Steve Smith", role: "HR Executive", img: "https://i.pravatar.cc/150?img=7", level: "team" },
];

function EmployeeCard({ employee }) {
  const sizes = { ceo: 20, manager: 16, team: 14 };
  const widths = { ceo: 60, manager: 56, team: 48 };
  const borders = { ceo: "primary", manager: "secondary", team: "accent" };
  const fontSizes = { ceo: "lg", manager: "md", team: "sm" };
  const roleSizes = { ceo: "sm", manager: "sm", team: "xs" };

  return (
    <div
      className={`bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center border-t-4 border-${borders[employee.level]} w-${widths[employee.level]}`}
    >
      <img
        src={employee.img}
        className={`w-${sizes[employee.level]} h-${sizes[employee.level]} rounded-full mb-2 border-2 border-${borders[employee.level]}`}
      />
      <h3 className={`font-semibold text-${fontSizes[employee.level]}`}>{employee.name}</h3>
      <p className={`text-gray-500 text-${roleSizes[employee.level]}`}>{employee.role}</p>
    </div>
  );
}

export default function Employee() {
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = employeesData.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  const ceo = employeesData.filter(e => e.level === "ceo");
  const managers = employeesData.filter(e => e.level === "manager");
  const team = employeesData.filter(e => e.level === "team");

  return (
    <div className="min-h-screen bg-base-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Create Employee
        </button>
      </div>

      {/* Search Bar (Left-aligned) */}
      <div className="relative max-w-xl mb-10">
        <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 border w-full max-w-xl">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search employee by name..."
            className="w-full outline-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {query && (
          <ul className="absolute w-full bg-white shadow-lg rounded-xl mt-1 z-20">
            {filtered.length ? (
              filtered.map((emp) => (
                <li
                  key={emp.id}
                  onClick={() => setQuery(emp.name)}
                  className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                >
                  {emp.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No employee found</li>
            )}
          </ul>
        )}
      </div>

      {/* Employee Layout */}
      <div className="flex flex-col items-center">
        {/* CEO */}
        <div className="flex flex-col items-center mb-12 relative">
          {ceo.map((emp) => <EmployeeCard key={emp.id} employee={emp} />)}
          {/* Vertical line to managers */}
          <div className="w-1 h-8 bg-primary mt-4"></div>
        </div>

        {/* Managers */}
        <div className="relative flex flex-col items-center mb-12">
          {/* Horizontal blue line connecting managers */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-1 bg-blue-500 z-0"></div>
          <div className="flex justify-center gap-16 relative z-10">
            {managers.map((emp) => <EmployeeCard key={emp.id} employee={emp} />)}
          </div>
        </div>

        {/* Team Members */}
        <div className="flex flex-wrap justify-center gap-12">
          {team.map((emp) => <EmployeeCard key={emp.id} employee={emp} />)}
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create New Employee</h3>
            <form className="flex flex-col gap-3">
              <input type="text" placeholder="Full Name" className="input input-bordered w-full" />
              <input type="text" placeholder="Role / Designation" className="input input-bordered w-full" />
              <div className="modal-action">
                <button type="button" onClick={() => setOpenModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
