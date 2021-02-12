import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: FC = () => (
  <div className="w-full bg-primary p-4">
    <div className="flex justify-center cursor-pointer">
      <Link href="/">
        <Image src="/logo.png" width={209} height={65} alt="mesimasi Logo" />
      </Link>
    </div>
  </div>
);

export default Header;
