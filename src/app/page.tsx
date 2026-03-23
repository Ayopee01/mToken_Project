'use client';

import { useAuth } from './hooks/auth-hook';
import { useSearchParams } from 'next/navigation';
import type { DgaUser } from '../app/types/auth';

function Home() {
  const { user, loading } = useAuth();
  const userInfo: DgaUser | null = user;

  const searchParams = useSearchParams();
  const appIdFromParam = searchParams.get('appId');

  const fullName = [userInfo?.firstName, userInfo?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

  console.log('HOME USER:', userInfo);
  console.log('appIdFromParam:', appIdFromParam);

  return (
    <section className="p-6">
      <main className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-gray-800">ข้อมูลผู้ใช้</h1>

        {loading ? (
          <span className="text-gray-500">กำลังโหลด...</span>
        ) : userInfo ? (
          <div className="space-y-3 text-sm text-gray-800">
            <div>
              <span className="font-medium">ชื่อผู้ใช้:</span>{' '}
              {fullName ? `คุณ ${fullName}` : 'ผู้ใช้'}
            </div>

            <div>
              <span className="font-medium">appId:</span>{' '}
              {appIdFromParam || userInfo?.appId || '-'}
            </div>

            <div>
              <span className="font-medium">userId:</span>{' '}
              {userInfo?.userId || '-'}
            </div>

            <div>
              <span className="font-medium">citizenId:</span>{' '}
              {userInfo?.citizenId || '-'}
            </div>

            <div>
              <span className="font-medium">firstName:</span>{' '}
              {userInfo?.firstName || '-'}
            </div>

            <div>
              <span className="font-medium">middleName:</span>{' '}
              {userInfo?.middleName || '-'}
            </div>

            <div>
              <span className="font-medium">lastName:</span>{' '}
              {userInfo?.lastName || '-'}
            </div>

            <div>
              <span className="font-medium">dateOfBirthString:</span>{' '}
              {userInfo?.dateOfBirthString || '-'}
            </div>

            <div>
              <span className="font-medium">mobile:</span>{' '}
              {userInfo?.mobile || '-'}
            </div>

            <div>
              <span className="font-medium">email:</span>{' '}
              {userInfo?.email || '-'}
            </div>

            <div>
              <span className="font-medium">notification:</span>{' '}
              {typeof userInfo?.notification === 'boolean'
                ? userInfo.notification
                  ? 'true'
                  : 'false'
                : '-'}
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