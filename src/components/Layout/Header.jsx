import React from 'react';

const Header = ({ user }) => {
  return (
    <header className="sticky top-0 z-30  border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">

        <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
          مرحبًا 👋
        </h1>

        <p className="mt-2 text-base text-gray-500">
          {user?.name
            ? `نتمنى لك تجربة عمل مريحة  ${user.name}`
            : 'لوحة إدارة المهام'}
        </p>

        {/* subtle divider */}
        <div className="mt-6 flex justify-center">
          <span className="w-12 h-px bg-gray-200"></span>
        </div>

      </div>
    </header>
  );
};

export default Header;
