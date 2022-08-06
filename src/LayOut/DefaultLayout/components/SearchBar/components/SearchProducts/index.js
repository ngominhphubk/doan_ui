import classNames from 'classnames/bind';
import styles from './SearchProducts.module.scss';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function SearchProducts({ data }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Search Result</p>
            <div className={cx('container')}>
                {data.map((item, index) => (
                    <div className={cx('product-item')} key={index}>
                        <div className={cx('thumbs')}>
                            <img
                                className={cx('thumbs-img')}
                                src={`http://localhost:2222/images/${item.anhdaidien}`}
                                alt={item.tensp}
                            />
                            {item.soluong <= 2 && (
                                <span className={cx('sale')}>-15%</span>
                            )}
                            {item.soluong >= 5 && (
                                <span className={cx('new')}>New</span>
                            )}
                            {item.soluong === 0 && (
                                <span className={cx('outstock')}>
                                    Out stock
                                </span>
                            )}
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={cx('heart')}
                            />
                        </div>
                        <div className={cx('info')}>
                            <a className={cx('name-product')}>{item.tensp}</a>
                            <span className={cx('price-product')}>
                                {item.gia.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}{' '}
                                VND
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchProducts;