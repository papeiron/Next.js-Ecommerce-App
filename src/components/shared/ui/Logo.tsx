import Image from 'next/image';
import Link from 'next/link';

import logoImg from '/public/logo.png';

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/">
        <Image src={logoImg} alt="Logo" priority />
      </Link>
    </div>
  );
}

export default Logo;
