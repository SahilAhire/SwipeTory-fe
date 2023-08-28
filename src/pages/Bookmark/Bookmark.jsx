import { useContext, useEffect, useState } from "react";
import style from "./Bookmark.module.css";
import Story from "../../components/Story/Story";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";

function Bookmark() {
    const location = useLocation()

    const { allUserStories, decode, viewStoryModal, setViewStoryModal, setSelectedStoryCatArray, setSelectedStoryCatIndex } = useContext(UserContext)

    const [bookmark, setBookmark] = useState(false)

    const userBookmarks = allUserStories.filter(story => story.bookmarks.includes(decode?.user?._id))

    const openViewStoryModal = (story, index) => {
        setSelectedStoryCatArray(story) // Here we are seting array of an objects of all the stories of that particular category
        setSelectedStoryCatIndex(index) // Here we are setting cat array index 
        setViewStoryModal(!viewStoryModal) // View Story Modal Open
    }

    useEffect(() => {
        if (location.pathname === '/bookmark') {
            setBookmark(!bookmark)
        }
    }, [location.pathname])

    return (
        <div className={style.bookmark}>
            <Story bookmark={bookmark} userBookmarks={userBookmarks} onClick={(categoryStories, ind) => openViewStoryModal(categoryStories, ind)} />
        </div>
    )
}

export default Bookmark;