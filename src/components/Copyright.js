import { FaGithubAlt, FaLinkedin, FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Copyright = () => {
  const navigate = useNavigate()

  const openLink = (link) => {
    window.open(link, '_blank')
  }

  return <>
    <footer className="footer">
      <FaGithubAlt size={24} style={{ marginRight: "20px" }} onClick={() => openLink('https://github.com/WendyTsao')} />
      <FaHome size={24} style={{ marginRight: "20px" }} onClick={() => navigate("/")} />
      <FaLinkedin size={24} onClick={() => openLink('https://www.linkedin.com/in/wendytsao63')} />
      <p>© copyright 2024 by Wendy</p>
    </footer>
  </>
}

export default Copyright
