import { Suspense } from 'react';
import Loading from '@/component/loading';
import { businessRoutes } from './index';

const withLoadingComponent = (comp: JSX.Element) => <Suspense fallback={<Loading />}>{comp}</Suspense>;

const getAllPath = (pathname: string) => {
  const pathSnippets = pathname.split('/').filter((i: string) => i);
  return pathSnippets.map((_: string, index: number) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return url;
  });
};

function getTitles(tree: any[]) {
  const res: any = {};
  function dfs(tree: any[], par?: []) {
    if (!tree || tree.length === 0) {
      return res;
    }
    for (let i = 0; i < tree.length; i++) {
      const t = tree[i];
      t.par = par ? [...par, t.path] : [t.path];
      if (t.children && t.children.length > 0) {
        dfs(t.children, t.par);
      }
      if (t.path) {
        res[`/${t.par.join('/')}`] = t.title;
      }
    }
  }
  dfs(tree);
  return res;
}

const getRouteTitle = (pathname: string) => {
  const paths = getAllPath(pathname).reverse();
  const titles = getTitles(businessRoutes);
  let title = '';
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (titles[path]) {
      title = titles[path];
      break;
    }
  }
  return title;
};

export { withLoadingComponent, getAllPath, getRouteTitle };
