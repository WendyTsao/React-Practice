import { Container, Alert, AlertTitle, FormControl, InputLabel, OutlinedInput } from "@mui/material"
import { useState, useEffect, useCallback } from "react"
import { CiCircleRemove } from "react-icons/ci"

function DebounceInput() {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState("")
  const delay = 300

  const handleChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  useEffect(() => {
    const delayTime = setTimeout(() => {
      if (search) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(res => res.json())
        .then(data => setResult(data))
        .catch(() => setResult(""))
      }
      else setResult("")
    }, delay)
    
    return () => clearTimeout(delayTime)
  }, [search, delay])

  const cleanResult = () => {
    setResult("")
    setSearch("")
  }

  return (
    <Container sx={{paddingY: "1rem"}} component={"main"}>
      <p className="time">2024.05.20</p>
      <Alert severity="info">
        <AlertTitle>實作一個 debounce input</AlertTitle>
        <ul>
          <li>Props 簡單三個即可， onChange、value、delay<br/>(Delay 為毫秒單位 給300就是延遲0.3秒)</li>
          <li>將輸入的值帶入api，一直輸入文字的狀況下不會呼叫api</li>
          <li>當輸入完值過了0.3秒後，不再輸入文字時就會呼叫api</li>
          <li>可測試名稱：squirtle、ditto、butterfree</li>
        </ul>
      </Alert>
      
      <FormControl classes={{ root: "text-field" }}>
        <InputLabel htmlFor="feild-title">Debounce Input</InputLabel>
        <OutlinedInput
          id="feild-title"
          value={search}
          onChange={handleChange} 
          endAdornment={<CiCircleRemove size={20} color="#BBE1FA" onClick={cleanResult} />}
          label="Debounce Input"
        />
      </FormControl>

      <h3>查詢結果：</h3>
      <div className="data">
        {result ? 
          <pre>
            {JSON.stringify(result, null, 2)}
          </pre> :
          <p>查無資料</p>}
      </div>
    </Container>
  )
}

export default DebounceInput
