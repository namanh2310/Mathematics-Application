from flask import request, jsonify
import numpy as np
from sympy import *

class ODEController:
    def eulerMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        print("nnnnnnnnnnnnnnnn", n)
        step = []

        try:
            functionReplace = ''
            for i in range(len(function)):
              if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                  functionReplace += '*' + function[i]
              else:
                  functionReplace += function[i]

            functionReplace = functionReplace.replace(' ', '').replace('^', '**')

            def functionInput(x, y):
              return eval(functionReplace)
            
            def intFunction(x, y):
              integratedFunction = integrate(functionReplace)
              return eval(str(integratedFunction))

            def showFunctionInput():
              # functionReplace = function.replace("^", "**")
              # return str(functionReplace)
              return latex(simplify(functionReplace))
            
            def showIntFunctionInput():
              return latex(integrate(functionReplace))

            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            def calIntFunction(x_input, y_input):
              return intFunction(x_input, y_input)
            
            obj = []

            def euler(xi, y, xf, n):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h)
              slope = calFunctionInput(xi, y)
              c_constant = y - calIntFunction(xi, y)
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],  
                    "y_euler": '{:.4f}'.format(y),
                    "slope": '{:.4f}'.format(slope),
                    "y_true": '{:.4f}'.format(y),
                  })
                  y_euler_next = y + slope * n
                  step.append(f"We have \\(\\frac{{dy}}{{dx}}= {showFunctionInput()}\\)")
                  step.append(f"\\(\\rightarrow y  = {showIntFunctionInput()} + C\\)")
                  step.append(f"\\(at⠀x = 0;⠀y = 1 \\rightarrow C = {c_constant}\\)")
                  step.append(f"\\( \\rightarrow y = {showIntFunctionInput()} + {c_constant} \\)")
                  step.append(f"Next, we have a formula \\(y_1 = y_0 + f(x_0,y_0) \\times h\\)")
                  step.append(f"\\(= {obj[0]['y_euler']} + f({obj[0]['x']},{obj[0]['y_euler']}) \\times {n}\\)")
                  step.append(f"while \\(f({obj[0]['x']},{obj[0]['y_euler']}) = {obj[0]['slope']} \\)")
                  step.append(f"\\( \\rightarrow y_1 = {obj[0]['y_euler']} + {obj[0]['slope']} \\cdot {n} = {y_euler_next} \\)")
                else:
                  y_next = y + (slope * n)
                  y_true = calIntFunction(array[i], y) + c_constant
                  slope = calFunctionInput(array[i], y)
                  y = y_next
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "y_euler": '{:.4f}'.format(y),
                    "slope": '{:.4f}'.format(slope),
                    "y_true": '{:.4f}'.format(y_true),
                  })
              return jsonify({
                "data": obj,
                "step": step,
              })
            return euler(xi, y, xf, n)
        except ValueError:
            return jsonify({'message': 'Please re-check the input fields'})
        
    def midPointMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        step = []

        if xi > xf:
              return jsonify({'message': 'Invalid input, please check again!'})
        try:
            functionReplace = ''
            for i in range(len(function)):
              if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                  functionReplace += '*' + function[i]
              else:
                  functionReplace += function[i]

            functionReplace = functionReplace.replace(' ', '').replace('^', '**')

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)    
            
            obj = []

            def midPoint(xi, xf, n, y):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(n/2), y+((slope*n)/2))
              y_next = y + slope2*n

              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),  
                    "y_midpoint": '{:.4f}'.format(y),
                  })
                  y0_step = y + slope * (n / 2)
                  y_mp_next = y + slope2 * n
                  step.append(f"\\( y_{{1+\\frac{{1}}{{2}}}} = y_1 + f(x_1, y_1) \\cdot \\frac{{1}}{{2}} \\)")
                  step.append(f"\\( = {obj[0]['y_midpoint']} + f({obj[0]['x']}, {obj[0]['y_midpoint']}) \\cdot \\frac{{h}}{{2}}\\)")
                  step.append(f"while \\(f({obj[0]['x']}, {obj[0]['y_midpoint']}) = {obj[0]['slope']}\\)")
                  step.append(f"Therefore, \\(y_{{1 + \\frac{{1}}{{2}}}} = {y0_step}  \\)")
                  step.append(f"\\(y_2 = y_1 + f(x_{{1+\\frac{{1}}{{2}}}}, y_{{1+\\frac{{1}}{{2}}}}) \\cdot h\\)")
                  step.append(f"\\(= {obj[0]['y_midpoint']}+{obj[0]['slope2']}  \\cdot {n}\\)")
                  step.append(f"Therefore \\(y_2 = {y_mp_next} \\)")

                else:
                  y = y_next
                  slope = calFunctionInput(array[i], y)
                  slope2 = calFunctionInput(array[i]+(n/2), y+((slope*n)/2))
                  y_next = y + slope2*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_midpoint": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                    "step": step,
                  })
            return midPoint(xi, xf, n, y)
        except ValueError:
            return jsonify({'message': 'Please re-check the input fields'})
        
    def heunMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        step = []
        if xi > xf:
              return jsonify({'message': 'Invalid input, please check again!'})
        try:
            functionReplace = ''
            for i in range(len(function)):
              if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                  functionReplace += '*' + function[i]
              else:
                  functionReplace += function[i]

            functionReplace = functionReplace.replace(' ', '').replace('^', '**')

            def functionInput(x, y):
              return eval(functionReplace)
            
            x_c = Symbol('x')

            def intFunction(x, y):
              integratedFunction = integrate(functionReplace, x_c)
              return eval(str(integratedFunction))
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            def calIntFunction(x_input, y_input):
              return intFunction(x_input, y_input)
            
            obj = []

            def Heun(xi, xf, n, y):
              
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              y0 = y + slope*n
              slope2 = calFunctionInput(xi+n, y0)
              y_next = y + ((slope+slope2)/2)*n

              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_heun": '{:.4f}'.format(y),
                    # "y_true": '{:.4f}'.format(y),
                  })
                  y0_step = y + slope * n
                  y_heun_next = y + (slope + slope2)/2 * n
                  step.append(f"\\(y^0_2 = y_1 + f(x_1, y_1) \\cdot h\\)")
                  step.append(f"\\(= {obj[0]['y_heun']} + f({obj[0]['x']}, {obj[0]['y_heun']}) \\cdot {n}\\)")
                  step.append(f"while \\(f({obj[0]['x']}, {obj[0]['y_heun']}) = {obj[0]['slope']}\\) ")
                  step.append(f"Therefore \\(y^0_2 = {y0_step} \\) ")
                  step.append(f"Now, we calculate y value of the next iteration by the following formula")
                  step.append(f"\\(y_2 = y_1 + \\frac{{f(x_1, y_1) + f(x_2, y^0_2)}}{{2}} \\cdot h\\)")
                  step.append(f"\\(= {obj[0]['y_heun']}+\\frac{{{obj[0]['slope']}+{obj[0]['slope2']}}}{{2}} \\cdot {n}\\)")
                  step.append(f"Therefore, \\(y_2 = {y_heun_next}\\)")

                else:
                  y = y_next
                  y_true = calIntFunction(array[i], y)
                  slope = calFunctionInput(array[i], y)
                  y0 = y + slope*n
                  slope2 = calFunctionInput(array[i]+n, y0)
                  y_next = y + ((slope + slope2)/2)*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_heun": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                    "step": step,
                  })
            return Heun(xi, xf, n, y)
        except ValueError:
            return jsonify({'message': 'Please re-check the input fields'})

    def ralstonMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        step = []
        if xi > xf:
              return jsonify({'message': 'Invalid input, please check again!'})
        try:
            functionReplace = ''
            for i in range(len(function)):
              if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                  functionReplace += '*' + function[i]
              else:
                  functionReplace += function[i]

            functionReplace = functionReplace.replace(' ', '').replace('^', '**')

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            obj = []

            def Ralston(xi, xf, n, y):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(3*n/4), y+((3*slope*n)/4))
              y_next = y + ((1/3)*slope+(2/3)*slope2)*n
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_ralston": '{:.4f}'.format(y),
                    # "y_true": '{:.4f}'.format(y),
                  })
                  y_ralston_next = y + (1/3 * slope + 2/3 * slope2) * n
                  step.append(f"\\(k_1 = f(x_1, y_1) = f({obj[0]['x']}, {obj[0]['y_ralston']})= {obj[0]['slope']}\\)")
                  step.append(f"\\(k_2 = f(x_1+\\frac{{3h}}{{4}}, y_1+ \\frac{{3h}}{{4}} \\cdot k_1)= {obj[0]['slope2']}\\)")
                  step.append(f"Now, we calculate y value of the next iteration by the following formula")
                  step.append(f"\\(y_2 = y_1 + (\\frac{{1}}{{3}} \\cdot k_1+\\frac{{2}}{{3}} \\cdot k_2) \\cdot h\\)")
                  step.append(f"\\(= {obj[0]['y_ralston']}+(\\frac{{1}}{{3}} \\cdot {obj[0]['slope']} + \\frac{{2}}{{3}} \\cdot {obj[0]['slope2']})  \\cdot {n}\\)")
                  step.append(f"Therefore, \\(y_2 = {y_ralston_next} \\)")

                else:
                  y = y_next
                  slope = calFunctionInput(array[i], y)
                  slope2 = calFunctionInput(array[i]+(3*n/4), y+((3*slope*n)/4))
                  y_next = y + ((1/3)*slope+(2/3)*slope2)*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_ralston": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                    "step": step,
                  })
            return Ralston(xi, xf, n, y)
        except ValueError:
            return jsonify({'message': 'Please re-check the input fields'})
        
    def thirdOrderMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        step = []
        if xi > xf:
              return jsonify({'message': 'Invalid input, please check again!'})
        try:
            functionReplace = ''
            functionReplace = ''
            for i in range(len(function)):
              if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                  functionReplace += '*' + function[i]
              else:
                  functionReplace += function[i]

            functionReplace = functionReplace.replace(' ', '').replace('^', '**')

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            obj = []

            def thirdOrder(xi, xf, n, y):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
              slope3 = calFunctionInput(xi+n, y-slope*n+2*slope2*n)
              y_next = y + 1/6*(slope+4*slope2+slope3)*n
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "y_3rd": '{:.4f}'.format(y),
                  })
                  y_3rd_next = y + 1/6*(slope+4*slope2+slope3)*n
                  step.append(f"\\(k_1 = f(x_1, y_1) = {obj[0]['slope']}\\)")
                  step.append(f"\\(k_2 = f(x_1 + \\frac{{1}}{{2}} \\cdot h, y_1 + k_1 \\cdot h) = {obj[0]['slope2']}\\)")
                  step.append(f"\\(k_3 = f(x_1 + h, y_1 - k_1 \\cdot h + 2 \\cdot k_2 \\cdot h) = {obj[0]['slope3']}\\)")
                  step.append(f"Now, we calculate y value of the next iteration by the following formula")
                  step.append(f"\\(y_2 = y_1 + \\frac{{1}}{{6}}(k_1+4 \\cdot k_2 + k_3) \\cdot h\\)")
                  step.append(f"\\( = {obj[0]['y_3rd']} + \\frac{{1}}{{6}}({obj[0]['slope']}+4 \\cdot {obj[0]['slope2']} + {obj[0]['slope3']}) \\cdot {n} \\)")
                  step.append(f"Therefore, \\(y_2 = {y_3rd_next} \\)")
               
                else:
                  y = y_next
                  slope = calFunctionInput(array[i], y)
                  slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
                  slope3 = calFunctionInput(array[i]+n, y-slope*n+2*slope2*n)
                  y_next = y + 1/6*(slope+4*slope2+slope3)*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "y_3rd": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                    "step": step
                  })
            return thirdOrder(xi, xf, n, y)
        except ValueError:
            return jsonify({'message': 'Please re-check the input fields'})
        
    def fourthOrderMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        step = []
        if xi > xf:
              return jsonify({'message': 'Invalid input, please check again!'})
        try:
            functionReplace = ''
            for i in range(len(function)):
              if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                  functionReplace += '*' + function[i]
              else:
                  functionReplace += function[i]

            functionReplace = functionReplace.replace(' ', '').replace('^', '**')

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            obj = []

            def fourthOrder(xi, xf, n, y):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
              slope3 = calFunctionInput(xi+(1*n/2), y+((1*slope2*n)/2))
              slope4 = calFunctionInput(xi+n, y+n*slope3)
              y_next = y + ((1*slope/6)+(1*slope2/3)+(1*slope3/3)+(1*slope4/6))*n
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "slope4": '{:.4f}'.format(slope4),
                    "y_4th": '{:.4f}'.format(y),
                  })
                  y_fourth_next = y + ((1*slope/6)+(1*slope2/3)+(1*slope3/3)+(1*slope4/6))*n
                  step.append(f"\\(k_1 = f(x_1, y_1) = {obj[0]['slope']}\\)")
                  step.append(f"\\(k_2 = f(x_1 + \\frac{{1}}{{2}} \\cdot h, y_1 + \\frac{{1}}{{2}}k_1 \\cdot h) = {obj[0]['slope2']}\\)")
                  step.append(f"\\(k_3 = f(x_1 + \\frac{{1}}{{2}} \\cdot h, y_1 + \\frac{{1}}{{2}}k_2 \\cdot h) = {obj[0]['slope3']}\\)")
                  step.append(f"\\(k_4 = f(x_1+h, y_1+h \\cdot k_{3}) = {obj[0]['slope4']}\\)")
                  step.append(f"Now, we calculate y value of the next iteration by the following formula")
                  step.append(f"\\(y_2 = y_1 + h \\cdot (\\frac{{1}}{{6}} \\cdot k_1 + \\frac{{1}}{{3}} \\cdot k_{2} + \\frac{{1}}{{3}} \\cdot k_3+ \\frac{{1}}{{6}} \\cdot k_4)\\)")
                  step.append(f"\\(= {obj[0]['y_4th']} + {n}(\\frac{{1}}{{6}}\\cdot {obj[0]['slope']}+\\frac{{1}}{{3}}\\cdot {obj[0]['slope2']} + \\)")
                  step.append(f"\\(\\frac{{1}}{{3}}\\cdot {obj[0]['slope3']} + \\frac{{1}}{{6}}\\cdot {obj[0]['slope4']})\\)")
                  step.append(f"Therefore, \\(y_2 = {y_fourth_next}\\)")
                else:
                  y = y_next
                  slope = calFunctionInput(xi, y)
                  slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
                  slope3 = calFunctionInput(xi+(1*n/2), y+((1*slope2*n)/2))
                  slope4 = calFunctionInput(xi+n, y+n*slope3)
                  y_next = y + ((1*slope/6)+(1*slope2/3)+(1*slope3/3)+(1*slope4/6))*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "slope4": '{:.4f}'.format(slope4),
                    "y_4th": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                    "step": step,
                  })
            return fourthOrder(xi, xf, n, y)
        except ValueError:
            return jsonify({'message': 'Please re-check the input fields'})