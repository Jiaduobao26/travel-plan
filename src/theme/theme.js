// src/theme.js
import { createTheme } from '@mui/material/styles';

const rawTheme = createTheme({
  palette: {
    primary: {
      main: '#31708E', // 深蓝色
      light: '#5085A5', // 中蓝色
      dark: '#687864', // 深绿色
      contrastText: '#FFFFFF', // 白色文本
    },
    secondary: {
      main: '#8FC1E3', // 浅蓝色
      light: '#F7F9FB', // 米白色
      dark: '#5085A5', // 中蓝色
      contrastText: '#31708E', // 深蓝色文本
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
      primary: '#31708E', // 深蓝色作为主要文本颜色
      secondary: '#687864', // 深绿色作为次要文本颜色
    },
    background: {
      default: '#F7F9FB', // 米白色作为默认背景
      paper: '#FFFFFF', // 白色作为纸张（组件）背景
    },
  },
  typography: {
    fontFamily: [
      'Inter', // 现代无衬线字体
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#31708E',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#31708E',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#31708E',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#687864',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#687864',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#687864',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#31708E',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      color: '#687864',
    },
    button: {
      textTransform: 'none', // 按钮文本不自动大写
      fontWeight: 600,
      color: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 按钮圆角
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#31708E',
          '&:hover': {
            backgroundColor: '#5085A5',
          },
        },
        outlinedPrimary: {
          borderColor: '#31708E',
          color: '#31708E',
          '&:hover': {
            backgroundColor: 'rgba(49, 112, 142, 0.04)',
            borderColor: '#5085A5',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#31708E',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)', // 轻微阴影
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#31708E',
          '&:hover': {
            color: '#5085A5',
          },
        },
      },
    },
  },
});

export default rawTheme;