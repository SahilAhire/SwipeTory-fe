import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Filter from "../../components/Filter/Filter";
import Story from "../../components/Story/Story";
import style from "./Homepage.module.css"

function Homepage() {

    const { viewStoryModal, setViewStoryModal, token, allUserStories, setSelectedStoryCatArray, setSelectedStoryCatIndex, decode } = useContext(UserContext)

    const [selectedCategory, setSelectedCategory] = useState("");

    // Here we are saving unique category
    const uniqueCategory = [];
    allUserStories.forEach((story) => {
        if (!uniqueCategory.includes(story.category)) {
            uniqueCategory.push(story.category)
        }
    })

    const openViewStoryModal = (story, index) => {
        setSelectedStoryCatArray(story) 
        setSelectedStoryCatIndex(index)  
        setViewStoryModal(!viewStoryModal) 
    }

    const handleSelectedCategory = (category) => {
        setSelectedCategory(category)
    }

    const userStory = allUserStories.filter(user => user.userId === decode?.user?._id)

    return (
        <div className={style.homepage} >

            <Filter uniqueCategory={uniqueCategory} handleSelectedCategory={handleSelectedCategory} selectedCategory={selectedCategory} />

            {userStory.length > 0 &&
                <div className={`${style.storyhead} ${!token && style.yStory}`} >
                    {userStory.length > 0 && token && <h2 className={style.storytitle}>Your Stories</h2>}
                    <Story userStory={userStory} onClick={(categoryStories, ind) => openViewStoryModal(categoryStories, ind)} />
                </div>}

            {selectedCategory === "" ? (
                uniqueCategory.map((category, index) => (
                    <div className={style.storyhead} key={index}>
                        <h2 className={style.storytitle}>{`Top Stories About ${category[0].toUpperCase() + category.slice(1)}`}</h2>
                        <Story category={category} onClick={(categoryStories, ind) => openViewStoryModal(categoryStories, ind)} />
                    </div>
                ))
            ) : (
                uniqueCategory
                    .filter(category => category === selectedCategory)
                    .map((category, index) => (
                        <div className={style.storyhead} key={index}>
                            <h2 className={style.storytitle}>{`Top Stories About ${category[0].toUpperCase() + category.slice(1)}`}</h2>
                            <Story category={category} onClick={(categoryStories, ind) => openViewStoryModal(categoryStories, ind)} />
                        </div>
                    ))
            )}

        </div >
    )
}
export default Homepage;