const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-6 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-1/3"
      />
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/100" alt="profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
