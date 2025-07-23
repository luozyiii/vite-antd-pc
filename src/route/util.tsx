import { Suspense } from 'react';
import { matchPath } from 'react-router-dom';
import Loading from '@/component/loading';
import { businessRoutes } from './index';
import type { RouteItemProps } from './type';
import type { ReactElement } from 'react';

const withLoadingComponent = (comp: ReactElement) => <Suspense fallback={<Loading />}>{comp}</Suspense>;

const getAllPath = (pathname: string) => {
  const pathSnippets = pathname.split('/').filter((i: string) => i);
  return pathSnippets.map((_: string, index: number) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return url;
  });
};

function getTitles(tree: RouteItemProps[]) {
  const res: Record<string, string> = {};
  function dfs(tree: RouteItemProps[], par?: string[]): void {
    if (!tree || tree.length === 0) {
      return;
    }
    for (let i = 0; i < tree.length; i++) {
      const t = tree[i];
      const currentPar = par && t.path ? [...par, t.path] : t.path ? [t.path] : [];
      if (t.children && t.children.length > 0) {
        dfs(t.children, currentPar);
      }
      if (t.path && t.title) {
        res[`/${currentPar.join('/')}`] = t.title;
      }
    }
  }
  dfs(tree);
  return res;
}

const getRouteTitle = (pathname: string) => {
  const titles = getTitles(businessRoutes);
  let title = '';
  for (const key in titles) {
    if (matchPath(key, pathname)) {
      title = titles[key];
      break;
    }
  }
  return title;
};

export { withLoadingComponent, getAllPath, getRouteTitle };
