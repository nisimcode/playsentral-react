import Form from 'react-bootstrap/Form'
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import axios from "axios";
import {NUMTASTIC_URL} from "./request_utils";


export default function Numtastic() {

  const [top, setTop] = useState("")
  const [guess, setGuess] = useState("")
  const [bottom, setBottom] = useState("")
  const [target, setTarget] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [count, setCount] = useState(0)
  const [win, setWin] = useState(false)

  const getTarget = () => {
        axios
            .get(NUMTASTIC_URL)
            .then(res => {
              console.log(res)
              setTarget(res.data.target)
              setMin(res.data.min)
              setMax(res.data.max)
            })
            .catch(err => window.alert(err))
            }

  const handleRestart = () => {
    setTop("")
    setBottom("")
    setGuess("")
  }

  const handleClick = () => {
    if (guess < min || guess > max) {
      window.alert("Choose a number between 1 and 100!")
      setGuess("")
    } else {
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
  }

  useEffect(() => {
    getTarget()
  }, [])

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
      <Button variant='primary'
              disabled={win}
              style={{width: 100, height: 60, textAlign: "center", fontSize: 28}}
              onClick={handleClick}>
        { win ? "WIN!" : "GO" }
      </Button>
      <br/> <br/>
      <Form >
        <Form.Control
          disabled
          style={{width: 100, height: 40, textAlign: "center", fontSize: 24}}
          type="number" placeholder="0"
          value={count} aria-required={'true'}
          onChange={(event) => setCount(event.target.value)}/>
      </Form>
       <Button variant='outline-primary'
              style={{width: 100, height: 60, textAlign: "center", fontSize: 28}}
              onClick={getIni}>
        RESTART
      </Button>

    </Container>
  )
}