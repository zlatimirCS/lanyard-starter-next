function Header() {
  return (
    <header className="bg-white">
      <div className="max-w-[1440px] min-h-[142px] mx-auto py-[25px] px-4 flex items-center justify-between">
        {/*Logo*/}
        <h1 className="text-black tracking-[-0.96px] text-[48px] font-bold leading-[120%]">
          Lanyard Builder
        </h1>
        {/*Logo*/}
        {/*Menu*/}
        <h3 className="text-gray-900 text-[24px] font-semibold leading-[120%] tracking-[-0.48px]">
          Choose product
        </h3>
        {/*Menu*/}
      </div>
    </header>
  );
}

export default Header;
