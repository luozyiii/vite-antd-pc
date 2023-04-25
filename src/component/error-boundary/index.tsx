import { ErrorBoundary as ErrorBoundaryComp } from 'react-error-boundary';
import styles from './index.module.scss';

function ErrorFallback({ error }: any) {
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

const ErrorBoundary: React.FC<any> = ({ children }) => {
  return <ErrorBoundaryComp FallbackComponent={ErrorFallback}>{children}</ErrorBoundaryComp>;
};

export default ErrorBoundary;
