import HeaderDropdown from '../../shared/ui/HeaderDropdown';

function PrivateHeader() {
  return (
    <header className="h-full w-full">
      <div className="mx-auto flex max-w-7xl justify-end py-3">
        <div>
          <HeaderDropdown />
        </div>
      </div>
    </header>
  );
}

export default PrivateHeader;
