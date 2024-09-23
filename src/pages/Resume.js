import { useState, useRef, useEffect, useCallback } from "react"
import { Grid2 } from "@mui/material"
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from "@mui/lab"
import { MdSwipeDown, MdReplay } from "react-icons/md"
import { isMobile } from 'react-device-detect'

import MainCard from "../components/MainCard"
import Copyright from "../components/Copyright"
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

  const replayTyping = () => {
    clearInterval(intervalRef.current)
    setCurrentTextIndex(0)
    setShowText("")
    intervalRef.current = 0
  }

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
    currentTextIndex === texts.length && setShowText(texts[5])
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

  const handleMouseEnter = useCallback((e) => {
    if (isMobile) return
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
  }, [])

  // 工作經驗區塊
  const jobs = [
    {
      date: '2021.07 - 2023.12',
      title: '軟體開發工程師',
      company: '格拉墨科技有限公司',
      details: [
        { type: 'p', content: '【 前端開發 】' },
        { type: 'ul', items: [
          '協作開發兌換商城前台功能',
          '串接三方遊戲、整合多平台網站',
          '實現UI設計的活動頁面',
          '協作規範開發及上版流程，確保產品順利上線',
          '制定Redmine規範，讓團隊與其他部門更快釐清開發範圍及進度'
        ] },
        { type: 'p', content: '【 專案管理 】' },
        { type: 'ul', items: [
          '參與跨部門會議進行需求釐清及討論',
          '協助PM與前端溝通，預估開發時程與人力分配',
          '控管前端專案進度，分派工作項目'
        ] },
      ]
    },
    {
      date: '2017.07 - 2021.03',
      title: '網管工程師',
      company: '禮文股份有限公司',
      details: [
        { type: 'ul', items: [
          '負責網站管理及維護',
          '產品推廣設計 (如：海報、型錄、文宣、網頁設計、基本影片編輯...)',
          '年度參展規劃 (如：攤位設計、佈展規劃、承包商接洽...)',
          '處理行政相關作業（如：招標採購、合約製作、公文收發..）',
          '產品業務推廣，國外廠商溝通協商，市場調查開發潛在客戶'
        ] }
      ]
    },
    {
      date: '2016.07 - 2016.08',
      title: '暑期實習生-軟體工程師',
      company: '新加坡商鈦坦科技股份有限公司台灣分公司',
      details: [
        { type: 'p', content: '協助公司開發內部系統介面設計 - 人資面試管理系統' },
        { type: 'ul', items: [
          '提供面試者參與個人線上測驗',
          '可以填寫相關人格特質測試',
          '提供HR確認面試者測驗進度及參與回覆狀態'
        ] },
        { type: 'p', content: '在團隊中扮演「協調者」的角色，能夠快速釐清需求與問題，聆聽團隊的意見並總結方向，透過Scrum進行分工與討論，互相協助以完成目標。' },
      ]
    }
  ]

  return (
    <div className="resume">
      <header className="layout header">
        <p className="typing-text">
          {showText}
          {currentTextIndex === texts.length && <MdReplay className="replay" size={24} onClick={replayTyping} />}
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
        <Grid2
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
              <ol>
                {item.tool.map(i => (
                  <li key={i}>{i}</li>))}
              </ol>
            </MainCard>
          ))}
        </Grid2>
      </section>
      
      <section className="exprience">
        <h1 className="title">JOB EXPERIENCE</h1>
        <Timeline classes={{ root: "timeline" }}>
          {jobs.map((item, index) => (
            <TimelineItem classes={{ root: "item" }} key={item.title}>
              <TimelineOppositeContent classes={{ root: "time" }}>
                {item.date}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot classes={{ root: "dot" }} />
                <TimelineConnector classes={{ root: "line" }} /> 
              </TimelineSeparator>
              <TimelineContent classes={{ root: "content" }}>
                <h3>{item.title}</h3>
                <p>《 {item.company} 》</p>
                <div>
                  {item.details.map((detail, index) => {
                    if (detail.type === 'p') {
                      return <p key={index}>{detail.content}</p>
                    } 
                    else if (detail.type === 'ul') {
                      return (
                        <ul key={index}>
                          {detail.items.map((listItem, index) => (
                            <li key={index}>{listItem}</li>
                          ))}
                        </ul>
                      )
                    }
                    return null
                  })}
                </div>                
              </TimelineContent>
          </TimelineItem>))}
        </Timeline>
      </section>
      
      <Copyright />
    </div>
  )
}

export default Resume
