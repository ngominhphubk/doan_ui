import styles from './QLDH.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState, memo } from 'react';
import OverviewTable from '~/components/orders/orderTable/OverviewTable';
import OrderTable from '~/components/orders/orderTable';
const cx = classNames.bind(styles);

function QLDH({ data: dt, setTable: setTab, isSearch = false }) {
    const [data, setData] = useState(dt);
    const [table, setTable] = useState('overview');

    useEffect(() => {
        if (dt.length > 0 || isSearch) {
            setData(dt);
        } else if (dt.length < 1) {
            fetch(`http://localhost:2222/api/order/getAll`)
                .then((res) => res.json())
                .then((res) => {
                    setData(res);
                });
        }
    }, [dt]);

    return (
        <div className={cx('cover')}>
            <div className={cx('banner')}>
                <img
                    src="https://cdn.tgdd.vn/2021/07/campaign/uu-diem-khi-su-dung-phan-mem-quan-ly-van-chuyen-cho-don-vi-ban-hangcopy-640x360.jpg"
                    alt="anh quan ly don hang"
                />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('title')}>
                        <p>Order management</p>
                    </div>
                    <div className={cx('notice')}>
                        <div>
                            <h3>Status</h3>
                            <p>0 : Cancelled</p>
                            <p>1 : Unverify</p>
                            <p>2 : On shipping</p>
                            <p>3 : Success Delivery</p>
                            <p>4 : Received </p>
                        </div>
                    </div>
                </div>

                <div className={cx('navigation')}>
                    <button
                        onClick={() => setTable('overview')}
                        className={cx('nav-item', {
                            active: table === 'overview',
                        })}
                    >
                        Overview order
                    </button>
                    <button
                        onClick={() => setTable(0)}
                        className={cx('nav-item', { active: table == 0 })}
                    >
                        Cancelled
                    </button>
                    <button
                        onClick={() => setTable(4)}
                        className={cx('nav-item', { active: table == 4 })}
                    >
                        Received
                    </button>
                    <button
                        onClick={() => setTable('all')}
                        className={cx('nav-item', { active: table === 'all' })}
                    >
                        History Order
                    </button>
                </div>

                <div className={cx('content')}>
                    {table === 'overview' ? (
                        <OverviewTable
                            data={data}
                            action={setData}
                            setTab={setTab}
                        />
                    ) : (
                        <OrderTable
                            data={data}
                            action={setData}
                            type={table}
                            setTab={setTab}
                        />
                    )}
                </div>
                {/* <table border="1" className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('small')}>M?? ????n h??ng</th>
                        <th className={cx('small')}>M?? KH</th>
                        <th>T??n t??i kho???n</th>
                        <th>?????a ch??? nh???n h??ng</th>
                        <th>Email</th>
                        <th>S??? ??i???n tho???i</th>
                        <th>Tr???ng th??i ????n h??ng</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className={cx('font')} key={item.madh}>
                            <td>{item.madh}</td>
                            <td>{item.makh}</td>
                            <td>{item.tenkhnhan}</td>
                            <td>{item.diachinhan}</td>
                            <td>{item.email}</td>
                            <td>{item.sdt}</td>
                            <td>{item.trangthai}</td>
                            <td>{item.ghichu}</td>
                            <td>
                                <button
                                    className={cx('edit-button')}
                                    type="button"
                                    // onClick={(e) => handleEdit(e, item)}
                                >
                                    <FontAwesomeIcon icon={faCheck} /> C???p nh???p
                                    tr???ng th??i ????n h??ng
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            </div>
        </div>
    );
}

export default memo(QLDH);
