import { useEffect } from 'react';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export const usePageTitle = () => {
  const { displayName } = useUserProfile();
  const { currentUser } = useAuth();

  useEffect(() => {
    // 根据登录状态动态设置标题
    const getPageTitle = () => {
      if (currentUser && currentUser.email_confirmed_at) {
        // 已登录且已验证邮箱：显示 "{用户名}的标签页"
        return `${displayName}的标签页`;
      }
      // 未登录或未验证：显示默认标题
      return 'ycy的标签页';
    };

    // 设置初始标题
    const defaultTitle = getPageTitle();
    document.title = defaultTitle;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面失去焦点时显示哭哭表情
        document.title = '😭你就要离开我了吗';
      } else {
        // 页面获得焦点时显示动态标题
        document.title = getPageTitle();
      }
    };

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 清理事件监听器
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [displayName, currentUser]);
};
