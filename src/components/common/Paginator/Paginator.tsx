import React, {useState} from 'react';
import style from './Paginator.module.css'


type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {
        totalItemsCount,
        pageSize,
        setCurrentPage,
        currentPage,
        portionSize = 10

    }) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState<number>(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return (
        <div className={style.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber => portionNumber - 1)}}>PREV</button>}
            <div>
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
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
            {portionCount > portionNumber &&
            <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>
    )
}



