import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  isLoading: boolean;
  sidebarOpen: boolean;
}

const initialState: DashboardState = {
  isLoading: false,
  sidebarOpen: true,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setDashboardLoading, toggleSidebar, setSidebarOpen } = dashboardSlice.actions;
export default dashboardSlice.reducer;
