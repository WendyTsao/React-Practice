import { useState, useRef, useEffect } from "react"
import { Grid } from "@mui/material"
import { MdSwipeDown } from "react-icons/md"

import MainCard from "../components/MainCard"
import '../assets/styles/Resume.styl'

function Resume() {

  // 首頁逐字稿區塊
  const texts = [
    '您好：）',
    '我是曹昱萱！',
    '擁有3年前端開發經驗，並具備專案管理能力。',
    '以下為我的工作經驗以及對未來的期許。',
    'Hello :)',
    'This is Wendy!',
    '3+ years of Front-End development experience and the ability to manage projects.',
    'The following is my learning experience during this period.'
  ]
  const [showText, setShowText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const indexRef = useRef(0)
  const intervalRef = useRef(0)
  const speed = 150

  useEffect(()=>{
    if (intervalRef.current > 0 || currentTextIndex === texts.length) {
      return
    }

    intervalRef.current = setInterval(()=>{
      if (indexRef.current === texts[currentTextIndex].length) {
        clearInterval(intervalRef.current)
        indexRef.current = 0
        setCurrentTextIndex(pre => pre+1)
        setShowText("")
        intervalRef.current = 0
        return
      }
      
      const current = indexRef.current
      setShowText((prev) => prev + (texts[currentTextIndex][current]))
      indexRef.current++

    }, speed)
  }, [currentTextIndex])

  useEffect(()=>{
    currentTextIndex === texts.length && setShowText(texts[1])
  }, [currentTextIndex])

  // 技能區塊特效
  const skills = [
    { cardId: 'card01', title: '前端開發', tool: [
      "Vue / React",
      "Bootstrap / Vant / Element UI",
      "Git / Github",
      "Render Dashboard",
      "Responsive Web Design"
    ]},
    { cardId: 'card02', title: '平面繪圖', tool: [
      "Illustrator",
      "Photoshop",
      "Adobe XD"
    ]},
    { cardId: 'card03', title: '其他工具', tool: [
      "Xmind",
      "Trello",
      "HackMD",
      "PowerPoint / Word / Excel"
    ]}
  ]

  const [direction, setDirection] = useState('')

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    const mouseX = e.clientX
    const mouseY = e.clientY

    let direction = ''

    if (mouseX < rect.left + (rect.right - rect.left) / 3){
      direction = 'left'
    }
    if (mouseX > rect.right - (rect.right - rect.left) / 3){
      direction = 'right'
    }
    if (mouseY < rect.top + (rect.bottom - rect.top) / 3){
      direction = 'top'
    }
    if (mouseY > rect.bottom - (rect.bottom - rect.top) / 3){
      direction = 'bottom'
    }
    setDirection(direction)
  }

  return (
    <div className="resume">
      <header className="layout header">
        <p className="typing-text">
          {showText}
        </p>
        {currentTextIndex === texts.length && <MdSwipeDown size={30} className="swipe" />}
      </header>

      <section className="about">
        <h1 className="title">ABOUT ME</h1>
        <div className="dialog">
          <p className="solgan">獨立負責 • 挑戰自我</p>
          <p>「Try and do my best」，便是對我最好的形容詞。</p>
          <p>熱心公益、關心周遭瑣碎事物且心思縝密，嘗試站在各種角色的角度上思考以及觀察問題並找尋方式解決。</p>
        </div>
        <div className="dialog reverse">
          <p className="solgan">積極進取 • 不斷成長</p>
          <p>進修相關專案管理課程與知識，轉換思考的模式，並利用學習工具應用在專案實務上。</p>
          <p>持續精進前端技能，學習前端框架React，並搭配MUI練習線上的各種題型，獨立完成RWD設計的網站。</p>
        </div>
      </section>

      <section className="skills">
        <h1 className="title">SKILLS</h1>
        <Grid
          container 
          justifyContent="center"
          alignItems="strech" 
          spacing={2}
          sx={{ width: '100%', marginLeft: '0px' }}
        >
          {skills.map(item => (
            <MainCard
              key={item.title}
              cardId={item.cardId} 
              direction={direction}
              cardTitle={item.title}
              onMouseEnter={handleMouseEnter}
            >
              <ul>
                {item.tool.map(item => (
                  <li key={item}>{item}</li>))}
              </ul>
            </MainCard>
          ))}
        </Grid>
      </section>

      <section className="exprience">
        <h1 className="title">JOB EXPERIENCE</h1>
      </section>
    </div>
  )
}

export default Resume
