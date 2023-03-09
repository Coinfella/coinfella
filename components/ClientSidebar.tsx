'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Sidebar from '../app/(site)/components/Sidebar';

const ClientSidebar = () => {
  const path = usePathname();

  return <Sidebar path={path ?? ''} />;
};

export default ClientSidebar;
