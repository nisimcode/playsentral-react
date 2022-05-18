import Form from 'react-bootstrap/Form'
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'


export default function Numtastic() {

  const [top, setTop] = useState("")
  const [guess, setGuess] = useState("")
  const [bottom, setBottom] = useState("")
  const [target] = useState(73)
  const [count, setCount] = useState(0)
  const [win, setWin] = useState(false)

  const handleClick = () => {
    setCount(count + 1)
      if (guess > target) {
        if (top === "" || guess < top) {
          setTop(guess)
          setGuess("")
        } else if (guess > top) {
          setGuess("")
        }
      } else if (guess < target) {
          if (bottom === "" || guess > bottom) {
            setBottom(guess)
            setGuess("")
          } else if (guess < bottom) {
            setGuess("")
          }
        } else {
        setWin(true)

    }
  }

  return (
    <Container style={{position: "absolute", left: "45%", top: "10%",}}>
      <Form>
        <Form.Control
          disabled
          style={{width: 100, height: 100, textAlign: "center", fontSize: 36}}
          type="number" placeholder=""
          value={top} aria-required={'true'}
          onChange={(event) => setTop(event.target.value)}/>
      </Form>
      <br/>
       <Form >
        <Form.Control
          style={{width: 100, height: 100, textAlign: "center", fontSize: 36}}
          type="number" placeholder="" color={win ? "green" : "black"}
          disabled={win}
          value={guess} aria-required={'true'}
          onChange={(event) => setGuess(event.target.value)}/>
      </Form>
      <br/>
      <Form >
        <Form.Control
          disabled
          style={{width: 100, height: 100, textAlign: "center", fontSize: 36}}
          type="number" placeholder=""
          value={bottom} aria-required={'true'}
          onChange={(event) => setBottom(event.target.value)}/>
      </Form>
      <br/>
      <Button variant='primary' disabled={win}
              style={{width: 100, height: 50, textAlign: "center", fontSize: 32}} onClick={handleClick}>
        { win ? "WIN!!!" : "TRY!" }
      </Button>
      <br/> <br/>
      <Form >
        <Form.Control
          disabled
          style={{width: 100, height: 25, textAlign: "center", fontSize: 36}}
          type="number" placeholder="0"
          value={count} aria-required={'true'}
          onChange={(event) => setCount(event.target.value)}/>
      </Form>

    </Container>
  )
}