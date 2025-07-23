# 开发指南

## 🚀 快速开始

### 环境准备

#### 系统要求
- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0
- Git >= 2.30.0

#### 推荐工具
- **编辑器**: VSCode
- **浏览器**: Chrome (最新版)
- **终端**: iTerm2 (macOS) / Windows Terminal (Windows)

### 项目启动

```bash
# 1. 克隆项目
git clone <repository-url>
cd vite-antd-pc

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
# http://localhost:8000
```

### 开发环境配置

#### VSCode 扩展安装
项目会自动推荐必要的扩展，首次打开时请安装：
- TypeScript and JavaScript Language Features
- ESLint
- Prettier - Code formatter
- Auto Rename Tag
- Bracket Pair Colorizer

#### 环境变量配置
复制 `.env.example` 为 `.env.local` 并配置：
```bash
# API 基础地址
VITE_API_BASE_URL=http://localhost:3000/api

# 应用标题
VITE_APP_TITLE=管理后台

# 环境标识
VITE_APP_ENV=development
```

## 📝 开发规范

### 代码规范

#### 命名规范
```typescript
// ✅ 组件命名 - PascalCase
const UserListComponent: React.FC = () => {};

// ✅ 函数命名 - camelCase
const getUserList = () => {};

// ✅ 变量命名 - camelCase
const userList = [];

// ✅ 常量命名 - UPPER_SNAKE_CASE
const MAX_PAGE_SIZE = 100;

// ✅ 类型命名 - PascalCase
interface UserListProps {
  data: User[];
}

// ✅ 文件命名
// 组件文件: UserList.tsx
// 工具文件: formatDate.ts
// 样式文件: user-list.module.scss
// 类型文件: user.types.ts
```

#### 目录结构规范
```typescript
// ✅ 推荐的组件目录结构
src/component/business/user-table/
├── index.tsx              # 主组件
├── index.module.scss      # 样式文件
├── types.ts              # 类型定义
├── hooks.ts              # 自定义 hooks
├── utils.ts              # 工具函数
└── __tests__/            # 测试文件
    └── index.test.tsx
```

### TypeScript 规范

#### 类型定义
```typescript
// ✅ 接口定义
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ✅ 组件 Props 类型
interface UserListProps {
  users: User[];
  loading?: boolean;
  onUserClick?: (user: User) => void;
}

// ✅ API 响应类型
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// ✅ 泛型使用
const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  // 实现
};
```

#### 类型导入导出
```typescript
// ✅ 类型导入
import type { User, UserListProps } from './types';

// ✅ 类型导出
export type { User, UserListProps };

// ✅ 默认导出组件，命名导出类型
export default UserList;
export type { UserListProps };
```

### React 开发规范

#### 组件定义
```typescript
// ✅ 函数组件定义
const UserList: React.FC<UserListProps> = ({ 
  users, 
  loading = false, 
  onUserClick 
}) => {
  // 组件逻辑
  return (
    <div className={styles.container}>
      {/* JSX 内容 */}
    </div>
  );
};

// ✅ 组件默认值
UserList.defaultProps = {
  loading: false,
};

// ✅ 组件显示名称
UserList.displayName = 'UserList';
```

#### Hooks 使用规范
```typescript
// ✅ useState
const [loading, setLoading] = useState<boolean>(false);
const [users, setUsers] = useState<User[]>([]);

// ✅ useEffect
useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUserList();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

// ✅ useCallback
const handleUserClick = useCallback((user: User) => {
  onUserClick?.(user);
}, [onUserClick]);

// ✅ useMemo
const filteredUsers = useMemo(() => {
  return users.filter(user => user.status === 'active');
}, [users]);
```

### 样式规范

#### CSS Modules 使用
```scss
// user-list.module.scss
.container {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }
  
  .list {
    .item {
      padding: 12px;
      border-bottom: 1px solid #f0f0f0;
      
      &:hover {
        background: #fafafa;
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
```

```typescript
// 组件中使用
import styles from './user-list.module.scss';

const UserList: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>用户列表</h2>
      </div>
      <div className={styles.list}>
        {/* 列表内容 */}
      </div>
    </div>
  );
};
```

## 🛠️ 开发工具使用

### 代码检查和格式化

#### 手动执行
```bash
# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# Prettier 格式化
npm run format

# TypeScript 类型检查
npm run type-check
```

#### 自动执行
- **保存时**: VSCode 会自动格式化代码
- **提交时**: Husky 会自动执行代码检查
- **推送时**: GitHub Actions 会执行完整检查

### 调试技巧

#### 浏览器调试
```typescript
// ✅ 使用 console.log 调试
console.log('User data:', user);

// ✅ 使用 console.table 显示数组
console.table(users);

// ✅ 使用 console.group 分组日志
console.group('User Operations');
console.log('Fetching users...');
console.log('Users loaded:', users.length);
console.groupEnd();

// ✅ 使用 debugger 断点
const handleClick = () => {
  debugger; // 浏览器会在此处暂停
  // 处理逻辑
};
```

#### React DevTools
- 安装 React Developer Tools 浏览器扩展
- 使用 Components 面板查看组件树
- 使用 Profiler 面板分析性能

### Git 工作流

#### 分支管理
```bash
# 创建功能分支
git checkout -b feature/user-management

# 提交代码
git add .
git commit -m "feat: add user list component"

# 推送分支
git push origin feature/user-management

# 合并到主分支
git checkout main
git merge feature/user-management
```

#### 提交信息规范
```bash
# 功能开发
git commit -m "feat: add user search functionality"

# 问题修复
git commit -m "fix: resolve user table pagination issue"

# 文档更新
git commit -m "docs: update API documentation"

# 样式调整
git commit -m "style: improve user card layout"

# 代码重构
git commit -m "refactor: extract user service logic"

# 测试相关
git commit -m "test: add user component unit tests"

# 构建相关
git commit -m "chore: update build configuration"
```

## 🧪 测试指南

### 单元测试
```typescript
// UserList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
];

describe('UserList', () => {
  it('renders user list correctly', () => {
    render(<UserList users={mockUsers} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('calls onUserClick when user is clicked', () => {
    const mockOnUserClick = jest.fn();
    render(<UserList users={mockUsers} onUserClick={mockOnUserClick} />);
    
    fireEvent.click(screen.getByText('John Doe'));
    expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0]);
  });
});
```

### 运行测试
```bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式运行测试
npm run test:watch
```

## 📦 构建和部署

### 本地构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 分析构建产物
npm run build:analyze
```

### Docker 部署
```bash
# 构建 Docker 镜像
docker build -t vite-antd-pc .

# 运行容器
docker run -p 80:80 vite-antd-pc

# 使用 docker-compose
docker-compose up -d
```

## 🔧 常见问题解决

### 开发环境问题

#### 端口占用
```bash
# 查看端口占用
lsof -i :8000

# 杀死进程
kill -9 <PID>

# 或者修改端口
npm run dev -- --port 8001
```

#### 依赖安装问题
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

#### 类型错误
```bash
# 重新生成类型声明
npm run type-check

# 重启 TypeScript 服务
# VSCode: Ctrl+Shift+P -> TypeScript: Restart TS Server
```

### 构建问题

#### 内存不足
```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 依赖版本冲突
```bash
# 查看依赖树
npm ls

# 强制解析依赖
npm install --force
```

## 📚 学习资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Ant Design 官方文档](https://ant.design/)

### 推荐阅读
- [React 最佳实践](https://react.dev/learn)
- [TypeScript 深入理解](https://www.typescriptlang.org/docs/)
- [现代 JavaScript 教程](https://javascript.info/)
- [CSS 现代布局](https://web.dev/learn/css/)

---

*如有其他问题，请查看项目 README.md 或联系团队成员。*
