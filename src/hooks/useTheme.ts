import { useAppSelector, useAppDispatch } from '@/store';
import { setTheme, toggleTheme } from '@/store/slices/themeSlice';
import type { ThemeMode } from '@/types';

export function useTheme() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  const isDark = mode === 'dark';

  const changeTheme = (newMode: ThemeMode) => {
    dispatch(setTheme(newMode));
  };

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return {
    mode,
    isDark,
    changeTheme,
    toggle,
  };
}
