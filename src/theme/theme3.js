// src/theme.js
import { createTheme } from '@mui/material/styles';

const blackButtonTheme = createTheme({
  palette: {
    primary: {
      main: '#000000', // 主要按钮颜色为黑色
      light: '#333333', // 按钮hover效果的浅黑色
      dark: '#000000', // 按钮的深黑色
      contrastText: '#FFFFFF', // 黑色按钮上的白色文本
    },
    secondary: {
      main: '#E0E0E0', // 次要元素（如边框、次要文本）的浅灰色
      light: '#F5F5F5', // 更浅的灰色，用于一些背景或分隔线
      dark: '#A0A0A0', // 较深的灰色
      contrastText: '#000000', // 黑色文本，用于浅色背景
    },
    error: {
      main: '#f44336', // 默认的错误红色
    },
    warning: {
      main: '#ff9800', // 默认的警告橙色
    },
    info: {
      main: '#2196f3', // 默认的信息蓝色
    },
    success: {
      main: '#4caf50', // 默认的成功绿色
    },
    text: {
      primary: '#333333', // 深灰色作为主要文本颜色
      secondary: '#666666', // 中灰色作为次要文本颜色
    },
    background: {
      default: '#FFFFFF', // 默认背景为纯白色
      paper: '#FFFFFF', // 纸张（组件）背景为纯白色
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#333333', // 标题颜色适配为深灰色
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#333333',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#333333',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#666666', // 标题颜色适配为中灰色
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#666666',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#666666',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#333333',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      color: '#666666',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      color: '#FFFFFF', // 黑色按钮上的文本为白色
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#000000', // 主要按钮背景为黑色
          '&:hover': {
            backgroundColor: '#333333', // hover时变为浅黑色
          },
        },
        outlinedPrimary: {
          borderColor: '#000000', // 边框为黑色
          color: '#000000', // 文本为黑色
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // hover时有轻微黑色背景
            borderColor: '#333333', // hover时边框变为浅黑色
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // backgroundColor: '#FFFFFF', // AppBar背景为白色
          color: '#333333', // AppBar文本为深灰色
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#FFFFFF', // Paper背景为白色
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000000', // 链接颜色为黑色
          '&:hover': {
            color: '#333333', // hover时链接变为浅黑色
          },
        },
      },
    },
  },
});

export default blackButtonTheme;