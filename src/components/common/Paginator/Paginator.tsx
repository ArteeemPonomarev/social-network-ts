import React from 'react';
import style from './Paginator.module.css'


type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            totalUsersCount,
                                                            pageSize,
                                                            setCurrentPage,
                                                            currentPage
                                                        }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return (
                        <span key={p}
                              style={{cursor: 'pointer'}}
                              onClick={() => setCurrentPage(p)}
                              className={currentPage === p ? style.selectedPage : ''}>
                    {p}
                </span>
                    )
                })
                }
            </div>
        </div>
    )
}



