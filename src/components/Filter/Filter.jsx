import style from "./Filter.module.css"
import filterbgimg from "../../assets/Filter Photo.svg"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"

function Filter({ uniqueCategory, handleSelectedCategory, selectedCategory }) {

    const [loading, setLoading] = useState(true)
    const [totalLoadingIteration, setTotalLoadingIteration] = useState(8)

    useEffect(() => {
        if (uniqueCategory.length > 0) {
            setLoading(false);
        }
    }, [uniqueCategory])

    return (
        <div className={style.filter}>
            {!loading &&
            <div className={style.filterTag} onClick={() => handleSelectedCategory('')}>
                <img src={filterbgimg} alt="Filter img" className={`${selectedCategory === "" && style.filterTagActive}`} />
                <h2>All</h2>
            </div>
            }
            
            {loading ?
                Array.from({ length: totalLoadingIteration }).map((_, index) => (
                    <div className={style.filterTagBack} key={index}>
                        <img src={filterbgimg} alt="bg-img" />
                    </div>
                ))
                : uniqueCategory.map((category, index) => {
                return (
                    <div className={style.filterTag} key={index} onClick={() => handleSelectedCategory(category)}>
                        <img src={filterbgimg} alt="Filter img" className={`${selectedCategory === category && style.filterTagActive}`} />
                        <h2>{category[0].toUpperCase() + category.slice(1)}</h2>
                    </div>)
            })}

        </div >
    )
}

export default Filter;