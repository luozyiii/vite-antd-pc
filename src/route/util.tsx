import { Suspense, ReactNode } from 'react';
import { sleep } from '@/util';
import Loading from '@/component/loading';

async function delayPromise(promise: any, timeout = 500) {
  const [res] = await Promise.all([promise, sleep(timeout)]);
  return res;
}

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
export { lazyLoad, delayPromise };
