import styles from './QLKH.module.scss';
import classNames from 'classnames/bind';

import { deleteUser, getUser } from '~/Services';

import { useEffect, useState, memo } from 'react';
import Table from '~/LayOut/LayoutAdmin/QLKH/components/Table';

const cx = classNames.bind(styles);

function QLKH({ data: dt, setTable: setTab }) {
    const [data, setData] = useState(dt);
    const [table, setTable] = useState('user');

    useEffect(() => {
        if (dt.length > 0) {
            setData(dt);
        }
        if (dt.length < 1) {
            fetch(`http://localhost:2222/api/user/allUser`)
                .then((res) => res.json())
                .then((res) => setData(res));
        }
    }, [dt]);

    const delUser = async (id) => {
        try {
            const res = await deleteUser('delete', id);
            await res.json();
            const newData = await getUser();
            setData(newData);
        } catch (e) {
            console.log(e);
        }
    };

    const authSign = async ({ id, quyen = 1 }) => {
        try {
            const opt = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quyen,
                }),
            };
            const url = `http://localhost:2222/api/user/updateQuyen/${id}`;
            const result = await fetch(url, opt);
            await result.json();
            const newData = await getUser();
            setData(newData);
        } catch (e) {
            console.log(e);
        }
    };

    const viewOrders = async (id) => {
        const url = `order/getByMakh/${id}`;
        console.log('tong quan url', url);
        setTab(url);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img
                    src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/qua16393876766418.jpeg"
                    alt="anh quan ly nguoi dung"
                />
            </div>
            {/* <div className={cx('navigation')}>
                <button
                    className={cx('btn-user-tab', 'table', {
                        active: table === 'user',
                    })}
                    onClick={() => {
                        setTable('user');
                    }}
                >
                    User Table
                </button>
                <button
                    className={cx('btn-admin-tab', 'table', {
                        active: table === 'admin',
                    })}
                    onClick={() => {
                        setTable('admin');
                    }}
                >
                    Admin Table
                </button>
            </div> */}
            <div className={cx('content')}>
                <Table
                    type="admin"
                    data={data}
                    delUser={delUser}
                    authSign={authSign}
                    viewOrders={viewOrders}
                />
                <Table
                    type="user"
                    data={data}
                    delUser={delUser}
                    authSign={authSign}
                    viewOrders={viewOrders}
                />
            </div>
            {/* <div className={cx('title')}>
                <p>QU???N L?? NG?????I D??NG</p>
            </div>
            <table border="1" className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('small')}>M?? ng?????i d??ng</th>
                        <th>T??n t??i kho???n</th>
                        <th>H??? v?? t??n</th>
                        <th>Gi???i t??nh</th>
                        <th>Ng??y sinh</th>
                        <th>S??? ??i???n tho???i</th>
                        <th>?????a ch??? nh??</th>
                        <th>Email</th>
                        <th>Quy???n</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <OnlyReadRow
                            key={item.manguoidung}
                            item={item}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}

export default memo(QLKH);
