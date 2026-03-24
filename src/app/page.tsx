'use client';

import { useMemo } from 'react';
import { useAuth } from './hooks/auth-hook';
import type { DgaUser } from '../app/types/auth';

function Home() {
  const { user, loading } = useAuth();
  const userInfo: DgaUser | null = user;

  const fullName = useMemo(() => {
    const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim();
    return `${name}`.trim();
  }, [user?.firstName, user?.lastName]);

  console.log('HOME USER:', user);
  console.log('HOME USER INFO:', userInfo);

  return (
    <section className="p-6 min-h-screen flex items-center justify-center">
      <main className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-gray-800">ข้อมูลผู้ใช้</h1>

        {loading ? (
          <span className="text-gray-500">กำลังโหลด...</span>
        ) : user ? (
          <div className="space-y-3 text-sm text-gray-800">
            <div>
              <span className="font-medium">ชื่อผู้ใช้:</span>{' '}
              {fullName ? `คุณ ${fullName}` : 'ผู้ใช้'}
            </div>

            <div>
              <span className="font-medium">appId:</span>{' '}
              {user?.appId || '-'}
            </div>

            <div>
              <span className="font-medium">userId:</span>{' '}
              {user?.userId || '-'}
            </div>

            <div>
              <span className="font-medium">citizenId:</span>{' '}
              {user?.citizenId || '-'}
            </div>

            <div>
              <span className="font-medium">firstName:</span>{' '}
              {user?.firstName || '-'}
            </div>

            <div>
              <span className="font-medium">middleName:</span>{' '}
              {user?.middleName || '-'}
            </div>

            <div>
              <span className="font-medium">lastName:</span>{' '}
              {user?.lastName || '-'}
            </div>

            <div>
              <span className="font-medium">dateOfBirthString:</span>{' '}
              {user?.dateOfBirthString || '-'}
            </div>

            <div>
              <span className="font-medium">mobile:</span>{' '}
              {user?.mobile || '-'}
            </div>

            <div>
              <span className="font-medium">email:</span>{' '}
              {user?.email || '-'}
            </div>

            <div>
              <span className="font-medium">notification:</span>{' '}
              {typeof user?.notification === 'boolean'
                ? user.notification
                  ? 'true'
                  : 'false'
                : '-'}
            </div>
            <div>
              <p>Test back button</p>
              <div className='flex gap-3'>
                <a className='hover:text-red-400' href="/landing/test1">test1</a>
                <a className='hover:text-red-400' href="/landing/test2">test2</a>
                <a className='hover:text-red-400' href="/landing/test3">test3</a>
                <a className='hover:text-red-400' href="/landing/test4">test4</a>
                <a className='hover:text-red-400' href="/landing/test5">test5</a>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-gray-500">ไม่พบข้อมูลผู้ใช้</span>
        )}
      </main>
    </section>
  );
}

export default Home;