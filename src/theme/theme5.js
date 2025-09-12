import { createTheme } from '@mui/material/styles';

const friendlyTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // 鲜活的绿色
      light: '#81C784', // 明亮的浅绿
      dark: '#388E3C', // 深沉的绿色
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF7043', // 活力橙色
      light: '#FFAB91', // 温暖的浅橙
      dark: '#E64A19', // 深橙红
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336', // 鲜明的错误红色
      light: '#EF5350',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF9800', // 醒目的警告橙色
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3', // 清晰的信息蓝色
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50', // 深蓝灰色，易读性强
      secondary: '#607D8B', // 中等灰蓝
    },
    background: {
      default: '#FAFAFA', // 温暖的浅灰白
      paper: '#FFFFFF',
    },
    divider: '#E0E0E0',
    // 添加自定义颜色用于特殊场景
    mode: 'light',
  },
  typography: {
    fontFamily: [
      'Inter', // 现代友好的字体
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#2C3E50',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#2C3E50',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#2C3E50',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#2C3E50',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#2C3E50',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#2C3E50',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#607D8B',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02857em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // 现代化的圆角
          padding: '12px 28px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          fontSize: '0.95rem',
        },
        containedPrimary: {
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#388E3C',
            boxShadow: '0px 4px 12px rgba(76, 175, 80, 0.3)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedSecondary: {
          backgroundColor: '#FF7043',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#E64A19',
            boxShadow: '0px 4px 12px rgba(255, 112, 67, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          borderColor: '#4CAF50',
          color: '#4CAF50',
          borderWidth: '2px',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
            borderColor: '#388E3C',
            borderWidth: '2px',
          },
        },
        text: {
          color: '#607D8B',
          '&:hover': {
            backgroundColor: 'rgba(96, 125, 139, 0.08)',
            color: '#2C3E50',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2C3E50',
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#4CAF50',
          textDecoration: 'none',
          fontWeight: 500,
          '&:hover': {
            color: '#388E3C',
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          color: '#607D8B',
          minHeight: 48,
          '&.Mui-selected': {
            color: '#4CAF50',
            fontWeight: 700,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#4CAF50',
          height: 3,
          borderRadius: '2px 2px 0 0',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        primary: {
          backgroundColor: '#FF7043',
          color: '#FFFFFF',
          boxShadow: '0px 4px 16px rgba(255, 112, 67, 0.3)',
          '&:hover': {
            backgroundColor: '#E64A19',
            boxShadow: '0px 6px 20px rgba(255, 112, 67, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: '#E8F5E9',
          color: '#2E7D32',
          '&:hover': {
            backgroundColor: '#C8E6C9',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: '#4CAF50',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4CAF50',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#607D8B',
          '&.Mui-checked': {
            color: '#4CAF50',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 16,
          '& .MuiFormControlLabel-label': {
            fontSize: '0.95rem',
            color: '#2C3E50',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12, // 全局圆角
  },
});

export default friendlyTheme;