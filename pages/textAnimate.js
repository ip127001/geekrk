import { useEffect, useRef, useState } from "react";
import utilStyles from "../styles/utils.module.css";

export default function TextAnimate() {
  const consoleRef = useRef(null);
  const textRef = useRef(null);
  const interval1 = useRef(null);
  const interval2 = useRef(null);
  const timer1 = useRef(null);
  const timer2 = useRef(null);

  useEffect(() => {
    consoleText(
      ["JavaScript", "React", "Redux", "HTML", "CSS", "NodeJs"],
      ["#fbb612", "#0575E6", "#c471ed", "#C33764", "#F7971E", "#159957"]
    );
    return () => {
      clearInterval(interval1.current);
      clearInterval(interval2.current);
      clearTimeout(timer1.current);
      clearTimeout(timer2.current);
    };
  }, []);

  function consoleText(words, colors) {
    if (colors === undefined) colors = ["#fff"];
    var visible = true;
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    if (textRef?.current && consoleRef?.current) {
      textRef.current.style.color = colors[0];
      interval1.current = setInterval(function () {
        console.log("interval");
        if (letterCount === 0 && waiting === false && textRef.current) {
          waiting = true;
          textRef.current.innerText = words[0].substring(0, letterCount);
          timer1.current = setTimeout(function () {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            if (textRef.current) {
              textRef.current.style.color = colors[0];
            }
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          timer2.current = setTimeout(function () {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false && textRef.current) {
          textRef.current.innerText = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);

      interval2.current = setInterval(function () {
        console.log("interval");
        if (visible === true && consoleRef.current) {
          consoleRef.current.className = "consoleUnderscore hidden";
          visible = false;
        } else if (visible === false && consoleRef.current) {
          consoleRef.current.className = "consoleUnderscore";
          visible = true;
        }
      }, 400);
    }
  }
  return (
    <div className={utilStyles.consoleContainer}>
      <span id={utilStyles.text} ref={textRef}></span>
      <div className={utilStyles.consoleUnderscore} ref={consoleRef}>
        &#95;
      </div>
    </div>
  );
}
