import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import { assets } from "../../assets/assets"
import { Context } from '../../context/context'


function Sidebar() {

    const [extended, setExtended] = useState(false)
    const { onSent, prevPropmts, setrecentPropmt,newChat } = useContext(Context)

const LoadPrompt = async(prompt) => {

    setrecentPropmt(prompt)
    await onSent(prompt)

}

    return (
        <>
            <div className="SideBar">

                <div className="top">

                    <img onClick={() => setExtended(prev => !prev)} className='Menu' src={assets.menu_icon} alt="" />
                    <div onClick={()=>{newChat()}} className="NewChat">
                        <img src={assets.plus_icon} alt="" />
                        {extended ? <p>New Chat</p> : null}
                    </div>

                    {extended ? <div className="Recent">
                        <div className="recentTitle">Recent</div>

                        {prevPropmts.map((item, index) => {
                            return (
                                <div onClick={()=>{LoadPrompt(item)}} className="recentEntery">
                                    <img src={assets.message_icon} alt="" />
                                    <p key={index}>{item.slice(0,18)}....</p>
                                </div>
                            )
                        })}


                    </div> : null}



                </div>

                <div className="bottom">


                    <div className="help recentEntery">
                        <img src={assets.question_icon} alt="" />
                        {extended ? <p>Help</p> : null}
                    </div>


                    <div className="setting recentEntery">
                        <img src={assets.setting_icon} alt="" />

                        {extended ? <p>Setting</p> : null}
                    </div>

                    <div className="activity recentEntery">
                        <img src={assets.history_icon} alt="" />
                        {extended ? <p>Activity</p> : null}

                    </div>

                </div>

            </div>

        </>
    )
}

export default Sidebar
