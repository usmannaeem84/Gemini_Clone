import React, { useContext } from 'react'
import { assets } from "../../assets/assets"
import "./Main.css"
import { Context } from '../../context/context'

function Main() {

  const { onSent, input, setInput, recentPropmt, setrecentPropmt, prevPropmts, setprevPropmts, showResult, loading, resultData, } = useContext(Context)

  function CardClicked(e){
   const Cardstext = e.target.innerText
   onSent(Cardstext)
   setrecentPropmt(Cardstext)
   setprevPropmts(prev => [...prev, Cardstext])
  }

  return (
    <div className='Main'>

      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="Container">

        {!showResult ?

          <>
            <div className="greet">
              <p><span>Hello , Dev.</span></p>
              <p>How can i help You Today</p>
            </div>
            <div className="cards">

              <div onClick={(e)=>{CardClicked(e)}} className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={(e)=>{CardClicked(e)}} className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={(e)=>{CardClicked(e)}} className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.history_icon} alt="" />
              </div>
              <div onClick={(e)=>{CardClicked(e)}} className="card">
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>

            </div>
          </> : <div className='result'>

            <div className="result_title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPropmt}</p>
            </div>
            <div className="result_data">
              <img src={assets.gemini_icon} alt="" />
              {!loading ? <p dangerouslySetInnerHTML={{ __html: resultData }}></p> : <div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>

              }

            </div>

          </div>
        }





        <div className="bottom">
          <div className="bottom-search">

            <input onChange={(e) => { setInput(e.target.value) }} value={input} type="text" placeholder='Enter a prompt here' />
            <div className='bottom-img'>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
             {input ?  <img onClick={() => onSent()} src={assets.send_icon} alt="" /> :null}

            </div>
          </div>

          <div className="bottom-info">
            <p>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Main
