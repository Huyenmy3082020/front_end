import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Row } from 'antd';
import styles from '../../../components/AdminPageComponent/Main/DashboardPage.module.scss';
import { DailiVisitor2, DailyVisitor, IconTang, TotalOrder, TotalSell } from '../../IconComponent/IconComponent';
import HeaderPageAdminProduct from '../HeaderPageAdmin/HederPageAdminProduct';

const data = [
    { name: 'Mon', totalSales: 12 },
    { name: 'Tue', totalSales: 19 },
    { name: 'Wed', totalSales: 3 },
    { name: 'Thu', totalSales: 5 },
    { name: 'Fri', totalSales: 2 },
    { name: 'Sat', totalSales: 3 },
    { name: 'Sun', totalSales: 10 },
];

const CardItem = ({ Icon, title, amount, colorClass }) => (
    <div className={styles.wrapperItem}>
        <div className={styles.sherah_progress_card__content}>
            <div className={styles.progressIcon}>
                <Icon />
            </div>
            <div className={styles.sherah_progress_card__heading}>
                <span className={styles.sherah_pcolor}>{title}</span>
                <h4 className={styles.sherah_progress_card__title}>
                    <b>{amount}</b>
                </h4>
            </div>
            <div className={styles.sherah_progress_card__button}>
                <p className={`${styles.sherah_progress_card__text_color} ${colorClass}`}>
                    <IconTang /> 16%
                </p>
                <div style={{ borderBottom: '1px solid #bbb' }}>
                    <a className={styles.sherah_see_all}>View net earnings</a>
                </div>
            </div>
        </div>
    </div>
);

function DashboardPage() {
    return (
        <div>
            <HeaderPageAdminProduct />
            <div className={styles.wrapper}>
                <div className={styles.wrapperList}>
                    <CardItem Icon={TotalSell} title="Total Sells" amount="$654.66k" colorClass={styles.classColor1} />
                    <CardItem
                        Icon={TotalOrder}
                        title="Total Orders"
                        amount="$654.66k"
                        colorClass={styles.classColor2}
                    />
                    <CardItem
                        Icon={DailyVisitor}
                        title="Daily Visitor"
                        amount="$654.66k"
                        colorClass={styles.classColor3}
                    />
                    <CardItem
                        Icon={DailiVisitor2}
                        title="Daily Visitor"
                        amount="$654.66k"
                        colorClass={styles.classColor4}
                    />
                </div>
            </div>

            <div className={styles.wrapperItem2}>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>Total Sales</div>
                <div className={styles.wrapper_btn}>
                    <button className={styles.btn_list_group}>7 Days</button>
                    <button className={styles.btn_list_group}>30 Days</button>
                    <button className={styles.btn_list_group}>90 Days</button>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default DashboardPage;
