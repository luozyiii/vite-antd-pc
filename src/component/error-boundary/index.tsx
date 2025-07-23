import { ErrorBoundary as ErrorBoundaryComp } from 'react-error-boundary';
import styles from './index.module.scss';
import type { ReactNode } from 'react';

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  function goHome() {
    location.href = '/';
  }

  return (
    <div className={styles.ErrorBoundaryBox}>
      <h1>Something went wrong: </h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => location.reload()}>刷新试试</button>&nbsp;&nbsp;
      <button onClick={goHome}>返回首页</button>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return <ErrorBoundaryComp FallbackComponent={ErrorFallback}>{children}</ErrorBoundaryComp>;
};

export default ErrorBoundary;
