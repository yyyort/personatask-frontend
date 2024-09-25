import React from 'react';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-screen w-full flex gap-10">
        <section className='w-full flex flex-col items-end justify-center'>
          <h1 className="text-[6rem] text-end">Personatask</h1>
          <div className="flex flex-col items-end text-[1.3rem]">
            <p>
              personalize your <strong>routines</strong>
            </p>
            <p>
              personalize your <strong>goals</strong>
            </p>
            <p>
              and <strong>life</strong>
            </p>
          </div>
        </section>
        <main className="flex w-full">
          {children}
        </main>
      </div>
    );
  }
  