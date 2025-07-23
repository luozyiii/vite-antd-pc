import {
  HomeOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  ToolOutlined,
  SettingOutlined,
  MenuOutlined,
  UserSwitchOutlined,
  FormOutlined,
  SmileOutlined,
  LayoutOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { IconHome } from '@/component/icons';
import type { ComponentType } from 'react';

// 菜单 icons 配置
export const icons: Record<string, ComponentType> = {
  UserOutlined: UserOutlined,
  NotificationOutlined: NotificationOutlined,
  LaptopOutlined: LaptopOutlined,
  HomeOutlined: HomeOutlined,
  ToolOutlined: ToolOutlined,
  SettingOutlined: SettingOutlined,
  MenuOutlined: MenuOutlined,
  UserSwitchOutlined: UserSwitchOutlined,
  FormOutlined: FormOutlined,
  SmileOutlined: SmileOutlined,
  LayoutOutlined: LayoutOutlined,
  ProjectOutlined: ProjectOutlined,
  IconHome: IconHome,
};
