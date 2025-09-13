// 预算选项配置数据
export const budgetOptions = [
    {
        id: 1,
        value: 'Any budget',
        label: 'Any budget',
        icon: '' // 无图标
    },
    {
        id: 2,
        value: 'On a budget',
        label: 'On a budget',
        icon: '💰'
    },
    {
        id: 3,
        value: 'Sensibly priced',
        label: 'Sensibly priced',
        icon: '💰💰'
    },
    {
        id: 4,
        value: 'Upscale',
        label: 'Upscale',
        icon: '💰💰💰'
    },
    {
        id: 5,
        value: 'Luxury',
        label: 'Luxury',
        icon: '💰💰💰💰'
    }
];
// 旅行风格选项
export const travelStyles = [
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'nature', label: 'Nature & Adventure', icon: '🏔️' },
    { id: 'food', label: 'Food & Drink', icon: '🍽️' },
    { id: 'relaxation', label: 'Relaxation', icon: '🧘‍♀️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌙' }
];

// 交通方式选项
export const transportationOptions = [
    { id: 'rental-car', label: 'Rental Car', icon: '🚗' },
    { id: 'public-transit', label: 'Public Transit', icon: '🚇' },
    { id: 'walking', label: 'Walking', icon: '🚶‍♀️' },
    { id: 'mix', label: 'Mix of all', icon: '🔄' }
];
// 饮食限制选项
export const dietaryOptions = [
    { id: 'none', label: 'None', icon: '✅' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'allergies', label: 'Allergies', icon: '⚠️' },
];