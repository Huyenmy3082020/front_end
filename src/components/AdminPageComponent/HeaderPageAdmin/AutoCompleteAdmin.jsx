import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import * as IngredientService from '../../../service/Productservice';

const AutoCompleteAdmin = ({ onSelectProduct }) => {
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    console.log('products', products);
    console.log('options', options);
    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                const res = await IngredientService.getAllIngredient();
                console.log('res:', res.data.ingredients);
                const ingredients = res.data.ingredients || [];
                setProducts(ingredients);
                setOptions(
                    ingredients.map((item) => ({
                        value: item.name,
                        label: item.name,
                        product: item,
                    })),
                );
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredient();
    }, []);
    const handleChange = (value) => {
        setSearchValue(value);
    };

    const handleSelect = (value, option) => {
        if (onSelectProduct) {
            onSelectProduct(option.product);
            setSearchValue('');
        }
    };

    return (
        <AutoComplete
            style={{ width: 500 }}
            options={options}
            placeholder="Nhập tên sản phẩm..."
            filterOption={(inputValue, option) => option.value.toUpperCase().includes(inputValue.toUpperCase())}
            onSelect={handleSelect}
            value={searchValue}
            onChange={handleChange}
        />
    );
};

export default AutoCompleteAdmin;
