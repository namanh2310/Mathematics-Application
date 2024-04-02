export const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>MathQuill in Webview Example</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.css" />
  </head>
  <body>
  
    <style>
      * {
      user-select: none;
      }

      body {
        margin: 0; 
        padding: 0;
      }

      .container {
        position: relative;
        width: 100%; 
        height: 100vh;
        overflow: hidden;
      }

      .input-field-container {
        max-width: 100%; 
        display: flex; 
        justify-content:center;
      }

      .input-field {
        font-size: 32px; 
        margin-top:12px; 
        width: 100%; 
        border: none; 
        padding-left: 12px;
        outline: none;

      }

      .invisibility {
        visibility: hidden;
      }

      @keyframes fadeIn {
        from { opacity: 0; } /* Start at 0 opacity */
        to { opacity: 1; } /* End at 1 opacity */
      }

      .control-container {
        width: 100%;
       
        position: absolute; 
        bottom: 0;
        animation-name: fadeIn;
        animation-duration: 1200ms;
      }

      .keyboard-field {
        width: 100%;
        display: flex;
        flex-wrap: wrap; 
      }
      

      .type-buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
      }

      .type-buttons > i {
        font-size: 32px;
        color: #B792FD;
        padding: 8px;
        margin-left: 24px;
        margin-right: 24px;
      }
      
      .math-button {
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100%/7); 
        height: 64px; 
        border: 0.5px solid #fff; 
        font-size: 20px; 
        color: white;
        font-weight: 500;
        background-color: #B762FD;
      }

      .math-button > i {
        font-size: 24px
      }

      .numeric {
        background-color: #AE4EFC;
      }

      .control {
        background-color: #FC453B;
      }
      
      .active {
        opacity: 0.8;
      }

      .ON-OFF {
        display: none;
        margin: auto;
        border-radius: 8px;
        align-items: center;
        justify-content: center;  
        width: 90%;
        min-height: 48px;
        background-color: #AE4EFC;
        font-size: 24px;
        font-weight: 600;
        color: white;
        animation-name: fadeIn;
        animation-duration: 1200ms;
      }
      
    </style>

    <div class='container'>
        <div class='input-field-container'>
          <div
            class="input-field"
            id="mathquill-editor"
            contenteditable="true">
          </div>
        </div>
        <p class='invisibility'>LaTeX of what you typed: <span id="latex"></span></p>
        <div id ='open' class='ON-OFF'>
          Keyboard
        </div>
        <div class='control-container'>
          <div id='type-buttons' class='type-buttons'>
            <i id='type' class="fa-solid fa-clock-rotate-left"></i>
            <i id='type' style='color: #B702FD' class="fa-solid fa-arrow-up-1-9"></i>
            <i id='type' class="fa-solid fa-ruler"></i>
            <i id='type' class="fa-solid fa-user"></i>
          </div>

          <div style='display: flex' id='keyboard' class='keyboard-field'>
            <button class='math-button' id="int">∫</button>
            <button class='math-button' id="sqrt"><i class="fa-solid fa-square-root-variable"></i></button>
            <button class='math-button' id="lim">lim</button>
            <button class='math-button numeric' id="onee"><i class="fa-solid fa-1"></i></button>
            <button class='math-button numeric' id="two"><i class="fa-solid fa-2"></i></button>
            <button class='math-button numeric' id="three"><i class="fa-solid fa-3"></i></button>
            <button class='math-button numeric' id="plus"><i class="fa-solid fa-plus"></i></button>
            <button class='math-button' id="abs">|□|</button>
            <button class='math-button' id="x">x</button>
            <button class='math-button' id="frac"><div style='transform: rotate(90deg);'>□|□</div></button>
            <button class='math-button numeric' id="four"><i class="fa-solid fa-4"></i></button>
            <button class='math-button numeric' id="five"><i class="fa-solid fa-5"></i></button>
            <button class='math-button numeric' id="six"><i class="fa-solid fa-6"></i></button>
            <button class='math-button numeric' id="minus"><i class="fa-solid fa-minus"></i></button>
            <button class='math-button' id="power">x▘</button>
            <button class='math-button' id="deri"><sup>d</sup>/<sub>dx</sub></button>
            <button class='math-button' id="log">log</button>
            <button class='math-button numeric' id="seven"><i class="fa-solid fa-7"></i></button>
            <button class='math-button numeric' id="eight"><i class="fa-solid fa-8"></i></button>
            <button class='math-button numeric' id="nine"><i class="fa-solid fa-9"></i></button>
            <button class='math-button numeric' id="mul"><i class="fa-solid fa-xmark"></i></button>
            <button class='math-button' id="exp">e▘</button>
            <button class='math-button' id="left"><i class="fa-solid fa-angle-left"></i></button>
            <button class='math-button' id="right"><i class="fa-solid fa-angle-right"></i></button>
            <button class='math-button numeric' id="zero"><i class="fa-solid fa-0"></i></button>
            <button class='math-button numeric' id="equal"><i class="fa-solid fa-equals"></i></button>
            <button class='math-button control' id="delete"><i class="fa-solid fa-delete-left"></i></button>
            <button class='math-button control' id="myButton"><i class="fa-solid fa-paper-plane"></i></button>
          </div>

          <div style='display: none' id='keyboard2' class='keyboard-field'>
            <button class='math-button' id="sin">sin</button>
            <button class='math-button' id="cos">cos</i></button>
            <button class='math-button' id="tan">tan</button>
            <button class='math-button numeric' id="one2"><i class="fa-solid fa-1"></i></button>
            <button class='math-button numeric' id="two2"><i class="fa-solid fa-2"></i></button>
            <button class='math-button numeric' id="three2"><i class="fa-solid fa-3"></i></button>
            <button class='math-button numeric' id="plus2"><i class="fa-solid fa-plus"></i></button>
            <button class='math-button' id="cot">cot</button>
            <button class='math-button' id="pi">π</button>
            <button class='math-button' id="percent"><i class="fa-solid fa-percent"></i></button>
            <button class='math-button numeric' id="four2"><i class="fa-solid fa-4"></i></button>
            <button class='math-button numeric' id="five2"><i class="fa-solid fa-5"></i></button>
            <button class='math-button numeric' id="six2"><i class="fa-solid fa-6"></i></button>
            <button class='math-button numeric' id="minus2"><i class="fa-solid fa-minus"></i></button>
            <button class='math-button' id="ln">ln</button>
            <button class='math-button' id="parenthese">( )</button>
            <button class='math-button' id="point">.</button>
            <button class='math-button numeric' id="seven2"><i class="fa-solid fa-7"></i></button>
            <button class='math-button numeric' id="eight2"><i class="fa-solid fa-8"></i></button>
            <button class='math-button numeric' id="nine2"><i class="fa-solid fa-9"></i></button>
            <button class='math-button numeric' id="mul2"><i class="fa-solid fa-xmark"></i></button>
            <button class='math-button' id="i">i</button>
            <button class='math-button' id="left2"><i class="fa-solid fa-angle-left"></i></button>
            <button class='math-button' id="right2"><i class="fa-solid fa-angle-right"></i></button>
            <button class='math-button numeric' id="zero2"><i class="fa-solid fa-0"></i></button>
            <button class='math-button numeric' id="equal2"><i class="fa-solid fa-equals"></i></button>
            <button class='math-button control' id="delete2"><i class="fa-solid fa-delete-left"></i></button>
            <button class='math-button control' id="myButton2"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
        </div>
    </div>
 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js"></script>
    <script src="https://kit.fontawesome.com/2dbc689934.js" crossorigin="anonymous"></script>

    <script>
      var myButton = document.getElementById('myButton');
      var myButton2 = document.getElementById('myButton2');
      var latexSpan = document.getElementById('latex');
      var edit = document.getElementById('mathquill-editor');
      var open = document.getElementById('open');
    
      const types = document.querySelectorAll('[id=type]');
      const type1 = types[1];
      const type2 = types[2];
      types.forEach((type) => {
        type.addEventListener('click', () => {
          types.forEach((ty) => {
            if (ty !== type) {
              ty.style.color = '#B792FD';
            }
          });
          type.style.color = '#B702FD';
        })
      })

      const keyboard1 = document.getElementById('keyboard');
      const keyboard2 = document.getElementById('keyboard2');
    

      const showComponent = (component) => {
        component.style.display = 'flex';
      };

      const hideComponents = () => {
        keyboard1.style.display = 'none';
        keyboard2.style.display = 'none';
      };

      type1.addEventListener('click', () => {
        hideComponents();
        showComponent(keyboard1);
      });

      type2.addEventListener('click', () => {
        hideComponents();
        showComponent(keyboard2);
      });

      var data = [
        {
          fe: 'int',
          be: '\\\\int_{}^{}\\\\left(  \\\\right)dx'
        },
        {
          fe: 'sqrt',
          be: '\\\\sqrt{}'
        },
        {
          fe: 'lim',
          be: '\\\\lim_{x\\\\to\\\\infty}\\\\left(\\\\right)'
        },
        {
          fe: 'abs',
          be: '||'
        },
        {
          fe: 'power',
          be: '^{}'
        },
        {
          fe: 'frac',
          be: '\\\\frac{}{}'
        },
        {
          fe: 'log',
          be: '\\\\log()'
        },
        {
          fe: 'exp',
          be: 'e^{}'
        },
        {
          fe: 'x',
          be: 'x'
        },
        {
          fe: 'plus',
          be: '+'
        },
        {
          fe: 'minus',
          be: '-'
        },
        {
          fe: 'mul',
          be: '*'
        },
      
        {
          fe: 'equal',
          be: '='
        },
        {
          fe: 'deri',
          be: '\\\\frac{d}{dx}({})'
        },
        {
          fe: 'zero',
          be: '0'
        },
        {
          fe: 'onee',
          be: '1'
        },
        {
          fe: 'two',
          be: '2'
        },
        {
          fe: 'three',
          be: '3'
        },
        {
          fe: 'four',
          be: '4'
        },
        {
          fe: 'five',
          be: '5'
        },
        {
          fe: 'six',
          be: '6'
        },
        {
          fe: 'seven',
          be: '7'
        },
        {
          fe: 'eight',
          be: '8'
        },
        {
          fe: 'nine',
          be: '9'
        },
        {
          fe: 'sin',
          be: '\\\\sin()'
        },
        {
          fe: 'cos',
          be: '\\\\cos()'
        },
        {
          fe: 'tan',
          be: '\\\\tan()'
        },
        {
          fe: 'cot',
          be: '\\\\cot()'
        },
        {
          fe: 'percent',
          be: '\\\\int\\\\left(  \\\\right)dx'
        },
        {
          fe: 'pi',
          be: '\\\\pi'
        },
        {
          fe: 'ln',
          be: '\\\\ln()'
        },
        {
          fe: 'parenthese',
          be: '\\\\left(  \\\\right)'
        },
        {
          fe: 'point',
          be: '.'
        },
        {
          fe: 'i',
          be: 'i'
        },
        {
          fe: 'one2',
          be: '1'
        },
        {
          fe: 'zero2',
          be: '0'
        },
        {
          fe: 'two2',
          be: '2'
        },
        {
          fe: 'three2',
          be: '3'
        },
        {
          fe: 'four2',
          be: '4'
        },
        {
          fe: 'five2',
          be: '5'
        },
        {
          fe: 'six2',
          be: '6'
        },
        {
          fe: 'seven2',
          be: '7'
        },
        {
          fe: 'eight2',
          be: '8'
        },
        {
          fe: 'nine2',
          be: '9'
        },
        {
          fe: 'plus2',
          be: '+'
        },
        {
          fe: 'minus2',
          be: '-'
        },
        {
          fe: 'mul2',
          be: '*'
        },
        
      ]

      
      var MQ = MathQuill.getInterface(2);
        var mathField = MQ.MathField($('#mathquill-editor')[0], {
          spaceBehavesLikeTab: true,
          handlers: {
            edit: function () {
              window.postMessage(
                {
                  type: 'latex',
                  data: mathField.latex(),
                },
                '*',
              );
              latexSpan.textContent = mathField.latex();
              
            },
          },
        });

      function changeData(parameter) {
          mathField.write(parameter);
      }

      $(document).ready(function () {
        var MQ = MathQuill.getInterface(2);
        var mathField = MQ.MathField($('#mathquill-editor')[0], {
          spaceBehavesLikeTab: true,
          handlers: {
            edit: function () {
              window.postMessage(
                {
                  type: 'latex',
                  data: mathField.latex(),
                },
                '*',
              );
              latexSpan.textContent = mathField.latex();
              
            },
          },
        });

        document.getElementById('left').addEventListener('click', function() {
          mathField.keystroke('Left')
          document.getElementById('left').classList.add('active')
          setTimeout(()=>document.getElementById("left").classList.remove("active"), 200);
        });
    
        document.getElementById('right').addEventListener('click', function() {
          mathField.keystroke('Right')
          document.getElementById('right').classList.add('active')
          setTimeout(()=>document.getElementById("right").classList.remove("active"), 200);
        });

        document.getElementById('delete').addEventListener('click', function() {
          mathField.keystroke('Backspace')
          document.getElementById('delete').classList.add('active')
          setTimeout(()=>document.getElementById("delete").classList.remove("active"), 200);
        });

        document.getElementById('left2').addEventListener('click', function() {
          mathField.keystroke('Left')
          document.getElementById('left2').classList.add('active')
          setTimeout(()=>document.getElementById("left2").classList.remove("active"), 200);
        });
    
        document.getElementById('right2').addEventListener('click', function() {
          mathField.keystroke('Right')
          document.getElementById('right2').classList.add('active')
          setTimeout(()=>document.getElementById("right2").classList.remove("active"), 200);
        });

        document.getElementById('delete2').addEventListener('click', function() {
          mathField.keystroke('Backspace')
          document.getElementById('delete2').classList.add('active')
          setTimeout(()=>document.getElementById("delete2").classList.remove("active"), 200);
        });


        document.getElementById('mathquill-editor').addEventListener('click', function() {
          document.getElementById("keyboard").style.display = 'none';
          document.getElementById("open").style.display = 'flex';
          document.getElementById("type-buttons").style.display = 'none'
        });

        document.getElementById('mathquill-editor').addEventListener('click', function() {
          document.getElementById("keyboard2").style.display = 'none';
          document.getElementById("open").style.display = 'flex';
          document.getElementById("type-buttons").style.display = 'none'

        });


        document.getElementById('open').addEventListener('click', function() {
          document.getElementById("keyboard").style.display = 'flex';
          document.getElementById("open").style.display = 'none';
          document.getElementById("type-buttons").style.display = 'flex'
          
        });

        
        myButton.addEventListener('click', function () {
          window.ReactNativeWebView.postMessage(latexSpan.innerHTML);
          document.getElementById('myButton').classList.add('active')
          setTimeout(()=>document.getElementById("myButton").classList.remove("active"), 200);
        });  

        myButton2.addEventListener('click', function () {
          window.ReactNativeWebView.postMessage(latexSpan.innerHTML);
          document.getElementById('myButton2').classList.add('active')
          setTimeout(()=>document.getElementById("myButton2").classList.remove("active"), 200);
        });  
        
        data.forEach(el => document.getElementById(el.fe).addEventListener('click', function() {
          mathField.write(el.be);
          document.getElementById(el.fe).classList.add('active')
          setTimeout(()=>document.getElementById(el.fe).classList.remove("active"), 200);
         
        }))

        
        
      });

    </script>
  </body>
</html>

     `;
